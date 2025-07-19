# PrivyCode Mobile 📱

A React Native mobile application for generating secure, time-limited links to share private code repositories. Built with modern React Native technologies and a focus on developer experience.

## 🚀 Features

- **Secure Link Generation**: Create time-limited, view-restricted links to share private repositories
- **Real-time Analytics**: Track link views and access patterns
- **GitHub Integration**: Seamless authentication and repository access
- **Modern UI/UX**: Beautiful, responsive design with dark/light mode support
- **Cross-platform**: Coming soon!

## 🛠 Tech Stack

### Core Technologies

- **React Native** (0.79.5) - Cross-platform mobile development
- **Expo SDK 53** - Development platform and tooling
- **TypeScript** - Type-safe JavaScript development
- **React 19** - Latest React with concurrent features

### Navigation & State Management

- **React Navigation 7** - Navigation library
- **TanStack Query** - Server state management and caching
- **React Context** - Client state management

### Styling & UI

- **NativeWind** - Tailwind CSS for React Native
- **Tailwind CSS** - Utility-first CSS framework
- **React Native Reanimated** - Smooth animations

### Authentication & Security

- **Expo Secure Store** - Secure token storage
- **Expo Web Browser** - OAuth authentication flow
- **GitHub OAuth** - Social authentication

### Development Tools

- **Expo CLI** - Development and build tools
- **Babel** - JavaScript compiler
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**

### For iOS Development

- **Xcode** (latest version)
- **iOS Simulator** or physical iOS device
- **CocoaPods** (`sudo gem install cocoapods`)

### For Android Development

- **Android Studio**
- **Android SDK**
- **Android Emulator** or physical Android device

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/24samj/privycode-mobile.git
cd privycode-mobile
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# API Configuration
EXPO_PUBLIC_API_BASE_URL=https://your-api-domain.com
EXPO_PUBLIC_REDIRECT_URI=privycode://auth/callback

# Expo Configuration
EXPO_PUBLIC_PROJECT_ID=your-expo-project-id
```

### 4. Start the Development Server

```bash
# Start Expo development server
npm start
# or
yarn start
```

### 5. Run on Device/Simulator

```bash
# iOS
npm run ios
# or
yarn ios

# Android
npm run android
# or
yarn android
```

## 📱 Project Structure

```
privycode-mobile/
├── app/                          # Main application code
│   ├── components/               # Reusable UI components
│   │   ├── Analytics/           # Analytics-specific components
│   │   ├── GenerateLink/        # Link generation components
│   │   ├── Login/               # Authentication components
│   │   └── index.ts             # Component exports
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   ├── ToastContext.tsx     # Toast notifications
│   │   └── index.ts             # Context exports
│   ├── hooks/                   # Custom React hooks
│   ├── navigation/              # Navigation configuration
│   └── screens/                 # Screen components
├── src/                         # Source utilities and types
│   ├── api/                     # API client and endpoints
│   ├── constants/               # App constants and themes
│   ├── hooks/                   # Shared hooks
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Utility functions
├── assets/                      # Static assets
├── android/                     # Android-specific code
├── ios/                         # iOS-specific code
└── docs/                        # Documentation
```

## 🎨 Development Guidelines

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **functional components** with hooks
- Implement **proper error handling**
- Write **descriptive commit messages**

### Component Structure

```typescript
// Example component structure
import React from 'react';
import { View, Text } from 'react-native';

interface ComponentProps {
  title: string;
  onPress?: () => void;
}

export const ExampleComponent: React.FC<ComponentProps> = ({
  title,
  onPress
}) => {
  return (
    <View className="p-4 bg-white rounded-lg">
      <Text className="text-lg font-semibold">{title}</Text>
    </View>
  );
};
```

### Styling Guidelines

- Use **NativeWind** (Tailwind CSS) for styling
- Follow **mobile-first** design principles
- Implement **dark/light mode** support
- Use **semantic color names** from the theme

### State Management

- Use **React Context** for global state
- Use **TanStack Query** for server state
- Use **local state** for component-specific state
- Implement **proper loading states**

## 📦 Building for Production

### iOS Build

```bash
# Build for iOS
eas build --platform ios

# Build for iOS Simulator
eas build --platform ios --profile development
```

### Android Build

```bash
# Build for Android
eas build --platform android

# Build for Android (APK)
eas build --platform android --profile preview
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork the Repository

Fork the repository to your GitHub account.

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes

- Write clean, well-documented code
- Update documentation as needed
- Follow the existing code style

### 4. Test Your Changes

```bash
# Run the development server
npm start

# Test on different platforms
npm run ios
npm run android
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 6. Push and Create a Pull Request

```bash
git push origin feature/your-feature-name
```

### 7. Submit a Pull Request

- Provide a clear description of your changes
- Include screenshots for UI changes
- Reference any related issues

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## 🐛 Bug Reports

When reporting bugs, please include:

- **Device/OS**: iOS/Android version
- **App Version**: Current app version
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable

## 🙏 Acknowledgments

- **Expo** team for the amazing development platform
- **React Navigation** team for navigation solutions
- **TanStack** team for React Query
- **Tailwind CSS** team for the utility-first approach

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/24samj/privycode-mobile/issues)
- **Discussions**: [GitHub Discussions](https://github.com/24samj/privycode-mobile/discussions)
- **Email**: hi@sumit.codes
