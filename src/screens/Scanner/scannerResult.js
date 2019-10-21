/**
 * Created by supervons on 2019/10/20.
 * 扫一扫及拍照结果页面
 * explore page
 */
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Animated } from 'react-native';
export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state={
      moveAnim: new Animated.Value(0)
    }
  }

  static navigationOptions = {
    headerTitle: '扫描或拍照结果'
  };

  componentDidMount(){
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.rectangleContainer}>
              <Text>{this.props.navigation.state.params.scannerResult || ''}</Text>
              <Image style={{height: 300, width: 300}} source={this.props.navigation.state.params.imageUri == null ? require('../../resource/image/avatar/logo.png') : {uri: this.props.navigation.state.params.imageUri}}/>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10
  },
  border: {
    flex: 0,
    width: 200,
    height: 2,
    backgroundColor: '#00FF00',
  }
});
