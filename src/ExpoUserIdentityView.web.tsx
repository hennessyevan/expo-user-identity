import * as React from 'react';

import { ExpoUserIdentityViewProps } from './ExpoUserIdentity.types';

export default function ExpoUserIdentityView(props: ExpoUserIdentityViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
