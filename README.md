# Expo User Identity

This Expo module provides an async function for Expo apps running on both iOS and Android. It returns an iCloud user identity on iOS and an email on Android. It automatically sets appropriate entitlements for iOS.

## Installation

To install this module, run the following command:

```bash
npx expo install expo-user-identity
```

## Configuration
This module also includes a plugin configuration. For iCloud, the default container environment is set to "Development" but when you push your iCloud container to "Production", you need to set that in your plugins config:
```json
    "plugins": [
      [
        "expo-user-identity",
        {          
          "iCloudContainerEnvironment": "Production"
        }
      ]
    ]
```

## Usage

This module only has one method, `getUserIdentity()`, which returns a promise that resolves to a string.

```jsx
import { getUserIdentity } from 'expo-user-identity'
```

## Roadmap

- [x] iOS support
- [x] Android support
- [ ] Web support (if possible, likely not)
