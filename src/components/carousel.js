/**
 * Created by supervons on 2020/04/15.
 * 使用 Hooks 重写首页轮播组件
 * use Hooks rewrite homepage carousel component
 */
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { Text, View } from 'react-native';
import commonStyles from '../styles/commonStyles';

export default function CarouselComponent() {
  const [introduction] = useState({
    title_1: '这是首页swiper',
    title_2: 'react-native棒棒',
    title_3: 'Hermes引擎快快快'
  });
  return (
    <View style={{ height: 150 }}>
      <Swiper showsButtons={true}>
        <View style={[commonStyles.slide1, { height: 150 }]}>
          <Text style={commonStyles.text}>{introduction.title_1}</Text>
        </View>
        <View style={[commonStyles.slide2, { height: 150 }]}>
          <Text style={commonStyles.text}>{introduction.title_2}</Text>
        </View>
        <View style={[commonStyles.slide3, { height: 150 }]}>
          <Text style={commonStyles.text}>{introduction.title_3}</Text>
        </View>
      </Swiper>
    </View>
  );
}
