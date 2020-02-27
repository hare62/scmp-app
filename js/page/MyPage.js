import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DataStore from '../expand/dao/DataStore';
import NavigationBar from '../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkerDispatchList from '../common/WorkerDispatchList'


export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['最近三天', '最近一周', '最近半年', '全部'];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={item} />,
                navigationOptions: {
                    title: item,
                },

            };
        });
        return tabs;
    }
    renderRightButton() {
        return (<View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => { }}>
                <Ionicons
                    name={'ios-timer'}
                    size={25}
                    style={{ color: 'white', marginRight: 20 }}
                />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { }}>
                <AntDesign
                    name={'filter'}
                    size={25}
                    style={{ color: 'white', marginRight: 20 }}
                />

            </TouchableOpacity>

        </View>
        )
    }


    render() {
        let statusBar = {
            barStyle: 'light-content',
            hidden: false,
            backgroundColor: "black",
        };
        let navigationBar = <NavigationBar
            title={"我的派工单"}
            statusBar={statusBar}
            style={{ backgroundColor: '#376CDA' }}
            rightButton={this.renderRightButton()}
        />
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: false,
                    style: {
                        backgroundColor: 'white',
                        color: 'red'
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                    activeTintColor: styles.activeTintColor,
                    inactiveTintColor: {
                        color: 'yellow'
                    }
                },
            },
        ));
        return (
            <View style={styles.container}>
                {navigationBar}
                <TabNavigator />

            </View>
        );
    }

}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            asyncStorageData: '初始数据',
            showText: ''
        };
        this.DataStore = new DataStore();
    }

    render() {
        return (
            <View style={styles.contains}>
                <WorkerDispatchList></WorkerDispatchList>
                <WorkerDispatchList></WorkerDispatchList>
                <WorkerDispatchList></WorkerDispatchList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        minWidth: 50,
        color: 'red'
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#376CDA',

    },
    labelStyle: {
        fontSize: 16,
        marginTop: 6,
        marginBottom: 6,
        color: "#376CDA"
    },
    activeTintColor: {
        color: 'red'
    },
   
});