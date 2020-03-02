import React, { Component } from 'react';
import { 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    View, 
    Animated, 
    Easing
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
        this.animatedValue = new Animated.Value(0);

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
        this.animate();
        this.props.onfirstRequestWorkerData();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.animate());
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
        // const opacity = this.animatedValue.interpolate({
        //     inputRange: [0, 0.5, 1],
        //     outputRange: [0, 1, 0]
        // })
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props =>
                    // <Animated.View
                    //     style={{
                    //         // opacity,
                    //         // marginTop: -80,
                    //         // height: 30,
                    //         // width: 40,
                    //         // backgroundColor: 'blue'
                    //     }} >
                    //     <TrendingTabPage {...props} FilterConditionData={this.state.FilterConditionData} tabLabel={item.requestData}
                    //     />
                    // </Animated.View>

                    <TrendingTabPage 
                        {...props} 
                        FilterConditionData={this.state.FilterConditionData} 
                        tabLabel={item.requestData}
                    />
                ,
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
                    // showLabel: false,
                    // showIcon: true,
                },
            },
        ));

        return this.tabNav;
    }

    render() {
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        });

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
        const AnimatedTabNavigator = (
                    <Animated.View
                        style={{
                            opacity,
                            marginTop: 80,
                            height: 30,
                            width: 40,
                            backgroundColor: 'blue'
                        }} >
                    </Animated.View>
                );
      
        return (
            <View style={styles.container}>
                {navigationBar}
                {/* {<TabNavigator />} */}
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
        // marginTop:-50
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