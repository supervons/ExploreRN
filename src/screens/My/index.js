/**
 * Created by supervons on 2019/08/08.
 * 我的页面
 * my page
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import Theme from '../../styles/theme';

const list = [
  {
    key: 1,
    title: '基本信息',
    icon: 'person',
    color: '#058bb3',
    onPress: navigation => navigation.push('BaseInfo')
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
    onPress: navigation => navigation.push('Settings')
  },
  {
    key: 4,
    title: '退出登录',
    icon: 'arrow-forward',
    color: '#a2b5cd',
    hiddenRightIcon: true,
    onPress: navigation => navigation.replace('Login')
  }
];

export default class MainPage extends Component {
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
            onPress={() => item.onPress(this.props.navigation)}
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
