import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MechanicalQualityView from './component/MechanicalQualityView';
import NormalTremView from './component/NormalTremView';
import { connect } from 'react-redux';
import {
  postAddMechanical,
  getStandarItem,
  onChangeStandardItemList
} from '../../redux/action/qualityInspector/index';
import Constants from '../../utils/Constants';
import { FileSystem } from "react-native-unimodules";
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import { reqFileUpload, reqMD5 } from '../../api';
import AlertBox from '../../common/Component/AlertBox';
import { FileUploadSave, getPartFile } from '../../redux/action/qualityInspector/index';
import ModelNoticeView from '../../common/Component/ModelNoticeView';
import { getTechnologyProcessList } from '../../redux/action/qualityInspector/index';
import { isExist } from '../../utils/Util';
import { cloneNode } from '@babel/types';

class AddMechanicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mechanical: "",//零件号
      realNumber: "",//实际值
      qualityResult: 0,//质检结果
      uploadReport: "上传质检报告",
      isDetailPage: false,
      progress: "0%",
      isShow: false,
      title: "",
      isShowNotice: false,
      noticeText: "",
      standarItemData: '',
      files: [],
      uploadFileID: [],//上传成功ID
      uploadFileName: [],//上传成功名字
      loadFileID: "",
      loadFileName: "",
      fileArray: [],//下载内容
      scrapProcess: "点击选择",
      scrapProcessID: "",
      responsibleParty: "点击选择",
      responsiblePartyType: "",
    }
    this.submitResult = this.submitResult.bind(this);
    this.submitModifyResult = this.submitModifyResult.bind(this);
    this.submitAddResult = this.submitAddResult.bind(this);
    this.changeResult = this.changeResult.bind(this);
    this.changeMechanical = this.changeMechanical.bind(this);
    this.changeMechanicalM = this.changeMechanicalM.bind(this);
    this.changeQualityResult = this.changeQualityResult.bind(this);
    this.changeModifyQualityResult = this.changeModifyQualityResult.bind(this);
    this.onRNFileSelector = this.onRNFileSelector.bind(this);
    this.changeAddResult = this.changeAddResult.bind(this);
    this.showModelNoticeView = this.showModelNoticeView.bind(this);
    this.onReplaceFileAndReUpload = this.onReplaceFileAndReUpload.bind(this);
    this.onChoiceScrapProcess = this.onChoiceScrapProcess.bind(this);
    this.onChoiceResponsibleParty = this.onChoiceResponsibleParty.bind(this);

    props.navigation.addListener('didFocus', () => { this.init() });
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const { technologyId, proInspectionId, isAddPage, scrapProcessItem, responsiblePartyItem } = this.props.navigation.state.params;
    if (scrapProcessItem) { // 修改报废工序
      this.setState({
        scrapProcess: scrapProcessItem.technologyName,
        scrapProcessID: scrapProcessItem.technologyId
      })
    }

    if (responsiblePartyItem) {
      console.log(responsiblePartyItem)
      this.setState({
        responsibleParty: responsiblePartyItem.name,
        responsiblePartyType: responsiblePartyItem.responsiblePartyType
      }, () => {
        console.warn("responsiblePartyType", this.state.responsiblePartyType)
      })
    }
    const { getStandarItem, } = this.props;
    let mpartNo = this.props.navigation.state.params.partNo;
    let mqltConclusion = this.props.navigation.state.params.qltConclusion;
    let { partNo, qltSheetId, partFiles } = this.props.navigation.state.params;

    let fileArray = [];
    if (isAddPage) {//新增页面
      getStandarItem({ technologyId, proInspectionId }, (res) => {
        this.setState({
          standarItemData: res.standardItemList,
          mpartNo: mpartNo,//新增零件号数据
          qualityResult: "01",//新增质检结果
        })
      });
    } else {//修改和详情页面
      let { getPartFile } = this.props;
      //  qltSheetId = "a471a88acbe74916b7471d3a3a718f1f"//假数据
      getPartFile({ qltSheetId }, (partFiles) => {
        partFiles = partFiles.substring(0, partFiles.length - 1);
        console.log("getPartFile1111",partFiles)
        if (partFiles) {
          let arr = partFiles.split("|");
          console.log("arr",arr)
          // let uploadFileName =  ["IMG_20200523_082243.jpg", "IMG_20200523_082240.jpg"];
          // let uploadFileID = [355, 356];
          let fileID = arr[0].split("<");
          let fileName = arr[1].split("<");
          console.log("fileID",fileID)
          console.log("fileName",fileName)
          // let fileArray;
          for (let i = 0; i < (fileID.length); i++) {
            let data = {};
            data.fileId = fileID[i];
            data.name = fileName[i];
            console.log("-----",data)
            fileArray.push(data);
          }
          console.log("-----",fileArray)
          //修改页面
          this.setState({
            fileArray: fileArray,
            uploadFileName: fileName,
            uploadFileID: fileID
          },()=>{
            console.log("fileArray",this.state.fileArray)
          })
        }
      });

      /***
       * 
       * (1)详情页面：technologyId, partNo, proInspectionId
       * (2)修改页面：technologyId, partNo, proInspectionId, qltSheetId
       * (3)新增页面：technologyId, proInspectionId
       */
      getStandarItem({ technologyId, partNo, proInspectionId, qltSheetId }, (res) => {
        this.setState({
          standarItemData: res.standardItemList,
          mqltConclusion: mqltConclusion,
          mpartNo: mpartNo,
        })
      });
    }

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
                  }, 2000)
                })
              } else {
                const { FileUploadSave } = this.props
                FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 }).then(async (response) => {
                  let file = { uri: uri, type: 'multipart/form-data', name: name }
                  let formData = new FormData();
                  formData.append('file', file)
                  formData.append("configKey", 'SCMP-FILE');
                  formData.append("md5", md5);
                  const result = await reqFileUpload(formData);
                  if (result.STATUS == "success") {
                    if (this.state.uploadReport === "上传质检报告") {
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
                        FileUploadSave(files)
                      })
                    } else {
                      let uploadFileName = [...this.state.uploadFileName];
                      uploadFileName.push(name);
                      let uploadFileID = [...this.state.uploadFileID];
                      uploadFileID.push(result.FILEID);
                      this.setState({
                        noticeText: result.MESSAGE,
                        uploadFileName: uploadFileName,
                        uploadFileID: uploadFileID
                      }, () => {
                        setTimeout(() => {
                          this.setState({
                            isShowNotice: false,
                          })
                        }, 3000);
                        files.push({ name: name, fileId: result.FILEID })
                        FileUploadSave(files)
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  onReplaceFileAndReUpload(index) {
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
                  setInterval(() => {
                    this.setState({
                      isShowNotice: false,
                    })
                  }, 2000);
                })
              } else {
                const { FileUploadSave } = this.props
                FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 }).then(async (response) => {
                  let file = { uri: uri, type: 'multipart/form-data', name: name }
                  let formData = new FormData();
                  formData.append('file', file);
                  formData.append("configKey", 'SCMP-FILE');
                  formData.append("md5", md5);
                  const result = await reqFileUpload(formData)
                  if (result.STATUS == "success") {
                    //eg: let newFileArray= [
                    //   {fileId:'361',name:'IMG_20200523_084828.jpg'},
                    //   {fileId:'362',name:'IMG_20200523_084826.jpg'},
                    // ]
                    let newFileArray = [...this.state.fileArray];
                    //replace files
                    newFileArray[index] = { fileId: result.FILEID, name: name };
                    //reloading files
                    // if (!index) {
                    //   // let obj = { fileId: result.FILEID, name: name };
                    //   // newFileArray.push(obj);
                    //   newFileArray=[{fileId:"fileID",name:"name"}]
                    // }
                    let newID = [];
                    let newName = [];
                    for (let i = 0; i < newFileArray.length; i++) {
                      newID.push(newFileArray[i].fileId)
                      newName.push(newFileArray[i].name)
                    }
                    this.setState({
                      fileArray: newFileArray,
                      uploadFileName: newName,
                      uploadFileID: newID,
                      noticeText: result.MESSAGE,
                    }, () => {
                      files.push({ name: name, fileId: result.FILEID });
                      FileUploadSave(files);
                      setTimeout(() => {
                        this.setState({
                          isShowNotice: false,
                        })
                      }, 3000);
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

  changeMechanical(mechanical) {
    this.setState({
      mechanical
    });
  }

  changeResult(realNumber, index) {
    const { standardItemList, onChangeStandardItemList } = this.props;
    let data = [...standardItemList];
    data[index].realNumber = realNumber;
    onChangeStandardItemList(data);
  }

  changeAddResult(realNumber, index) {
    //新增和修改都是用的state数据
    const { standarItemData } = this.state;
    let data = [...standarItemData];
    data[index].realNumber = realNumber;
    this.setState({
      standarItemData: data
    })
  }

  changeQualityResult(qualityResult) {
    this.setState({
      qualityResult
    });
  }

  changeModifyQualityResult(qualityResult) {
    this.setState({
      mqltConclusion: qualityResult
    });
  }

  submitResult() {
    const { mechanical, qualityResult, realNumber } = this.state;
    const { postAddMechanical, standardItemList } = this.props;
    const { proInspectionId } = this.props.navigation.state.params;
    let result = {};
    result.proInspectionId = proInspectionId;
    result.partNo = mechanical;
    result.qltConclusion = qualityResult;
    result.qltInspectionStandards = standardItemList;
    postAddMechanical(result, (result) => {
      this.setState({
        isShowNotice: true,
        noticeText: result,
      })
      const { sheetId } = this.props.navigation.state.params;
      const { getTechnologyProcessList } = this.props;
      getTechnologyProcessList(sheetId);

      setTimeout(() => {
        this.setState({
          isShowNotice: false,
        })
        NavigationManager.pop('TechnologyProcessPage');
      }, 2000)
    })
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

  submitModifyResult() {
    const {
      mpartNo,
      mqltConclusion,
      uploadFileID,
      uploadFileName,
      scrapProcess,
      scrapProcessID,
      responsibleParty,
      responsiblePartyType
    } = this.state;
    const { postAddMechanical, standardItemList } = this.props;
    const { proInspectionId, qltSheetId } = this.props.navigation.state.params;
    let result = {};

    if (!isExist(mpartNo)) {
      this.showModelNoticeView("请填入零件号信息");
      return false;
    } else if (!isExist(mqltConclusion)) {
      this.showModelNoticeView("请填入质检信息");
      return false;
    }

    for (let i = 0; i < standardItemList.length; i++) {
      if (!isExist(standardItemList[i].realNumber)) {
        this.showModelNoticeView("请填入标准项的实际值");
        return false;
      }
    }

    let nameString;
    let idString;
    let partFiles;

    // let uploadFileName =  ["IMG_20200523_082243.jpg", "IMG_20200523_082240.jpg"];
    // let uploadFileID = [355, 356];
    // TODO
    
    if (uploadFileName && uploadFileID) {
      nameString = uploadFileName.join("<");
      idString = uploadFileID.join("<");
      let filePath = [];
      filePath.push(idString);
      filePath.push(nameString);
      partFiles = filePath.join("|");
    }
    
    result.proInspectionId = proInspectionId;
    result.partNo = mpartNo;
    result.qltConclusion = mqltConclusion;
    result.qltInspectionStandards = standardItemList;
    result.qltSheetId = qltSheetId;
    result.partFiles = partFiles;
    // result.technologyName = scrapProcess;
    result.insTechnologyId = scrapProcessID;
    // result.name = responsibleParty;
    result.responsiblePartyId = responsiblePartyType;

    postAddMechanical(result, (result) => {
      this.setState({
        isShowNotice: true,
        noticeText: result,
      })

      const { sheetId } = this.props.navigation.state.params;
      const { getTechnologyProcessList } = this.props;
      getTechnologyProcessList(sheetId);

      setTimeout(() => {
        this.setState({
          isShowNotice: false,
        })
        NavigationManager.pop('TechnologyProcessPage');
      }, 2000)
    })
  }

  submitAddResult() {
    //新增保存
    const { mechanical,
      qualityResult,
      uploadFileName,
      uploadFileID,
      scrapProcess,
      scrapProcessID,
      responsibleParty,
      responsiblePartyType } = this.state;
    const { postAddMechanical, standardItemList } = this.props;
    const { proInspectionId } = this.props.navigation.state.params;

    if (!isExist(mechanical)) {
      this.showModelNoticeView("请填入零件号信息");
      return false;
    } else if (!isExist(qualityResult)) {
      this.showModelNoticeView("请填入质检信息");
      return false;
    }

    for (let i = 0; i < standardItemList.length; i++) {
      if (!isExist(standardItemList[i].realNumber)) {
        this.showModelNoticeView("请填入标准项的实际值");
        return false;
      }
    }

    let nameString;
    let idString;
    let partFiles;

    console.log("uploadFileName",uploadFileName)
    console.log("uploadFileName",uploadFileName)
    if (uploadFileName  && uploadFileID) {
      nameString = uploadFileName.join("<")
      idString = uploadFileID.join("<")
      let filePath = [];
      filePath.push(idString);
      filePath.push(nameString);
      partFiles = filePath.join("|");
    }
    if(partFiles === "|"){
      partFiles =''
    }
    console.log("partFiles",partFiles)
  
    let result = {};
    result.proInspectionId = proInspectionId;
    result.partNo = mechanical;
    result.qltConclusion = qualityResult;
    result.qltInspectionStandards = standardItemList;
    result.partFiles = partFiles;
    // result.technologyName = scrapProcess;
    result.insTechnologyId = scrapProcessID;
    // result.name = responsibleParty;
    result.responsiblePartyId = responsiblePartyType;
    // 提交成功后，需要把标准项的值都删了
    postAddMechanical(result, (result) => {
      this.setState({
        isShowNotice: true,
        noticeText: result,
      })
      // const { sheetId } = this.props.navigation.state.params.item;
      // const { getTechnologyProcessList } = this.props;
      // getTechnologyProcessList(sheetId);
      setTimeout(() => {
        this.setState({
          isShowNotice: false,
        })
        NavigationManager.pop();
      }, 2000)
    })
  }

  changeMechanicalM(mechanical) {
    this.setState({
      mpartNo: mechanical
    })
  }

  onChoiceScrapProcess() {
    const { proInspectionId } = this.props.navigation.state.params;
    NavigationManager.push("ScrapProcessPage", { proInspectionId });
  }

  onChoiceResponsibleParty() {
    NavigationManager.push("ResponsiblePartyPage");
  }

  renderModifyPage() {
    const { mechanical, mqltConclusion, uploadReport, isDetailPage,
      title, isShow, standarItemData, mpartNo, uploadFileName, loadFileName, fileArray, scrapProcess, responsibleParty } = this.state;
    const { sheetId, partNumber, isSubmit } = this.props.navigation.state.params;
    const { standardItemList } = this.props;
    return (
      <View style={styles.contains}>
        <NavigationBar
          title={'零件号的修改页面'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <ScrollView>
          <MechanicalQualityView
            {...this.props}
            changeMechanical={this.changeMechanicalM}
            mechanical={mpartNo}
            changeQualityResult={this.changeModifyQualityResult}
            qualityResult={mqltConclusion}
            onReplaceFile={this.onReplaceFileAndReUpload}
            isModifyPage={true}
            fileArray={fileArray}
            onChoiceScrapProcess={this.onChoiceScrapProcess}
            onChoiceResponsibleParty={this.onChoiceResponsibleParty}
            scrapProcess={scrapProcess}
            responsibleParty={responsibleParty}
          />
          {
            standarItemData ?
              standarItemData.map((item, index) => (
                (
                  <NormalTremView
                    key={item.inspectionName}
                    changeResult={this.changeAddResult}
                    standarItem={item}
                    index={index}
                    isModifyPage={true}
                  />
                )
              )) : null
          }
        </ScrollView>
        <View style={styles.warpper}>
          <TouchableOpacity
            style={styles.submit}
            onPress={this.submitModifyResult}
          >
            <Text style={styles.submitText}>保存</Text>
          </TouchableOpacity>
        </View>
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
        {isShow ? <AlertBox title={title} ref="ref1" /> : null}
      </View>
    );
  }

  renderAddPage() {
    const {
      mechanical,
      qualityResult,
      uploadReport,
      isDetailPage,
      title,
      isShow,
      standarItemData,
      uploadFileName,
      scrapProcess,
      responsibleParty
    } = this.state;
    const { sheetId, partNumber, isSubmit } = this.props.navigation.state.params;
    return (
      <View style={styles.contains}>
        <NavigationBar
          title={'零件号新增页面'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <ScrollView>
          <MechanicalQualityView
            {...this.props}
            changeMechanical={this.changeMechanical}
            mechanical={mechanical}
            changeQualityResult={this.changeQualityResult}
            qualityResult={qualityResult}
            onRNFileSelector={this.onRNFileSelector}
            uploadReport={uploadFileName}
            isDetailPage={isDetailPage}
            onChoiceScrapProcess={this.onChoiceScrapProcess}
            onChoiceResponsibleParty={this.onChoiceResponsibleParty}
            scrapProcess={scrapProcess}
            responsibleParty={responsibleParty}
            isAddPage={true}
          />
          {
            standarItemData ?
              standarItemData.map((item, index) => (
                (
                  <NormalTremView
                    key={item.inspectionName}
                    changeResult={this.changeAddResult}
                    standarItem={item}
                    index={index}
                    isAddPage={true}
                  />
                )
              )) : null
          }
        </ScrollView>
        {isDetailPage ? null :
          <View style={styles.warpper}>
            <TouchableOpacity
              style={styles.submit}
              onPress={this.submitAddResult}
            >
              <Text style={styles.submitText}>保存</Text>
            </TouchableOpacity>
          </View>}
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
        {isShow ? <AlertBox title={title} ref="ref1" /> : null}
      </View>
    );
  }

  renderDetailPage() {
    // 详情页面可以直接拿到后端数据就显示上去
    const {
      mechanical,
      uploadReport,
      isDetailPage,
      title,
      isShow,
      standarItemData,
      loadFileName,
      fileArray,
      scrapProcess,
      responsibleParty
    } = this.state;
    const { sheetId, partNumber, isSubmit } = this.props.navigation.state.params;
    const { partNo, qltConclusionValue } = partNumber[0];
    const { standardItemList } = this.props;
    return (
      <View style={styles.contains}>
        <NavigationBar
          title={'零件号详情页面'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <ScrollView>
          <MechanicalQualityView
            {...this.props}
            changeMechanical={this.changeMechanical}
            mechanical={partNo}
            changeQualityResult={this.changeQualityResult}
            qualityResult={qltConclusionValue}
            onRNFileSelector={this.onRNFileSelector}
            uploadReport={uploadReport}
            isDetailPage={true}
            fileArray={fileArray}
            loadFileName={loadFileName}
            scrapProcess={scrapProcess}
            responsibleParty={responsibleParty}
          />
          {
            standardItemList ?
              standardItemList.map((item, index) => (
                (
                  <NormalTremView
                    key={item.inspectionName}
                    changeResult={this.changeResult}
                    standarItem={item}
                    index={index}
                    isDetailPage={true}
                  />
                )
              )) : null
          }
        </ScrollView>
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
        {isShow ? <AlertBox title={title} ref="ref1" /> : null}
      </View>
    );
  }

  renderError() {
    const { isSubmit, partNumber } = this.props.navigation.state.params.item;

    return (
      <View>
        <Text>后端返回字段：没有对应页面展示</Text>
        <Text>是否有提交按钮{JSON.stringify(this.props.navigation.state.params)}</Text>
        <Text>是否存在零件号信息{JSON.stringify(partNumber)}</Text>
      </View>
    )
  }

  render() {
    //新增页面分详情和新增和修改页面是一样的
    const { partNumber, isSubmit, isAddPage } = this.props.navigation.state.params;
    if (isAddPage) {
      return this.renderAddPage();
    }

    if (isSubmit) {
      return this.renderModifyPage();
    } else if (!isSubmit) {
      return this.renderDetailPage();
    } else {
      return this.renderError();
    }
    // if (partNumber && isSubmit) {//有质检结论&&有提交按钮===修改页面
    //   return this.renderModifyPage();
    // } else if (!partNumber && isSubmit) {//没有质检结论===新增页面
    //   return this.renderAddPage();
    // } else if (partNumber && !isSubmit) {//有质检结论&&无提交按钮===详情页面
    //   return this.renderDetailPage();
    // } else if (!partNumber && !isSubmit) {
    //   return this.renderError();
    // }
  }
}

const styles = StyleSheet.create({
  contains: {
    backgroundColor: "#F2F6F8",
    flex: 1
  },
  addMechanical: {
    height: 50,
    width: 200,
    borderWidth: 1,
    paddingLeft: 10,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
    color: Constants.THEME_COLOR,
    borderColor: Constants.THEME_COLOR
  },
  addMechanicalText: {
    fontSize: 20,
    color: Constants.THEME_COLOR
  },
  submit: {
    height: 50,
    backgroundColor: Constants.BUTTON,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 20,
  },
  warpper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
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
    paddingLeft: 10
  },
  uploadTextM: {
    color: "#386CDA",
    lineHeight: 20,
    textAlign: "left",
    letterSpacing: 0,
    fontStyle: 'normal',
    textDecorationStyle: "dotted",
    textTransform: "none",
  }
})

const mapState = (state) => ({
  fileUploadData: state.qualityInspector.fileUploadData,
  standardItemList: state.qualityInspector.standardItemList
})

const mapDispatchToProps = (dispatch) => ({
  //保存新增零件号
  postAddMechanical(result, callBack) {
    dispatch(postAddMechanical(result, callBack))
  },
  FileUploadSave(fileName, fileID) {
    dispatch(FileUploadSave(fileName, fileID))
  },
  getStandarItem({ technologyId, partNo, proInspectionId }, callBack) {
    dispatch(getStandarItem({ technologyId, partNo, proInspectionId }, callBack))
  },
  onChangeStandardItemList(data) {
    dispatch(onChangeStandardItemList(data))
  },
  getTechnologyProcessList(sheetId) {
    dispatch(getTechnologyProcessList(sheetId))
  },
  getPartFile({ qltSheetId }, callBack) {
    dispatch(getPartFile({ qltSheetId }, callBack))
  }
});

export default connect(mapState, mapDispatchToProps)(AddMechanicalPage);
