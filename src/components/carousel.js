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
  const [introduction] = useState([
    {
      title: "This is SWiper",
      style: commonStyles.slide1,
    },
    {
      title: "react-native good job",
      style: commonStyles.slide2,
    },
    {
      title: "Hermes so fast",
      style: commonStyles.slide3,
    },
  ]);

  function renderView(slideStyle, title) {
    return (
      <View key={title} style={[slideStyle, { height: 150 }]}>
        <Text style={commonStyles.text}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={{ height: 150 }}>
      <Swiper showsButtons={true}>
        {introduction.map(res => {
          return renderView(res.style, res.title);
        })}
      </Swiper>
    </View>
  );
}
