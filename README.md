# Expo iCloud Identity

This Expo module provides an async function for Expo apps running on both iOS and Android. It returns an iCloud user identity on iOS and an email on Android. It automatically sets appropriate entitlements for iOS.

## Installation

To install this module, run the following command:

```bash
npx expo install expo-user-identity
```

## Usage

This module only has one method, `getUserIdentity()`, which returns a promise that resolves to a string. On iOS, this string is the iCloud user identity. On Android, this string is the user's email address.

```jsx
import { getUserIdentity } from 'expo-user-identity'
```

## Roadmap

- [x] iOS support
- [ ] Android support
- [ ] Web support (if possible, likely not)
