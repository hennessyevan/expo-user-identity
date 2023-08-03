import { Platform } from 'expo-modules-core'
import ExpoIdentityModule from './ExpoUserIdentityModule'

export async function getUserIdentity(
  message?: string,
  accountType?: string
): Promise<string> {
  if (Platform.OS === 'android') {
    accountType ||= 'com.google'
    return ExpoIdentityModule.getUserIdentity(message, accountType)
  } else if (Platform.OS === 'ios') {
    return ExpoIdentityModule.getUserIdentity()
  }

  return ExpoIdentityModule.getUserIdentity()
}
