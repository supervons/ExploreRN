/**
 * Created by supervons on 2019/08/19.
 * 展示加载 loading
 * 在需要界面调用 Loading.show() 来进行显示，Loading.hide() 进行隐藏
 * loading component
 * In the required interface call Loading.show () to display, Loading.hide () to hide
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native';
import Spinkit from 'react-native-spinkit';
import Theme from '../styles/theme';

const {width, height} = Dimensions.get('window');

let _this = null;

class Loading extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            show: false,
            type: ['CircleFlip', 'Bounce', 'Wave', 'FadingCircle', 'FadingCircleAlt',
                'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid'],
        };
    }

    static show = () => {
        _this.setState({show: true});
    };
    static hide = () => {
        _this.setState({show: false});
    };

    render() {
        // 随机动画
        const random = (Math.random().toFixed(1) * 11).toFixed(0) % 11;
        // 随机颜色
        const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        if (this.state.show) {
            return (
                <View style={styles.LoadingPage}>
                    <View style={{
                        width: 100,
                        height: 100,
                        backgroundColor: Theme.loadingBackgroundColor,
                        opacity: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                        zIndex: 999,
                    }}>
                        <Spinkit isVisible={this.state.show} size={40} type={this.state.type[random]} color={color}/>
                        <Text style={{marginLeft: 10, color: Theme.loadingTextColor, marginTop: 10}}>正在加载...</Text>
                    </View>
                </View>
            );
        } else {
            return <View/>;
        }
    }
}

export default Loading;
const styles = StyleSheet.create({
    LoadingPage: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
