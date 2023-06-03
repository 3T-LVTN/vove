import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export interface NewTrackingPlaceProps {
  navigation: any;
}

export function NewTrackingPlace(props: NewTrackingPlaceProps) {
  return (
    <View style={styles.center}>
      <Text>New tracking place</Text>
      <Button title="Comfirm" onPress={() => props.navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default NewTrackingPlace;
