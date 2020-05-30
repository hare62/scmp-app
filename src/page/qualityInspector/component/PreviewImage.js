import React from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity,DeviceEventEmitter} from "react-native";
import { Overlay,Button } from 'react-native-elements';
import { Video } from 'expo-av';
import {reqFileUpload,reqMD5} from '../../../api';
import {FileSystem} from "react-native-unimodules"
import {FileUploadSave, postAddMechanical} from '../../../redux/action/qualityInspector';
import { connect } from 'react-redux';
import ConfirmModal from '../../../common/Component/ConfirmModal';
import AlertBox from '../../../common/Component/AlertBox';
import progressUtil from '../../../utils/progressUtil';

class PreviewImage extends React.Component{
    state={
        isVisible:true,
        navigation:{},
        title:"",
        isShow:false,
        progress:null,
        disabled:false,
        files:[]
    }
    videoPlay=()=>{
        this.setState({
            shouldPlay:true
        })
    }
    changeConfirm=()=>{
        this.setState({isShow:false})
    }
    toUploadImage=async ()=>{
        const {files}=this.state
        const {filename,fileuri}=this.props
        const {md5}=await FileSystem.getInfoAsync(fileuri, {md5: true})
        let obj={
            "fileName":filename,
            "md5":md5,
            "configKey":'SCMP-FILE'
        }
        const result=await reqMD5(obj)
        if (result.STATUS=="success"&&result.MESSAGE=="MD5值存在"){
            this.setState({
                isShow:true,
                title:"此文件已存在请勿重复上传"
            })
         }else{
            const {fileuri,filename}=this.props
            const {md5}=await FileSystem.getInfoAsync(fileuri, {md5: true})
            let file={uri:fileuri,type: 'multipart/form-data',name:filename}
            let formData = new FormData();
            formData.append('file',file)
            formData.append("configKey",'SCMP-FILE');
            formData.append("md5",md5);
            this.setState({disabled:true})
            this.listener = DeviceEventEmitter.addListener("progress", (e) => {
                //e就是从页面B发送过来的数据
                if (e) {
                    this.setState({
                        progress:e*198
                    })
                }
            })
            const result=await reqFileUpload(formData)
            if(result.STATUS=="success"){
                this.listener.remove()
                this.setState({
                    isShow:true,
                    title:result.MESSAGE,
                    uploadReport:filename,
                    progress:null,
                    disabled:false
                },()=>{
                    this.refs.ref2.changeState()
                        files.push({
                            fileId:result.FILEID,
                            name:filename
                        })
                    // FileUploadSave(filename,result.FILEID)
                        FileUploadSave(files)
                })
            }else{
                this.setState({
                    isShow:true,
                    title:result.MESSAGE
                },()=>{
                    this.refs.ref2.changeState()
                })
            }
        }

    }
    changeState=()=>{
        this.setState({
            isVisible:true,
        },()=>{
        })
    }
    toChangeVisible=()=>{
        this.setState({isVisible:false})
    }
    componentWillMount() {
        this.setState({isVisible:true})
        this.setState(
            {
                progress:null
            }
        )
    }
    componentDidMount(){
        this.props.onRef(this)//将组件实例this传递给onRef方法
    }
    render() {
        const {title,isShow,progress,disabled}=this.state
        return (
            <Overlay isVisible={this.state.isVisible} overlayStyle={styles.overlay} onBackdropPress={this.toChangeVisible} >
                {
                    this.props.fileuri.indexOf("mp4")!==-1?<Video
                        source={{ uri:this.props.fileuri}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={true}
                        isLooping={true}
                        style={styles.image}
                    >
                        {/*<TouchableOpacity style={styles.play} onPress={this.videoPlay}>*/}
                        {/*</TouchableOpacity>*/}
                    </Video>: <Image source={{uri:this.props.fileuri}} style={styles.image}/>
                }
                <Text style={styles.overlaytext}>{this.props.title}</Text>
                {this.props.flag?(<View>
                    <Button title="上传"  titleStyle={{color:"gray",}}  buttonStyle={styles.overlayboxClick} containerStyle={[styles.overlaybox,styles.overlayleft]} onPress={()=>{this.toUploadImage()}}/>
                    <Button title="取消" disabled={disabled} titleStyle={{color:"gray"}}  buttonStyle={styles.overlayboxClick} containerStyle={[styles.overlaybox,styles.overlayright]} onPress={this.toChangeVisible}/>
                </View>): <Button title="cancel" titleStyle={{color:"gray"}} buttonStyle={styles.overlayboxClick}  containerStyle={[styles.overlaysingle,styles.overlaysinglebox]} onPress={this.toChangeVisible}/>
                }
                {this.props.time?<Text style={{color:'white',textAlign:'center',position:'absolute',bottom:'20%',left:'42%'}}>{this.props.time}</Text>:null}
                {isShow?<AlertBox title={title} ref='ref2'/>:null}
                {progress?
                    <View style={[styles.progress,{width:209}]}>
                        <View style={[styles.progress,{width:progress,backgroundColor:'green',height:10,bottom:'12%',left:'50%'}]}></View>
                    </View>
                :null }
            </Overlay>
        )
    }
}

const styles=StyleSheet.create({
    background:{
        width:"100%",
        height:"100%",
        backgroundColor:"transparent",
    },
    wrap:{
        width:'70%',
        height:'70%',
    },
    overlay:{
        position:"relative",
        width:"90%",
        height:"70%",
        borderWidth: 0.5,
        borderColor: "transparent",
        borderRadius:1*16,
    },
    overlaybox:{
        position:"absolute",
        width:"34%",
        borderRadius:0.5*16,
        borderColor:"lightgray",
        borderWidth:2    ,
        bottom:-50,
    },
    overlaysinglebox:{
        position:"absolute",
        width:"34%",
        borderRadius:0.5*16,
        borderColor:"lightgray",
        borderWidth:2,
        bottom:2*16,
        backgroundColor: "white",
    },
    overlayboxClick:{
        backgroundColor: "transparent",
    },
    overlayleft:{
        left:"10%"
    },
    overlayright:{
        right:"10%"
    },
    overlaysingle:{
        left:"35%"
    },
    overlaytext:{
        width:"100%",
        textAlign:"center",
        position:"absolute",
        fontSize:14,
        top:"40%",
        left:"2%",
        color:"black",
    },
    image:{
        width:'100%',
        height:'90%',
    },
    play:{
        width:30,
        height:30,
        backgroundColor:'red'
    },
    progress:{
        height:12,
        backgroundColor:'white',
        borderRadius:10,
        position:'absolute',
        bottom:'17%',
        left:'50%',
        marginLeft:-100
    }
})
const mapState = (state) => ({
    fileUploadData: state.qualityInspector.fileUploadData
})

const mapDispatchToProps = (dispatch) => ({
    //提交新增零件号
    postAddMechanical(mechanical, qualityResult, realNumber, callBack) {
        dispatch(postAddMechanical(mechanical, qualityResult, realNumber, callBack))
    },
    FileUploadSave(fileName,fileID){
        dispatch(FileUploadSave(fileName,fileID))
    }
});

export default connect(mapState, mapDispatchToProps)(PreviewImage);
