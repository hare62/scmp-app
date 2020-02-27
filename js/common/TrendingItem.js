import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';
import BaseItem from "./BaseItem";

export default class TrendingItem extends BaseItem {

    render() {
        const { projectModel } = this.props;
        const { item } = projectModel;


        if (!item) return null;
        let description = '<p>' + item.description + '</p>';
        return (
            <TouchableOpacity
                onPress={() => this.onItemClick()}
            >
                <View style={styles.cell_container}>
                    {/* <Text >nihao</Text> */}
                    <View style={styles.container_left} ></View>
                    <View style={styles.container_right}>
                        <View style={styles.container_right_title} >
                            <Text style={styles.container_right_title_order} >RT-WD-RY-89-ER</Text>
                            <Text style={styles.container_right_title_materials }>物料：六角螺母</Text>
                        </View>
                        <View style={styles.container_right_title} >
                            <Text style={styles.container_right_date} >25分钟之前</Text>
                            {/* <Text style={styles.container_right_title_right}>物料：六角螺母</Text> */}
                        </View>
                    </View>
                </View>
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
        paddingLeft: 20,
        paddingTop: 20,
        // paddingBottom: 20,
        // backgroundColor: '#99cc99',
        flexDirection: 'row'

    },
    container_left: {
        height: 80,
        width: 80,
        backgroundColor: '#ec6a6a',
        borderRadius: 50,
        lineHeight: 80,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'

    },
    container_right: {
        color: 'white',
        // backgroundColor: '#ec6a6a',
        height:90,
        marginLeft: 15,
        flex: 1,
        // paddingTop: 10,
        borderBottomColor:"#ccc",
        borderBottomWidth:1
    },
    container_right_title: {
        flexDirection: 'row',
        // color: 'white',
    },
    container_right_title_order : {
        marginLeft: 15,
        color: 'black',
        marginBottom: 10,
        
    },
    container_right_title_materials : {
        marginLeft: 15,
        color: '#666',
        marginBottom: 10,
    },
    container_right_date: {
        color:"#333",
        marginLeft: 15,
        // marginBottom: 10,
    },
    cell_containers: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
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
        marginBottom: 2,
        color: '#757575',
    }
}
);