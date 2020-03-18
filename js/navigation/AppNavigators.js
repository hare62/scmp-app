import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from '../page/welcome/WelcomePage';
import DirectorPage from '../page/director/DirectorPage';
import DetailPage from '../page/detail/DetailPage';
import WorkerPage from '../page/worker/WorkerPage';
import LoginPage from '../page/login/LoginPage';
import AddressPage from '../page/director/component/Address/AddressPage';
import ResetPasswordPage from '../page/login/ResetPasswordPage';
import AuthPage from '../page/login/AuthPage';
import QualityInspectorPage from '../page/qualityInspector/QualityInspectorPage';
import TechnologyProcessPage from '../page/technologyProcess/TechnologyProcessPage';
import MechanicalMessagePage from '../page/mechanicalMessage/MechanicalMessagePage';

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
  ResetPasswordPage: {
    screen: ResetPasswordPage,
    navigationOptions: {
      header: null
    }
  },
  AuthPage: {
    screen: AuthPage,
    navigationOptions: {
      header: null
    }
  },
  AddressPage: {
    screen: AddressPage,
    navigationOptions: {
      header: null
    }
  },
  QualityInspectorPage: {
    screen: QualityInspectorPage,
    navigationOptions: {
      header: null
    }
  },
  TechnologyProcessPage: {
    screen: TechnologyProcessPage,
    navigationOptions: {
      header: null
    }
  },
  MechanicalMessagePage:{
    screen: MechanicalMessagePage,
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