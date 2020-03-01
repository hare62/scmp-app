import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Animated, Easing, Image } from 'react-native';
import actions from '../action';
import { connect } from 'react-redux';

class Login extends Component {
    constructor() {
        super()
        this.animatedValue = new Animated.Value(0)
    }

    gotoWorkerPage() {
        const { navigation } = this.props;
        console.log(this.props)
        navigation.navigate('Worker');
    }

    componentDidMount() {
        this.animate()
    }
    animate() {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    }

    gotoWorkshopDirector() {
        const { navigation } = this.props;
        console.log(this.props)
        navigation.navigate('WorkshopDirector');
    }

    render() {
        const { navigation } = this.props;
        console.log("navigation", navigation);
        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300]
        })
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        })
        const movingMargin = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 300, 0]
        })
        const textSize = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [18, 32, 18]
        })
        const rotateX = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '0deg']
        })
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        marginLeft,
                        height: 30,
                        width: 40,
                        backgroundColor: 'red'
                    }} />
                <Animated.View
                    style={{
                        opacity,
                        marginTop: 10,
                        height: 30,
                        width: 40,
                        backgroundColor: 'blue'
                    }} />
                <Animated.View
                    style={{
                        marginLeft: movingMargin,
                        marginTop: 10,
                        height: 30,
                        width: 40,
                        backgroundColor: 'orange'
                    }} />
                <Animated.Text
                    style={{
                        fontSize: textSize,
                        marginTop: 10,
                        color: 'green'
                    }} >
                    Animated Text!
                </Animated.Text>
                <Animated.View
                    style={{
                        transform: [{ rotateX }],
                        marginTop: 50,
                        height: 30,
                        width: 40,
                        backgroundColor: 'black'
                    }}>
                    <Text style={{ color: 'white' }}>Hello from TransformX</Text>
                </Animated.View>
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
