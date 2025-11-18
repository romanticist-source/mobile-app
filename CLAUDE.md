# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
React Native mobile application called "Miso Mobile App" built with Expo SDK 51. Features dual-mode entry point that can switch between Storybook (component development) and the main app using environment variables.

## Key Technologies
- **React Native 0.74.5** with new architecture enabled
- **Expo ~51.0.39** with typed routes experiment enabled
- **Expo Router ~3.5.24** - File-based routing
- **Tamagui 1.137.2** - UI framework configured at root level
- **Storybook 8.3.5** - Component isolation and development
- **TypeScript ~5.3.3** with path aliases (`@/*` maps to root)
- **Yarn 4.5.0** (modern/PnP)

## Development Commands

### Running the App
```bash
yarn start              # Start Expo dev server (default app mode)
yarn ios                # Run on iOS simulator
yarn android            # Run on Android emulator
yarn web                # Run in web browser
```

### Storybook Mode
Storybook uses `STORYBOOK_ENABLED='true'` environment variable to switch entry point in `App.tsx`:
```bash
yarn storybook          # Start in Storybook mode (web at localhost:8081)
yarn storybook:ios      # Run Storybook on iOS
yarn storybook:android  # Run Storybook on Android
yarn storybook-generate # Regenerate story index (run if stories not appearing)
```

### Building
```bash
yarn build              # Export static build via expo export
```

## Architecture

### Dual Entry Point System
The app uses a conditional entry point in `App.tsx`:
- **App mode**: Uses `expo-router/entry` → loads `app/_layout.tsx`
- **Storybook mode**: Uses `.storybook/index.ts` when `STORYBOOK_ENABLED='true'`

### Routing Structure (Expo Router)
```
app/
├── _layout.tsx              # Root layout with Tamagui + navigation providers
├── (tabs)/                  # Tab navigation group
│   ├── _layout.tsx          # Tab bar configuration
│   ├── index.tsx            # Home tab
│   └── explore.tsx          # Explore tab
└── user/                    # User-related screens (no layout, likely modal/stack)
    ├── index.tsx
    ├── schedules/
    │   ├── index.tsx
    │   └── (components)/    # Route-local components
    ├── settings/            # Settings screens (flat structure)
    │   ├── index.tsx
    │   ├── profile/index.tsx
    │   ├── privacy/index.tsx
    │   ├── notifications/index.tsx
    │   └── [other settings]/index.tsx
    ├── notifications/
    │   ├── (components)/
    │   └── (hooks)/
    └── share/
        └── (components)/
```

**Routing conventions**:
- `(folder)` = route groups (don't create path segments)
- Files in `(components)` or `(hooks)` are not routes
- Each `index.tsx` represents a route at that path level

**Route `index.tsx` Pattern**:
Route-level `index.tsx` files should serve as screen components that import and compose smaller UI components:

```typescript
// app/user/notifications/index.tsx (example)
import { AppHeader } from '@/components/layouts/AppHeader';
import { NotificationsActionsBar } from './(components)/NotificationsActionsBar';
import { NotificationsFilters } from './(components)/NotificationsFilters';
import { NotificationsList } from './(components)/NotificationsList';
import { styles } from './styles';

export function NotificationsScreen() {
  // Page-level state and logic
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Compose imported components
  return (
    <View style={styles.container}>
      <AppHeader />
      <NotificationsActionsBar />
      <NotificationsFilters currentFilter={filter} onFilterChange={setFilter} />
      <NotificationsList />
    </View>
  );
}
```

**Key principles**:
- Import and compose components from `(components)/` folder
- Keep page-level state management and data flow logic
- Delegate UI rendering to imported child components
- Extract styles to separate `styles.ts` file in the same directory
- The `index.tsx` acts as the orchestration layer for the screen

### Component Organization
```
components/
├── ui/                      # Platform-specific UI primitives
├── layouts/                 # Layout components (e.g., UserHomeLayout)
├── schedules/               # Domain-specific components (ScheduleCard, etc.)
├── [other feature folders]/ # Organized by feature/domain
├── *.tsx                    # Shared generic components (Button, ThemedText, etc.)
└── *.stories.tsx            # Storybook stories (alongside components)
```

**Component File Organization Pattern**:
Each component should be organized in its own folder with dedicated style file:

```
(components)/
├── ScheduleCard/
│   ├── ScheduleCard.tsx     # Component implementation
│   ├── styles.ts            # Component-specific styles using StyleSheet.create
│   └── ScheduleCard.stories.tsx  # Storybook stories (if applicable)
├── CategoryBadge/
│   ├── CategoryBadge.tsx
│   └── styles.ts
└── index.ts                 # Optional barrel export
```

**Benefits**:
- Keeps component logic and styles colocated
- Easier to locate and maintain component-specific styles
- Clear separation of concerns
- Simplifies component imports when using barrel exports

**Example structure for route-specific components**:
```
app/user/schedules/
├── index.tsx                      # Page component
└── (components)/                  # Route-local components
    ├── ScheduleCard/
    │   ├── ScheduleCard.tsx
    │   └── styles.ts
    └── SchedulesSearchBar/
        ├── SchedulesSearchBar.tsx
        └── styles.ts
```

### Theming & Styling

**Tamagui (Preferred)**:
- **Configuration**: Custom design tokens defined in `tamagui.config.ts`
- **Provider**: Configured in `app/_layout.tsx` with light/dark theme support
- **Components**: Use Tamagui primitives (YStack, XStack, Text, Input, Button, etc.)
- **Design Tokens**: Access via `$` prefix (e.g., `$primary`, `$background`, `$space4`)

**Design Tokens**:
```typescript
// Colors
$primary              // #FF6B6B (Primary red)
$primaryLight         // #FFE5E5 (Light red background)
$success              // #20C9A6 (Green)
$successLight         // #E0F7F7
$warning              // #F57C00 (Orange)
$error                // #FF6B6B
$info                 // #2196F3 (Blue)

// Backgrounds
$background           // White (light) / Dark (dark)
$backgroundSecondary  // #F5F5F5 (light) / Gray 800 (dark)
$backgroundOverlay    // rgba(0, 0, 0, 0.5)

// Text Colors
$color                // Primary text color
$colorSecondary       // Secondary text color
$colorTertiary        // Tertiary text color

// Other
$borderColor          // Border color (theme-aware)
$placeholderColor     // Placeholder text color
$shadowColor          // Shadow color

// Spacing (multiply of 4px)
$0, $1, $2, $3, $4, $5, $6, $8, $10, $12, $16, $20

// Radius
$0, $1, $2, $3, $4, $5, $6, $round
```

**Tamagui Component Example**:
```typescript
import { YStack, XStack, Text, Input, Button } from 'tamagui';

export function ExampleComponent() {
  return (
    <YStack padding="$4" gap="$3" backgroundColor="$background">
      <Text fontSize={18} fontWeight="600" color="$color">
        Title
      </Text>
      <Input
        placeholder="Enter text"
        backgroundColor="$backgroundSecondary"
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$2"
        padding="$3"
      />
      <Button
        backgroundColor="$primary"
        borderRadius="$2"
        paddingHorizontal="$6"
        paddingVertical="$3"
      >
        <Text color="white" fontWeight="600">Submit</Text>
      </Button>
    </YStack>
  );
}
```

**Legacy Styling (StyleSheet)**:
- Use for components not yet migrated to Tamagui
- Each component has its own `styles.ts` file
- Use React Native's `StyleSheet.create()` for performance

Example `styles.ts`:
```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});
```

**When to Use What**:
- ✅ **Use Tamagui** for new components and modals
- ✅ **Use Tamagui tokens** for consistent theming
- ⚠️ **Use StyleSheet** only for legacy components being gradually migrated
- 🔄 Gradually migrate existing components to Tamagui

### Storybook Configuration
- **Discovery**: `.storybook/main.js` finds stories in `components/**/*.stories.?(ts|tsx|js|jsx)`
- **Addons**: `addon-ondevice-controls` and `addon-ondevice-actions` for React Native
- **Story Format**: CSF3 format (object exports)
- If stories don't appear, run `yarn storybook-generate`

### Mock Data & Schemas

**Directory Structure**:
```
_schema/              # TypeScript type definitions and interfaces
├── schedule.ts       # Schedule-related types (Schedule, ScheduleCategory)
├── notification.ts   # Notification-related types (Notification, NotificationPriority, etc.)
└── share.ts          # Share screen types (Caregiver, HealthCardData)

api/__mock__/         # Mock data for development and testing
├── schedule.ts       # mockSchedules array
├── notification.ts   # mockNotifications array
└── share.ts          # mockHealthCardData, mockCaregivers
```

**Pattern**:
1. **Type definitions** go in `_schema/[domain].ts`
   - Export only TypeScript interfaces and types
   - No implementation or data
   - Use `export type` or `export interface`

2. **Mock data** goes in `api/__mock__/[domain].ts`
   - Import types from `@/_schema/[domain]`
   - Export mock data arrays/objects
   - Use `export const` for data

**Example - Adding new mock data**:

```typescript
// 1. Define types in _schema/example.ts
export interface ExampleItem {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

// 2. Create mock data in api/__mock__/example.ts
import type { ExampleItem } from '@/_schema/example';

export const mockExamples: ExampleItem[] = [
  {
    id: '1',
    name: 'Example 1',
    status: 'active',
  },
  {
    id: '2',
    name: 'Example 2',
    status: 'inactive',
  },
];

// 3. Use in components
import { mockExamples } from '@/api/__mock__/example';
import type { ExampleItem } from '@/_schema/example';

export default function ExampleScreen() {
  const items = mockExamples;
  // ...
}
```

**Available Mock Data**:
- `mockSchedules` - Daily schedule items (appointments, rest, toilet, medication, meals)
- `mockNotifications` - System notifications with priority levels
- `mockHealthCardData` - User health information and medical details
- `mockCaregivers` - List of caregivers and emergency contacts

**Important Notes**:
- NEVER define mock data inline in screen components
- Always separate types (`_schema/`) from mock data (`api/__mock__/`)
- Use `@/` path alias for imports: `@/_schema/...` and `@/api/__mock__/...`
- Mock data should be realistic and representative of actual use cases

## Important Patterns

### Adding New Screens
1. Create `app/[path]/index.tsx` for the route
2. Route-specific components go in `app/[path]/(components)/`
3. Shared components go in `components/[feature]/`
4. Update navigation if adding to tab bar in `app/(tabs)/_layout.tsx`

### Adding Components
1. Create a folder named after your component in the appropriate location:
   - Route-specific: `app/[route]/(components)/ComponentName/`
   - Shared components: `components/[feature]/ComponentName/` or `components/ui/ComponentName/`
2. Inside the component folder, create:
   - `ComponentName.tsx` - Component implementation
   - `styles.ts` - Component-specific styles using `StyleSheet.create`
   - `ComponentName.stories.tsx` - Storybook stories (optional)
3. Export from `index.ts` if creating a feature module
4. Use `@/` path alias for imports from outside the component folder

### Platform-Specific Code
- Use `.ios.tsx` / `.android.tsx` / `.web.tsx` extensions
- Example: `IconSymbol.ios.tsx` and `IconSymbol.tsx` (default)

## Dependencies Notes
- All Expo dependencies aligned to SDK 51 (check compatibility with `npx expo-doctor`)
- Uses `react-native-reanimated` and `react-native-gesture-handler` for animations
- Bottom sheet support via `@gorhom/bottom-sheet`
- Notifications via `expo-notifications`

## Common Issues

### Storybook Not Showing Stories
Run `yarn storybook-generate` to rebuild the story index.

### Metro Bundler Issues
Clear cache and restart: `yarn start --clear`

### TypeScript Path Resolution
Ensure `@/` paths work by checking `tsconfig.json` includes `"baseUrl": "."` and proper paths config.
