/**
 * Created by supervons on 2019/08/09.
 * hooks 方式统一封装头部 header 组件
 * header component
 */
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

export default function HeaderComponent(props) {
  const { themeColor } = useSelector(state => ({
    themeColor: state.SettingReducer.themeColor
  }));
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: themeColor }} />
      <StatusBar
        animated={false}
        hidden={false}
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
      />
      <Header
        backgroundColor={themeColor}
        containerStyle={Platform.OS === 'ios' ? { paddingTop: 5, height: 50 } : { paddingTop: 5, height: 60 }}
        rightComponent={
          <Icon
            style={{ marginTop: 35 }}
            onPress={props.rightOnPress}
            underlayColor={themeColor}
            type={props.type}
            name={props.rightIcon}
            color={props.rightColor ? props.rightColor : '#ffffff'}
          />
        }
        leftComponent={
          props.leftComponent ? (
            {
              ...props.leftComponent,
              style: { fontSize: 18, color: '#ffffff', marginTop: Platform.OS === 'ios' ? 0 : 20 }
            }
          ) : (
            <View style={{ marginTop: Platform.OS === 'ios' ? 0 : 20 }}>
              <Icon
                onPress={() => global.navigation.pop()}
                underlayColor={themeColor}
                type={'foundation'}
                name={'arrow-left'}
                color={props.rightColor ? props.rightColor : '#ffffff'}
              />
            </View>
          )
        }
        centerComponent={{
          text: props.title,
          style: [props.titleStyle, { fontSize: 18, color: '#ffffff', marginTop: Platform.OS === 'ios' ? 0 : 20 }]
        }}
      />
    </View>
  );
}
