/**
 * Created by supervons on 2019/08/14.
 * 发现页面
 * explore page
 */
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import newsAction from '../../actions/news';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Explore extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    const params = { pageNo: 1, itemNo: 2 };
    newsAction.getNewsList(params).then(resp => {
      console.log(JSON.stringify(resp));
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <ScrollableTabView
          tabBarActiveTextColor={this.props.screenProps.themeColor}
          tabBarUnderlineStyle={{
            backgroundColor: this.props.screenProps.themeColor
          }}
          style={{ height: 800 }}
        >
          <ScrollView
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
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { height: 150 },
  slide1: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
