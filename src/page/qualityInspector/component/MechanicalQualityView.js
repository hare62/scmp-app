import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import { FileSystem } from "react-native-unimodules"
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import AlertBox from '../../../common/Component/AlertBox';
import NavigationManager from '../../../navigation/NavigationManager';
import reducers from '../../../redux/reducer';
import { connect } from 'react-redux';
import { getNoMechanicalMessageDetail, postSaveResult, postSubmitResult } from '../../../redux/action/qualityInspector';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import Constants from '../../../utils/Constants';

class MechanicalQualityView extends Component {

  state = {
    isShow: false,
    title: ""
  }

  DownLoadFile(fileId, fileName) {
    const { fileArray } = this.props
    if (!fileArray) {
      this.setState({
        title: "下载之前请先上传文件",
        isShow: true
      }, () => {
        this.refs.ref1.changeState()
      })
    } else {
      MediaLibrary.requestPermissionsAsync().then(async (response) => {
        const { granted } = response
        if (granted) {
          const token = await AsyncStorage.getItem("token")
          const getProgress = (downloadProgress) => {
          }
          const downloadResumable = FileSystem.createDownloadResumable(
            `http://47.108.27.242:8080/file/file-center/fileDownload?fileName=${fileName}&configKey=SCMP-FILE&fileId=${fileId}`,
            FileSystem.documentDirectory + fileName,
            {
              headers: {
                "Content-Type": "application/json",
                'token': token
              }
            },
            getProgress
          )
          try {
            const { uri } = await downloadResumable.downloadAsync();
            MediaLibrary.createAssetAsync(uri).then((response) => {
            })
            console.log('Finished downloading to ', uri);
            this.setState({
              title: `     下载成功请在上传的文件夹里面里面查看下载的文件`,
              isShow: true
            }, () => {
              this.refs.ref1.changeState()
            })
          } catch (e) {
            console.error(e);
            this.setState({ isShow: true, title: "下载失败" }, () => {
              this.refs.ref1.changeState()
            })
          }
        }
      })
    }

  }
  gotoCamera = async () => {
    const permission1 = await MediaLibrary.requestPermissionsAsync()
    const permission2 = await Audio.requestPermissionsAsync()
    const permission3 = await Camera.requestPermissionsAsync()
    console.log(permission3, permission2, permission1)
    if (permission1.status === 'granted' && permission2.status === 'granted' && permission3.status === 'granted') {
      NavigationManager.push('LQcamera')
    }
  }

  renderDetailPage() {
    const {
      changeMechanical,
      mechanical,
      qualityResult,
      changeQualityResult,
      onRNFileSelector,
      uploadReport,
      isDownLoad,
      loadFileName,
      isDetailPage,
      fileArray,
    } = this.props;
    let { fileUploadData } = this.props;
    fileUploadData = fileUploadData !== undefined ? fileUploadData : { files: [""] }

    let temp = ['合格', '待审批'];
    const { isShow, title } = this.state;

    return (
      <View style={styles.containerM}>
        <View>
          <Text style={styles.titleM}>renderDetailPage零件号:</Text>
          <TextInput
            style={styles.textInputM}
            onChangeText={(mechanical) => { changeMechanical(mechanical) }}
            value={mechanical}
            // placeholder="请输入零件号"
            editable={isDetailPage ? false : true}
          />
        </View>
        <View >
          <Text style={styles.titleM}>质检结论{qualityResult}:</Text>
          <View style={styles.contentM}>
            {temp.map((item, index) => {
              return <TouchableOpacity
                style={styles.conclusion}
                key={index}
                // onPress={isDetailPage ? null : () => changeQualityResult(index)}
                // 根据中文文字去修改状态的
                underlayColor='transparent'>
                <Text style={(qualityResult === item) ? styles.selectM : styles.unSelectM}>{item}</Text>
              </TouchableOpacity>
            })}
          </View>
        </View>
        <View>
          {
            fileArray.map((item, index) => {
              return <TouchableOpacity
                key={index}
                style={styles.uploadM}
                onPress={(uploadReport) => { this.DownLoadFile(item.fileId, item.name) }}
              >
                <Text style={styles.uploadTextM}>点击下载文件 {item.name}</Text>
              </TouchableOpacity>
            })
          }
        </View>
        {/* <TouchableOpacity
          onPress={this.gotoCamera}
          style={styles.upload}
        ><Text>相机</Text>
        </TouchableOpacity> */}
        {isShow ? <AlertBox title={title} ref="ref1" /> : null}
      </View>
    );

  }

  renderQualityResultView(code, value) {
    const { qualityResult, changeQualityResult } = this.props;
    return (
      <TouchableOpacity
        style={styles.conclusion}
        key={code}
        onPress={() => changeQualityResult(code)}
        underlayColor='transparent'>
        <Text style={(qualityResult == code) ? styles.selectM : styles.unSelectM}>{value}</Text>
      </TouchableOpacity>
    )
  }

  renderAddPage() {
    const {
      changeMechanical,
      mechanical,
      qualityResult,
      changeQualityResult,
      onRNFileSelector,
      uploadReport,
      isDownLoad,
      isDetailPage,
    } = this.props;
    let temp = ['合格', '待审批'];
    return (
      <View style={styles.containerM}>
        <View>
          <Text style={styles.titleM}>renderAddPage零件号:</Text>
          <TextInput
            style={styles.textInputM}
            onChangeText={(mechanical) => { changeMechanical(mechanical) }}
            value={mechanical}
            placeholder="请输入零件号"
            editable={isDetailPage ? false : true}
          />
        </View>
        <View >
          <Text style={styles.titleM}>质检结论:</Text>
          <View style={styles.contentM}>
            {this.renderQualityResultView("01", "合格")}
            {this.renderQualityResultView("02", "待审批")}

          </View>
        </View>
        <TouchableOpacity
          style={styles.uploadM}
          onPress={() => { onRNFileSelector() }}
        >
          <Text >上传质检报告</Text>
        </TouchableOpacity>
        {uploadReport.map((item) => {
          return (<View
            style={styles.uploadContain}
          >
            <Text >{item}</Text>
          </View>)
        })}
        {/* <TouchableOpacity
          style={styles.uploadM}
          onPress={() => { onRNFileSelector() }}
        >
          <Text style={styles.uploadTextM}>{uploadReport}</Text>
        </TouchableOpacity> */}
      </View>
    );

  }

  renderModefyPage() {
    const {
      changeMechanical,
      mechanical,
      qualityResult,
      changeQualityResult,
      onReplaceFile,
      uploadReport,
      fileArray
    } = this.props;
    let temp = ['合格', '待审批'];

    return (
      <View style={styles.containerM}>
        <View>
          <Text style={styles.titleM}>renderModefyPage零件号:</Text>
          <TextInput
            style={styles.textInputM}
            onChangeText={(mechanical) => { changeMechanical(mechanical) }}
            value={mechanical}
            placeholder="请输入零件号"
          />
        </View>
        <View >
          <Text style={styles.titleM}>质检结论:</Text>
          <View style={styles.contentM}>
            {this.renderQualityResultView("01", "合格")}
            {this.renderQualityResultView("02", "待审批")}
          </View>
        </View>
        <View>
          {
            fileArray.map((item, index) => {
              return <TouchableOpacity
                key={index}
                style={styles.uploadM}
                onPress={(uploadReport) => { onReplaceFile( index) }}
              >
                <Text style={styles.uploadTextM}>{item.name}点击更换上传文件</Text>
              </TouchableOpacity>
            })
          }
        </View>
      </View>
    );

  }

  render() {
    let { isAddPage, isModifyPage, isDetailPage } = this.props;

    if (isModifyPage) {//存在实际值===修改页面
      return this.renderModefyPage()
    } else if (isAddPage) {//不存在实际值===新增页面
      return this.renderAddPage();
    } else if (isDetailPage) {//存在实际值&&没有提交按钮
      return this.renderDetailPage();
    }
    return <></>
  }
}

const styles = StyleSheet.create({
  containerM: {
    backgroundColor: '#F2F6F8',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  titleM: {
    height: 30,
    lineHeight: 30,
    color: "#BBBFC0"
  },
  conclusion: {
    justifyContent: 'center',
    alignItems: 'center',
    color: "white"
  },
  selectM: {
    backgroundColor: '#2E6AE2',
    padding: 10,
    borderRadius: 20,
    color: "white",
    opacity: 0.9
  },
  unSelectM: {
    color: "#BBBFC0"
  },
  contentM: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    lineHeight: 50,
    backgroundColor: "white"
  },
  textInputM: {
    backgroundColor: "white",
    marginTop: 10,
    paddingLeft: 5,
    color: "black"
  },
  uploadM: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    backgroundColor: Constants.BUTTON,
  },
  uploadTextM: {
    color: "black",
    lineHeight: 20,
    textAlign: "left",
    letterSpacing: 0,
    fontStyle: 'normal',
    textDecorationStyle: "dotted",
    textTransform: "none",
    fontSize: 16
  },
  uploadContain: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ccc",
    paddingLeft: 10,
  }
});
const mapStateToProps = (state) => ({
  fileUploadData: state.qualityInspector.fileUploadData,
})
export default connect(mapStateToProps, null)(MechanicalQualityView);
