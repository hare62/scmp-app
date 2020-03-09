import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MD5 from "react-native-md5";
import ConfirmModal from '../../common/ConfirmModal';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);
    this.state = {
      phone: '',
      password: '',
      getLoginMessage: '',
      isShowConfirmModal: false,
    };
  }

  gotoWorkerPage() {
    NavigationManager.goPage('WorkerPage');
  }

  gotoDirectorPage() {
    NavigationManager.goPage('DirectorPage');
  }

  login() {
    const message = `电话:${this.state.phone}密码${MD5.hex_md5(this.state.password)}传给后台`;
    this.setState({
      getLoginMessage: message,
    })
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

  clickConfirmModal() {
    this.setState({
      isShowConfirmModal: false,
    });
  }

  gotoResetPassword() {
    NavigationManager.goPage('AuthPage');
  }

  render() {
    return (
      <View style={styles.containt}>
        <View  style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ width: 70 }}>
            账号/电话:
          </Text>
          <TextInput
            style={styles.inputStyles}
            placeholder="请输入电话号码"
            onChangeText={(phone) => this.setState({ phone })}
            value={this.state.phone}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ width: 70 }}>
            密码:
          </Text>
          <TextInput
            style={styles.inputStyles}
            placeholder="请输入密码"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <TouchableOpacity
          onPress={()=>this.gotoResetPassword()}
        >
          <Text style={{ marginTop: 20, }}>
            忘记密码
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => (this.login())}
        >
          <Text>登录</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: 200, borderWidth: 1, height: 40, borderRadius: 50, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc' }}
          onPress={() => this.showConfirmModal()}
        >
          <Text>打开提示语:账号和密码错误</Text>
        </TouchableOpacity>
        <Text>
          {this.state.getLoginMessage}
        </Text>
        <Text>LoginPage</Text>
        <Button
          title={"跳转到工人页面"}
          onPress={() => this.gotoWorkerPage()}
        ></Button>
        <Button
          style={{ marginTop: 50, flex: 1, }}
          title={"跳转到车间主任页面"}
          onPress={() => this.gotoDirectorPage()}
        ></Button>

        {/* <Button
         title={}
         
        /> */}
        <ConfirmModal
          visible={this.state.isShowConfirmModal}
          onClose={() => this.onCloseConfirmModal()}
          notice={'账号或密码错误'}
          callbackConfirm={() => this.clickConfirmModal()}
        ></ConfirmModal>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  containt: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 100,
    flex: 1,
  },
  inputStyles: {
    borderWidth: 1,
    color: 'red',
    width: 200,
    height: 40
  },
  loginButton: {
    height: 40,
    borderWidth: 1,
    width: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
})

export default LoginPage;