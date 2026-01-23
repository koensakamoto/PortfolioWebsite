---
title: "Building Infinite Scroll in React Native"
date: "2025-01-22"
excerpt: "How I implemented paginated feeds in a social betting app using React Query, Spring Boot, and WebSockets for real-time updates."
tags: ["react-native", "react-query", "spring-boot", "pagination"]
---

# Building Infinite Scroll in React Native

I built Rival Picks, a social betting app where users compete with friends. As users create more bets, the feed grows. Loading everything at once would be slow and wasteful. I needed pagination with infinite scroll.

Here's how I built it across the full stack, and what I learned about pagination in production.

## The Problem

The feed needed to:
- Load 20 bets at a time, fetch more on demand
- Support pull-to-refresh
- Handle real-time updates via WebSocket (new bets appearing while scrolling)
- Work across three tabs: My Bets, Losses, Winnings
- Show loading states without breaking the user experience

## React Query Handles Pagination State

My first attempt managed pagination state manually with `useState`. It was a mess. Page numbers, loading states, concatenating arrays, handling errors separately for each tab.

**The solution:** React Query's `useInfiniteQuery`.

```typescript
export function useMyBets() {
  return useInfiniteQuery({
    queryKey: ['bets', 'my'],
    queryFn: ({ pageParam = 0 }) => betService.getMyBets(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;  // Stop when no more pages
      return lastPage.page + 1;
    },
    staleTime: 5 * 60 * 1000,  // Cache for 5 minutes
  });
}
```

React Query handles:
- Page state (`pageParam`)
- Loading states (`isLoading`, `isFetchingNextPage`)
- Error handling (`error`, `isError`)
- Caching (reuses data for 5 minutes)
- Background refetching

Don't manage pagination state yourself. Use React Query's `useInfiniteQuery` and let it handle the complexity.

## Building the Backend API

The Spring Boot backend returns pagination metadata along with content:

```java
@GetMapping("/my")
public ResponseEntity<PagedResponseDto<BetSummaryResponseDto>> getMyBets(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size
) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
    Page<BetParticipation> participations = betService.getUserParticipationsPaged(user, pageable);

    return ResponseEntity.ok(mapToPagedResponse(participations));
}
```

The response includes everything the frontend needs:

```typescript
interface PagedResponse<T> {
  content: T[];           // The actual data
  page: number;           // Current page (0-indexed)
  size: number;           // Items per page
  totalElements: number;  // Total items across all pages
  totalPages: number;     // Total number of pages
  first: boolean;         // Is this the first page?
  last: boolean;          // Is this the last page?
}
```

The `last` field is crucial. It tells the frontend when to stop fetching. React Query's `getNextPageParam` uses it:

```typescript
getNextPageParam: (lastPage) => {
  if (lastPage.last) return undefined;  // Stop pagination
  return lastPage.page + 1;
}
```

Include pagination metadata in your API response. The `last` field is crucial - the frontend needs to know when to stop fetching.

## Flattening Pages for Rendering

React Query stores pages as an array of arrays:

```typescript
{
  pages: [
    { content: [bet1, bet2, ...], page: 0, last: false },
    { content: [bet21, bet22, ...], page: 1, last: false },
    { content: [bet41, bet42, ...], page: 2, last: true },
  ]
}
```

But FlatList needs a flat array. Use `useMemo` to flatten:

```typescript
const myBets = useMemo(() =>
  myBetsData?.pages?.flatMap(page => page?.content ?? []).filter(Boolean) ?? [],
  [myBetsData]
);
```

This only re-flattens when `myBetsData` changes, not on every render.

Flatten pages with `useMemo` so it only re-computes when the data actually changes.

## Manual "Load More" vs Auto-Scroll

My initial implementation used `onEndReached` to auto-load when scrolling near the bottom. Problems:

- Triggered multiple times if user scrolled quickly
- Loaded data the user didn't want yet
- Made it hard to reach the actual end of the list

**The solution:** Manual "Load More" button.

```typescript
const handleLoadMore = useCallback(() => {
  if (hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

// Render at bottom of list
{hasNextPage && (
  <TouchableOpacity
    onPress={handleLoadMore}
    disabled={isFetchingNextPage}
  >
    {isFetchingNextPage ? (
      <ActivityIndicator size="small" />
    ) : (
      <Text>Load More</Text>
    )}
  </TouchableOpacity>
)}
```

Benefits:
- User controls when to load more
- No accidental duplicate requests
- Clear loading state
- Users can reach the bottom of the list

Manual "Load More" buttons give users control and prevent accidental fetches. Let the user decide when to load more data.

## Pull-to-Refresh

React Query caches data for 5 minutes. Pull-to-refresh should get fresh data, not cached data.

```typescript
const onRefresh = useCallback(async () => {
  setRefreshing(true);
  await refetchMyBets();  // Forces fresh fetch, ignores cache
  setRefreshing(false);
}, [refetchMyBets]);

<FlatList
  data={myBets}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>
```

React Query's `refetch()` bypasses the cache and fetches fresh data from the server.

Use `refetch()` for pull-to-refresh to bypass the cache and get fresh data.

## Real-Time Updates and Pagination

I have WebSocket connections for real-time updates (new bets, status changes). But WebSockets and pagination serve different purposes:

- **Pagination:** Load historical data in chunks
- **WebSockets:** Push new events as they happen

When a new bet is created:
1. WebSocket broadcasts the event
2. Frontend invalidates the query cache
3. Next time the user views the feed, it refetches

```typescript
export function useCreateBet() {
  return useMutation({
    mutationFn: (data: CreateBetRequest) => betService.createBet(data),
    onSuccess: (newBet) => {
      // Invalidate cache so next fetch gets fresh data
      queryClient.invalidateQueries({ queryKey: ['bets', 'my'] });
      queryClient.invalidateQueries({ queryKey: ['bets', 'group', newBet.groupId] });
    },
  });
}
```

I don't optimistically insert the new bet into the paginated list. That breaks pagination (suddenly page 1 has 21 items instead of 20). Instead, I invalidate the cache and let the user refresh.

WebSockets and pagination solve different problems. Don't try to merge real-time events into paginated data - invalidate the cache and let users refresh.

## Multiple Tabs, Multiple Queries

Rival Picks has three tabs: My Bets, Losses, Winnings. Each has its own pagination state.

I created separate hooks for each:

```typescript
export function useMyBets() {
  return useInfiniteQuery({
    queryKey: ['bets', 'my'],
    queryFn: ({ pageParam = 0 }) => betService.getMyBets(pageParam, 20),
    // ...
  });
}

export function useMyLosses() {
  return useInfiniteQuery({
    queryKey: ['bets', 'my', 'losses'],
    queryFn: ({ pageParam = 0 }) => betService.getMyLosses(pageParam, 20),
    // ...
  });
}

export function useMyWinnings() {
  return useInfiniteQuery({
    queryKey: ['bets', 'my', 'winnings'],
    queryFn: ({ pageParam = 0 }) => betService.getMyWinnings(pageParam, 20),
    // ...
  });
}
```

Each has its own:
- Query key (`['bets', 'my']` vs `['bets', 'my', 'losses']`)
- API endpoint (`/my` vs `/my/losses`)
- Cache
- Page state

When you switch tabs, cached data appears instantly. No loading spinner.

One infinite query per tab/filter. Each needs its own cache and pagination state. When you switch tabs, cached data appears instantly.

## Handling Loading States

There are three distinct loading states:

1. **Initial load** - No data yet
2. **Loading next page** - User clicked "Load More"
3. **Refreshing** - User pulled to refresh

Each needs different UI:

```typescript
const { data, isLoading, isFetchingNextPage, refetch } = useMyBets();

if (isLoading) {
  return <SkeletonCards />;  // Show skeleton during initial load
}

return (
  <FlatList
    data={myBets}
    refreshControl={<RefreshControl refreshing={refreshing} />}
    ListFooterComponent={() => (
      hasNextPage && (
        <TouchableOpacity onPress={handleLoadMore}>
          {isFetchingNextPage ? (
            <ActivityIndicator />  // Show spinner during "Load More"
          ) : (
            <Text>Load More</Text>
          )}
        </TouchableOpacity>
      )
    )}
  />
);
```

Distinguish between initial load, loading more, and refreshing. Each needs appropriate UI to avoid confusing the user.

## The Final Architecture

**Backend (Spring Boot):**
- Spring Data JPA pagination with `Pageable`
- Custom repository queries with `Page<T>` return type
- Response DTO with metadata (`last`, `totalPages`, etc.)

**Frontend (React Native + React Query):**
- `useInfiniteQuery` for pagination state
- `useMemo` to flatten pages
- Manual "Load More" button instead of auto-scroll
- Pull-to-refresh with cache invalidation
- Separate queries per tab

**Real-Time (WebSocket):**
- STOMP/WebSocket for live events
- Cache invalidation on mutations
- Separate from pagination logic

## Key Metrics

- **20 items per page** - Good balance between network requests and data volume
- **5 minute cache** - Reuses data without excessive requests
- **3 tabs** with independent pagination
- **Sub-200ms** response time for paginated endpoints

## Tools I Used

- **React Query** - Infinite query management
- **Spring Boot** - JPA pagination
- **React Native** - FlatList with RefreshControl
- **WebSocket (STOMP)** - Real-time updates
- **TypeScript** - Type-safe pagination interfaces

## Final Thoughts

Pagination seems simple until you add real-time updates, multiple tabs, caching, and loading states. The key is separating concerns:

- **Backend:** Return page metadata, sort by creation time descending
- **React Query:** Manage pagination state and caching
- **UI:** Flatten pages, handle loading states, give users control
- **WebSockets:** Push new events, invalidate cache, don't merge into pages

Don't try to be too clever with optimistic updates in paginated lists. Let the cache invalidation and refetch handle it. Your users can pull-to-refresh.

The code for Rival Picks is open source on [GitHub](https://github.com/koensakamoto/RivalPicks). The pagination hooks are in `/frontend/hooks/useBetQueries.ts` and the backend API is in `/backend/src/main/java/com/rivalpicks/controller/BetController.java`.
