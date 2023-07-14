import ExpoIdentityModule from './ExpoUserIdentityModule'

export async function getUserIdentity(): Promise<string> {
  return ExpoIdentityModule.getUserIdentity()
}
