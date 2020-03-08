import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../navigation/NavigationManager';
import { fitSize } from '../../utils/Fit';
// import NavigationManager from '../../navigation/NavigationManager'

class AuthPage extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);
    this.state = {
      Number: 60,
      isCountdown: false

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
    NavigationManager.goPage('ResetPasswordPage')
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
              账号/电话:
          </Text>
            <TextInput
              style={styles.inputStyles}
              placeholder={'请输入手机号码/账号'}
            ></TextInput>
          </View>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', marginLeft: 100, marginTop: 30 }}>
            <Text style={{ width: 70 }}>
              验证码:
          </Text>
            <TextInput
              style={{ borderWidth: 1, color: 'red', width: 100, height: 40 }}
              placeholder={'请输入验证码'}
            ></TextInput>
            <TouchableOpacity
              onPress={() => this.clickGetIdentifytCode()}
            >
              <View style={{ height: 40, justifyContent: 'center', marginLeft: 20, backgroundColor: '#ccc', width: 150, alignItems: 'center' }}>
                <View>
                  {
                    this.state.isCountdown ? <Text>{this.state.Number}</Text> : <Text>点击获取验证码</Text>
                  }
                </View>

              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{ height: 40, width: 100, backgroundColor: '#ccc', marginTop: 10, marginLeft: 100, justifyContent: "center", alignItems: 'center', borderRadius: 50 }}
          onPress={() => { this.gotoResetPasswordPage() }}>
          <Text >确定</Text>
        </TouchableOpacity>
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

export default AuthPage;
