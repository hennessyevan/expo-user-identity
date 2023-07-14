import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoUserIdentityViewProps } from './ExpoUserIdentity.types';

const NativeView: React.ComponentType<ExpoUserIdentityViewProps> =
  requireNativeViewManager('ExpoUserIdentity');

export default function ExpoUserIdentityView(props: ExpoUserIdentityViewProps) {
  return <NativeView {...props} />;
}
