# Types Directory

This directory contains all TypeScript type definitions organized by domain for better maintainability and discoverability.

## Structure

```
types/
├── index.ts              # Main export file - import from here
├── auth.ts               # Authentication & user types
├── common.ts             # Shared types, utilities, and base interfaces
├── cms.ts                # CMS & marketing types (blog, brand, etc.)
├── license.ts            # License & application types
├── location.ts           # Countries & cities types
├── person.ts             # Person entity types
├── test.ts               # Test & appointment types
└── next-auth.d.ts        # NextAuth type augmentation
```

## Usage

Always import types from the main index file:

```typescript
// ✅ Good - Import from index
import type { User, ActionResponse, City } from '@/types';

// ❌ Avoid - Direct file imports
import type { User } from '@/types/auth';
```

## Type Organization

### By Domain

Types are organized into domain-specific files:

- **auth.ts**: User authentication, sessions, and auth context
- **location.ts**: Geographic data (countries, cities)
- **person.ts**: Person entity and related types
- **license.ts**: Driving licenses and applications
- **test.ts**: Test appointments and results
- **cms.ts**: Content management (blogs, testimonials, features)
- **common.ts**: Shared utilities and base interfaces

### Common Types

The `common.ts` file contains:
- API response wrappers (`ApiResponse`, `ActionResponse`)
- Pagination types
- Table column configuration
- Base entity interfaces
- Common enums (EntityState, Gender)

## Best Practices

### 1. Naming Conventions
- Use **PascalCase** for type/interface names: `User`, `ActionResponse`
- Use descriptive names: `LocalDrivingLicenseApplication` not `LDLA`
- Suffix response types with `Response`: `UserResponse`

### 2. Interface vs Type
- Prefer `interface` for object shapes (more extensible)
- Use `type` for unions, primitives, and computed types

```typescript
// Interface for objects
interface User {
  id: string;
  name: string;
}

// Type for unions
type Gender = "male" | "female" | "unknown";
```

### 3. Generics
Use generics for reusable wrapper types:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Usage
type UserList = ApiResponse<User[]>;
```

### 4. Optional vs Required
Be explicit about optional fields:

```typescript
interface Person {
  id: string;           // Required
  name: string;         // Required
  phone?: string;       // Optional
  email?: string;       // Optional
}
```

### 5. Error Handling
Use `ActionResponse` for server actions:

```typescript
export async function signIn(data: SignInData): Promise<ActionResponse<User>> {
  try {
    const user = await api.auth.login(data);
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Login failed",
        details: { email: ["Invalid credentials"] }
      }
    };
  }
}
```

## Adding New Types

1. Determine the domain (auth, location, license, etc.)
2. Add types to the appropriate domain file
3. Export from that file
4. Re-export from `index.ts`

Example:

```typescript
// In types/license.ts
export interface LicenseRenewal {
  licenseId: string;
  renewalDate: string;
  fee: number;
}

// In types/index.ts
export type {
  LicenseClass,
  LocalDrivingLicenseApplication,
  LicenseRenewal, // Add new export
} from "./license";
```

## Type Safety Tips

1. **Avoid `any`**: Use `unknown` if type is truly unknown
2. **Use strict null checks**: Enabled in tsconfig.json
3. **Leverage type guards**: Create custom type guards for runtime checks
4. **Document complex types**: Add JSDoc comments for clarity

## Migration Notes

Old files removed:
- `blog.ts` → Merged into `cms.ts`
- `brand.ts` → Merged into `cms.ts`
- `city.tsx` → Merged into `location.ts`
- `country.tsx` → Merged into `location.ts`
- `feature.ts` → Merged into `cms.ts`
- `menu.ts` → Merged into `cms.ts`
- `testimonial.ts` → Merged into `cms.ts`
- `testAppointment.tsx` → Merged into `test.ts`
- `testAppointmentView.tsx` → Merged into `test.ts`
- `testResult.tsx` → Merged into `test.ts`
- `localDrivingLicenceViewType.tsx` → Merged into `license.ts`

All existing imports from `@/types` should continue to work without changes.
