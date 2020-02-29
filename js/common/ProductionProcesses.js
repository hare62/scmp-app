import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';
import BaseItem from "./BaseItem";
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {fit} from '../common/fit'
export default class ProductionProcesses extends BaseItem {

    render() {
        const { projectModel } = this.props;
        const { item } = projectModel;
        item = {
            fullName:'RT-WD',
            
        }


        if (!item) return null;
        let description = '<p>' + item.description + '</p>';
        return (
            <TouchableOpacity
                onPress={() => this.onItemClick()}
            >
                {/* <View style={styles.cell_container}>
                    <View style={styles.container_left} ></View>
                    <View style={styles.container_right}>
                        <View style={styles.container_right_title} >
                            <Text style={styles.container_right_title_order} >RT-WD-RY-89-ER</Text>
                            <Text style={styles.container_right_title_materials }>物料：六角螺母</Text>
                        </View>
                        <View style={styles.container_right_title} >
                            <Text style={styles.container_right_date} >25分钟之前</Text>
                        </View>
                    </View>
                </View> */}
                {/* <TouchableOpacity
                onPress={() => this.onItemClick()}
            > */}
                <View style={styles.cell_container}>
                    <View style={styles.container_left} >
                        {/* 图标根据状态去传显示什么图标 */}
                        <EvilIcons
                            name={'check'}
                            size={80}
                            style={{ color: '#376CDA',  }}
                        />
                    </View>
                    <View style={styles.container_right}>
                        <View style={styles.container_right_title} >
                            <Text style={styles.container_right_title_order} >{item.fullName}</Text>
                            <Text style={styles.container_right_title_materials}>物料：六角螺母</Text>
                        </View>
                        <View style={styles.container_right_contain} >
                            <Text style={styles.container_right_date} >
                                <AntDesign
                                    name={'clockcircleo'}
                                    size={18}
                                    style={{ color: '#aaa',  }}
                                />

                            </Text>
                            <Text style={styles.container_right_text} >2020-02-27</Text>
                        </View>
                    </View>
                </View>
            {/* </TouchableOpacity> */}
                {/* <View style={styles.cell_containers}>
                    <Text style={styles.title}>
                        {item.fullName}
                    </Text>
                    <HTMLView
                        value={description}
                        onLinkPress={(url) => {
                        }}
                        stylesheet={{
                            p: styles.description,
                            a: styles.description,
                        }}
                    />
                    <Text style={styles.description}>
                        {item.meta}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Built by:</Text>
                            {
                                item.contributors.map((result, i, arr) => {
                                    return <Image
                                        key={i}
                                        style={{ height: 22, width: 22, margin: 2 }}
                                        source={{ uri: arr[i] }}
                                    />
                                })
                            }

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Start:</Text>
                            <Text>{item.starCount}</Text>
                        </View>
                        {this._favoriteIcon()}
                    </View>
                </View> */}

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cell_container: {
        paddingLeft: 5,
        paddingTop: 20,
        flexDirection: 'row'

    },
    container_left: {
        height: 80,
        width: 80,
        marginRight:10,
        borderRadius: 50,
        lineHeight: 80,
    },
    container_right: {
        color: 'white',
        height: 80,
        flex: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    container_right_title: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingRight:30
    
    },
    container_right_contain:{
        flexDirection: 'row',
    },
    container_right_title_order: {
        color: 'black',
        marginBottom: 10,
        fontSize:18


    },
    container_right_title_materials: {
        color: '#666',
        marginBottom: 10,
    },
    container_right_date: {
        color: "#aaa",
        justifyContent: 'flex-end',
    },
    container_right_text: {
        paddingLeft:10,
        color:'#aaa'
    },

    cell_containers: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical:3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height:0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 1
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom:2,
        color: '#757575',
    }
}
);