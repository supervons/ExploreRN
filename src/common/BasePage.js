import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import HeaderComponent from '../components/header-component';
import ThemeUtil from '../styles/theme';

export default class BasePages extends Component {
  navigationOptions = {
    headerTitle: '', // Center title
    leftComponent: {} // Left component, if there is no return symbol
  };

  // 构造
  constructor(props) {
    super(props);
    this.statusBarColor = 'light-content'; // Status bar font color enum ('default', 'light-content', 'dark-content')
    // 初始状态
    this.state = {
      netErrorVisible: false
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderComponent
          title={this.navigationOptions.headerTitle}
          leftComponent={this.navigationOptions.leftComponent}
        />
        {this.renderView()}
        <SafeAreaView style={{ backgroundColor: ThemeUtil.light }} />
      </View>
    );
  }

  /**
   * Render the main content section
   * @returns {null}
   */
  renderView() {
    return null;
  }
}
