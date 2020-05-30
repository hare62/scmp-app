import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import LoginView from './component/LoginView';
import NavigationManager from '../../navigation/NavigationManager';
import { connect } from 'react-redux';
import { LoginStatusEnum, RoleTypeEnum } from './Constants';
import ConfirmModal from '../../common/Component/ConfirmModal';
import { changeLoginStatus as changeLoginStatusAtion } from '../../redux/action/login';
import { LoadingControl } from '../../common/Component/LoadingView';
import RNFS, { hash, readFile } from 'react-native-fs';
import RNFileSelector from 'react-native-file-selector';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);
    this.clickBotton = this.clickBotton.bind(this);
  }

  componentDidMount() {
  }

  clickBotton() {
    RNFileSelector.Show(
      {
        title: 'Select File',
        onDone: (path) => {
          console.warn('file selected: ' + path)
        },
        onCancel: () => {
        }
      }
    )
  }

  componentWillUnmount() {
    const { changeLoginStatus } = this.props;
    changeLoginStatus(LoginStatusEnum.Unlogin);
  }

  renderConfrimModal() {
    const { changeLoginStatus } = this.props;
    return (
      <ConfirmModal
        visible={true}
        onClose={() => changeLoginStatus(LoginStatusEnum.Unlogin)}
        notice={'账号或密码错误'}
        callbackConfirm={() => changeLoginStatus(LoginStatusEnum.Unlogin)}
      />
    );
  }

  renderNetWorkErrorModal() {
    const { changeLoginStatus } = this.props;
    return (
      <ConfirmModal
        visible={true}
        onClose={() => changeLoginStatus(LoginStatusEnum.Unlogin)}
        notice={'请检查网络'}
        callbackConfirm={() => changeLoginStatus(LoginStatusEnum.Unlogin)}
      />
    );
  }

  shouldComponentUpdate(nextProps) {
    const { loginStatus, roleType } = nextProps;

    if (loginStatus === LoginStatusEnum.LoginSuccess) {

      LoadingControl.hide();
      if (roleType === RoleTypeEnum.QualityInspection) {
        NavigationManager.goPage('QualityInspectorPage');

      } else if (roleType === RoleTypeEnum.Worker) {
        NavigationManager.goPage('WorkerPage');
      } else if (roleType === RoleTypeEnum.Director) {
        NavigationManager.goPage('DirectorPage');
      }
      return false;
    } else if (loginStatus === LoginStatusEnum.LoginFailure) {
      LoadingControl.hide();
    } else if (loginStatus === LoginStatusEnum.NetWorkError) {
      LoadingControl.hide();
    }

    return true;
  }

  render() {
    const { loginStatus } = this.props;
    return (
      <>
        <LoginView />
        { (loginStatus === LoginStatusEnum.NetWorkError) ? this.renderNetWorkErrorModal() : null}
        { (loginStatus === LoginStatusEnum.LoginFailure) ? this.renderConfrimModal() : null }
      </>
    )
  }
}

const styles = StyleSheet.create({
  list: {

  },
  listElement: {

  }
})

const mapStateToProps = (state) => ({
  loginStatus: state.login.loginStatus,
  roleType: state.login.roleType,
});

const mapDispatchToProps = (dispatch) => ({
  changeLoginStatus(loginStatus) {
    dispatch(changeLoginStatusAtion(loginStatus));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);