import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import console = require('console');

export default class WorkerDispatchList extends Component {
    constructor(props) {
        super(props)
       
    }

    
    initData(){
        let {data} = this.props;
        console.log("XXXXX",data)
        if(!data){
            data= [{
                materials: 'loading...',
                materialsName: 'loading...',
                time: 'loading...',
            }]
        }
        return data;
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                onPress={() => { }}
            >
                <View style={styles.cell_container}>
                    <View style={styles.container_left} >
                        {/* 图标根据状态去传显示什么图标 */}
                        <EvilIcons
                            name={'check'}
                            size={80}
                            style={{ color: '#376CDA', }}
                        />
                    </View>
                    <View style={styles.container_right}>
                        <View style={styles.container_right_title} >
                            <Text style={styles.container_right_title_order} >{item.materials}</Text>
                            <Text style={styles.container_right_title_materials}>{item.materialsName}</Text>
                        </View>
                        <View style={styles.container_right_contain} >
                            <Text style={styles.container_right_date} >
                                <AntDesign
                                    name={'clockcircleo'}
                                    size={18}
                                    style={{ color: '#aaa', }}
                                />
                            </Text>
                            <Text style={styles.container_right_text} >{item.time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {

        let data = this.initData()

        // console.log("harehareprops", this.props.data,item)

        return (
            <View>
            {
                data.map((item, index, arr) => {
                    return this.renderItem(item)
                })
            }
            </View>
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
        marginRight: 10,
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
        justifyContent: 'space-between',
        paddingRight: 30

    },
    container_right_contain: {
        flexDirection: 'row',
    },
    container_right_title_order: {
        color: 'black',
        marginBottom: 10,
        fontSize: 17
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
        paddingLeft: 10,
        color: '#aaa'
    }
}
);