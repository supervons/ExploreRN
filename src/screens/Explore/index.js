/**
 * Created by supervons on 2019/08/14.
 * 发现页面
 * explore page
 */
import React from 'react';
import { StyleSheet, ScrollView, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import newsAction from '../../actions/news';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import BasePages from '../../common/BasePage';
import TabBarView from './component/TabBarView';

export default class Explore extends BasePages {
  navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    const params = { pageNo: 1, itemNo: 2 };
    newsAction.getNewsList(params).then(resp => {
      console.log(JSON.stringify(resp));
    });
  }

  renderView() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ backgroundColor: this.props.screenProps.themeColor, height: Platform.OS === 'ios' ? 0 : 18 }} />
        <ScrollableTabView
          tabBarBackgroundColor={this.props.screenProps.themeColor}
          tabBarActiveTextColor={'#ffffff'}
          tabBarInactiveTextColor={'#D3D3D3'}
          prerenderingSiblingsNumber={1}
          tabBarUnderlineStyle={{
            backgroundColor: '#ffffff'
          }}
          renderTabBar={res => <TabBarView themeColor={this.props.screenProps.themeColor} />}
        >
          <ScrollView
            key={'news'}
            style={{
              backgroundColor: '#9DD6EB'
            }}
            tabLabel="新闻"
          >
            <Text style={styles.text}>新闻</Text>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: '#9DD6EB'
            }}
            tabLabel="比赛"
          >
            <Text style={styles.text}>比赛</Text>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: '#9DD6EB'
            }}
            tabLabel="活动"
          >
            <Text style={styles.text}>活动</Text>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: '#9DD6EB'
            }}
            tabLabel="其他"
          >
            <Text style={styles.text}>其他</Text>
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
