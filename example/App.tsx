import { StyleSheet, Text, View } from 'react-native';

import * as ExpoUserIdentity from 'expo-user-identity';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoUserIdentity.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
