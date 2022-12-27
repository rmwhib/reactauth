import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react'
import { StyleSheet, Button, Text, View, TextInput } from 'react-native'
import {
  CurrentRenderContext,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//mapdirections
import MapViewDirections from 'react-native-maps-directions'
//const origin = { latitude: 51.67599, longitude: -1.7873 }
const destination = { latitude: 51.7075, longitude: -1.7851 }
const GOOGLE_MAPS_APIKEY = ''

//findmaplocation
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import MapView, { Marker } from 'react-native-maps'

const Tab = createBottomTabNavigator()

export const AuthContext = createContext({
  userName: '',
  setName: () => {},
  passWord: '',
  setpassWord: () => {},
  wrongPassword: false,
  setwrongPassword: () => {},
  origin: {},
  setOrigin: (lat, lng) => {
    latitude: lat
    longitude: lng
  },
  latitude: '',
  setlatitude: () => {},
  longitude: '',
  setlongitude: () => {},
})

const Stack = createStackNavigator()

const SignUpScreen = () => {
  const nav = useNavigation()

  const { userName, passWord, setName, setpassWord } = useContext(AuthContext)

  return (
    <View style={styles.layout}>
      <Text> Enter UserName </Text>
      <TextInput onChangeText={setName} style={styles.input} />
      <Text> Enter Password </Text>
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="Tryagain" component={Tryagain} /> */}
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  )
}

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
  const [enterName, setenterName] = useState('')
  const [enterPw, setenterPW] = useState('')
  const [origin, setOrigin] = useState({ latitude: 0, longitude: 0 })
  const [latitude, setlatitude] = useState()
  const [longitude, setlongitude] = useState()

  return (
    <AuthContext.Provider
      value={{
        userName,
        setName,
        origin,
        setOrigin,
        wrongPassword,
        setwrongPassword,
        enterName,
        setenterName,
        enterPw,
        setenterPW,
        latitude,
        setlatitude,
        longitude,
        setlongitude,
      }}
    >
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

// --- Onboarding screens ---
const HomeScreen = () => {
  const {
    origin,
    setOrigin,
    latitude,
    longitude,
    setlatitude,
    setlongitude,
  } = useContext(AuthContext)

  const mapRef = useRef()

  console.log('this is' + latitude)

  useEffect(() => {
    console.log('effect')
    if (mapRef.current) {
      console.log(latitude)
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      })
    }
  })

  return (
    <View style={styles.mapContainer}>
      <GooglePlacesAutocomplete
        styles={{
          textInput: { flex: 0, width: 400 },
        }}
        placeholder="Search"
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en', // language of the results
        }}
        fetchDetails={true}
        onPress={(data, details) => {
          setOrigin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          })
          setlatitude(() => details.geometry.location.lat)
          setlongitude(() => details.geometry.location.lng)
          //console.log(details.geometry.location.lat)
        }}
        onFail={(error) => console.error('fucked it')}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />

      <Text style={styles.text}>mainscreen</Text>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />

        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="origin"
          description={origin.description}
          identifier="origin"
        />

        <Marker
          coordinate={{
            latitude: 51.69926700000001,
            longitude: -1.737728,
          }}
          title="destination"
          description={destination.description}
          identifier="destination"
        />
      </MapView>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    flex: 1,
  },
  map: {
    flex: 2,
    width: 400,
    height: 400,
  },
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
    height: 50,
    width: 250,
    margin: 6,
    borderWidth: 1,
    padding: 5,
  },
})
