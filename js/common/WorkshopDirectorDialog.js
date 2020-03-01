import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, StyleSheet, View, Platform, DeviceInfo } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FilterConditionData from '../model/FilterConditionData';
import Feather from 'react-native-vector-icons/Feather';

export const FilterConditionSpan = [
    new FilterConditionData('选择时间', 'since=daily', 'clock'),
    new FilterConditionData('选择状态', 'since=monthly', 'filter'),
    new FilterConditionData('选择人员', 'since=weekly', 'user'),
]


export default class WorkshopDirectorDialog extends Component {
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
                    {FilterConditionSpan.map((result, i, arr) => {
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
                                i !== FilterConditionSpan.length - 1 ? <View
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
        paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    },
    arrow: {
        marginTop: 40,
        color: 'black',
        padding: 0,
        margin: -15,
        marginRight: 25,
    },
    content: {
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
    },
    line: {
        backgroundColor: 'darkgray',
    },
});


