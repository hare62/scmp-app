import React, { Component } from 'react';
import { View, } from 'react-native';
import actions from '../action'
import { FLAG_STORAGE } from "../expand/dao/DataStore";
import WorkshopDirectorDispatchList from './WorkshopDirectorDispatchList';
import FavoriteDao from "../expand/dao/FavoriteDao";
import { connect } from 'react-redux';

const pageSize = 10;//设为常量，防止修改
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
        return URL + key + '?' + this.FilterConditionData.searchText;
    }

    render() {
        this.navigation = this.props;
        let store = this._store();
        console.log('this.props.data', store)
        return (
            <View >
                <WorkshopDirectorDispatchList data={store.projectModels}  ></WorkshopDirectorDispatchList>
            </View>
        );
    }
}

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