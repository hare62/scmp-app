import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import Login from '../page/Login'
import Worker from '../page/worker/index'

const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null,//隐藏头部
            },
        },
        Login:{
            screen: Login,
            navigationOptions: {
                header: null,//隐藏头部
            }
        },
    },
);
const MainNavigator = createStackNavigator({
    Worker:{
        screen: Worker,
        navigationOptions: {
            header: null,//隐藏头部
        }
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,//隐藏头部
        },
    },
    DetailPage:  {
        screen: DetailPage,
        navigationOptions: {
            header: null,//隐藏头部
        }
    },
   
});
export default createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,
    },
}));