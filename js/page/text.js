

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DataStore from '../expand/dao/DataStore'
import action from '../action';
import { connect } from 'tls';

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['最热', '趋势'];

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

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#a67',
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                },
            },
        ));
        return (
            <View style={styles.container}>
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

    async getAsyncStorageData() {
        let url = `https://facebook.github.io/react-native/movies.json`;
        this.DataStore.fetchData(url)
            .then(data => {
                console.log(data)
                let showText = `初次数据加载时间:${new Date(data.timestamp)}\n${JSON.stringify(data)}`;
                this.setState({
                    showText
                })
            }).catch(error => {
                error && console.log(error.toString());
            })
    }

    loadData() {
        fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("NetWork response was not ok.")
            })
            .then((responseJson) => {
                console.log(responseJson.movies)

                this.setState({

                    dataSource: responseJson.description,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    dataSource: error.toString()
                })
            });
    }

    async saveData() {
        try {
            await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
        } catch (error) {
            // Error saving data
        }
    }

    async  readData() {
        try {
            const value = await AsyncStorage.getItem('@MySuperStore:key');
            if (value !== null) {
                // We have data!!
                console.log(value);
                this.setState({
                    asyncStorageData: value
                })
            }
        } catch (error) {
            // Error retrieving data
        }

    }


    render() {
        return (
            <View>
                <Text>PopularTab</Text>
                <Text onPress={
                    () => {
                        console.log("你好")
                        NavigationUtil.goPage({}, 'DetailPage');
                    }
                }>跳转到详情页</Text>
                <Text>Fetch的使用</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => { this.searchKey = text }}

                />
                <Button title="获取" onPress={() => { this.loadData() }}></Button>
                <Button title="保存数据" onPress={() => { this.saveData() }}></Button>
                <Text>{this.state.dataSource}</Text>
                <Button title="读取数据" onPress={() => { this.readData() }}></Button>
                <Text>{this.state.asyncStorageData}</Text>

                <Text>离线缓存框架设计</Text>

                <Button title="离线缓存框架设计" onPress={() => { this.getAsyncStorageData() }}></Button>
                <Text>{this.state.showText}</Text>
            </View>
        );
    }
}


// const mapStateToProps = state => ({
//     favorite: state.favorite
// })

// const mapDispatchToProps = dispatch => ({
//     onLoadfavoriteData: () => dispatch(actions.onLoadfavoriteData())
// })

// const PupolarTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
});