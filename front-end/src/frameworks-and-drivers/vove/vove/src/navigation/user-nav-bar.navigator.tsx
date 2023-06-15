import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenSize } from '@front-end/shared/utils';
import { MosquitoesViewStack } from './mosquitoes-view.naviagtor';
import { InquiryStack } from './inquiry.navigator';
import { UserProfile, UserNotification } from '../screens';

const size = ScreenSize.width * 0.08;
const selectedLabel = '_____';
const styles = {
  marginRight: -ScreenSize.width * 0.025,
  marginTop: -ScreenSize.height * 0.012,
  marginLeft: -ScreenSize.width * 0.025,
};

const Tab = createMaterialBottomTabNavigator();

export const UserNavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="UserHome"
      activeColor="#15AABF"
      inactiveColor="#979797"
      screenOptions={{ tabBarLabel: selectedLabel }}
      barStyle={{
        backgroundColor: 'white',
        height: ScreenSize.height * 0.12,
        paddingTop: ScreenSize.height * 0.03,
      }}
    >
      <Tab.Screen
        name="UserHome"
        component={MosquitoesViewStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
              style={styles}
            />
          ),
        }}
      />
      <Tab.Screen
        name="InquiryStack"
        component={InquiryStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="comment-question-outline"
              color={color}
              size={size}
              style={styles}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserNotification"
        component={UserNotification}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={size}
              style={styles}
            />
          ),
        }}
      />

      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
              style={styles}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
