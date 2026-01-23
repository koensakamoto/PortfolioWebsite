---
title: "The Timezone Bug That Broke My Scheduler"
date: "2025-01-21"
excerpt: "How LocalDateTime.now() caused scheduled tasks to run 8 hours late in my betting app."
tags: ["java", "spring-boot", "debugging", "timezones"]
---

# The Timezone Bug That Broke My Scheduler

I built a social betting app called RivalPicks where users create predictions and compete with friends. Everything worked perfectly in development. Then I started testing with realistic deadlines, and bets started closing at the wrong times.

A bet scheduled to close at 6 PM would close at 2 AM the next day. Notifications were firing hours late. I needed to figure out why.

## The Symptom

My scheduled tasks weren't running when they should. I had three main schedulers:

- Close bets when the betting deadline passes
- Resolve bets when the resolution deadline passes
- Send reminder notifications 24 hours and 1 hour before deadlines

All of them were off by exactly 8 hours. That's the offset between PST and UTC.

## The Investigation

I started by checking the logs. Here's what I saw:

```
[2024-03-15 18:00:00 PST] Found 0 expired bets at 2024-03-15T18:00:00
[2024-03-15 18:00:00 PST] Database has bet with deadline: 2024-03-15T18:00:00Z
```

The scheduler was looking for bets expiring at `18:00` local time, but the database had `18:00 UTC`. My server was in PST (UTC-8), so the scheduler was running 8 hours behind.

## The Root Cause

Here's the problem code:

```java
@Scheduled(fixedDelay = 120000) // Every 2 minutes
public void closeExpiredBets() {
    LocalDateTime now = LocalDateTime.now();  // <-- THE BUG: Uses server's timezone!
    List<Bet> expiredBets = betRepository.findExpiredOpenBets(now);
    // ...
}
```

**The issue:** `LocalDateTime.now()` uses the server's local timezone instead of UTC.

`LocalDateTime.now()` returns the current time **in the server's local timezone**. My server was in PST, but everything else in my system used UTC:

- **Database**: Configured with `serverTimezone=UTC`
- **Frontend**: Sent dates as ISO strings with `Z` suffix (UTC format)
- **API serialization**: Configured to output dates in UTC
- **API deserialization**: Parsed incoming dates as UTC

But my scheduler? It was living in PST.

---

## The Timeline of a Bug

Here's exactly what happened:

1. I create a test bet with deadline: `2024-03-15T18:00:00.000Z` (6 PM UTC)
2. Frontend sends this to backend
3. Custom deserializer parses it correctly as UTC
4. Database stores it as `2024-03-15 18:00:00` (implicitly UTC)
5. Scheduler runs at `2024-03-15 18:00:00 PST`
6. But that's actually `2024-03-16 02:00:00 UTC`
7. Bet closes **8 hours late**

## The Fix

The fix was simple but critical:

```java
@Scheduled(fixedDelay = 120000)
public void closeExpiredBets() {
    LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);  // Explicit UTC
    List<Bet> expiredBets = betRepository.findExpiredOpenBets(now);
    // ...
}
```

I changed every scheduler to explicitly use `ZoneOffset.UTC`:

```java
// Closing expired bets
LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);

// Processing resolvable bets
LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);

// Sending notifications
LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
```

## Why LocalDateTime Is Dangerous

`LocalDateTime` is a date-time without a timezone. It represents "3 PM on March 15th" but doesn't specify *where* that 3 PM is.

When you call `LocalDateTime.now()`:
- On a server in PST: `2024-03-15T15:00:00`
- On a server in EST: `2024-03-15T18:00:00`
- On a server in UTC: `2024-03-15T23:00:00`

**Same moment in time, different values.** This is a nightmare for distributed systems.

## What I Should Have Used

For my use case, I had a few better options:

### Option 1: Use Instant
```java
Instant now = Instant.now();  // Always UTC
```

`Instant` represents a point in time in UTC. No ambiguity. This is the most foolproof option since it can't accidentally use the wrong timezone.

However, `Instant` doesn't work directly with JPA queries that expect `LocalDateTime`. I would have needed to change my repository methods and entity fields, which meant touching a lot of code.

### Option 2: Use ZonedDateTime
```java
ZonedDateTime now = ZonedDateTime.now(ZoneId.of("UTC"));
```

`ZonedDateTime` includes timezone information, making it explicit. Same problem as `Instant` though - my database entities used `LocalDateTime`, so this would require larger changes.

### Option 3: Use LocalDateTime with explicit timezone
```java
LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
```

This is what I went with. It keeps the same type (`LocalDateTime`) so my existing repository queries and entity fields didn't need to change. I just had to update the scheduler methods to explicitly use UTC instead of the server's timezone.

**The tradeoff:** `LocalDateTime` with explicit UTC still requires discipline - every time I call `.now()`, I need to remember to pass `ZoneOffset.UTC`. With `Instant`, you can't mess it up.

For a greenfield project, I'd use `Instant`. For this codebase, `LocalDateTime.now(ZoneOffset.UTC)` was the pragmatic choice.

## The Lesson

**Store everything in UTC. Convert to local time only for display.**

Here's my current architecture:

- **Database**: All timestamps stored in UTC
- **Backend**: All processing done in UTC
- **API**: All dates serialized in ISO 8601 with UTC
- **Frontend**: Receives UTC, converts to user's local timezone for display

## Final Thoughts

Timezone bugs are silent. They don't crash your application or throw exceptions; they just make your timestamps wrong. You test locally, everything works, then you deploy to a server in a different timezone and things break.

**The lesson:** Always be explicit about timezones. Methods like `LocalDateTime.now()`, `new Date()`, or `datetime.now()` seem harmless, but they introduce implicit dependencies on the system's local timezone.

**The solution:** Standardize on UTC everywhere: database, API, backend logic. Convert to local time only for display. And when you see a timestamp, always ask: What timezone is this actually in?
