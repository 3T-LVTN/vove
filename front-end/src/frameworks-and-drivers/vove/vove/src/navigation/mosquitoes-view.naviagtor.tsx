import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenSize} from '@front-end/shared/utils';
import Home from "../screens/home/home";
import SignupSucceed from "../screens/signup-succeed/signup-succeed";
import PlaceDetail from "../screens/place-detail/place-detail";
import TrackingSummary from "../screens/tracking-summary/tracking-summary";
import TrackingList from "../screens/tracking-list/tracking-list";
import NewTrackingPlace from "../screens/new-tracking-place/new-tracking-place";
import EditTrackingPlace from "../screens/edit-tracking-place/edit-tracking-place";
import SearchPlace from "../screens/search-place/search-place";

const Stack = createStackNavigator();

const backButtonImg = () => {
  return (
    <Image
      source={require("../images/back-button.png")}
      style={{
        height: ScreenSize.width * 0.1,
        width: ScreenSize.width * 0.1,
        marginLeft: ScreenSize.width * 0.06,
      }}
    />
  );
};

let center = "center" as "center" | "left" | undefined;


const HeaderStyle = {
  headerBackImage: backButtonImg,
  headerStyle: {
    backgroundColor: "white",
    height: ScreenSize.height * 0.1,
  },
  headerTitleStyle: {fontSize: ScreenSize.width * 0.05},
  headerTintColor: "black",
  headerBackTitleVisible: false,
  headerTitleAlign: center,
};


export const MosquitoesViewStack = () => {
  return (
    <Stack.Navigator screenOptions={HeaderStyle} initialRouteName="MosquitoesHeatmap">
      <Stack.Screen name="MosquitoesHeatmap" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ headerShown: false }}/>
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} options={{ title: "E-town Central" }}/>
      <Stack.Screen name="TrackingSummary" component={TrackingSummary} options={{ title: "Tracking Summary" }}/>
      <Stack.Screen name="TrackingList" component={TrackingList} options={{ title: "All Tracking Places" }}/>
      <Stack.Screen name="NewTrackingPlace" component={NewTrackingPlace}/>
      <Stack.Screen name="EditTrackingPlace" component={EditTrackingPlace}/>
    </Stack.Navigator>
  );
};
