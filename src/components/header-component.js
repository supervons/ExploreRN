/**
 * Created by supervons on 2019/08/09.
 * hooks 方式统一封装头部 header 组件
 * header component
 */
import React from 'react';
import { Platform, SafeAreaView, TouchableHighlight, StatusBar, View } from 'react-native';
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
      {props.header === null ? null : (
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
                style: { fontSize: 18, color: '#ffffff', marginTop: Platform.OS === 'ios' ? 5 : 20 }
              }
            ) : (
              <TouchableHighlight
                delayPressOut={400}
                underlayColor={'rgba(178,178,178,0.5)'}
                onPress={() => global.navigation.pop()}
                style={{
                  marginTop: Platform.OS === 'ios' ? 5 : 20,
                  width: 30,
                  height: 30,
                  marginLeft: -10,
                  borderRadius: 15,
                  justifyContent: 'center'
                }}
              >
                <Icon
                  underlayColor={themeColor}
                  name={'arrow-back'}
                  color={props.rightColor ? props.rightColor : '#ffffff'}
                />
              </TouchableHighlight>
            )
          }
          centerComponent={{
            text: props.title,
            style: [props.titleStyle, { fontSize: 18, color: '#ffffff', marginTop: Platform.OS === 'ios' ? 5 : 20 }]
          }}
        />
      )}
    </View>
  );
}
