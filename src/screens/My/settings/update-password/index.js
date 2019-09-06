/**
 * Created by supervons on 2019/09/06.
 * 修改密码页面
 * update password page
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import Theme from '../../../../styles/theme';
import commonStyles from '../../../../styles/commonStyles';
import Toast from '../../../../components/toast';
import userAction from '../../../../actions/user';

let _this;
export default class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    _this = this;
    this.state = {
      userInfo: {},
      saveButtonShow: false
    };
  }

  static navigationOptions = {
    headerTitle: '修改密码'
  };

  componentDidMount(): void {
    // this.setState({ userInfo: userInfo });
  }

  getUserInfo() {
    const userInfoJson = [
      {
        key: 'oldPassword',
        title: '原密码',
        rightTitle: this.state.userInfo.oldPassword,
        editable: false
      },
      {
        key: 'newPassword',
        title: '新密码',
        rightTitle: this.state.userInfo.newPassword,
        editable: true
      },
      {
        key: 'confirmPassword',
        title: '再次输入新密码',
        rightTitle: this.state.userInfo.confirmPassword,
        editable: false
      }
    ];
    return userInfoJson;
  }

  updatePassword() {
    if (
      !this.state.userInfo.oldPassword ||
      !this.state.userInfo.newPassword ||
      !this.state.userInfo.confirmPassword
    ) {
      Toast.showToast('请输入原密码和新密码!');
    } else {
      if (
        this.state.userInfo.newPassword !== this.state.userInfo.confirmPassword
      ) {
        Toast.showToast('两次输入新密码不一致!');
      } else {
        this.state.userInfo.loginId = userInfo.loginId;
        userAction.updatePassword(this.state.userInfo).then(resp => {
          Toast.showToast(resp.msg);
        });
      }
    }
  }

  render() {
    const userInfo = this.getUserInfo();
    return (
      <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
        {userInfo.map((item, i) => (
          <ListItem
            key={i}
            containerStyle={commonStyles.itemPadding}
            title={item.title}
            bottomDivider={true}
            input={{
              onChangeText: text =>
                this.setState({
                  userInfo: { ...this.state.userInfo, [item.key]: text }
                }),
              autoFocus: i === 0 ? true : false,
              secureTextEntry: true,
              value: this.state.userInfo[item.key],
              inputStyle: {
                paddingTop: 0,
                alignItems: 'center',
                fontSize: 15
              }
            }}
          />
        ))}
        <Button
          icon={{
            name: 'done',
            color: 'white'
          }}
          buttonStyle={{
            marginTop: 15,
            backgroundColor: this.props.screenProps.themeColor
          }}
          title="确认"
          onPress={() => this.updatePassword()}
        />
      </View>
    );
  }
}
