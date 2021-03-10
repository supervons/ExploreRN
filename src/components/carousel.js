import React, { useState } from "react";
import Swiper from "../components/SwiperComponent";
import { Text, View } from "react-native";
import commonStyles from "../styles/commonStyles";

/**
 * Created by supervons on 2020/04/15.
 * 使用 Hooks 重写首页轮播组件
 * use Hooks rewrite homepage carousel component
 */
export default function CarouselComponent() {
  const [introduction] = useState({
    title_1: "This is SWiper",
    title_2: "react-native good job",
    title_3: "Hermes so fast",
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
