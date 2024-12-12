import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions, ColorValue} from 'react-native';
import Svg, {Defs, Path, G, Use, NumberProp} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

const WaveBackground = () => {
  const animationValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const startAnimation = (
    animatedValue: Animated.Value | Animated.ValueXY,
    duration: number,
    delay: number,
  ) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -1,
          duration: duration,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: duration,
          delay: delay,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation(animationValues[0], 7000, 0);
    startAnimation(animationValues[1], 10000, 500);
    startAnimation(animationValues[2], 13000, 1000);
    startAnimation(animationValues[3], 20000, 1500);
  }, []);

  const getTranslateStyle = (animatedValue: Animated.Value) => ({
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-90, 85],
        }),
      },
    ],
  });

  const wave = (
    animatedValue: Animated.Value,
    yOffset: NumberProp,
    fillColor: ColorValue,
  ) => (
    <Animated.View
      style={[styles.animatedWave, getTranslateStyle(animatedValue)]}>
      <Svg
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        style={styles.waves}
        width={width * 2}>
        <Defs>
          <Path
            id="wavePath"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
          />
        </Defs>
        <G>
          <Use href="#wavePath" x={48} y={yOffset} fill={fillColor} />
        </G>
      </Svg>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {wave(animationValues[0], 0, '#078FC5')}
      {wave(animationValues[1], 3, '#089DD9')}
      {wave(animationValues[2], 5, '#09ACEC')}
      {wave(animationValues[3], 7, '#13B6F6')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c7c7c',
    justifyContent: 'flex-end',
  },
  animatedWave: {
    position: 'absolute',
    width: width * 2,
    height: 200,
  },
  waves: {
    width: width,
    height: 200,
  },
});

export default WaveBackground;
