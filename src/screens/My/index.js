/**
 * Created by supervons on 2019/08/08.
 * 我的页面
 * my page
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {ListItem, Avatar, Icon} from 'react-native-elements';

const list = [
    {
        key: 1,
        title: '基本信息',
        icon: 'person',
        color: '#058bb3'
    },
    {
        key: 2,
        title: '收藏',
        icon: 'favorite',
        color: '#ff616f'
    },
    {
        key: 3,
        title: '设置',
        icon: 'settings',
        color: '#140002',
    },
];

export default class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={{alignItems: 'center'}}>
                    <Avatar
                        onPress={()=>alert('更换头像')}
                        containerStyle={{marginTop: 25, marginBottom: 15}}
                        rounded
                        size="xlarge"
                        source={require('../../resource/image/avatar/logo.png')}
                    />
                </View>
                {
                    list.map((item, i) => (
                        <View>
                            <ListItem
                                onPress={()=>alert(item.title)}
                                key={i}
                                title={item.title}
                                leftIcon={<Icon name={item.icon} color={item.color}/>}
                                rightIcon={{name: 'keyboard-arrow-right'}}
                                bottomDivider={true}
                            />
                        </View>
                    ))
                }
            </View>
        );
    }
}
