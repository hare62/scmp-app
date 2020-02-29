import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, StyleSheet, View, Platform, DeviceInfo } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpan from '../model/TimeSpan';
import Feather from 'react-native-vector-icons/Feather';
export const TimeSpans = [
    new TimeSpan('选择时间', 'since=daily', 'clock'),
    new TimeSpan('选择状态', 'since=monthly', 'filter'),
    new TimeSpan('选择人员', 'since=weekly', 'user'),
]
export default class TrendingDialog extends Component {
    state = {
        visible: false,
    };

    show() {
        this.setState({
            visible: true,
        })
    }

    dismiss() {
        this.setState({
            visible: false,
        })
    }

    render() {
        const { onClose, onSelect } = this.props;
        return (<Modal
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => onClose}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.dismiss()}
            >
                <MaterialIcons
                    name={'arrow-drop-up'}
                    size={36}
                    style={styles.arrow}
                />
                <View style={styles.content}>
                    {TimeSpans.map((result, i, arr) => {
                        console.log('arr[i]', arr[i])
                        return <TouchableOpacity
                            key={i}
                            onPress={() => onSelect(result)}
                            underlayColor='transparent'>
                            <View style={styles.text_container}>
                                <Feather
                                    name={result.showIconName}
                                    size={18}
                                    style={{ color: 'white', }}
                                />
                                <Text
                                    style={styles.text}
                                >{result.showText}</Text>
                            </View>
                            {
                                i !== TimeSpans.length - 1 ? <View
                                    style={styles.line}
                                /> : null
                            }
                        </TouchableOpacity>
                    })}
                </View>
            </TouchableOpacity>
        </Modal>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        flex: 1,
        alignItems: 'flex-end',
        // justifyContent:'flex-end',
        paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    },
    arrow: {
        marginTop: 40,
        color: 'black',
        padding: 0,
        // alignItems: 'center',
        // justifyContent:'center',
        margin: -15,
        marginRight: 25,
        // margin:-15,
        // marginLeft:-50,
        // paddingLeft:-20
    },
    content: {
        // marginTop:50,
        backgroundColor: 'black',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3,
        alignItems: 'center',
    },
    text_container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: '400',
        padding: 8,
        // paddingLeft: 26,
        // paddingRight: 26
    },
    line: {
        // height: 0.5,
        backgroundColor: 'darkgray',
    },
});


