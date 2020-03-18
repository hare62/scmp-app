import React, { Component } from 'react';
import LoginView from './component/LoginView';
import NavigationManager from '../../navigation/NavigationManager';
import { connect } from 'react-redux';
import { LoginStatusEnum, RoleTypeEnum } from './Constants';
import ConfirmModal from '../../common/ConfirmModal';
import { changeLoginStatus as changeLoginStatusAtion } from '../../action/login';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);
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

  shouldComponentUpdate(nextProps) {
    const { loginStatus, roleType } = nextProps;
    if (loginStatus === LoginStatusEnum.LoginSuccess) {
      if (roleType === RoleTypeEnum.QualityInspection) {
        NavigationManager.goPage('QualityInspectorPage');
      }

      return false;
    }

    return true;
  }

  render() {
    const { loginStatus } = this.props;
    return (
      <>
        <LoginView />
        {
          (loginStatus === LoginStatusEnum.LoginFailure) ? this.renderConfrimModal() : null
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  loginStatus: state.login.loginStatus,
  roleType: state.login.roleType
});

const mapDispatchToProps = (dispatch) => ({
  changeLoginStatus(loginStatus) {
    dispatch(changeLoginStatusAtion(loginStatus));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);