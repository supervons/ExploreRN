/**
 * Created by supervons on 2019/08/15.
 * 基本信息页面
 * base info page
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Theme from '../../../styles/theme';

export default class BaseInfo extends Component {

    static navigationOptions = {
        headerTitle: '个人基本信息',
    };

    getUserInfo (){
        const userInfoJson = [
            {
                key: 0,
                title: '账号',
                rightTitle: userInfo.loginId
            },
            {
                key: 1,
                title: '姓名',
                rightTitle: userInfo.userName
            },
            {
                key: 2,
                title: '性别',
                rightTitle: userInfo.userSex
            },
            {
                key: 3,
                title: '手机号',
                rightTitle: userInfo.userCellPhone
            },
            {
                key: 4,
                title: '地址',
                rightTitle: userInfo.userAddress
            }
        ];
        return userInfoJson;
    }

    render() {
        const userInfo = this.getUserInfo();
        return (
            <View style={{flex: 1, backgroundColor: Theme.commonBackColor}}>
                {
                    userInfo.map((item, i) => (
                        <ListItem
                            key={i}
                            rightTitleStyle={{width: 170, textAlign:'right'}}
                            title={item.title}
                            bottomDivider={true}
                            rightTitle={item.rightTitle}
                        />
                    ))
                }
            </View>
        );
    }
}
