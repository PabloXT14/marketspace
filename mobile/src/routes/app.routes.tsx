import { Platform, Pressable, Text } from 'react-native'
import {
  createBottomTabNavigator,
  type BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { House, Tag } from 'phosphor-react-native'

import { Home } from '@/screens/home'
import { AdDetails } from '@/screens/ad-details'
import { MyAds } from '@/screens/my-ads'
import { CreateAd } from '@/screens/create-ad'
import { AdPreview } from '@/screens/ad-preview'
import { EditAd } from '@/screens/edit-ad'

import { colors } from '@/styles/colors'
import { SignOutAlert } from '@/components/sign-out-alert'
import { View } from 'react-native'

import type { CreateAdFormProps } from '@/components/screens/create-ad/form'

export type AppRoutesProps = {
  home: undefined
  adDetails: {
    adId: string
  }
  myAds: undefined
  createAd: undefined
  adPreview: {
    data: CreateAdFormProps
    action: 'create' | 'update'
  }
  editAd: undefined
  signOut: undefined
}

export type AppRoutesNavigationProps = BottomTabNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

export function AppRoutes() {
  const iconSize = 24

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[600],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 72,
          paddingTop: 20,
          paddingBottom: 56,
        },
        animation: 'shift',
        tabBarHideOnKeyboard: true,
      }}
      backBehavior="history"
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              size={iconSize}
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
          tabBarHideOnKeyboard: true,
          tabBarButton: props => (
            <Pressable
              {...props}
              android_ripple={{ borderless: false, color: 'transparent' }}
            />
          ),
        }}
      />

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag
              size={iconSize}
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
          tabBarButton: props => (
            <Pressable
              {...props}
              android_ripple={{ borderless: false, color: 'transparent' }}
            />
          ),
        }}
      />

      <Screen
        name="signOut"
        component={Home} // Nunca será exibido, serve apenas para cumprir a tipagem
        options={{
          tabBarButton: () => (
            // paddingTop necessário devido a um bug no react-native-bottom-tabs
            <View style={{ paddingTop: 18 }}>
              <SignOutAlert />
            </View>
          ),
        }}
      />

      <Screen
        name="adDetails"
        component={AdDetails}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="createAd"
        component={CreateAd}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="adPreview"
        component={AdPreview}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="editAd"
        component={EditAd}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />
    </Navigator>
  )
}
