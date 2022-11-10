import React, { createContext, useContext, useState } from 'react'
import { StyleSheet, Button, Text, View, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export const AuthContext = createContext({
  userName: '',
  setName: () => {},
  passWord: '',
  setpassWord: () => {},
  wrongPassword: false,
  setwrongPassword: () => {},
})

const Stack = createStackNavigator()

const SignUpScreen = () => {
  const nav = useNavigation()

  const { userName, passWord, setName, setpassWord } = useContext(AuthContext)

  return (
    <View style={styles.layout}>
      <Text> {userName} </Text>
      <Text> {passWord} </Text>

      <TextInput onChangeText={setName} style={styles.input} />
      <TextInput onChangeText={setpassWord} style={styles.input} />
      <Button
        title="SignUp"
        onPress={() => {
          nav.navigate('SignInScreen')
        }}
      />
    </View>
  )
}

const SignInScreen = () => {
  const {
    userName,
    passWord,
    setName,
    setpassWord,
    wrongPassword,
    setwrongPassword,
  } = useContext(AuthContext)

  const [enterName, setenterName] = useState('')
  const [enterPw, setenterPW] = useState('')

  const nav = useNavigation()
  return (
    <View style={styles.layout}>
      <Text> {enterPw} </Text>
      <Text> {passWord} </Text>
      <Text>{wrongPassword ? <Text> true </Text> : <Text> false </Text>}</Text>

      <TextInput onChangeText={setenterName} style={styles.input} />
      <TextInput onChangeText={setenterPW} style={styles.input} />

      <Button
        title="SignIn"
        onPress={() => {
          enterPw === passWord
            ? nav.navigate('MainNavigator')
            : nav.navigate('Tryagain')
        }}
      />
    </View>
  )
}

const Tryagain = () => {
  const {
    userName,
    passWord,
    setName,
    setpassWord,
    wrongPassword,
    setwrongPassword,
  } = useContext(AuthContext)

  const [enterName, setenterName] = useState('')
  const [enterPw, setenterPW] = useState('')

  const nav = useNavigation()
  return (
    <View style={styles.layout}>
      <Text> {enterPw} </Text>
      <Text> {passWord} </Text>
      <Text>{wrongPassword ? <Text> true </Text> : <Text> false </Text>}</Text>

      <TextInput onChangeText={setenterName} style={styles.input} />
      <TextInput onChangeText={setenterPW} style={styles.input} />

      <Text> "you've entered the wrong password" </Text>

      <Button
        title="TryAgain"
        onPress={() => {
          enterPw === passWord
            ? nav.navigate('MainNavigator')
            : nav.navigate('Tryagain')
        }}
      />
    </View>
  )
}

// --- Main screens ---
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
  )
}

const SignIn = () => {
  // use the variable
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="Tryagain" component={Tryagain} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  )
}

// --- Onboarding screens ---
const HomeScreen = () => (
  <View style={styles.layout}>
    <Text>mainscreen</Text>
  </View>
)

const AccountScreen = () => (
  <View style={styles.layout}>
    <Text>accountscreen</Text>
  </View>
)

// --- App ---

const App = () => {
  const [userName, setName] = useState()
  const [passWord, setpassWord] = useState()
  const [wrongPassword, setwrongPassword] = useState()

  return (
    <AuthContext.Provider
      value={{
        userName,
        setName,
        passWord,
        setpassWord,
        wrongPassword,
        setwrongPassword,
      }}
    >
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 20,
    margin: 6,
    borderWidth: 1,
    padding: 5,
  },
})
