import { ExpoConfig } from 'expo/config'
import {
  ConfigPlugin,
  withEntitlementsPlist,
  withInfoPlist,
} from 'expo/config-plugins'

type IOSProps = {
  /**
   * The name of the CloudKit container to use.
   *
   * @default `iCloud.${config.ios.bundleIdentifier}`
   * @see https://developer.apple.com/documentation/cloudkit/ckcontainer/1399193-init
   */
  cloudkitContainerIdentifier?: string
}

const withUserIdentity: ConfigPlugin<IOSProps> = (
  config,
  { cloudkitContainerIdentifier } = {}
) => {
  config = withInfoPlist(config, (config) => {
    if (!config.ios?.bundleIdentifier) {
      return config
    }

    cloudkitContainerIdentifier ||= `iCloud.${config.ios.bundleIdentifier}`
    config.modResults['CK_CONTAINER_IDENTIFIER'] = cloudkitContainerIdentifier
    return config
  })

  config = withEntitlementsPlist(config, (config) => {
    config.modResults = setICloudEntitlements(
      config,
      { cloudkitContainerIdentifier },
      config.modResults
    )
    return config
  })

  return config
}

export function setICloudEntitlements(
  config: Pick<ExpoConfig, 'ios'>,
  { cloudkitContainerIdentifier }: IOSProps,
  {
    'com.apple.developer.icloud-container-environment': _env,
    ...entitlements
  }: Record<string, any>
): Record<string, any> {
  if (!config.ios?.bundleIdentifier) {
    throw new Error(
      `Cannot set iCloud entitlements because \`bundleIdentifier\` is missing from the \`app.json\` file.`
    )
  }

  cloudkitContainerIdentifier ||= `iCloud.${config.ios.bundleIdentifier}`

  // entitlements['com.apple.developer.icloud-container-environment'] = _env
  entitlements['com.apple.developer.icloud-container-identifiers'] = [
    cloudkitContainerIdentifier,
  ]
  // entitlements['com.apple.developer.ubiquity-container-identifiers'] = [
  //   cloudkitContainerIdentifier,
  // ]
  // entitlements[
  //   'com.apple.developer.ubiquity-kvstore-identifier'
  // ] = `$(TeamIdentifierPrefix)${config.ios.bundleIdentifier}`

  entitlements['com.apple.developer.icloud-services'] = ['CloudKit']

  return entitlements
}

export default withUserIdentity