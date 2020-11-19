import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from '@ant-design/react-native';
import RNImagePicker from 'react-native-image-picker';
/**
 * @desc 选择相册或拍照组件
 * @author fengys
 * @date 2020/09/15
 */
function ImagePicker(props, ref) {
  const [modalVisible, setModalVisible] = useState(false);
  // 拍照或图片配置信息
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
   * 暴露方法给父组件调用
   */
  useImperativeHandle(ref, () => ({
    /**
     * 显示弹出层
     */
    showModal() {
      setModalVisible(true);
    }
  }));
  return (
    <Modal
      popup
      visible={modalVisible}
      animationType="slide-up"
      style={{ backgroundColor: 'transparent', padding: getDensity(10) }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: getDensity(15)
        }}
      >
        <TouchableOpacity onPress={() => takePhoto()}>
          <View style={styles.select}>
            <Text style={styles.textStyle}>拍照</Text>
          </View>
        </TouchableOpacity>
        <View style={{ height: getDensity(1), backgroundColor: '#E7E8E9' }} />
        <TouchableOpacity onPress={() => selectGallery()}>
          <View style={styles.select}>
            <Text style={styles.textStyle}>从相册选择</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => cancelSelect()}>
        <View style={styles.cancelStyle}>
          <Text style={[styles.textStyle, { color: 'rgba(52, 120, 246, 1)' }]}>取消</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  /**
   * 拍照
   */
  function takePhoto() {
    RNImagePicker.launchCamera(options, res => {
      if (res.data) {
        // AsyncStorage.setItem("headImg" + global.userID, res.data);
      }
    });
  }

  /**
   * 从图库选择图片
   */
  function selectGallery() {
    RNImagePicker.launchImageLibrary(options, res => {
      if (res.data) {
        // AsyncStorage.setItem("headImg" + global.userID, res.data);
      }
    });
  }

  /**
   * 取消选择
   */
  function cancelSelect() {
    setModalVisible(false);
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#333333'
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 57
  },
  cancelStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 8,
    height: 57,
    borderRadius: 15
  }
});
ImagePicker = forwardRef(ImagePicker);
export default ImagePicker;
