import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import CarouselComponent from '../../components/carousel';
import BasePage from '../../common/BasePage';
import { Icon } from 'react-native-elements';

/**
 * Created by supervons on 2019/08/08.
 * 用户主界面
 * user main page
 */
const { width } = Dimensions.get('window');
class MainPage extends BasePage {
  navigationOptions = {
    leftComponent: {
      text: '首页'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      demoList: [
        { key: 'charts', icon: 'assessment', color: '#7A7281', name: 'charts', routeName: 'eChartsDemoPage' },
        { key: 'scanner', icon: 'camera', color: '#7B8B6F', name: 'scanner', routeName: 'Scanner' },
        { key: 'gallery', icon: 'image', color: '#8696A7', name: 'gallery', routeName: '' }
      ]
    };
  }

  /**
   * 跳转demo页面
   * @param routeName
   */
  toDemo(routeName) {
    global.navigation.push(routeName);
  }

  /**
   * 渲染示例demo
   * @returns {*}
   */
  renderFunView() {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {this.state.demoList.map(res => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.toDemo(res.routeName);
              }}
              key={res.key}
            >
              <View style={[styles.item, { width: width / 4, height: width / 4 }]}>
                <Icon size={48} name={res.icon} color={res.color} />
                <Text style={{ color: res.color }}>{res.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  renderView() {
    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <CarouselComponent />
        {this.renderFunView()}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#939391'
  }
});

export default MainPage;
