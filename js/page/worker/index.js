import React, {Component} from 'react';
import DynamicTabNavigator from '../../navigator/DynamicTabNavigator';
import NavigationUtil from '../../navigator/NavigationUtil';
import TrendingPage from '../TrendingPage'

export default class Worker extends Component {
    constructor(props) {
        super(props)
        NavigationUtil.navigation = this.props.navigation;
    }

    render() {
        //FIX DynamicTabNavigator中的页面无法跳转到外层导航器页面的问题
       
        // return <DynamicTabNavigator/>;
        return <TrendingPage></TrendingPage>
        
    }

}