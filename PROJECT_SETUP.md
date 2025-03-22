# Project Setup Guide

## Directory Structure

```
stakeholder-crm/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── shared/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Table.tsx
│   │   ├── companies/
│   │   ├── individuals/
│   │   ├── conversations/
│   │   └── dashboard/
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Companies.tsx
│   │   ├── Individuals.tsx
│   │   └── Conversations.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCompanies.ts
│   │   ├── useIndividuals.ts
│   │   └── useConversations.ts
│   ├── types/
│   │   ├── company.ts
│   │   ├── individual.ts
│   │   └── conversation.ts
│   ├── utils/
│   │   ├── supabase.ts
│   │   └── helpers.ts
│   └── contexts/
│       └── AuthContext.tsx
├── public/
├── .env.local
├── package.json
└── tsconfig.json
```

## Initial Setup Steps

1. Create new Next.js project with TypeScript:
```bash
npx create-next-app@latest stakeholder-crm --typescript --tailwind
cd stakeholder-crm
```

2. Install required dependencies:
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs react-hook-form @headlessui/react @heroicons/react date-fns
```

3. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Initialize Supabase client in `src/utils/supabase.ts`

5. Set up authentication context and hooks

6. Create basic layout components

7. Implement routing structure

## Development Workflow

1. Start with authentication implementation
2. Build core UI components
3. Implement data fetching hooks
4. Create CRUD operations for main entities
5. Add search and filtering functionality
6. Implement relationships between entities
7. Add tags system
8. Build dashboard with analytics

## Code Style Guidelines

- Use TypeScript for all components and functions
- Implement proper error handling
- Write meaningful comments for complex logic
- Use consistent naming conventions
- Create reusable components when possible
- Implement proper loading and error states 