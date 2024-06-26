import React, {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import HomeStackNavigator from './HomeStackNavigator'
import SignupScreen from '../screens/SingupScreen'
import LoginScreen from '../screens/LoginScreen'
import AuthStackNavigator from './AuthStackNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { getSession } from '../persistence'
import { setUser } from '../features/User/userSlice'

const Navigator = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth.value)

  useEffect(()=> {
    (async ()=> {
      try {
        const response = await getSession()
        if (response.rows._array.length) {
          const user = response.rows._array[0]
          dispatch(setUser({
            email: user.email,
            localId: user.localId,
            idToken: user.token
          }))
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while loading session.");
      }
    })()
  }, [])
  
  return (
    <NavigationContainer>
        {user ? <BottomTabNavigator/> : <AuthStackNavigator/>}
    </NavigationContainer>
  )
}

export default Navigator
