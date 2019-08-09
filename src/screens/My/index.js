/**
 * Created by supervons on 2019/08/08.
 * 我的页面
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
        title: '基本信息',
        icon: 'person',
        color: '#058bb3',
    },
    {
        key: 2,
        title: '收藏',
        icon: 'favorite',
        color: '#ff616f',
    }
];

export default class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Theme.commonBackColor}}>
                <Header
                    rightColor={'#fff'}
                    type={"antdesign"}
                    rightIcon={"setting"}
                    rightOnPress={()=>alert('1235')}/>
                <View style={{alignItems: 'center'}}>
                    <Avatar
                        onPress={() => alert('更换头像')}
                        containerStyle={{marginTop: 25, marginBottom: 15}}
                        rounded
                        size="xlarge"
                        source={require('../../resource/image/avatar/logo.png')}
                    />
                </View>
                {
                    list.map((item, i) => (
                        <ListItem
                            onPress={() => alert(item.title)}
                            key={i}
                            title={item.title}
                            leftIcon={<Icon name={item.icon} color={item.color}/>}
                            rightIcon={{name: 'keyboard-arrow-right'}}
                            bottomDivider={true}
                        />
                    ))
                }
            </View>
        );
    }
}
