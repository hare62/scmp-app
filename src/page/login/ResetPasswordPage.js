import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../navigation/NavigationManager';
import { fitSize } from '../../utils/Fit';

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);
    this.state = {
      Number: 60,
      isCountdown: false,
      newPassword:null

    }
  }

  renderLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.goBack();
        }}
      >
        <AntDesign
          name={'left'}
          size={fitSize(18)}
          style={{ color: '#376CDA', marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  }

  clickGetIdentifytCode() {
    this.setState({
      isCountdown: true
    })
    // setInterval(()=>{
    //   this.setState({
    //     Number:(--this.state.Number)
    //   })
    // },1000)
  }

  gotoResetPasswordPage() {
    const pwpattent = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,15}$/;
    const { newPassword } = this.state;
    if(pwpattent.test(newPassword)){
      console.warn('包含大小写字母、数字、特殊字符至少3个组合大于8个字符');
      return;
    }
    console.warn('密码校验通过');
    NavigationManager.goPage('LoginPage')
  }

  render() {
    return (
      <View>
        <NavigationBar
          title={'获取验证码'}
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
          leftButton={this.renderLeftButton()}
        />
        <View style={styles.container}>
          <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', marginLeft: 100, marginTop: 30 }}>
            <Text style={{ width: 70 }}>
              新密码:
          </Text>
            <TextInput
              style={styles.inputStyles}
              placeholder={'请输入新密码'}
              value={this.state.newPassword}
            ></TextInput>
          </View>
          <View style={{ height: 40, marginTop:50, marginLeft: 100, justifyContent: "center", alignItems: 'flex-start', }}>
            <Text style={{color:'red',}}>包含大小写字母，数字,特殊字符,长度至少8位。</Text>
          </View>

          <TouchableOpacity
            style={{ height: 40, width: 100, backgroundColor: '#ccc',marginTop:10, marginLeft: 100, justifyContent: "center", alignItems: 'center', borderRadius: 50 }}
            onPress={() => { this.gotoResetPasswordPage() }}>
            <Text>提交</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center'
  },
  inputStyles: {
    borderWidth: 1,
    color: 'red',
    width: 200,
    height: 40
  },

})

export default ResetPasswordPage;
