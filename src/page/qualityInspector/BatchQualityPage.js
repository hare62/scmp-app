import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import {
  getNoMechanicalMessageDetail,
  postSubmitResult,
  postSaveResult,
  getStandarItemDetailOfNoMechanical,
  onChangeNoChanicalRealValueResult,
  getModifyFilePath
} from '../../redux/action/qualityInspector/index';
import MechanicalDetailView from './component/MechanicalDetailView';
import NormalTremView from './component/NormalTremView';
import ModelNoticeView from '../../common/Component/ModelNoticeView';
import Constants from '../../utils/Constants';
import { isExist } from '../../utils/Util';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import { reqFileUpload, reqMD5 } from '../../api';
import { FileSystem } from "react-native-unimodules";
import AlertBox from '../../common/Component/AlertBox';

class BatchQualityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qualified: '',//合格
      wshareQty: "",//待审批数量
      isShowNotice: false,
      noticeText: "",
      mqualifiedQty: null,//修改的合格
      mshareQty: null,//修改待审批
      noticeText: "",
      uploadFileName: [],//上传的文件名字
      uploadFileID: [],//上传的文件ID
      isShow: false,
      title: "",
      files: [],
      fileArray: [],
      loadFileID: "",
      loadFileName: "",
      isDisabledSubmitButton: true
    }

    this.changeResult = this.changeResult.bind(this);
    this.showModelNoticeView = this.showModelNoticeView.bind(this);
    this.onRNFileSelector = this.onRNFileSelector.bind(this);
    this.saveModifyResult = this.saveModifyResult.bind(this);
  }

  componentDidMount() {
    const {
      qualifiedQty,
      shareQty,
      technologyId,
      proInspectionId,
      isSubmit,
    } = this.props.navigation.state.params.item;
    let { getStandarItemDetailOfNoMechanical, getModifyFilePath } = this.props;
    console.log("ppp", proInspectionId)
    let fileArray = [];
    if (qualifiedQty && isSubmit) {//有质检结论&&有提交按钮===修改页面
      getModifyFilePath({ proInspectionId }, (partFiles) => {
        if (partFiles) {
          partFiles = partFiles.substring(0, partFiles.length - 1);
          let arr = partFiles.split("|");
          console.log(arr);
          // let uploadFileName =  ["IMG_20200523_082243.jpg", "IMG_20200523_082240.jpg"];
          // let uploadFileID = [355, 356];
          let fileID = arr[0].split("<");
          let fileName = arr[1].split("<");
          for (let i = 0; i < (fileID.length - 1); i++) {
            let data = {};
            data.fileId = fileID[i];
            data.name = fileName[i];
            fileArray.push(data);
          }
          //修改页面
          this.setState({
            fileArray: fileArray,
            loadFileID: fileID,
            loadFileName: fileName
          })
        }
      });
    }

    getStandarItemDetailOfNoMechanical(technologyId, proInspectionId);
    //存在在state中好修改合格和待审批
    this.setState({
      mqualifiedQty: qualifiedQty,
      mshareQty: shareQty
    })
  }

  renderTabLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.pop();
        }}
      >
        <AntDesign
          name={'left'}
          size={18}
          style={{ color: 'white', marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  }

  changeResult(realNumber, index) {
    const { standarItemOfNoMechanical, onChangeNoChanicalRealValueResult } = this.props;
    let data = [...standarItemOfNoMechanical];
    data[index].realNumber = realNumber;
    onChangeNoChanicalRealValueResult(data);
  }

  onRNFileSelector() {
    const { files } = this.state
    MediaLibrary.requestPermissionsAsync().then(async (response) => {
      const { granted } = response
      if (granted) {
        DocumentPicker.getDocumentAsync({ multiplea: true }).then((response) => {
          const { uri, name, type } = response;
          this.setState({
            isShowNotice: true,
            noticeText: "文件正在上传中",
          })
          if (type == "success") {
            FileSystem.getInfoAsync(uri, { md5: true }).then(async (response) => {
              const { md5 } = response
              let obj = {
                "fileName": name,
                "md5": md5,
                "configKey": 'SCMP-FILE'
              }
              const result = await reqMD5(obj)
              if (result.STATUS == "success" && result.MESSAGE == "MD5值存在") {
                this.setState({
                  noticeText: "此文件已存在请勿重复上传",
                }, () => {
                  setTimeout(() => {
                    this.setState({
                      isShowNotice: false,
                    })
                  }, 5000);
                })
              } else {
                FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 }).then(async (response) => {
                  let file = { uri: uri, type: 'multipart/form-data', name: name }
                  let formData = new FormData();
                  formData.append('file', file)
                  formData.append("configKey", 'SCMP-FILE');
                  formData.append("md5", md5);
                  const result = await reqFileUpload(formData)
                  if (result.STATUS == "success") {
                    if (this.state.uploadReport === "上传质检报告") {
                      let uploadFileName = [...this.state.uploadFileName];
                      uploadFileName.push(name);
                      let uploadFileID = [...this.state.uploadFileID];
                      uploadFileID.push(result.FILEID);
                      this.setState({
                        // isShow: true,
                        noticeText: result.MESSAGE,
                        // title: result.MESSAGE,
                        uploadFileName: uploadFileName,
                        uploadFileID: uploadFileID
                      }, () => {
                        this.setState({
                          isShowNotice: false,
                        })
                        files.push({ name: name, fileId: result.FILEID })
                      })
                    } else {
                      let uploadFileName = [...this.state.uploadFileName];
                      uploadFileName.push(name);
                      let uploadFileID = [...this.state.uploadFileID];
                      uploadFileID.push(result.FILEID);
                      this.setState({
                        noticeText: result.MESSAGE,
                        // isShow: true,
                        // title: result.MESSAGE,
                        uploadFileName: uploadFileName,
                        uploadFileID: uploadFileID,
                        isShowNotice: false,
                      }, () => {
                        // this.setState({
                        //   isShowNotice: false,
                        // })
                        // this.refs.ref1.changeState()
                        files.push({ name: name, fileId: result.FILEID })
                      })
                    }
                  } else {
                    this.setState({
                      isShow: true,
                      title: result.MESSAGE
                    }, () => {
                      // this.refs.ref1.changeState()
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  onReplaceFile(index) {
    const { files } = this.state
    MediaLibrary.requestPermissionsAsync().then(async (response) => {
      // console.log("请求权限",response)
      const { granted } = response
      if (granted) {
        DocumentPicker.getDocumentAsync({ multiplea: true }).then((response) => {
          const { uri, name, type } = response
          console.log(response)
          if (type == "success") {
            FileSystem.getInfoAsync(uri, { md5: true }).then(async (response) => {
              const { md5 } = response
              // console.log("md5====",md5)
              let configKey = "SCMP-FILE"
              let obj = {
                "fileName": name,
                "md5": md5,
                "configKey": 'SCMP-FILE'
              }
              const result = await reqMD5(obj)
              if (result.STATUS == "success" && result.MESSAGE == "MD5值存在") {
                this.setState({
                  isShow: true,
                  title: "此文件已存在请勿重复上传"
                }, () => {
                  this.refs.ref1.changeState()
                })
              } else {
                FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 }).then(async (response) => {
                  // console.log("response-----",response)
                  let file = { uri: uri, type: 'multipart/form-data', name: name }
                  let formData = new FormData();
                  formData.append('file', file)
                  formData.append("configKey", 'SCMP-FILE');
                  formData.append("md5", md5);
                  // console.log("formdata", JSON.stringify(formData))
                  const result = await reqFileUpload(formData)
                  if (result.STATUS == "success") {
                    if (this.state.uploadReport === "上传质检报告") {
                      let newID = [...this.state.loadFileID];
                      newID[index] = result.FILEID;
                      let newName = [...this.state.loadFileName];
                      newName[index] = name;

                      //修改页面
                      this.setState({
                        isShow: true,
                        title: result.MESSAGE,
                        loadFileName: newName,
                        loadFileID: newID
                      }, () => {
                        this.refs.ref1.changeState()
                        files.push({ name: name, fileId: result.FILEID })
                        console.log("uploadFileName", this.state.uploadFileName)
                        console.log("uploadFileID", this.state.uploadFileID)
                      })
                    } else {
                      let newID = [...this.state.loadFileID];
                      newID[index] = result.FILEID;
                      let newName = [...this.state.loadFileName];
                      newName[index] = name;
                      this.setState({
                        isShow: true,
                        title: result.MESSAGE,
                        loadFileName: newName,
                        loadFileID: newID

                      }, () => {
                        this.refs.ref1.changeState()
                        files.push({ name: name, fileId: result.FILEID })
                        console.log("uploadFileName", this.state.uploadFileName)
                        console.log("uploadFileID", this.state.uploadFileID)
                      })
                    }
                  } else {
                    this.setState({
                      isShow: true,
                      title: result.MESSAGE
                    }, () => {
                      this.refs.ref1.changeState()
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  renderModifyView() {
    const { standarItemOfNoMechanical } = this.props;
    const { mqualifiedQty, mshareQty, fileArray, loadFileName, isShow, title } = this.state;
    return (

      <View>
        <View style={styles.warpper}>
          <Text style={styles.title}>合格:</Text>
          <TextInput
            style={styles.loggingData}
            onChangeText={(mqualifiedQty) => this.setState({ mqualifiedQty })}
            value={`${mqualifiedQty}`}
            placeholderTextColor='#ccc'
            keyboardType="numeric"
          />
        </View>
        <View style={styles.warpper}>
          <Text style={styles.title}>待审批:</Text>
          <TextInput
            style={styles.loggingData}
            onChangeText={(mshareQty) => this.setState({ mshareQty })}
            value={`${mshareQty}`}
            placeholderTextColor='#ccc'
            keyboardType="numeric"
          />
        </View>
        {
          loadFileName ?
            loadFileName.map((item, index) => {
              return <TouchableOpacity
                key={index}
                style={styles.uploadM}
                onPress={() => { this.onReplaceFile(index) }}
              >
                <Text style={styles.uploadTextM}>{item}点击上传更多文件</Text>
              </TouchableOpacity>
            }) : null
        }
        {
          !standarItemOfNoMechanical ? <></> :
            standarItemOfNoMechanical.map((item, index) => (
              <NormalTremView
                key={item.inspectionName}
                changeResult={this.changeResult}
                index={index}
                standarItem={item}
                isModifyPage={true}
              />
            ))
        }
      </View>
    )
  }

  submitResult() {
    const { postSubmitResult } = this.props;
    const { proInspectionId } = this.props.navigation.state.params.item;

    postSubmitResult(proInspectionId, (result, isSuccess) => {
      this.setState({
        isShowNotice: true,
        noticeText: result,
      })
      setTimeout(() => {
        this.setState({
          isShowNotice: false,
        })
        NavigationManager.goPage("TechnologyProcessPage");
      }, 1500)
    });
  }

  showModelNoticeView(notice) {
    this.setState({
      isShowNotice: true,
      noticeText: notice,
    })
    setTimeout(() => {
      this.setState({
        isShowNotice: false,
      })
    }, 1500)
  }

  saveModifyResult() {

    const { postSaveResult, standarItemOfNoMechanical } = this.props;
    const { mqualifiedQty, mshareQty, loadFileName, loadFileID } = this.state;
    const { proInspectionId, qltSHeetId } = this.props.navigation.state.params.item;
    if (!isExist(mqualifiedQty)) {
      this.showModelNoticeView("请填入合格数信息");
      return false;
    } else if (!isExist(mshareQty)) {
      this.showModelNoticeView("请填入待审批数信息");
      return false;
    }
    standarItemOfNoMechanical.map((item, index) => {
      if (!isExist(item.realNumber)) {
        this.showModelNoticeView("请填入标准项信息");
        return false;
      }
    })
    console.log("uploadFileName", loadFileName)
    console.log("uploadFileID", loadFileID)

    let nameString = loadFileName.join("<")
    let idString = loadFileID.join("<")
    let filePath = [];
    filePath.push(idString);
    filePath.push(nameString);
    let partFiles = filePath.join("|");
    console.log("filePath.join(" | ")", filePath.join("|"))

    let parameter = {};
    parameter.proInspectionId = proInspectionId;//质检单Id
    parameter.shareQty = mshareQty;//待审批数
    parameter.qualifiedQty = mqualifiedQty;//合格数
    parameter.qltInspectionStandards = standarItemOfNoMechanical;//标准项
    parameter.qltSHeetId = qltSHeetId;//已经保存要填
    parameter.partFiles = partFiles;
    postSaveResult(parameter, (result) => {
      this.setState({
        isShowNotice: true,
        noticeText: result,
        saveModifyResult: false
      })
      setTimeout(() => {
        this.setState({
          isShowNotice: false,
        })
        NavigationManager.goPage("TechnologyProcessPage");
      }, 1500)
    });
  }

  saveResult() {
    const { postSaveResult, standarItemOfNoMechanical } = this.props;
    const { qualified, wshareQty, uploadFileName, uploadFileID } = this.state;
    const { proInspectionId, qltSHeetId } = this.props.navigation.state.params.item;
    if (!isExist(qualified)) {
      this.showModelNoticeView("请填入合格数信息");
      return false;
    } else if (!isExist(wshareQty)) {
      this.showModelNoticeView("请填入待审批数信息");
      return false;
    }
    standarItemOfNoMechanical.map((item, index) => {
      if (!isExist(item.realNumber)) {
        this.showModelNoticeView("请填入标准项信息");
        return false;
      }
    })

    let nameString = uploadFileName.join("<")
    let idString = uploadFileID.join("<")
    let filePath = [];
    filePath.push(idString);
    filePath.push(nameString);
    let partFiles = filePath.join("|");
    console.log("filePath.join(" | ")", filePath.join("|"))

    let parameter = {};
    parameter.proInspectionId = proInspectionId;//质检单Id
    parameter.shareQty = wshareQty;//待审批数
    parameter.qualifiedQty = qualified;//合格数
    parameter.qltInspectionStandards = standarItemOfNoMechanical;//标准项
    parameter.qltSHeetId = qltSHeetId;//已经保存要填
    parameter.partFiles = partFiles;
    postSaveResult(parameter, (result) => {
      this.setState({
        isShowNotice: true,
        noticeText: result,
        saveModifyResult: false
      })
      setTimeout(() => {
        this.setState({
          isShowNotice: false,
        })
        NavigationManager.goPage("TechnologyProcessPage");
      }, 1500)
    });
  }

  renderModifyPage() {
    const { isDisabledSubmitButton } = this.state;
    return (
      <View style={styles.contains}>
        <View style={styles.block}>
          <NavigationBar
            title={'无零件号修改质检'}
            style={{ backgroundColor: '#376CDA' }}
            leftButton={this.renderTabLeftButton()}
          />
          <ScrollView bounces={true}>
            <MechanicalDetailView {...this.props} />
            {this.renderModifyView()}
          </ScrollView>
        </View>
        <View style={styles.warpperButton}>
          <TouchableOpacity
            style={styles.leftBottom}
            onPress={() => { this.saveModifyResult() }}
          >
            <Text>保存</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.leftBottom, styles.select]}
            onPress={() => { this.submitResult() }}
            disabled={isDisabledSubmitButton}
          >
            <Text >提交</Text>
          </TouchableOpacity>
        </View>
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
      </View>
    )
  }

  renderAddView() {
    const { standarItemOfNoMechanical, } = this.props;
    const { qualified, wshareQty, uploadFileName } = this.state;
    return (
      <View>
        <View style={styles.warpper}>
          <Text style={styles.title}>合格:</Text>
          <TextInput
            style={styles.loggingData}
            onChangeText={(qualified) => this.setState({ qualified })}
            value={`${qualified}`}
            placeholder="请输入合格数"
            placeholderTextColor='#ccc'
            keyboardType="numeric"
          />
        </View>
        <View style={styles.warpper}>
          <Text style={styles.title}>待审批:</Text>
          <TextInput
            style={styles.loggingData}
            onChangeText={(wshareQty) => this.setState({ wshareQty })}
            value={wshareQty}
            placeholder="请输入待审批数"
            placeholderTextColor='#ccc'
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={styles.uploadM}
          onPress={this.onRNFileSelector}
        >
          <Text>上传质检报告</Text>
        </TouchableOpacity>
        {/* 上传只需要文件名字 */}
        {uploadFileName.map((item) => {
          return (<View
            style={styles.uploadContain}
          >
            <Text >{item}</Text>
          </View>)
        })}
        {
          standarItemOfNoMechanical ?
            standarItemOfNoMechanical.map((item, index) => (
              <NormalTremView
                key={item.inspectionName}
                changeResult={this.changeResult}
                index={index}
                standarItem={item}
                isAddPage={true}
              />
            )) : null
        }
      </View>
    )
  }

  renderAddPage() {
    const { isShow, title, isDisabledSubmitButton } = this.state;
    return (
      <View style={styles.contains}>
        <View style={styles.block}>
          <NavigationBar
            title={'无零件号新增质检'}
            style={{ backgroundColor: '#376CDA' }}
            leftButton={this.renderTabLeftButton()}
          />
          <ScrollView bounces={true}>
            <MechanicalDetailView {...this.props} />
            {this.renderAddView()}
          </ScrollView>
        </View>
        <View style={styles.warpperButton}>
          <TouchableOpacity
            style={styles.leftBottom}
            onPress={() => { this.saveResult() }}
          >
            <Text>保存</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.leftBottom, styles.select]}
            onPress={() => { this.submitResult() }}
            disabled={isDisabledSubmitButton}
          >
            <Text >提交</Text>
          </TouchableOpacity>
        </View>
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
      </View>
    )
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
            console.log("downloadprogress", downloadProgress)
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
              console.log("创建资产", response)
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

  renderDetailView() {
    const { standarItemOfNoMechanical } = this.props;
    const { mqualifiedQty, mshareQty, isShow, loadFileName, fileArray } = this.state;
    return (
      <View>
        <View style={styles.warpper}>
          <Text style={styles.title}>合格:</Text>
          <TextInput
            style={styles.loggingData}
            onChangeText={(mqualifiedQty) => this.setState({ mqualifiedQty })}
            value={`${mqualifiedQty}`}
            placeholderTextColor='#ccc'
            keyboardType="numeric"
            editable={false}
          />
        </View>
        <View style={styles.warpper}>
          <Text style={styles.title}>待审批:</Text>
          <TextInput
            style={styles.loggingData}
            onChangeText={(mshareQty) => this.setState({ mshareQty })}
            value={`${mshareQty}`}
            placeholderTextColor='#ccc'
            keyboardType="numeric"
            editable={false}
          />
        </View>
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
        {
          !standarItemOfNoMechanical ? <></> :
            standarItemOfNoMechanical.map((item, index) => (
              <NormalTremView
                key={item.inspectionName}
                changeResult={this.changeResult}
                index={index}
                standarItem={item}
                isDetailPage={true}
              />
            ))
        }
      </View>
    )
  }

  renderDetailPage() {
    const { isShow, title } = this.state;
    return (
      <View style={styles.contains}>
        <View style={styles.block}>
          <NavigationBar
            title={'无零件号质检详情'}
            style={{ backgroundColor: '#376CDA' }}
            leftButton={this.renderTabLeftButton()}
          />
          <ScrollView bounces={true}>
            <MechanicalDetailView {...this.props} />
            {this.renderDetailView()}
          </ScrollView>
        </View>
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
        {isShow ? <AlertBox title={title} ref="ref1" /> : null}
      </View>
    )
  }

  render() {
    const { qualifiedQty, isSubmit } = this.props.navigation.state.params.item;
    if (qualifiedQty && isSubmit) {//有质检结论&&有提交按钮===修改页面
      return this.renderModifyPage();
    } else if (!qualifiedQty) {//没有质检结论===新增页面
      return this.renderAddPage();
    } else if (qualifiedQty && !isSubmit) {//有质检结论&&无提交按钮===详情页面
      return this.renderDetailPage();
    }
  }
}

const styles = StyleSheet.create({
  contains: {
    backgroundColor: "#F1F5F8",
    flex: 1
  },
  block: {
    flex: 1
  },
  warpper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftBottom: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#ECECEC',
    margin: 5,
    shadowColor: '#ECECEC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  warpperButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    height: 30,
    lineHeight: 30,
    color: "#000"
  },
  loggingData: {
    backgroundColor: "white",
    marginTop: 10,
    paddingLeft: 5,
    color: "black",
    borderWidth: 1,
    borderColor: "#ECECEC"
  },
  select: {
    backgroundColor: "#42BD41",
    borderColor: "#42BD41"
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
})

// 请求无零件号质检结果的message
const mapStateToProps = (state) => ({
  noMechanicalList: state.qualityInspector.noMechanicalList,
  standarItemOfNoMechanical: state.qualityInspector.standarItemOfNoMechanical
});

const mapDispatchToProps = (dispatch) => ({
  getNoMechanicalMessageDetail() {
    dispatch(getNoMechanicalMessageDetail())
  },
  postSubmitResult(qualified, fit, industrialWaste, materialWaste, callBack) {
    dispatch(postSubmitResult(qualified, fit, industrialWaste, materialWaste, callBack))
  },
  postSaveResult(qualified, fit, industrialWaste, materialWaste, callBack) {
    dispatch(postSaveResult(qualified, fit, industrialWaste, materialWaste, callBack))
  },
  // 传检验单Id 和 零件号信息 无零件号是没有零件号的
  getStandarItemDetailOfNoMechanical(technologyId, proInspectionId) {
    dispatch(getStandarItemDetailOfNoMechanical(technologyId, proInspectionId))
  },
  onChangeNoChanicalRealValueResult(standarItemOfNoMechanical) {
    dispatch(onChangeNoChanicalRealValueResult(standarItemOfNoMechanical))
  },
  getModifyFilePath({ proInspectionId }, callBack) {
    dispatch(getModifyFilePath({ proInspectionId }, callBack))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BatchQualityPage);