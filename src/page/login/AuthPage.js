import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../navigation/NavigationManager';
import { fitSize } from '../../utils/Fit';
import CountdownBtn from './CountdownBtn';
import { isPhone } from '../../utils/RegExp';
import {
  getVerificationCode,
  getLoginInfoOfPhone
} from '../../redux/action/login/index';
import MD5 from "react-native-md5";
import Constants from '../../utils/Constants';
import { deviceWidthDp } from '../../utils/Fit';
import { isExist } from '../../utils/Util';
import Toast from 'react-native-easy-toast';
import { LoadingControl } from '../../common/Component/LoadingView';
import AsyncStorage from '@react-native-community/async-storage';

class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Number: 60,
      isCountdown: false,
      phone: "",
      isEdit: false,
      responseCode: "",
      entryCode: "",
      userName: "",
      showUserPhone: "",
      isShowResponsePhone: false,
    }
    props.navigation.addListener('didFocus', () => { this.resetLoginStatus() });
  }

  componentDidMount(){
    console.warn("pppp")
  }

  resetLoginStatus = async() =>{
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role_id");
    console.warn("重置登录状态");
    this.setState({
      phone:"",
      responseCode:"",
      entryCode:"",
    });
  }
 
  renderLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.pop();
        }}
      >
        <AntDesign
          name={'left'}
          size={fitSize(18)}
          style={{ color: 'white', marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  }

  loginOfPhone() {
    let { responseCode, entryCode, phone } = this.state;
    if (!isExist(phone)) {
      this.toast.show("手机号码不能为空");
      return false;
    }
    if (!isExist(entryCode)) {
      this.toast.show("验证码不能为空");
      return false;
    }
    let md5Code = MD5.hex_md5(entryCode);
    if (responseCode === md5Code) {
      this.setState({
        responseCode:""
      })
      console.warn("验证码后代校验通过");
      let { getLoginInfoOfPhone } = this.props;
      LoadingControl.show();
      getLoginInfoOfPhone(phone);

    }else{
      this.toast.show("验证码错误");
      return false;
    }
  }

  handlePhone = (phone) => {
    this.setState({
      phone,
      isEdit: false
    });
    if (isPhone(phone)) {
      this.setState({
        isEdit: true
      })
    }
  }

  handleEntryCode = (entryCode) => {
    this.setState({
      entryCode
    });
  }

  getCode = () => {
    let toNumber = this.state.phone;
    this.props.getVerificationCode(toNumber, res => {
      if(res===Constants.OVER_VERIFICATION_CODE){
        this.toast.show(Constants.OVER_VERIFICATION_CODE);
        return false;
      }
      //用于用户输入的验证码和后端的验证码 校验
      this.setState({ responseCode: res});
    });
  }

  handleUserName = (userName) => {
    this.setState({
      userName
    })
  }

  render() {
    const {
      isEdit,
      entryCode,
      phone,
      showUserPhone,
      isShowResponsePhone
    } = this.state;
    return (
      <View>
        <NavigationBar
          title={'验证码登录'}
          leftButton={this.renderLeftButton()}
        />
        <View style={styles.showResponsePhone}>
          {isShowResponsePhone ? <Text>请输入您绑定的手机号：{showUserPhone}</Text> : null}
        </View>
        <View style={styles.container}>
          <View style={styles.phoneText}>
            <Text style={styles.textWidth}>
              手机号码:
          </Text>
            <TextInput
              style={styles.inputStyles}
              placeholder={'请输入手机号码'}
              onChangeText={this.handlePhone}
              value={phone}
              keyboardType="numeric"
            ></TextInput>
          </View>
        </View>
        <View >
          <View style={styles.code}>
            <Text style={styles.textWidth}>
              验证码:
          </Text>
            <TextInput
              style={styles.codeInput}
              placeholder={'请输入验证码'}
              keyboardType="numeric"
              onChangeText={this.handleEntryCode}
              value={entryCode}
            ></TextInput>
            {/* <View
              style={[styles.isEdit]}
            > */}
              <CountdownBtn
                {...this.props}
                text={'点击获取验证码'}
                isEdit={isEdit}
                getVerificationCode={this.getCode}
              />
            {/* </View> */}
          </View>
        </View>
        <View style={styles.outContainer}>
          <TouchableOpacity
            style={[styles.loginButton]}
            onPress={() => { this.loginOfPhone() }}>
            <Text style={{ color: "white", fontSize: 18 }}>登录</Text>
          </TouchableOpacity>
        </View>  
        <Toast
          ref={(toast) => (this.toast = toast)}
          position={'top'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:50
  },
  outContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyles: {
    borderWidth: 1,
    width: 300,
    height: 40,
    borderColor: Constants.BORDER_COLOR,
    borderRadius:5
  },
  isEdit: {
    backgroundColor: '#41BD41',
    height: 40,
    justifyContent: 'center',
    width: 130,
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 20,
    borderColor: Constants.BORDER_COLOR,
    borderRadius:5
  },
  isNotEdit: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 20,
    width: 130,
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 20,
    borderColor: Constants.BORDER_COLOR,
    borderRadius:5
  },
  showResponsePhone: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 1
  },
  loginButton: {
    height: 40,
    width: deviceWidthDp * 0.7,
    backgroundColor: Constants.BUTTON,
    marginTop: 30,
    color: "white",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 50
  },
  codeInput:{
    borderWidth: 1, 
    width: 150, 
    height: 40 ,
    borderColor: Constants.BORDER_COLOR,
    borderRadius:5
  },
  code:{
    flexDirection: "row",
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 30
  },
  phoneText:{
    flexDirection: "row",
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 30
  },
  textWidth:{
    width:deviceWidthDp*0.13
  }
})

const mapDispatchToProps = (dispatch) => ({
  getVerificationCode(toNumber, callBack) {
    dispatch(getVerificationCode(toNumber, callBack));
  },
  getLoginInfoOfPhone(phone) {
    dispatch(getLoginInfoOfPhone(phone))
  }
})

export default connect(null, mapDispatchToProps)(AuthPage);
