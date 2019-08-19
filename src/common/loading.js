import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window')

let _this = null;

class Loading extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            show: false
        };
    }

    static show = () => {
        _this.setState({show: true})
    };

    static hide = () => {
        _this.setState({show: false})
    };

    render() {
        if (this.state.show) {
            return (
                <View style={styles.LoadingPage}>
                    <View style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        opacity: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 7,
                        zIndex: 999
                    }}>
                        <ActivityIndicator size="large" color="#FFF"/>
                        <Text style={{marginLeft: 10, color: "#FFF", marginTop: 10}}>正在加载...</Text>
                    </View>
                </View>
            );
        } else {
            return <View/>
        }
    }
}

export default Loading;
const styles = StyleSheet.create({
    LoadingPage: {
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0)",
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
});
