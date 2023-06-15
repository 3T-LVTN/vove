import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TrackingList, Home, PlaceDetail } from '../screens';
import { HeaderStyle } from './header.style';

export const MosquitoesViewStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={HeaderStyle as any}
      initialRouteName="MosquitoesHeatmap"
    >
      <Stack.Screen
        name="MosquitoesHeatmap"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        options={{ title: 'Chi tiết địa điểm' }}
      />
      <Stack.Screen
        name="TrackingList"
        component={TrackingList}
        options={{ title: 'Danh sách theo dõi' }}
      />
    </Stack.Navigator>
  );
};
