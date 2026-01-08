# Frontend Folder Structure

## Overview
This document outlines the recommended folder structure for the Pivot frontend application.

## Directory Structure

```
src/
├── api/                    # API client configurations and endpoints
│   ├── auth.api.ts        # Authentication API calls
│   └── axios.config.ts    # Axios instance configuration
│
├── assets/                 # Static assets (images, fonts, etc.)
│
├── components/            # React components
│   ├── common/           # Common reusable components
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout components (Header, Footer, Sidebar)
│   ├── shared/           # Shared components across features
│   │   └── Logo.tsx
│   ├── ui/               # UI library components (shadcn/ui)
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   └── index.ts          # Component exports
│
├── config/               # Configuration files
│   └── theme.ts         # Theme configuration
│
├── contexts/            # React Context providers
│
├── hooks/               # Custom React hooks
│
├── lib/                 # Library utilities
│   └── utils.ts        # Utility functions (cn, etc.)
│
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   │   ├── Login.tsx
│   │   └── index.ts
│   ├── admin/         # Admin pages
│   ├── superAdmin/    # Super Admin pages
│   └── index.ts       # Page exports
│
├── routes/            # Route configurations
│
├── store/             # State management (Zustand)
│   └── authStore.ts  # Authentication store
│
├── types/             # TypeScript type definitions
│
├── utils/             # Utility functions
│   └── storage.ts    # Local storage utilities
│
├── validations/       # Validation schemas (Zod)
│   └── authSchemas.ts
│
├── App.tsx           # Main App component
├── main.tsx          # Application entry point
└── index.css         # Global styles

```

## Best Practices

### 1. **Index Files**
- Each major folder should have an `index.ts` file for cleaner imports
- Example: `import { Login } from '@/pages/auth'` instead of `import Login from '@/pages/auth/Login'`

### 2. **Component Organization**
- **ui/**: Base UI components (buttons, inputs, cards) - typically from component libraries
- **shared/**: Shared components used across multiple features (Logo, LoadingSpinner)
- **common/**: Common reusable components (ErrorBoundary, ProtectedRoute)
- **features/**: Feature-specific components that aren't shared
- **layout/**: Layout components (Header, Sidebar, Footer)

### 3. **Page Structure**
- Pages should be organized by feature/role
- Each page folder should have an index file for exports
- Keep page components thin - move logic to hooks or stores

### 4. **API Organization**
- One file per resource/domain (e.g., `auth.api.ts`, `user.api.ts`, `link.api.ts`)
- Centralized axios configuration in `axios.config.ts`

### 5. **State Management**
- Use Zustand stores for global state
- Keep stores focused on specific domains (auth, user, etc.)
- Use React Query for server state

### 6. **Type Definitions**
- Define types in the `types/` folder
- Use interfaces for objects, types for unions/primitives
- Export types from index files

### 7. **Validation**
- Use Zod for runtime validation
- Keep validation schemas in `validations/` folder
- One file per domain (e.g., `authSchemas.ts`, `userSchemas.ts`)

## Import Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
// ✅ Good
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

// ❌ Avoid
import { Button } from '../../components/ui/button';
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `Login.tsx`, `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `storage.ts`, `formatDate.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useDebounce.ts`)
- **Types**: PascalCase (e.g., `User.ts`, `ApiResponse.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

## Future Additions

As the project grows, consider adding:

- `services/` - Business logic layer
- `middleware/` - Custom middleware
- `constants/` - Application constants
- `tests/` - Test files (or co-locate with components)
- `i18n/` - Internationalization files
