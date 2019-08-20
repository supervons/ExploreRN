/**
 * Created by supervons on 2019/08/08.
 * 用户主界面
 * user main page
 */
import React, { Component } from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import Theme from '../styles/theme';
import Swiper from 'react-native-swiper';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar backgroundColor={Theme.primary} barStyle={'light-content'} />
        <View style={styles.wrapper}>
          <Swiper showsButtons={true}>
            <View style={styles.slide1}>
              <Text style={styles.text}>这是首页swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>react-native棒棒</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>Hermes引擎快快快</Text>
            </View>
          </Swiper>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { height: 150 },
  slide1: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
