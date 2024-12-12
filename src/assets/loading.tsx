import React, {useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import Svg, {RadialGradient, Stop, Circle} from 'react-native-svg';
import {ImageProps} from '../shared/interfaces';

function LoadingSvg({width, height}: {width: number; height: number}) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        transform: [{rotate}],
        width: width ? width : 24,
        height: height ? height : 24,
      }}>
      <Svg
        viewBox="0 0 200 200"
        width={width ? width : 24}
        height={height ? height : 24}>
        <RadialGradient
          id="a"
          cx={0.66}
          fx={0.66}
          cy={0.3125}
          fy={0.3125}
          gradientTransform="scale(1.5)">
          <Stop offset={0} stopColor="#FFF" />
          <Stop offset={0.3} stopColor="#FFF" stopOpacity={0.9} />
          <Stop offset={0.6} stopColor="#FFF" stopOpacity={0.6} />
          <Stop offset={0.8} stopColor="#FFF" stopOpacity={0.3} />
          <Stop offset={1} stopColor="#FFF" stopOpacity={0} />
        </RadialGradient>
        <Circle
          fill="none"
          stroke="url(#a)"
          strokeWidth={15}
          strokeLinecap="round"
          strokeDasharray="200 1000"
          cx={100}
          cy={100}
          r={70}
        />
        <Circle
          fill="none"
          opacity={0.2}
          stroke="#FFF"
          strokeWidth={15}
          strokeLinecap="round"
          cx={100}
          cy={100}
          r={70}
        />
      </Svg>
    </Animated.View>
  );
}

export default LoadingSvg;
