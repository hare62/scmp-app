import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    View,
    FlatList,
    RefreshControl,
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../../action/index';
import TrendingItem from '../../common/TrendingItem';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../../common/NavigationBar';
import WorkshopDirectorDialog, { TimeSpans } from '../../common/WorkshopDirectorDialog';
import TopTabNavigatorOfFlatList from '../../common/TopTabNavigatorOfFlatList'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FavoriteDao from "../../expand/dao/FavoriteDao";
import { FLAG_STORAGE } from "../../expand/dao/DataStore";
import NavigationUtil from '../../navigator/NavigationUtil';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fit } from '../../common/Fit';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
const URL = 'https://github.com/trending/';
const THEME_COLOR = '#AA2F23';

export default class WorkshopDirector extends Component {
    constructor(props) {
        super(props);

        NavigationUtil.navigation = this.props.navigation;
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

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item.requestData}
                />,
                navigationOptions: {
                    title: item.label,
                    headerShown: false
                },
            };
        });

        return tabs;
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

    onSelectTimeSpan(tab) {
        console.log('tab', tab)
        if (tab.searchText === 'since=monthly') {
            this.tabNames = [
                { label: '未报工', requestData: 'C' },
                { label: '已报工', requestData: 'C#' },
                { label: '全部', requestData: 'PHP' },
            ];
        }

        if (tab.searchText === 'since=daily') {
            this.tabNames = [
                { label: '最近三天', requestData: 'javaScript' },
                { label: '最近一周', requestData: 'C++' },
                { label: '最近半年', requestData: 'python' },
            ];
        }

        if (tab.searchText === 'since=weekly') {
            this.tabNames = [
                { label: '胡老师', requestData: 'javaScript' },
                // { label: '最近一周', requestData: 'C++' },
                // { label: '最近半年', requestData: 'python' },
            ];
        }

        this.dialog.dismiss();
        this.setState({
            timeSpan: tab,
        });
        // DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
    }

    renderRightButton() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => this.dialog.show()}>
                    <AntDesign
                        name={'filter'}
                        size={fit(20)}
                        style={{ color: 'white', marginRight: fit(20) }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderTitleView() {
        return (
            <View>
                <TouchableOpacity
                    underlayColor='transparent'
                    onPress={() => this.dialog.show()}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: fit(16),
                            color: '#FFFFFF',
                            fontWeight: '400',
                        }}>派工单</Text>
                        <MaterialIcons
                            name={'arrow-drop-down'}
                            size={fit(20)}
                            style={{ color: 'white' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        let statusBar = {
            barStyle: 'light-content',
            hidden: false,
            backgroundColor: "black",
        };

        let navigationBar = <NavigationBar
            // titleView={this.renderTitleView()}
            title={'派工单'}
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

const mapStateToProps = state => ({
    trending: state.trending
})

const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url, pageSize, favoriteDao) =>
        dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) =>
        dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, favoriteDao, callBack))
})

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TopTabNavigatorOfFlatList)

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