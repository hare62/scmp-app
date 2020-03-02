import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, FlatList, RefreshControl } from 'react-native';
import Toast from 'react-native-easy-toast';
import TrendingItem from '../common/TrendingItem';
import actions from '../action'
import { FLAG_STORAGE } from "../expand/dao/DataStore";
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDao from "../expand/dao/FavoriteDao";
import { connect } from 'react-redux';

const pageSize = 10;//设为常量，防止修改
const THEME_COLOR = '#AA2F23';
const URL = 'https://github.com/trending/';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);

class TopTabNavigatorOfFlatList extends Component {
    /**
     * 
     *  @param {tabLabel*} props  状态查询条件
     *  @param {FilterConditionData*} props  时间查询条件
     *  
     */
    constructor(props) {
        super(props);
        const { tabLabel, FilterConditionData } = this.props;
        this.FilterConditionData = FilterConditionData;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData()
    }

    /**
    * 获取与当前页面有关的数据 这边数据结构很不清晰
    * @returns {*}
    * @private
    */
    _store() {
        const { trending } = this.props;
        let store = trending[this.storeName];
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

    loadData(loadMore) {
        const { onRefreshTrending, onLoadMoreTrending } = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        let pageIndex = ++store.pageIndex;
        if (loadMore) {
            onLoadMoreTrending(this.storeName, pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            });
        } else {
            onRefreshTrending(this.storeName, url, pageSize, favoriteDao);
        }
    }

    /**
     * 
     * @param {查询条件key} key 
     */

    genFetchUrl(key) {
        // https://github.com/trending/C++?since=daily
        return URL + key + '?' + this.FilterConditionData.searchText;
    }

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
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {
        // NavigationUtil.navigation = this.props.navigation;
        this.navigation = this.props;
        let store = this._store();
        console.log('this.props.data', this.props)
        return (
            <View style={styles.contains}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.item.fullName}
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
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        console.log('---onEndReached----');
                        //为了保证onMomentumScrollBegin()首先执行
                        setTimeout(() => {
                            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                        console.log('---onMomentumScrollBegin-----')
                    }}
                ></FlatList>
                <Toast ref={'toast'}
                    position={'center'}
                />
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

const mapStateToProps = state => ({
    trending: state.trending,

});

const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url, pageSize, favoriteDao) =>
        dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) =>
        dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),

});

export default connect(mapStateToProps, mapDispatchToProps)(TopTabNavigatorOfFlatList);