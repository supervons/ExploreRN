/**
 * Created by supervons on 2019/08/09.
 * hooks 方式统一封装头部 header 组件
 * header component
 */
import React from 'react';
import { Platform } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Theme from '../styles/theme';

export default function HeaderComponent(props) {
  return (
    <Header
      backgroundColor={Theme.primary}
      containerStyle={Platform.OS === 'ios' ? {} : { paddingTop: 5, height: 50 }}
      rightComponent={
        <Icon
          onPress={props.rightOnPress}
          underlayColor={Theme.primary}
          type={props.type}
          name={props.rightIcon}
          color={props.rightColor}
        />
      }
      leftComponent={
        <Icon
          onPress={props.leftOnPress}
          underlayColor={Theme.primary}
          type={props.type}
          name={props.leftIcon}
          color={props.rightColor}
        />
      }
      centerComponent={{ text: props.title, style: props.titleStyle }}
    />
  );
}
