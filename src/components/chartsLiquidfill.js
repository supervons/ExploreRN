import React from 'react';
import { View } from 'react-native';
import RNEChartsLiquidFill from 'react-native-echarts-liquidfill';

/**
 * @desc liquidfill demo
 * @author supervons
 * @date 2021/01/04
 */
export default function ChartsLiquidFillComponent() {
  const pieOption = {
    title: {
      text: '水球图',
      left: 'center'
    },
    series: [
      {
        type: 'liquidFill',
        data: [0.6],
        color: ['#afb11b'],
        itemStyle: {
          //普通样式
          opacity: 0.6
        },
        emphasis: {
          itemStyle: {
            //悬停样式
            opacity: 0.9
          }
        }
      }
    ]
  };

  return (
    <View style={{ height: 300, paddingTop: 25 }}>
      <RNEChartsLiquidFill height={250} onPress={tt => alert(tt)} option={pieOption} />
    </View>
  );
}
