import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { customSize, Color } from '@front-end/shared/utils';
import { ProgressBar } from 'react-native-paper';

export interface StepBarProps {
  readonly step: number;
}

export const StepBar = (props: StepBarProps) => {
  const [blinkBar, setBlinkBar] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkBar((blinkBar) => !blinkBar);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { step } = props;
  return (
    <View style={{ marginHorizontal: customSize(24), flexDirection: 'row' }}>
      <View style={{ width: step === 1 ? '25%' : step === 2 ? '50%' : '75%' }}>
        <ProgressBar
          progress={1}
          color={Color.primary_100}
          style={{ opacity: blinkBar ? 1 : 0.75 }}
        ></ProgressBar>
      </View>
      <View style={{ width: step === 1 ? '75%' : step === 2 ? '50%' : '25%' }}>
        <ProgressBar progress={1} color={Color.primary_20}></ProgressBar>
      </View>
    </View>
  );
};
