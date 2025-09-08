# Claude Code Project Information

## Project Overview
This is a React Native mobile application called "Miso Mobile App" with Storybook integration for component development and documentation.

## Key Technologies
- **React Native 0.74.5** - Cross-platform mobile development
- **Expo ~51.0.39** - Development platform with managed workflow
- **Expo Router ~3.5.24** - File-based routing system
- **Storybook 8.3.5** - Component development environment
- **TypeScript ~5.3.3** - Static type checking
- **Yarn 4.5.0** - Package manager

## Development Commands

### App Development
```bash
yarn start          # Start Expo dev server
yarn ios           # Run on iOS simulator
yarn android       # Run on Android emulator  
yarn web           # Run in browser
```

### Storybook
```bash
yarn storybook         # Start Storybook (web at localhost:8081)
yarn storybook:ios     # Run Storybook on iOS
yarn storybook:android # Run Storybook on Android
```

### Utilities  
```bash
yarn storybook-generate # Generate story index
```

## Project Structure
```
├── app/                    # App screens (Expo Router)
├── components/             # Reusable components
│   ├── ui/                # UI component library
│   └── *.stories.jsx      # Storybook stories
├── assets/                # Static assets
├── constants/             # App constants
├── hooks/                 # Custom React hooks
├── .storybook/            # Storybook config
└── scripts/               # Build/utility scripts
```

## Storybook Setup
- **Config**: `.storybook/main.js` - discovers stories in `components/**/*.stories.?(ts|tsx|js|jsx)`
- **Addons**: ondevice-controls, ondevice-actions for React Native
- **Stories**: Located alongside components with `.stories.jsx` extension

## Development Notes
- Uses Expo SDK 51 with new architecture enabled
- Storybook is configured for React Native with on-device viewing
- TypeScript configuration optimized for React Native development
- Yarn modern (v4) with PnP enabled

## Common Tasks

### Adding New Components
1. Create component in `components/` directory
2. Add corresponding `.stories.jsx` file
3. Follow existing patterns for exports and story structure

### Testing Components
- Use Storybook for isolated component testing
- Run `yarn storybook` to start development environment
- Stories automatically reload on file changes

### Building
- Expo handles all build processes
- Use `expo build` commands for production builds
- Web builds use Metro bundler with static output

## Dependencies Status
All Expo SDK dependencies are aligned to version 51.0.x for compatibility.