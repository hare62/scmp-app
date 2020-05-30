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
import { concatStatic } from 'rxjs/operator/concat';
import { deviceWidthDp } from '../../utils/Fit';

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
      isDisabledSubmitButton: true,
      scrapProcess: "点击选择",
      scrapProcessID:"",
      responsibleParty: "点击选择",
      responsiblePartyType:""
    }

    this.changeResult = this.changeResult.bind(this);
    this.showModelNoticeView = this.showModelNoticeView.bind(this);
    this.onRNFileSelector = this.onRNFileSelector.bind(this);
    this.saveModifyResult = this.saveModifyResult.bind(this);
    this.onChoiceScrapProcess = this.onChoiceScrapProcess.bind(this);
    this.onChoiceResponsibleParty = this.onChoiceResponsibleParty.bind(this);
    props.navigation.addListener('didFocus', () => {this.init()});
  }

  componentDidMount() {
   this.init();
  }

  init() {
    const {
      qualifiedQty,
      shareQty,
      technologyId,
      proInspectionId,
      isSubmit,
    } = this.props.navigation.state.params.item;
    const { scrapProcessItem, responsiblePartyItem } = this.props.navigation.state.params;
    console.warn('responsiblePartyItem',responsiblePartyItem)
    if (scrapProcessItem) { // 修改报废工序
      this.setState({
        scrapProcess: scrapProcessItem.technologyName,
        scrapProcessID: scrapProcessItem.technologyId
      })
    }

    if(responsiblePartyItem){
      console.log(responsiblePartyItem)
      this.setState({
        responsibleParty: responsiblePartyItem.name,
        responsiblePartyType: responsiblePartyItem.responsiblePartyType
      },()=>{
        console.warn("responsiblePartyType",this.state.responsiblePartyType)
      })
    }

    let { getStandarItemDetailOfNoMechanical, getModifyFilePath } = this.props;
    let fileArray = [];
    if (qualifiedQty && isSubmit) {//有质检结论&&有提交按钮===修改页面
      getModifyFilePath({ proInspectionId }, (partFiles) => {
        if (partFiles) {
          partFiles = partFiles.substring(0, partFiles.length - 1);
          let arr = partFiles.split("|");
          // let uploadFileName =  ["IMG_20200523_082243.jpg", "IMG_20200523_082240.jpg"];
          // let uploadFileID = [355, 356];
          let fileID = arr[0].split("<");
          let fileName = arr[1].split("<");
          for (let i = 0; i < (fileID.length); i++) {
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

  onChoiceScrapProcess() {
    // TODO 
    const { proInspectionId } = this.props.navigation.state.params;
    NavigationManager.push("ScrapProcessPage",{proInspectionId,isBatchQualityPage:true});

  }

  onChoiceResponsibleParty() {
    NavigationManager.push("ResponsiblePartyPage",{isBatchQualityPage:true});
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
                  }, 2000);
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
                    let uploadFileName = [...this.state.uploadFileName];
                    uploadFileName.push(name);
                    let uploadFileID = [...this.state.uploadFileID];
                    uploadFileID.push(result.FILEID);
                    this.setState({
                      noticeText: result.MESSAGE,
                      uploadFileName: uploadFileName,
                      uploadFileID: uploadFileID
                    }, () => {
                      this.setState({
                        isShowNotice: false,
                      })
                      files.push({ name: name, fileId: result.FILEID })
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
      const { granted } = response
      if (granted) {
        DocumentPicker.getDocumentAsync({ multiplea: true }).then((response) => {
          this.setState({
            isShowNotice: true,
            noticeText: "文件正在上传中",
          })
          const { uri, name, type } = response
          if (type == "success") {
            FileSystem.getInfoAsync(uri, { md5: true }).then(async (response) => {
              const { md5 } = response
              let configKey = "SCMP-FILE"
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
                  }, 2000);
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
                      let newID = [...this.state.loadFileID];
                      newID[index] = result.FILEID;
                      let newName = [...this.state.loadFileName];
                      newName[index] = name;
                      //修改页面
                      this.setState({
                        noticeText: result.MESSAGE,
                        loadFileName: newName,
                        loadFileID: newID
                      }, () => {
                        this.setState({
                          isShowNotice: false,
                        })
                        files.push({ name: name, fileId: result.FILEID })
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
    const { 
      mqualifiedQty, 
      mshareQty, 
      fileArray, 
      loadFileName, 
      isShow, 
      title, 
      scrapProcess, 
      responsibleParty 
    } = this.state;
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
        {/* {
              <View style={styles.wrapper_container} >
                <View style={styles.row_container}>
                  <Text>报废工序</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => { this.onChoiceScrapProcess() }}
                  >
                    <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{scrapProcess}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row_container}>
                  <Text>责任方</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => { this.onChoiceResponsibleParty() }}
                  >
                    <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{responsibleParty}</Text>
                  </TouchableOpacity>
                </View>
              </View>
          } */}
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

    const { 
      postSaveResult, 
      standarItemOfNoMechanical } = this.props;
    const { 
      mqualifiedQty, 
      mshareQty, 
      loadFileName, 
      loadFileID, 
      scrapProcess, 
      scrapProcessID,
      responsibleParty,
      responsiblePartyType } = this.state;
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

    let nameString;
    let idString;
    let partFiles;
    if (loadFileName && loadFileID) {
      nameString = loadFileName.join("<")
      idString = loadFileID.join("<")
      let filePath = [];
      filePath.push(idString);
      filePath.push(nameString);
      partFiles = filePath.join("|");
    }

    if(partFiles === "|"){
      partFiles =''
    }

    let parameter = {};
    parameter.proInspectionId = proInspectionId;//质检单Id
    parameter.shareQty = mshareQty;//待审批数
    parameter.qualifiedQty = mqualifiedQty;//合格数
    parameter.qltInspectionStandards = standarItemOfNoMechanical;//标准项
    parameter.qltSHeetId = qltSHeetId;//已经保存要填
    parameter.partFiles = partFiles;
    // parameter.technologyName = scrapProcess;
    parameter.insTechnologyId = scrapProcessID;
    // parameter.name = responsibleParty;
    parameter.responsiblePartyId = responsiblePartyType;
    postSaveResult(parameter, (result) => {
      console.log("result",result)
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
    const { 
      postSaveResult, 
      standarItemOfNoMechanical} = this.props;
    const { 
      qualified, 
      wshareQty, 
      uploadFileName, 
      uploadFileID,
      scrapProcess, 
      scrapProcessID,
      responsibleParty,
      responsiblePartyType} = this.state;
    const { 
      proInspectionId, 
      qltSHeetId } = this.props.navigation.state.params.item;

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

    let nameString;
    let idString;
    let partFiles;

    if (uploadFileName && uploadFileID) {
      nameString = uploadFileName.join("<")
      idString = uploadFileID.join("<")
      let filePath = [];
      filePath.push(idString);
      filePath.push(nameString);
      partFiles = filePath.join("|");
    }

    let parameter = {};
    parameter.proInspectionId = proInspectionId;//质检单Id
    parameter.shareQty = wshareQty;//待审批数
    parameter.qualifiedQty = qualified;//合格数
    parameter.qltInspectionStandards = standarItemOfNoMechanical;//标准项
    parameter.qltSHeetId = qltSHeetId;//已经保存要填
    parameter.partFiles = partFiles;
    // parameter.technologyName = scrapProcess;
    parameter.insTechnologyId = scrapProcessID;
    // parameter.name = responsibleParty;
    parameter.responsiblePartyId = responsiblePartyType;
    postSaveResult(parameter, (result) => {
      console.log("result",result)
      this.setState({
        isShowNotice: true,
        noticeText: result,
        saveModifyResult: false
      });
      setTimeout(() => {
        this.setState({
          isShowNotice: false,
        })
        NavigationManager.goPage("TechnologyProcessPage");
      }, 1500);
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
    const { qualified, wshareQty, uploadFileName, scrapProcess, responsibleParty } = this.state;
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
        {/* {
           <View style={styles.wrapper_container} >
             <View style={styles.row_container}>
               <Text>报废工序</Text>
               <TouchableOpacity
                 style={styles.selectButton}
                 onPress={() => { this.onChoiceScrapProcess() }}
               >
                 <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{scrapProcess}</Text>
               </TouchableOpacity>
             </View>
             <View style={styles.row_container}>
               <Text>责任方</Text>
               <TouchableOpacity
                 style={styles.selectButton}
                 onPress={() => { this.onChoiceResponsibleParty() }}
               >
                 <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{responsibleParty}</Text>
               </TouchableOpacity>
             </View>
           </View>
       } */}
        <TouchableOpacity
          style={styles.uploadM}
          onPress={this.onRNFileSelector}
        >
          <Text>上传质检报告</Text>
        </TouchableOpacity>
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

  renderError() {
    const { isSubmit, qualifiedQty } = this.props.navigation.state.params.item;

    return (
      <View>
        <Text>后端返回字段：没有对应页面展示</Text>
        <Text>是否有提交按钮{JSON.stringify(isSubmit)}</Text>
        <Text>质检结果信息信息{JSON.stringify(qualifiedQty)}</Text>
      </View>
    )
  }

  render() {
    const { qualifiedQty, isSubmit } = this.props.navigation.state.params.item;
    if (qualifiedQty && isSubmit) {//有质检结论&&有提交按钮===修改页面
      return this.renderModifyPage();
    } else if (!qualifiedQty && isSubmit) {//没有质检结论===新增页面
      return this.renderAddPage();
    } else if (qualifiedQty && !isSubmit) {//有质检结论&&无提交按钮===详情页面
      return this.renderDetailPage();
    } else if (!qualifiedQty && !isSubmit) {
      return this.renderError();
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
  },
  wrapper_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row_container: {
    flexDirection: "row",
    justifyContent:"flex-start",
    alignItems: "center",
    width: deviceWidthDp * 0.4,
    marginTop: 10
  },
  selectButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingRight:10,
    backgroundColor: Constants.BUTTON,
    width: deviceWidthDp * 0.2,
    borderRadius: 50,
    color: 'white',
    marginLeft: 15
  },
  selectButtonText: {
    color: 'white'
  },
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
  postSaveResult(parameter, callBack) {
    dispatch(postSaveResult(parameter, callBack))
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