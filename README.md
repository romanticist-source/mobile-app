# Miso Mobile App

React Native mobile application with Storybook integration for component development and testing.

## 🚀 Getting Started

1.  **Install dependencies**

    ```shell
    yarn install
    ```

2.  **Run the app**

    ```shell
    # Start the development server
    yarn start

    # Run on specific platform
    yarn ios
    yarn android
    yarn web
    ```

3.  **Storybook Development**

    ```shell
    # Start Storybook
    yarn storybook

    # Run Storybook on specific platform
    yarn storybook:ios
    yarn storybook:android
    ```

    Access Storybook at `http://localhost:8081` when running in web mode.

## 📱 Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **Expo Router** - File-based routing
- **Storybook** - Component development and testing
- **TypeScript** - Type safety
- **Yarn** - Package management

## 🧩 Project Structure

```
├── app/                    # App screens and routing
├── components/             # Reusable components
│   ├── ui/                # UI components
│   └── *.stories.jsx      # Storybook stories
├── assets/                # Images, fonts, etc.
├── constants/             # App constants
├── hooks/                 # Custom hooks
└── .storybook/            # Storybook configuration
```

## 🔧 Available Scripts

- `yarn start` - Start the Expo development server
- `yarn ios` - Run on iOS simulator
- `yarn android` - Run on Android emulator
- `yarn web` - Run in web browser
- `yarn storybook` - Start Storybook
- `yarn storybook:ios` - Run Storybook on iOS
- `yarn storybook:android` - Run Storybook on Android
- `yarn storybook-generate` - Generate Storybook stories index

## 📝 Development

### Creating Components

1. Create your component in the `components/` directory
2. Add a corresponding `.stories.jsx` file for Storybook
3. Export your component and stories following existing patterns

### Using Storybook

Storybook is configured to automatically discover stories in the `components/` directory with the pattern `**/*.stories.?(ts|tsx|js|jsx)`.

To create a new story:

```javascript
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
};

export default meta;

export const Default = {
  args: {
    // component props
  },
};
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add/update Storybook stories for new components
4. Test on multiple platforms
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.