import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {ScreenSize} from "@front-end/shared/utils";
import Home from "../screens/home/home";
import {MosquitoesViewStack} from "./mosquitoes-view.naviagtor";


const size = ScreenSize.width * 0.1;
const selectedLabel = "_____";
const styles = {
  marginRight: -ScreenSize.width * 0.025,
  marginTop: -ScreenSize.height * 0.015,
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
        backgroundColor: "white",
        height: ScreenSize.height * 0.15,
        paddingVertical: ScreenSize.height * 0.04,
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
        name="UserNotification"
        component={Home}
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
        name="UserInquiry"
        component={Home}
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
        name="UserProfile"
        component={Home}
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
