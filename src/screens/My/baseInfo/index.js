/**
 * Created by supervons on 2019/08/15.
 * 基本信息页面
 * base info page
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Theme from '../../../styles/theme';
import Toast from '../../../components/toast';
import userAction from '../../../actions/user';
import { USER_INFO } from '../../../common/redux/action/userActionTypes';
import { connect } from 'react-redux';

let _this;
class BaseInfo extends Component {
  constructor(props) {
    super(props);
    _this = this;
    this.state = {
      userInfo: {},
      saveButtonShow: false
    };
  }

  static navigationOptions = {
    headerTitle: '个人基本信息',
    headerRight: (
      <Button
        type="clear"
        onPress={() => _this.changeSaveButtonState()}
        icon={{
          name: 'edit',
          size: 20,
          color: 'white'
        }}
      />
    )
  };

  componentDidMount(): void {
    this.setState({ userInfo: userInfo });
  }

  changeSaveButtonState(type) {
    // 当保存接口成功调用时，type为true，其余则不更新全局的userInfo
    if (type) {
      this.setState({ saveButtonShow: !this.state.saveButtonShow });
      userInfo = this.state.userInfo;
      this.props.setUserInfo(this.state.userInfo);
    } else {
      this.setState({
        userInfo: userInfo,
        saveButtonShow: !this.state.saveButtonShow
      });
    }
  }

  updateUserInfo() {
    userAction.updateUserInfo(this.state.userInfo).then(resp => {
      Toast.showToast(resp.msg);
      this.changeSaveButtonState(true);
    });
  }

  getUserInfo() {
    const userInfoJson = [
      {
        key: 'loginId',
        title: '账号',
        rightTitle: this.state.userInfo.loginId,
        editable: false
      },
      {
        key: 'userName',
        title: '姓名',
        rightTitle: this.state.userInfo.userName,
        editable: true
      },
      {
        key: 'userSex',
        title: '性别',
        rightTitle: this.state.userInfo.userSex,
        editable: false
      },
      {
        key: 'userCellPhone',
        title: '手机号',
        rightTitle: this.state.userInfo.userCellPhone,
        editable: true
      },
      {
        key: 'userAddress',
        title: '地址',
        rightTitle: this.state.userInfo.userAddress,
        editable: true
      }
    ];
    return userInfoJson;
  }

  render() {
    const userInfo = this.getUserInfo();
    return (
      <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
        {this.state.saveButtonShow
          ? userInfo.map((item, i) =>
              item.editable ? (
                <ListItem
                  key={i}
                  title={item.title}
                  bottomDivider={true}
                  input={{
                    onChangeText: text =>
                      this.setState({
                        userInfo: { ...this.state.userInfo, [item.key]: text }
                      }),
                    value: this.state.userInfo[item.key],
                    inputStyle: { paddingTop: 0, alignItems: 'center' }
                  }}
                />
              ) : (
                <ListItem
                  key={i}
                  rightTitleStyle={{ width: 170, textAlign: 'right' }}
                  title={item.title}
                  bottomDivider={true}
                  rightSubtitle={item.rightTitle}
                />
              )
            )
          : userInfo.map((item, i) => (
              <ListItem
                key={i}
                rightTitleStyle={{ width: 170, textAlign: 'right' }}
                title={item.title}
                bottomDivider={true}
                rightSubtitle={item.rightTitle}
              />
            ))}
        {this.state.saveButtonShow ? (
          <Button
            icon={{
              name: 'save',
              color: 'white'
            }}
            buttonStyle={{ marginTop: 15, backgroundColor: Theme.primary }}
            title="保存"
            onPress={() => this.updateUserInfo()}
          />
        ) : null}
      </View>
    );
  }
}

// 取出 store 中的数据
const mapStateToProps = state => {
  return {
    userInfo: state.UserReducer.userInfo
  };
};

// Dispatch 方法
const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: userInfo => {
      dispatch({ type: USER_INFO, userInfo: userInfo });
    }
  };
};

export default (BaseInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseInfo));
