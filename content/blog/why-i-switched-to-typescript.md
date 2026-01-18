---
title: "Why I Switched to TypeScript"
date: "2024-01-08"
excerpt: "How static typing changed the way I write JavaScript."
tags: ["typescript", "javascript", "webdev"]
---

# Why I Switched to TypeScript

I resisted TypeScript for a long time. "JavaScript is fine," I told myself. "Types are just extra work." I was wrong.

## The Breaking Point

It was a bug that took me 4 hours to find. A simple typo in a property name that JavaScript happily accepted. TypeScript would have caught it instantly.

## What Changed

After switching to TypeScript:

- **Fewer runtime errors** - Most bugs are caught at compile time
- **Better autocomplete** - VS Code actually knows what methods are available
- **Self-documenting code** - Types tell you what a function expects and returns
- **Easier refactoring** - Change a type and see everywhere that breaks

## The Learning Curve

Yes, there's a learning curve. Generics can be confusing. Sometimes the type system fights you. But it's worth it.

## My Setup

I use TypeScript with:
- React/Next.js for frontend
- Node.js for backend
- Zod for runtime validation

If you're on the fence, just try it for one project. You won't go back.
