/**
 * Created by supervons on 2019/08/12.
 * 版本信息页面
 * version info page
 */
import React, { Component } from 'react';
import { View, Clipboard } from 'react-native';
import { ListItem } from 'react-native-elements';
import Theme from '../../../../styles/theme';
import DeviceInfo from 'react-native-device-info';
import commonStyles from '../../../../styles/commonStyles';
import Toast from '../../../../components/toast';

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
    rightTitle: 'supervons@sina.com',
    onPress: text => {
      Toast.showToast('复制邮箱成功，请粘贴使用');
      Clipboard.setString(text);
    }
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
            onPress={() =>
              item.onPress ? item.onPress(item.rightTitle) : console.log('')
            }
            rightTitleStyle={{ width: 170, textAlign: 'right' }}
            title={item.title}
            containerStyle={commonStyles.itemPadding}
            bottomDivider={true}
            rightTitle={item.rightTitle}
          />
        ))}
      </View>
    );
  }
}
