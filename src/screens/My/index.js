/**
 * Created by supervons on 2019/08/08.
 * 我的页面
 * my page
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import { ListItem } from 'react-native-elements'

const list = [
    {
        title: 'Appointments',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
]

export default class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                        />
                    ))
                }
            </View>
        );
    }
}
