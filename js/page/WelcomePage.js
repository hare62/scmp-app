import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
// import console = require('console');

export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            //跳转到详情页面
            // NavigationUtil.resetToHomePage(this.props);
            // NavigationUtil.goPage({},'Login')
            const {navigation} = this.props;
            console.log(this.props)
            navigation.navigate('Login');
       
        }, 2000);
    }

    componentWillMount() {
        //页面销毁时，清空计时器
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    WelcomePage
                </Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
