import React, { Component } from 'react';
import { 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    View, 
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../../action/index';
import NavigationBar from '../../common/NavigationBar';
import WorkshopDirectorDialog, { FilterConditionSpan } from '../../common/WorkshopDirectorDialog';
import TrendingTabPage from '../../common/TopTabNavigatorOfFlatList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationUtil from '../../navigator/NavigationUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FirstRequestData from './FirstRequest';
import { fit } from '../../common/Fit';

class WorkshopDirector extends Component {
    constructor(props) {
        super(props);
        NavigationUtil.navigation = this.props.navigation;
        this.tabNames = [
            { label: '未报工', requestData: 'C' },
            { label: '已报工', requestData: 'C#' },
            { label: '全部', requestData: 'PHP' },
        ];
        this.state = {
            FilterConditionData: FilterConditionSpan[0],
            isFirstRequest: true
        };
    }

    componentDidMount() {
        this.props.onfirstRequestWorkerData();
    }

    onSelectFilterConditionData(tab) {
        this.setState(() => ({
            isFirstRequest: false
        }))

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
            ];
        }

        this.dialog.dismiss();
        this.setState({
            FilterConditionData: tab,
        });
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
        );
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

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props =>
                    <TrendingTabPage 
                        {...props} 
                        FilterConditionData={this.state.FilterConditionData} 
                        tabLabel={item.requestData}
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
        return (
            <WorkshopDirectorDialog
                ref={dialog => this.dialog = dialog}
                onSelect={tab => this.onSelectFilterConditionData(tab)}
            />
        );
    }

    _tabNav() {
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
                    inactiveTintColor: '#000000',
                },
            },
        ));

        return this.tabNav;
    }

    render() {
        let statusBar = {
            barStyle: 'light-content',
            hidden: false,
            backgroundColor: "black",
        };

        let navigationBar = (<NavigationBar
            title={'我的派工单'}
            statusBar={statusBar}
            style={{ backgroundColor: '#376CDA' }}
            rightButton={this.renderRightButton()}
        />);

        const TabNavigator = this._tabNav();

        return (
            <View style={styles.container}>
                {navigationBar}
                {this.state.isFirstRequest ? <FirstRequestData {...this.props} /> : <TabNavigator />}
                {this.renderWorkshopDirectorDialog()}
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
        color: 'red',
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
    data: state.workshopDirector.data
});

const mapDispatchToProps = dispatch => ({
    onfirstRequestWorkerData: () => dispatch(actions.onfirstRequestWorkerData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopDirector);