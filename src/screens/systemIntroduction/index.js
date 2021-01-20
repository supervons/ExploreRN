import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button } from 'react-native-elements';
import { FIRST_INSTALL } from '../../common/redux/action/settingActionTypes';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import commonStyles from '../../styles/commonStyles';

/**
 * Created by supervons on 2019/08/21.
 * 系统功能介绍界面，可以用做第一次进入系统的首屏
 * System function introduction page, Can be used as the first screen to enter the system for the first time
 */
class SystemIntroduction extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      introductionMap: [
        {
          style: commonStyles.slide1,
          title: '本项目包含了大量的 RN 组件',
          enTitle: 'This project contains a large number of RN components'
        },
        {
          style: commonStyles.slide2,
          title: '源码 github 不断更新',
          enTitle: 'Source code github often updated'
        },
        {
          style: commonStyles.slide3,
          title: '欢迎你的加入与关注',
          enTitle: 'Welcome to join and star',
          component: (
            <Button
              title={'嗯，朕已知晓'}
              onPress={() => {
                if (this.props.firstInstall) {
                  this.props.setFirstInstall(false);
                  this.props.navigation.replace('Login');
                } else {
                  this.props.navigation.pop();
                }
              }}
            />
          )
        }
      ]
    };
  }

  // 组件加载之前就判断是否是第一次启动
  componentWillMount() {
    if (!this.props.firstInstall && !this.props.navigation.state.params) {
      this.props.navigation.replace('Login');
    }
  }

  renderItem(style, title, enTitle, component) {
    return (
      <View style={[style, { flex: 1 }]}>
        <Animatable.View animation="zoomInUp">
          <View style={{ margin: 30 }}>
            <Text style={[commonStyles.text, { fontSize: 22, marginTop: 25 }]}>{title}</Text>
            <Text style={commonStyles.text}>{enTitle}</Text>
          </View>
        </Animatable.View>
        {component}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar hidden={true} barStyle={'light-content'} />
        <View style={{ flex: 1 }}>
          <Swiper loop={false} loadMinimal={false}>
            {this.state.introductionMap.map((item, i) =>
              this.renderItem(item.style, item.title, item.enTitle, item.component)
            )}
          </Swiper>
        </View>
      </View>
    );
  }
}

// 取出 store 中的数据
const mapStateToProps = state => {
  return {
    firstInstall: state.SettingReducer.firstInstall
  };
};

// Dispatch 方法
const mapDispatchToProps = dispatch => {
  return {
    setFirstInstall: firstInstall => {
      dispatch({ type: FIRST_INSTALL, firstInstall: firstInstall });
    }
  };
};

export default (SystemIntroduction = connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemIntroduction));
