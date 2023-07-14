import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoUserIdentity.web.ts
// and on native platforms to ExpoUserIdentity.ts
import ExpoUserIdentityModule from './ExpoUserIdentityModule';
import ExpoUserIdentityView from './ExpoUserIdentityView';
import { ChangeEventPayload, ExpoUserIdentityViewProps } from './ExpoUserIdentity.types';

// Get the native constant value.
export const PI = ExpoUserIdentityModule.PI;

export function hello(): string {
  return ExpoUserIdentityModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoUserIdentityModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoUserIdentityModule ?? NativeModulesProxy.ExpoUserIdentity);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoUserIdentityView, ExpoUserIdentityViewProps, ChangeEventPayload };
