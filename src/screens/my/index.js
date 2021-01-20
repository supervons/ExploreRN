/**
 * Created by supervons on 2019/08/08.
 * 我的页面
 * my page
 * Update by supervons on 2020/05/22.
 * 使用 Hooks 方式重写，压缩代码量
 * Use Hooks to rewrite and compress the amount of code
 */
import React, { useState } from 'react';
import { View, Alert, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import Theme from '../../styles/theme';
import { useDispatch } from 'react-redux';
import { USER_TOKEN, USER_INFO } from '../../common/redux/action/userActionTypes';
import commonStyles from '../../styles/commonStyles';
import RNImagePicker from 'react-native-image-picker';

export default function MyPage(props) {
  const dispatch = useDispatch();
  const [list, setList] = useState([
    {
      key: 1,
      title: '基本信息',
      icon: 'person',
      color: '#058bb3',
      onPress: () => props.navigation.push('BaseInfo')
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
      title: '系统特性',
      icon: 'invert-colors',
      color: '#36fffb',
      onPress: () => props.navigation.push('SystemIntroduction', { type: true })
    },
    {
      key: 4,
      title: '设置',
      icon: 'settings',
      color: '#36648b',
      onPress: () => props.navigation.push('Settings')
    },
    {
      key: 53,
      title: '图片选择',
      icon: 'image',
      color: '#36648b',
      hiddenRightIcon: true,
      onPress: () => uploadFile()
    },
    {
      key: 6,
      title: '退出登录',
      icon: 'arrow-forward',
      color: '#a2b5cd',
      hiddenRightIcon: true,
      onPress: () =>
        Alert.alert('退出登录', '退出后，下次需要重新登录', [
          {
            text: '取消',
            onPress: () => {}
          },
          {
            text: '确定',
            onPress: () => {
              dispatch({ type: USER_TOKEN, value: '' });
              dispatch({ type: USER_INFO, value: {} });
              props.navigation.replace('Login');
            }
          }
        ])
    }
  ]);

  /**
   * 拍照或图片配置信息，可以对图片质量进行设置
   */
  let options = {
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.8,
    angle: 0,
    allowsEditing: true,
    noData: false,
    storageOptions: {
      skipBackup: true
    }
  };

  /**
   * 文件上传示例
   */
  function uploadFile() {
    RNImagePicker.launchImageLibrary(options, res => {
      let formData = new FormData();
      let file = { uri: res.uri, type: 'multipart/form-data', name: 'image.png' };
      formData.append('File', file);
      formData.append('Name', '2');
      formData.append('Path', 'w');
      formData.append('OwnerId', '2');

      // TODO 群友提供测试上传接口，慎用
      // fetch('https://test.popbadminton.com/pan/api/files/upload?v=1.0', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   body: formData
      // })
      //   .then(response => response.json())
      //   .then(res => {
      //     alert(JSON.stringify(res));
      //   })
      //   .catch(res => {
      //     alert(JSON.stringify(res));
      //   });
    });
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      <SafeAreaView style={{ backgroundColor: Theme.commonBackColor }} />
      <StatusBar
        animated={false}
        hidden={false}
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
      />
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
          containerStyle={commonStyles.itemPadding}
          leftIcon={<Icon name={item.icon} color={item.color} />}
          rightIcon={<Icon name={'keyboard-arrow-right'} color={item.hiddenRightIcon ? '#ffffff' : '#000000'} />}
          bottomDivider={true}
        />
      ))}
    </ScrollView>
  );
}
