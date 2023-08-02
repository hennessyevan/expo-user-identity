import { StyleSheet, Text, View } from 'react-native'

import { getUserIdentity } from 'expo-user-identity'
import { useEffect, useState } from 'react'

export default function App() {
  const [userIdentity, setUserIdentity] = useState<string>()

  useEffect(() => {
    ;(async () => {
      getUserIdentity().then((userIdentity) => {
        setUserIdentity(userIdentity)
      })
    })()
  }, [])

  return (
    <View style={styles.container}>
      {userIdentity ? <Text>{userIdentity}</Text> : <Text>loading</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
