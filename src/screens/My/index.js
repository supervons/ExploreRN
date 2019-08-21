/**
 * Created by supervons on 2019/08/08.
 * 我的页面
 * my page
 */
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import Theme from '../../styles/theme';
import { connect } from 'react-redux';
import {
  USER_TOKEN,
  USER_INFO
} from '../../common/redux/action/userActionTypes';

const list = [
  {
    key: 1,
    title: '基本信息',
    icon: 'person',
    color: '#058bb3',
    onPress: props => props.navigation.push('BaseInfo')
  },
  {
    key: 2,
    title: '收藏',
    icon: 'favorite',
    color: '#ff616f',
    onPress: () => alert('2')
  },
  {
    key: 3,
    title: '设置',
    icon: 'settings',
    color: '#36648b',
    onPress: props => props.navigation.push('Settings')
  },
  {
    key: 4,
    title: '系统特性',
    icon: 'invert-colors',
    color: '#36fffb',
    onPress: props =>
      props.navigation.push('SystemIntroduction', { type: true })
  },
  {
    key: 5,
    title: '退出登录',
    icon: 'arrow-forward',
    color: '#a2b5cd',
    hiddenRightIcon: true,
    onPress: props =>
      Alert.alert('退出登录', '退出后，下次需要重新登录', [
        {
          text: '取消',
          onPress: () => {}
        },
        {
          text: '确定',
          onPress: () => {
            props.setToken('');
            props.setUserInfo('');
            props.navigation.replace('Login');
          }
        }
      ])
  }
];

class MyPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
        <View style={{ alignItems: 'center' }}>
          <Avatar
            onPress={() => alert('更换头像')}
            containerStyle={{ marginTop: 25, marginBottom: 15 }}
            rounded
            size="xlarge"
            source={require('../../resource/image/avatar/logo.png')}
          />
        </View>
        {list.map((item, i) => (
          <ListItem
            onPress={() => item.onPress(this.props)}
            key={i}
            title={item.title}
            leftIcon={<Icon name={item.icon} color={item.color} />}
            rightIcon={
              <Icon
                name={'keyboard-arrow-right'}
                color={item.hiddenRightIcon ? '#ffffff' : '#000000'}
              />
            }
            bottomDivider={true}
          />
        ))}
      </View>
    );
  }
}

// 取出 store 中的数据
const mapStateToProps = state => {
  return {
    userToken: state.UserReducer.userToken,
    userInfo: state.UserReducer.userInfo
  };
};

// Dispatch 方法
const mapDispatchToProps = dispatch => {
  return {
    setToken: userToken => {
      dispatch({ type: USER_TOKEN, userInfo: userToken });
    },
    setUserInfo: userInfo => {
      dispatch({ type: USER_INFO, userInfo: userInfo });
    }
  };
};

export default (MyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage));
