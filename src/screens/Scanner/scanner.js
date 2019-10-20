/**
 * Created by supervons on 2019/10/20.
 * 扫一扫及拍照页面
 * explore page
 */
import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Toast from '../../components/toast';
export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state={
      moveAnim: new Animated.Value(0),
      imageUri: null
    }
  }

  static navigationOptions = {
    headerTitle: '扫一扫'
  };

  componentDidMount(){
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(0);
    Animated.timing(
        this.state.moveAnim,
        {
          toValue: -200,
          duration: 3500,
          easing: Easing.linear
        }
    ).start(() => this.startAnimation());
  };

  onBarCodeRead = (result) => {
    Toast.showToast(JSON.stringify(result));
    this.props.navigation.push('ScannerResult', {scannerResult: result})
    return;
  };

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({imageUri: data.uri});
      this.props.navigation.push('ScannerResult', {imageUri: data.uri})
    }
  };

  render() {
    return (
        <View style={styles.container}>
          <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              onBarCodeRead={this.onBarCodeRead}
          >
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle}/>
              <Animated.View style={[
                styles.border,
                {transform: [{translateY: this.state.moveAnim}]}]}/>
              <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                <Text style={{ backgroundColor: '#000000', color: '#ffffff', marginTop: 20, fontSize: 14 }}> 点击拍照 </Text>
              </TouchableOpacity>
            </View>
          </RNCamera>
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
