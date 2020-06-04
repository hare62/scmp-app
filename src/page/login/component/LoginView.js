import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import NavigationManager from '../../../navigation/NavigationManager';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import ConfirmModal from '../../../common/Component/ConfirmModal';
import { getLoginInfo, authenticationRole } from '../../../redux/action/login/index';
import { connect } from 'react-redux';
import images from '../../../assets/image.js';
import { deviceHeightDp, deviceWidthDp } from '../../../utils/Fit';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { fitSize } from '../../../utils/Fit';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import Toast from 'react-native-easy-toast';
import { LoadingControl } from '../../../common/Component/LoadingView';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      password: '',
      getLoginMessage: '',
      isShowConfirmModal: false,
    };
  }

  catchLoginFailure() {
    this.setState({
      isShowConfirmModal: true
    })
  }

  gotoWorkerPage() {
    NavigationManager.goPage('WorkerPage');
  }

  gotoDirectorPage() {
    NavigationManager.goPage('DirectorPage');
  }

  login() {
    const { getLoginInfo } = this.props;
    const isAjax = true;
    const { userInfo, password } = this.state;
    if (!userInfo || !password) {//校验表单数据是否有值
      const result = "账号和密码均不能为空";
      this.toast.show(result);
      return false;
    }
    LoadingControl.show();
    getLoginInfo(userInfo, password, isAjax);

  }

  onCloseConfirmModal() {
    this.setState({
      isShowConfirmModal: false
    });
  }

  showConfirmModal() {
    this.setState({
      isShowConfirmModal: true,
    });
  }

  gotoResetPassword = () => {
    NavigationManager.push('AuthPage');
  }

  render() {
    const { isShowConfirmModal, } = this.state;
    const confirmModal = (<ConfirmModal
      visible={true}
      onClose={() => this.onCloseConfirmModal()}
      notice={'账号或密码错误'}
      callbackConfirm={() => this.onCloseConfirmModal()}
    />);
    return (
      <View style={styles.containt}>
        <ImageBackground style={styles.login_background} source={images.login_background} >
          <View style={styles.head_sculpture} >
            <EvilIcons
              name={"user"}
              size={fitSize(150)}
              style={{ color: 'white', }}
            />
          </View>
          <Fumi
            label={'请输入您的用户名/手机号'}
            iconClass={FontAwesomeIcon}
            iconName={'user-circle-o'}
            iconColor={'#4EADEF'}
            iconSize={30}
            iconWidth={60}
            onChangeText={(userInfo) => this.setState({ userInfo })}
            value={this.state.userInfo}
            inputPadding={27}
            style={{ fontWeight: 0, width: deviceWidthDp * 0.8, backgroundColor: 'rgba(0,0,0,0)', borderBottomWidth: 1, borderBottomColor: '#606367' }}
          />

          <Fumi
            secureTextEntry
            label={'请输入密码'}
            iconClass={FontAwesomeIcon}
            iconName={'key'}
            iconColor={'#4EADEF'}
            iconSize={30}
            iconWidth={60}
            inputPadding={27}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            style={{ width: deviceWidthDp * 0.8, marginTop: 15, backgroundColor: 'rgba(0,0,0,0)', borderBottomWidth: 1, borderBottomColor: '#606367' }}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => (this.login())}
          >
            <Text style={{ fontSize: 25, color: 'white', }}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.gotoResetPassword}
            style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
          >
            <Text style={{ marginTop: 20, color: '#4EADEF', textDecorationLine: 'underline' }}>
              点击用手机号登录
            </Text>
          </TouchableOpacity>
          {isShowConfirmModal ? confirmModal : null}
          <Toast
            ref={(toast) => (this.toast = toast)}
            position={'center'}
          />
        </ImageBackground>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  containt: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  head_sculpture: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  inputStyles: {
    color: 'red',
    width: deviceWidthDp * 0.8,
    height: 50,
    borderBottomColor: '#606367',
    borderBottomWidth: 1,
    fontSize: 20,
    position: "relative"
  },
  input_icon: {
    position: "absolute",
    width: 30,
    height: 30,
  },
  loginButton: {
    height: 55,
    width: deviceWidthDp * 0.8,
    backgroundColor: '#40BD40',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    fontSize: 20,
    justifyContent: 'center',
    marginTop: 80
  },
  login_background: {
    width: deviceWidthDp,
    height: deviceHeightDp,
    alignItems: 'center',
  },
})

const mapState = (state) => ({
  loginStatus: state.login.loginStatus,
})

const mapDispatchToProps = (dispatch) => ({
  getLoginInfo(userInfo, password, isAjax) {
    dispatch(getLoginInfo(userInfo, password, isAjax));
  },
  authenticationRole(userId, token) {
    dispatch(authenticationRole(userId, token));
  },
})

export default connect(mapState, mapDispatchToProps)(LoginView);