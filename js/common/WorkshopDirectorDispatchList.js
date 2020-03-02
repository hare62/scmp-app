import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import Toast from 'react-native-easy-toast';
import NavigationUtil from '../navigator/NavigationUtil';
import TrendingItem from '../common/TrendingItem'

const THEME_COLOR = '#AA2F23';

class WorkerDispatchList extends Component {
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

     renderItem(data) {
        const item = data.item;
        return <TrendingItem
            projectModel={item}
            onSelect={(callback) => {
                NavigationUtil.goPage({
                   
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
        console.log('store',store)

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

export default WorkerDispatchList;