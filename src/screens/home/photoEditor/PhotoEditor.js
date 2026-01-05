/**
 * Created by supervons on 2025/01/05
 * 美图编辑页面
 * Photo Editor Page
 */
import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";

const { width, height } = Dimensions.get("window");

interface Filter {
  name: string;
  displayName: string;
  values: {
    brightness?: number,
    contrast?: number,
    saturation?: number,
    blur?: number,
  };
}

const filters: Filter[] = [
  { name: "normal", displayName: "原图", values: {} },
  { name: "bright", displayName: "明亮", values: { brightness: 0.3 } },
  { name: "dark", displayName: "暗调", values: { brightness: -0.3 } },
  { name: "contrast", displayName: "高对比", values: { contrast: 0.5 } },
  { name: "saturated", displayName: "饱和", values: { saturation: 2 } },
  { name: "desaturated", displayName: "去色", values: { saturation: 0 } },
  {
    name: "vintage",
    displayName: "复古",
    values: { saturation: 0.8, brightness: -0.1 },
  },
  {
    name: "cold",
    displayName: "冷色",
    values: { saturation: 0.9, brightness: 0.1 },
  },
];

export default function PhotoEditor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedImages, setEditedImages] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("normal");
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(1);
  const scrollViewRef = useRef(null);

  // 从图库选择图片
  const selectImage = () => {
    ImagePicker.openPicker({
      width: width,
      height: height * 0.6,
      cropping: true,
      cropperToolbarTitle: "编辑图片",
      cropperChooseText: "选择",
      cropperCancelText: "取消",
      includeBase64: false,
      compressImageQuality: 0.8,
    })
      .then(image => {
        setSelectedImage(image);
        resetFilters();
      })
      .catch(error => {
        console.log("ImagePicker Error: ", error);
        if (error.code !== "E_PICKER_CANCELLED") {
          Alert.alert("错误", "选择图片失败，请重试");
        }
      });
  };

  // 重置滤镜
  const resetFilters = () => {
    setCurrentFilter("normal");
    setBrightness(0);
    setContrast(0);
    setSaturation(1);
  };

  // 应用预设滤镜
  const applyFilter = filter => {
    setCurrentFilter(filter.name);
    setBrightness(filter.values.brightness || 0);
    setContrast(filter.values.contrast || 0);
    setSaturation(filter.values.saturation || 1);
  };

  // 保存编辑后的图片
  const saveEditedImage = () => {
    if (!selectedImage) {
      Alert.alert("提示", "请先选择一张图片");
      return;
    }

    const editedImage = {
      id: Date.now(),
      uri: selectedImage.path,
      filter: currentFilter,
      brightness,
      contrast,
      saturation,
      timestamp: new Date().toLocaleString(),
    };

    setEditedImages(prev => [editedImage, ...prev]);
    Alert.alert("成功", "图片已保存到编辑历史");
  };

  // 删除编辑历史中的图片
  const deleteEditedImage = id => {
    Alert.alert("确认删除", "确定要删除这张图片吗？", [
      { text: "取消", style: "cancel" },
      {
        text: "删除",
        style: "destructive",
        onPress: () => {
          setEditedImages(prev => prev.filter(img => img.id !== id));
        },
      },
    ]);
  };

  // 获取图片样式
  const getImageStyle = (
    customBrightness = brightness,
    customContrast = contrast,
    customSaturation = saturation,
  ) => {
    return {
      width: width - 40,
      height: height * 0.5,
      resizeMode: "contain",
      backgroundColor: "#f0f0f0",
      borderRadius: 10,
      // 注意：React Native 原生不支持这些滤镜属性，这里仅作演示
      // 实际项目中可能需要使用 react-native-image-filter-kit 或其他库
    };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* 编辑区域 */}
      <View style={styles.editorSection}>
        <Text style={styles.sectionTitle}>图片编辑</Text>

        {/* 图片显示区域 */}
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.path }}
              style={getImageStyle()}
            />
          ) : (
            <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
              <Icon name="image" type="feather" size={60} color="#888" />
              <Text style={styles.selectText}>点击选择图片</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 操作按钮 */}
        {selectedImage && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.button} onPress={selectImage}>
              <Icon name="refresh-cw" type="feather" size={20} color="#fff" />
              <Text style={styles.buttonText}>重新选择</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetFilters}>
              <Icon name="x-circle" type="feather" size={20} color="#fff" />
              <Text style={styles.buttonText}>重置滤镜</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={saveEditedImage}>
              <Icon name="check" type="feather" size={20} color="#fff" />
              <Text style={styles.buttonText}>确认保存</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 滤镜选择 */}
        {selectedImage && (
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>选择滤镜效果</Text>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
              contentContainerStyle={styles.filterContainer}>
              {filters.map(filter => (
                <TouchableOpacity
                  key={filter.name}
                  style={[
                    styles.filterItem,
                    currentFilter === filter.name && styles.filterItemSelected,
                  ]}
                  onPress={() => applyFilter(filter)}>
                  <Text
                    style={[
                      styles.filterText,
                      currentFilter === filter.name &&
                        styles.filterTextSelected,
                    ]}>
                    {filter.displayName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* 编辑历史区域 */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>编辑历史</Text>
        {editedImages.length === 0 ? (
          <View style={styles.emptyHistory}>
            <Icon name="image" type="feather" size={40} color="#ccc" />
            <Text style={styles.emptyText}>暂无编辑历史</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.historyScroll}>
            {editedImages.map(image => (
              <View key={image.id} style={styles.historyItem}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.historyImage}
                />
                <View style={styles.historyInfo}>
                  <Text style={styles.historyFilter}>
                    滤镜:{" "}
                    {filters.find(f => f.name === image.filter)?.displayName}
                  </Text>
                  <Text style={styles.historyTime}>{image.timestamp}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteEditedImage(image.id)}>
                  <Icon
                    name="trash-2"
                    type="feather"
                    size={16}
                    color="#ff4444"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  editorSection: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  imageContainer: {
    width: width - 40,
    height: height * 0.5,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
  },
  selectButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  selectText: {
    marginTop: 10,
    fontSize: 16,
    color: "#888",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  filterScroll: {
    maxHeight: 50,
  },
  filterContainer: {
    paddingRight: 20,
  },
  filterItem: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterItemSelected: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  filterTextSelected: {
    color: "#fff",
  },
  historySection: {
    height: 200,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  emptyHistory: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#ccc",
  },
  historyScroll: {
    flex: 1,
  },
  historyItem: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyImage: {
    width: 130,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  historyInfo: {
    marginTop: 8,
  },
  historyFilter: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },
  historyTime: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
