/**
 * Created by supervons on 2019/08/08.
 * 设置页面
 * my page
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import Theme from '../../styles/theme';
import Header from '../../components/header-component';

const list = [
    {
        key: 1,
        title: '版本信息',
        color: '#058bb3',
        onPress: (navigation)=> alert('版本信息')
    }
];

export default class Settings extends Component {

    static navigationOptions = {
        headerTitle: '设置',
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Theme.commonBackColor}}>
                {
                    list.map((item, i) => (
                        <ListItem
                            onPress={()=>item.onPress(this.props.navigation)}
                            key={i}
                            title={item.title}
                            rightIcon={{name: 'keyboard-arrow-right'}}
                            bottomDivider={true}
                        />
                    ))
                }
            </View>
        );
    }
}
