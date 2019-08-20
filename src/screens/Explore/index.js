/**
 * Created by supervons on 2019/08/14.
 * 发现页面
 * explore page
 */
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import Theme from '../../styles/theme';
import newsAction from '../../actions/news';

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
        <StatusBar backgroundColor={Theme.primary} barStyle={'light-content'} />
      </View>
    );
  }
}
