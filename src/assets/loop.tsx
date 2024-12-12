import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ImageProps} from '../shared/interfaces';

function LoopSvg(props?: ImageProps) {
  return (
    <Svg
      width={props?.width ? props?.width : '800px'}
      height={props?.height ? props?.height : '800px'}
      viewBox="0 0 20 20"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.475 4.475a5.5 5.5 0 107.778 7.778 5.5 5.5 0 00-7.778-7.778zm6.364 6.364a3.5 3.5 0 11-4.95-4.95 3.5 3.5 0 014.95 4.95z"
        fill="#377CC8"
      />
      <Path
        d="M11.192 13.314a1.5 1.5 0 112.122-2.122l3.535 3.536a1.5 1.5 0 11-2.121 2.121l-3.536-3.535z"
        fill="#377CC8"
      />
    </Svg>
  );
}

export default LoopSvg;
