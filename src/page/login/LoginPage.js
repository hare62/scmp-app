import React, { Component } from 'react';
import {
  StyleSheet
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
    let partFiles = "361<362|IMG_20200523_084828.jpg<IMG_20200523_084826.jpg<";
    //  partFiles=partFiles.TrimEnd('<')
    // let arr=["a","b"];
    // arr[0]="p";
    // console.log(arr)
  //  let fileArray= [
  //     {fileId:'361',name:'IMG_20200523_084828.jpg'},
  //     {fileId:'362',name:'IMG_20200523_084826.jpg'},
  //   ]
  //   let id=[];
  //   let name=[];
  //   for (let i=0;i<fileArray.length;i++){
  //     id.push(fileArray[i].fileId)
  //     name.push(fileArray[i].name)
  //   }
  //   console.log(id,name)



     
// console.warn(partFiles)



// let name = ["IMG_20200523_082243.jpg", "IMG_20200523_082240.jpg"];
// let id = [355, 356];
// let nameString = name.join("<")
// let idString = id.join("<")
// let arr = [];
// arr.push(idString);
// arr.push(nameString); 
// console.log(arr.join("|"))   
  }

  readFile() {
    readFile('/storage/emulated/0/DCIM/Camera/IMG_20200407_155535.jpg', 'base64').then((result) => {
      console.log("reasFile", result)
    }).catch((error) => {
      console.log("error", error)
    })
  }

  baseUsage() {
    // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        console.log('GOT RESULT', result);
        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          console.log("-----", statResult[1])
          return RNFS.readFile(statResult[1], 'utf8');
        }
        return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log('contents', contents);
      })
      .catch((err) => {
        console.log("err", err.message, err.code);
      });
  }

  clickBotton() {
    RNFileSelector.Show(
      {
        title: 'Select File',
        onDone: (path) => {
          console.warn('file selected: ' + path)
        },
        onCancel: () => {
          console.log('cancelled')
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
        {
          (loginStatus === LoginStatusEnum.NetWorkError) ? this.renderNetWorkErrorModal() : null
        }
        {
          (loginStatus === LoginStatusEnum.LoginFailure) ? this.renderConfrimModal() : null
        }
        {/* <TouchableOpacity activeOpacity={0.8} onPress={this.clickBotton}>
          <Text style={{fontSize:16,color:'#ffd339',textAlign:'center',height:50,backgroundColor:'red'}}>
            下载
          </Text>
        </TouchableOpacity> */}
      </>
    )
  }
}

const styles = StyleSheet.create({
  list:{

  },
  listElement:{

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