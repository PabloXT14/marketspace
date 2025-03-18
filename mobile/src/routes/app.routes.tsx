import { Platform, Pressable } from 'react-native'
import {
  createBottomTabNavigator,
  type BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { House, Tag } from 'phosphor-react-native'

import { Home } from '@/screens/home'
import { ProductDetails } from '@/screens/product-details'
import { MyProducts } from '@/screens/my-products'
import { CreateProduct } from '@/screens/create-product'
import { ProductPreview } from '@/screens/product-preview'
import { EditProduct } from '@/screens/edit-product'

import { colors } from '@/styles/colors'
import { SignOutAlert } from '@/components/sign-out-alert'
import { View } from 'react-native'

export type AppRoutesProps = {
  home: undefined
  productDetails: {
    productId: string
  }
  myProducts: undefined
  createProduct: undefined
  productPreview: {
    action: 'create' | 'update'
  }
  editProduct: undefined
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
        name="myProducts"
        component={MyProducts}
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
        name="productDetails"
        component={ProductDetails}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="editProduct"
        component={EditProduct}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="createProduct"
        component={CreateProduct}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="productPreview"
        component={ProductPreview}
        options={{
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />
    </Navigator>
  )
}
