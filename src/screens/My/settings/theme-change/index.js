/**
 * Created by supervons on 2019/08/20.
 * 皮肤更换页面
 * Skin replacement page
 */
import React, { Component } from 'react';
import { DeviceEventEmitter, View } from 'react-native';
import { CheckBox, ListItem, Divider, Button } from 'react-native-elements';
import Theme from '../../../../styles/theme';
import commonStyles from '../../../../styles/commonStyles';

const colorList = [
  {
    key: 0,
    title: '经典/Classic/#f4511E',
    value: '#f4511E'
  },
  {
    key: 1,
    title: '墨绿/Green/#00868B',
    value: '#00868B'
  },
  {
    key: 2,
    title: '红色/Red/#EE0000',
    value: '#EE0000'
  },
  {
    key: 3,
    title: '蓝色/Blue/#63B8FF',
    value: '#63B8FF'
  },
  {
    key: 4,
    title: '黑色/Black/#000000',
    value: '#000000'
  }
];

export default class ThemeChange extends Component {
  static navigationOptions = {
    headerTitle: '更换皮肤'
  };

  render() {
    const currentColor = this.props.screenProps.themeColor;
    return (
      <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
        <Divider style={{ backgroundColor: 'black', marginTop: 30 }} />
        {colorList.map(item => (
          <CheckBox
            key={item.key}
            textStyle={{ color: '#ffffff' }}
            checkedColor={'#ffffff'}
            containerStyle={{
              backgroundColor: item.value
            }}
            title={item.title}
            checked={currentColor === item.value}
            onPress={() => {
              DeviceEventEmitter.emit('theme_change', item.value);
            }}
          />
        ))}
        <Divider style={{ backgroundColor: 'black', marginBottom: 30 }} />
        <ListItem
          containerStyle={commonStyles.itemPadding}
          title={'自定义'}
          bottomDivider={true}
          input={{
            placeholder: '#ffffff/white',
            onChangeText: text => {
              if (text.length > 3) {
                DeviceEventEmitter.emit('theme_change', text);
              }
            },
            inputStyle: {
              paddingTop: 0,
              alignItems: 'center',
              fontSize: 15
            }
          }}
        />
        <Button
          icon={{
            name: 'done',
            color: 'white'
          }}
          buttonStyle={{
            marginTop: 15,
            backgroundColor: this.props.screenProps.themeColor
          }}
          title="确定"
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );
  }
}
