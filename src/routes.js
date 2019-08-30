import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import Main from './Pages/Main';
import User from './Pages/User';
import Details from './Pages/Details';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Details,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#49265c',
        },
        headerTintColor: '#fff',
      },
    }
  )
);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#200032" />
      <Routes />
    </>
  );
}
