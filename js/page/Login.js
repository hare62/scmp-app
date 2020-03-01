import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Animated, Easing, Image } from 'react-native';
import actions from '../action';
import { connect } from 'react-redux';

class Login extends Component {
    constructor() {
        super()
        this.spinValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.spin()
    }
    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    gotoWorkerPage() {
        const { navigation } = this.props;
        console.log(this.props)
        navigation.navigate('Worker');
    }

    gotoWorkshopDirector() {
        const { navigation } = this.props;
        console.log(this.props)
        navigation.navigate('WorkshopDirector');
    }

    render() {
        const { navigation } = this.props;
        console.log("navigation", navigation);
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.container}>
                <Animated.Image
                    style={{
                        width: 227,
                        height: 200,
                        transform: [{ rotate: spin }]
                    }}
                    source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
                />
                <Text style={styles.welcome}>LoginPage</Text>
                <Button
                    style={styles.contain}
                    title={'跳转到工人派工单'}
                    onPress={() => this.gotoWorkerPage()}
                />
                <Button
                    style={styles.button2}
                    title={'跳转到车间主任'}
                    onPress={() => this.gotoWorkshopDirector()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginBottom: 20
    },

    contain: {
        padding: 20,
        backgroundColor: 'red',
        marginBottom: 20
    },
    button2: {
        marginTop: 20
    }
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(null, mapDispatchToProps)(Login);
