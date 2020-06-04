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
import AlertBox from '../../../common/Component/AlertBox';
import NavigationManager from '../../../navigation/NavigationManager';
import { connect } from 'react-redux';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import Constants from '../../../utils/Constants';
import { deviceWidthDp } from '../../../utils/Fit';

class MechanicalQualityView extends Component {
  state = {
    isShow: false,
    title: "",
    isModalDropdownShow: false
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

  gotoCamera = async () => {
    const permission1 = await MediaLibrary.requestPermissionsAsync()
    const permission2 = await Audio.requestPermissionsAsync()
    const permission3 = await Camera.requestPermissionsAsync()
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
      scrapProcess,
      responsibleParty
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
                disabled={true}
                underlayColor='transparent'>
                <Text style={(qualityResult === item) ? styles.selectM : styles.unSelectM}>{item}</Text>
              </TouchableOpacity>
            })}
          </View>
          {
            qualityResult === "02" ?
              <View style={styles.wrapper_container} >
                <View style={styles.row_container}>
                  <Text>报废工序</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    // onPress={() => { onChoiceScrapProcess() }}
                  >
                    <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{scrapProcess}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row_container}>
                  <Text>责任方</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    // onPress={() => { onChoiceResponsibleParty() }}
                  >
                    <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{responsibleParty}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : null
          }
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
    const { changeQualityResult, qualityResult } = this.props;
    return (
      <View>
        <View>
          <TouchableOpacity
            style={styles.conclusion}
            key={code}
            onPress={() => changeQualityResult(code)}
            underlayColor='transparent'>
            <Text style={(qualityResult == code) ? styles.selectM : styles.unSelectM}>{value}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      onChoiceScrapProcess,
      onChoiceResponsibleParty,
      responsibleParty,
      scrapProcess,
    } = this.props;

    return (
      <View style={styles.containerM}>
        <View>
          <Text style={styles.titleM}>Add零件号:</Text>
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
          {
            qualityResult === "02" ?
              <View style={styles.wrapper_container} >
                <View style={styles.row_container}>
                  <Text>报废工序</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => { onChoiceScrapProcess() }}
                  >
                    <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{scrapProcess}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row_container}>
                  <Text>责任方</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => { onChoiceResponsibleParty() }}
                  >
                    <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{responsibleParty}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : null
          }
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
      qualityResult,// 测试数据 const { qualityResult } = this.props;
      changeQualityResult,
      onReplaceFile,
      uploadReport,
      responsibleParty,
      scrapProcess,
      fileArray,
      onChoiceScrapProcess,
      onChoiceResponsibleParty
    } = this.props;

    return (
      <View style={styles.containerM}>
        <View>
          <Text style={styles.titleM}>Modefy零件号:</Text>
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
          {
            qualityResult === "02" ?
              <View style={styles.wrapper_container} >
                <View style={styles.row_container}>
                  <Text>报废工序</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => { onChoiceScrapProcess() }}
                  >
                    <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{scrapProcess}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row_container}>
                  <Text>责任方</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => { onChoiceResponsibleParty() }}
                  >
                    <Text style={styles.selectButtonText} ellipsizeMode="tail" numberOfLines={1}>{responsibleParty}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : null
          }
        </View>
        <View>
          {
            fileArray.map((item, index) => {
              return <TouchableOpacity
                key={index}
                style={styles.uploadM}
                onPress={() => { onReplaceFile(index) }}
              >
                <Text style={styles.uploadTextM}>{item.name}点击更换上传文件</Text>
              </TouchableOpacity>
            })
          }

          {/* <TouchableOpacity
          onPress={this.gotoCamera}
          style={styles.upload}
        ><Text>相机</Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.uploadM}
            onPress={onReplaceFile}
          >
            <Text style={styles.uploadTextM}>点击上传更多文件</Text>
          </TouchableOpacity> */}
        </View>
      </View >
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
});

const mapStateToProps = (state) => ({
  fileUploadData: state.qualityInspector.fileUploadData,
});

export default connect(mapStateToProps, null)(MechanicalQualityView);
