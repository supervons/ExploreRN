/**
 * Created by supervons on 2019/08/08.
 * 用户主界面
 * user main page
 */
import React, { Component } from 'react';
import { StatusBar, View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import commonStyles from '../styles/commonStyles';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar backgroundColor={this.props.screenProps.themeColor} barStyle={'light-content'} />
        <View style={{ height: 150 }}>
          <Swiper showsButtons={true}>
            <View style={[commonStyles.slide1, { height: 150 }]}>
              <Text style={commonStyles.text}>这是首页swiper</Text>
            </View>
            <View style={[commonStyles.slide2, { height: 150 }]}>
              <Text style={commonStyles.text}>react-native棒棒</Text>
            </View>
            <View style={[commonStyles.slide3, { height: 150 }]}>
              <Text style={commonStyles.text}>Hermes引擎快快快</Text>
            </View>
          </Swiper>
        </View>
      </View>
    );
  }
}
