
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DataStore from '../expand/dao/DataStore';
import actions from '../action/index';
import { connect } from 'react-redux';
import FavoriteDao from '../expand/dao/FavoriteDao';
import { FLAG_STORAGE } from "../expand/dao/DataStore";
import PopularItem from '../common/PopularItem';
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar';
import FavoriteUtil from "../util/FavoriteUtil";
// import console = require('console');
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)
const THEME_COLOR = '#AA2F23'
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = [
            { title: '最热', flag: FLAG_STORAGE.flag_popular },
            { title: '趋势', flag: FLAG_STORAGE.flag_trending }
        ];

    }



    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PupolarTabPage {...props} tabLabel={item.title} storeName={item.flag} />,
                navigationOptions: {
                    title: item.title,
                },

            };
        });
        return tabs;
    }

    render() {

        let statusBar = {
            backgroundColor: "black",
            barStyle: 'light-content',
            // translucent:true,
            // opacity:0.1
        };

        let navigationBar = <NavigationBar
            title={'收藏'}
            statusBar={statusBar}
            // style={theme.styles.navBar}
            style={{ backgroundColor: THEME_COLOR }}
        // rightButton={this.renderRightButton()}
        />;
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
        const { tabLabel, storeName } = this.props;

        this.storeName = storeName
    }

    componentDidMount() {
        const { onLoadfavoriteData } = this.props;
        onLoadfavoriteData(this.storeName)

        //    console.log("this.props",this.props)

    }


    renderItem(data) {
        const item = data.item;
        console.log("ooooFAvorite", item)
        // const item = data.item;
        const Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
        return (
            <Item
                projectModel={item}
              
               

                onSelect={(callback) => {
                    NavigationUtil.goPage({
                        projectModel: item,
                        flag: this.storeName,
                        callback
                    }, 'DetailPage')
                    //  this.props.navigation.navigate('tab1');//跳转到createMaterialTopTabNavigator中的指定tab，主要这个navigation一定要是在跳转到createMaterialTopTabNavigator中的指页面获取的
                }}
                onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
                //  onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(item, isFavorite)}
            />
        )

    }
    _store() {
        const { favorite } = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }

    render() {

        let store = this._store();

        return (
            <View>

                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
                ></FlatList>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    favorite: state.favorite
})

const mapDispatchToProps = dispatch => ({
    onLoadfavoriteData: (storeName) => dispatch(actions.onLoadfavoriteData(storeName))
})

const PupolarTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)
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