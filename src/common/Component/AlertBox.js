
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay, Button } from 'react-native-elements';

class AlertBox extends React.Component {
    state = {
        isVisible: true,
        navigation: {}
    }
    changeState = (navigation) => {
        this.setState({
            isVisible: true,
            navigation: navigation
        }, () => {
        })
    }
    toChangeVisible = () => {
        this.setState({ isVisible: false })
    }
    componentWillMount() {
        this.setState({ isVisible: true })
    }

    render() {
        const { navigation } = this.state
        return (
            <Overlay isVisible={this.state.isVisible} overlayStyle={styles.overlay} onBackdropPress={this.toChangeVisible} >
                <Text style={styles.overlaytext}>{this.props.title}</Text>
                {this.props.flag ? (<View>
                    <Button title="确定" titleStyle={{ color: "gray", }} buttonStyle={styles.overlayboxClick} containerStyle={[styles.overlaybox, styles.overlayleft]} onPress={() => { this.toSignOut(navigation) }} />
                    <Button title="取消" titleStyle={{ color: "gray" }} buttonStyle={styles.overlayboxClick} containerStyle={[styles.overlaybox, styles.overlayright]} onPress={this.toChangeVisible} />
                </View>) : <Button title="确认" titleStyle={{ color: "gray" }} buttonStyle={styles.overlayboxClick} containerStyle={[styles.overlaysingle, styles.overlaysinglebox]} onPress={this.toChangeVisible} />
                }
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
    wrap: {
        width: '70%',
        height: '40%',
    },
    overlay: {
        position: "relative",
        width: "70%",
        height: "30%",
        borderWidth: 0.5,
        borderColor: "transparent",
        borderRadius: 1 * 16,
    },
    overlaybox: {
        position: "absolute",
        width: "34%",
        borderRadius: 0.5 * 16,
        borderColor: "black",
        borderWidth: 2,
        top: 6.5 * 16,
    },
    overlaysinglebox: {
        position: "absolute",
        width: "34%",
        borderRadius: 0.5 * 16,
        borderColor: "gray",
        borderWidth: 0.6,
        bottom: 2 * 16,
        backgroundColor: "white",
    },
    overlayboxClick: {
        backgroundColor: "transparent",
    },
    overlayleft: {
        left: "10%"
    },
    overlayright: {
        right: "10%"
    },
    overlaysingle: {
        left: "35%"
    },
    overlaytext: {
        width: "100%",
        textAlign: "center",
        position: "absolute",
        fontSize: 14,
        top: "40%",
        left: "2%",
        color: "black",
    }

})


export default AlertBox
