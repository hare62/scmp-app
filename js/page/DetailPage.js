import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, DeviceInfo,Text} from 'react-native';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
           
                <View style={styles.container}>
                    <Text>nihao </Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   
});
