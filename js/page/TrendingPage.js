import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    View,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../action/index';
import TrendingItem from '../common/TrendingItem';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import WorkshopDirectorDialog, { TimeSpans } from '../common/WorkshopDirectorDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FavoriteDao from "../expand/dao/FavoriteDao";
import { FLAG_STORAGE } from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import NavigationUtil from '../navigator/NavigationUtil';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeSpan from '../model/TimeSpan';
import {fit} from '../common/fit'
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);


const URL = 'https://github.com/trending/';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#AA2F23'
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE'
// 1.
export default class TrendingPage extends Component {

    constructor(props) {
        super(props);
        // this.tabNames = ['C', 'C#', 'PHP', 'JavaScript'];
        this.tabNames = [
            { label: '未报工', requestData: 'C' },
            { label: '已报工', requestData: 'C#' },
            { label: '全部', requestData: 'PHP' },

        ];
        this.state = {
            timeSpan: TimeSpans[0],
        };
    }


    renderTitleView() {
        return <View>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={() => this.dialog.show()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: fit(18),
                        color: '#FFFFFF',
                        fontWeight: '400',
                    }}>我的派工单</Text>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={fit(22)}
                        style={{ color: 'white' }}
                    />
                </View>
            </TouchableOpacity>
        </View>;
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                // screen: props => <TrendingTabPage {...props} tabLabel={item} />,
                screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item.requestData}
                // theme={theme} 
                />,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
                navigationOptions: {
                    title: item.label,


                },

            }
        });
        return tabs;
    }
    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan: tab,
        });
        // DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
    }



    renderWorkshopDirectorDialog() {
        return <WorkshopDirectorDialog
            ref={dialog => this.dialog = dialog}
            onSelect={tab => this.onSelectTimeSpan(tab)}
        />;
    }
    _tabNav() {
        // if (!this.tabNav) {//优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建
            this.tabNav = createAppContainer(createMaterialTopTabNavigator(
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
        // }

        return this.tabNav
    }

    createDailyData() {
        this.tabNames = [
            { label: '未报工', requestData: 'C' },
            { label: '已报工', requestData: 'C#' },
            { label: '全部', requestData: 'PHP' },

        ];

        return this.onSelectTimeSpan( new TimeSpan('今 天', 'since=daily'))
    }

    createWeeklyData() {
        this.tabNames = [
            { label: '最近三天', requestData: 'javaScript' },
            { label: '最近一周', requestData: 'C#' },
            { label: '最近半年', requestData: 'PHP' },

        ];
        return this.onSelectTimeSpan(new TimeSpan('本 周', 'since=weekly'))
    }

    renderRightButton() {
        return (<View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => this.createWeeklyData()}>
                <Ionicons
                    name={'ios-timer'}
                    size={fit(20)}
                    style={{ color: 'white', marginRight: fit(20) }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.createDailyData()}>
                <AntDesign
                    name={'filter'}
                    size={fit(20)}
                    style={{ color: 'white', marginRight: fit(20) }}
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
            // titleView={this.renderTitleView()}
            title={'我的派工单'}
            statusBar={statusBar}
            // style={theme.styles.navBar}
            style={{ backgroundColor: '#376CDA' }}
            rightButton={this.renderRightButton()}
        />

        const TabNavigator = this._tabNav();
        return (
            <View style={styles.container}>
                {navigationBar}
                <TabNavigator />
                {this.renderWorkshopDirectorDialog()}
            </View>
        );
    }

}
const pageSize = 10;//设为常量，防止修改
class TrendingTab extends Component {
    constructor(props) {
        super(props);

        const { tabLabel, timeSpan } = this.props;
        this.timeSpan = timeSpan;
        this.storeName = tabLabel
    }

    componentDidMount() {
        this.loadData()
        // this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
        //     this.timeSpan = timeSpan;
        //     this.loadData();
        // });
        // EventBus.getInstance().addListener(EventTypes.favoriteChanged_trending, this.favoriteChangeListener = () => {
        //     this.isFavoriteChanged = true;
        // });
        // EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
        //     if (data.to === 1 && this.isFavoriteChanged) {
        //         this.loadData(null, true);
        //     }
        // });

    }
    componentWillUnmount() {
        // if (this.timeSpanChangeListener) {
        //     this.timeSpanChangeListener.remove();
        // }
        // EventBus.getInstance().removeListener(this.favoriteChangeListener);
        // EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }
    /**
    * 获取与当前页面有关的数据
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
        let pageIndex = ++store.pageIndex
        if (loadMore) {
            onLoadMoreTrending(this.storeName, pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else {
            onRefreshTrending(this.storeName, url, pageSize, favoriteDao)
        }



    }

    genFetchUrl(key) {

        return URL + key + '?' + this.timeSpan.searchText;
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
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
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
        let store = this._store();
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
                        // this.loadData(true);
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
const mapStateToProps = state => ({
    trending: state.trending
})

const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) =>
        dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, favoriteDao, callBack))
})

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        minWidth: fit(20),
        color: 'red'
    },
    indicatorStyle: {
        height: fit(2),
        backgroundColor: '#376CDA',

    },
    labelStyle: {
        fontSize: 16,
        marginTop: fit(6),
        marginBottom: fit(6),
        color: "#376CDA"
    },
    activeTintColor: {
        color: 'red'
    },
});