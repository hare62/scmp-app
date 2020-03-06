import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import DirectorPage from '../page/director/DirectorPage';
import DetailPage from '../page/detail/DetailPage';
import WorkerPage from '../page/worker/WorkerPage';
import LoginPage from '../page/login/index';
import AddressPage from '../page/director/component/Address/AddressPage'
const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,
    },
  },
});

const MainNavigator = createStackNavigator({
  DirectorPage: {
    screen: DirectorPage,
    navigationOptions: {
      header: null,
    },
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null,
    },
  },
  WorkerPage: {
    screen: WorkerPage,
    navigationOptions: {
      header: null
    }
  },
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  AddressPage: {
    screen: AddressPage,
    navigationOptions: {
      header: null
    }
  }

});

const AppNavigators = createAppContainer(createSwitchNavigator(
  {
    Init: InitNavigator,
    Main: MainNavigator,
  },
  {
    navigationOptions: {
      header: null,
    },
  })
);

export default AppNavigators;