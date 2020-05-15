import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from '../page/welcome/WelcomePage';
import DirectorPage from '../page/director/DirectorPage';
import DetailPage from '../page/worker/DetailPage';
import WorkerPage from '../page/worker/WorkerPage';
import LoginPage from '../page/login/LoginPage';
import AddressPage from '../page/director/component/Address/AddressPage';
import ResetPasswordPage from '../page/login/ResetPasswordPage';
import AuthPage from '../page/login/AuthPage';
import QualityInspectorPage from '../page/qualityInspector/QualityInspectorPage';
import TechnologyProcessPage from '../page/qualityInspector/TechnologyProcessPage';
import MechanicalMessagePage from '../page/qualityInspector/MechanicalMessagePage';
import AddMechanicalPage from '../page/qualityInspector/AddMechanicalPage';
import BatchQualityPage from '../page/qualityInspector/BatchQualityPage';
import JobBooking from '../page/worker/JobBooking';
import DirectorDetailPage from '../page/director/DetailPage';
import WorkerSheetListPage from '../page/director/component/Address/WorkerSheetListPage';

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,
    },
  },
});

const LoginNavigator = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
})

const MainNavigator = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
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
  MechanicalMessagePage: {
    screen: MechanicalMessagePage,
    navigationOptions: {
      header: null
    }
  },
  AddMechanicalPage: {
    screen: AddMechanicalPage,
    navigationOptions: {
      header: null
    }
  },
  BatchQualityPage: {
    screen: BatchQualityPage,
    navigationOptions: {
      header: null
    }
  },
  JobBooking:{
    screen: JobBooking,
    navigationOptions: {
      header: null
    }
  },
  DirectorDetailPage:{
    screen: DirectorDetailPage,
    navigationOptions: {
      header: null
    }
  },
  WorkerSheetListPage:{
    screen: WorkerSheetListPage,
    navigationOptions: {
      header: null
    }
  }
});

const AppNavigators = createAppContainer(createSwitchNavigator(
  {
    Init: InitNavigator,
    // login:LoginNavigator,
    Main: MainNavigator,
  },
  {
    navigationOptions: {
      header: null,
    },
  })
);

export default AppNavigators;