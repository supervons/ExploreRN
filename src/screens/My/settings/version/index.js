/**
 * Created by supervons on 2019/08/12.
 * 版本信息页面
 * version info page
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Theme from '../../../../styles/theme';
import DeviceInfo from 'react-native-device-info';

const list = [
  {
    key: 0,
    title: '应用名称',
    rightTitle: DeviceInfo.getApplicationName()
  },
  {
    key: 1,
    title: '当前版本',
    rightTitle: DeviceInfo.getVersion()
  },
  {
    key: 2,
    title: '作者',
    rightTitle: 'supervons'
  },
  {
    key: 3,
    title: '联系邮箱',
    rightTitle: 'supervons@sina.com'
  }
];

export default class VersionInfo extends Component {
  static navigationOptions = {
    headerTitle: '系统信息'
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            rightTitleStyle={{ width: 170, textAlign: 'right' }}
            title={item.title}
            bottomDivider={true}
            rightTitle={item.rightTitle}
          />
        ))}
      </View>
    );
  }
}
