import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-easy-toast';
import NavigationUtil from '../navigator/NavigationUtil';
import TrendingItem from '../common/TrendingItem'
// import console = require('console');

const THEME_COLOR = '#AA2F23';

export default class WorkerDispatchList extends Component {
    constructor(props) {
        super(props)

    }


    initData() {
        let { data } = this.props
        console.log("XXXXX", data)
        if (!data) {
            data = [{
                materials: 'loading...',
                materialsName: 'loading...',
                time: 'loading...',
                id: 'loading'
            }]
        }
        return data;
    }

    // renderItem(item) {
    //     item=item.item
    //     return (
    //         <TouchableOpacity
    //             onPress={() => { }}
    //         >
    //             <View style={styles.cell_container}>
    //                 <View style={styles.container_left} >
    //                     {/* 图标根据状态去传显示什么图标 */}
    //                     <EvilIcons
    //                         name={'check'}
    //                         size={80}
    //                         style={{ color: '#376CDA', }}
    //                     />
    //                 </View>
    //                 <View style={styles.container_right}>
    //                     <View style={styles.container_right_title} >
    //                         <Text style={styles.container_right_title_order} >THEME_COLOR</Text>
    //                         <Text style={styles.container_right_title_materials}>物料名称：六角螺母</Text>
    //                     </View>
    //                     <View style={styles.container_right_contain} >
    //                         <Text style={styles.container_right_date} >
    //                             <AntDesign
    //                                 name={'clockcircleo'}
    //                                 size={18}
    //                                 style={{ color: '#aaa', }}
    //                             />
    //                         </Text>
    //                         <Text style={styles.container_right_text} >{item.time}</Text>
    //                     </View>
    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //     );
    // }

     renderItem(data) {
        const item = data.item;
        return <TrendingItem
            projectModel={item}
            onSelect={(callback) => {
                NavigationUtil.goPage({
                    projectModel: item,
                    flag: FLAG_STORAGE.flag_trending,
                    callback
                }, 'DetailPage');
            }}
        />;
    }

    genIndicator() {
        return this.initData().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {

        let store = this.initData()
        console.log('store-----------',store)

        return (
            <View style={styles.contains}>
                <FlatList
                    data={store}
                    renderItem={data => this.renderItem(data)}
                    // keyExtractor={item => "" + item.item.id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                   
                ></FlatList>

                <FlatList
                    data={[{ key: 'a' }, { key: 'b' }]}
                    renderItem={({ item }) => <Text>{item.key}</Text>}
                />
                <Toast ref={'toast'}
                    position={'center'}
                />
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