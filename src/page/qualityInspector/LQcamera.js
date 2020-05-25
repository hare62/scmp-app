/**
 * 质检-零件号信息页面
 */

import React, {Component} from 'react';
import { Text, View, TouchableOpacity ,StyleSheet,Image} from 'react-native';
import { Camera } from 'expo-camera';
import Transform from "../../assets/images/transform.png"
import { Audio } from 'expo-av';
import PreviewImage from './component/PreviewImage';
import * as MediaLibrary from 'expo-media-library';
import {connect} from 'react-redux';
import TImeUtil from '../../utils/TImeUtil';
import progressUtil from '../../utils/progressUtil';


class LQCamera extends Component{
    state={
        type:Camera.Constants.Type.back,
        switchCamera:'photo',
        uri:"",
        upload:true,
        isShow:false,
        filename:"",
        fileuri:"",
        time:"",
        id:'',
    }

    takevideo=async ()=>{
        this.setState({
            id:''
        })
        const {status}=await Audio.requestPermissionsAsync()
        if (status==="granted"){
            if (this.camera) {
                let totalTime=0
                this.timer=setInterval(()=>{
                    let timeString=TImeUtil.getTImeForm(totalTime)
                    this.setState({
                        time:timeString,
                        id:timeString
                    })
                    totalTime+=1
                },1000)
                let video = await this.camera.recordAsync()
                console.log(video)
                this.setState({
                    uri:video.uri
                },()=>{
                    MediaLibrary.createAssetAsync(video.uri).then((response)=>{
                        console.log("创建资产",response)
                        const {filename,uri}=response
                        this.setState({
                            filename:filename,
                            fileuri:uri
                        })
                    })
                })
            }
        }else{

        }

    }
    pausevideo=async ()=>{
        console.log("stop")
        if (this.camera) {
            let video = await this.camera.stopRecording()
            clearInterval(this.timer)
            this.setState({
                time:""
            })
            console.log("video",video)
        }
    }
    tochangeModePhoto=()=>{
        this.setState({
            switchCamera:'photo'
        })
    }
    tochangeModeVideo=()=>{
        this.setState({
            switchCamera:'video'
        })
    }
    AlertImage=()=>{
        if(this.state.fileuri!==""){
            this.setState({isShow:true},()=>{
                this.ref1.changeState()
            })
        }
    }
    toTransform=()=>{
        if(this.state.type===Camera.Constants.Type.back){
            this.setState({
                type:Camera.Constants.Type.front,
            })
        }else{
            this.setState({
                type:Camera.Constants.Type.back,
            })
        }

    }
    takephoto=async ()=>{
        this.setState({
            id:''
        })
        console.log("takephoto")
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log("photo",photo)
            this.setState({
                uri:photo.uri
            },()=>{
                MediaLibrary.createAssetAsync(photo.uri).then((response)=>{
                    console.log("创建资产",response)
                    const {filename,uri}=response
                    this.setState({
                        filename:filename,
                        fileuri:uri
                    })
                })
            })
        }
    }
    render() {
        const {type,switchCamera,uri,isShow,filename,fileuri,time,id}=this.state
        return(
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1}} type={type} autoFocus="on" ref={ref => {
                    this.camera = ref;
                }} >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        {/*<TouchableOpacity*/}
                        {/*    style={{*/}
                        {/*        flex: 0.1,*/}
                        {/*        alignSelf: 'flex-end',*/}
                        {/*        alignItems: 'center',*/}
                        {/*        backgroundColor: 'red',*/}

                        {/*    }}*/}
                        {/*    onPress={() => {*/}
                        {/*        setType(*/}
                        {/*            type === Camera.Constants.Type.back*/}
                        {/*                ? Camera.Constants.Type.front*/}
                        {/*                : Camera.Constants.Type.back*/}
                        {/*        );*/}
                        {/*    }}>*/}
                        {/*    <Text style={{ fontSize: 18, marginBottom: 100, color: 'white' }}> Flip </Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </Camera>
                <View style={styles.bottomBox}>
                    <View style={styles.touchBar}>
                        <TouchableOpacity style={[styles.photo,{left:"30%"}]} onPress={this.tochangeModePhoto}>
                            <Text style={[styles.text,switchCamera==='photo'?{color:'orange'}:null]} >照片</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.photo,{right:'30%'}]} onPress={this.tochangeModeVideo}>
                            <Text style={[styles.text,switchCamera==='video'?{color:'orange'}:null]}>视频</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.Image} onPress={this.AlertImage}>
                        <Image style={styles.ImageSize} source={{uri:uri}}/>
                    </TouchableOpacity>
                    {switchCamera==='photo'?
                        <TouchableOpacity style={[styles.OnButton,styles.left]}  onPress={this.takephoto}/>:
                        <TouchableOpacity style={[styles.OnButton,styles.right]}  onPressIn={this.takevideo} onPressOut={this.pausevideo}/>
                    }
                    <TouchableOpacity style={styles.Transform} onPress={this.toTransform}>
                        <Image source={Transform} style={[styles.ImageSize,{width:40,height:40}]}/>
                    </TouchableOpacity>
                </View>
                {
                    isShow?<PreviewImage onRef={(ref) => this.ref1 = ref } flag={true} time={id} filename={filename} fileuri={fileuri}/>:null
                    // isShow?<AlertBox ref="ref1" flag={false} title="this is a test"/>:null
                }
                <View style={{position:'absolute',bottom:'27%',left:'45%'}}>
                    <Text style={{color:'white'}}>{time}</Text>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    OnButton:{
        position:"absolute",
        width:70,
        height:70,
        borderWidth:5,
        borderStyle:"solid",
        borderColor:'rgba(0,0,0,0.8)',
        borderRadius:80,
        backgroundColor:"black",
        bottom:"14%",
        left:'50%',
        marginLeft:-35,
    },
    left:{
        backgroundColor:'white'
    },
    right:{
        backgroundColor:'red'
    },
    bottomBox:{
        height:"25%",
        backgroundColor: 'white'
    },
    touchBar:{
        position:'relative',
        width: '100%',
        height: '30%',
        backgroundColor:'white'
    },
    photo:{
        position:'absolute',
        width: '15%',
        height: '60%',
        backgroundColor:'white',
        top:'15%'
    },
    text:{
        textAlign:'center',
        lineHeight:30,
    },
    Image:{
        borderWidth:1,
        borderColor:'lightgray',
        position:"absolute",
        width:50,
        height:50,
        backgroundColor:"lightgray",
        bottom:"21%",
        left:'20%',
        marginLeft:-25,
    },
    Transform:{
        position:"absolute",
        width:50,
        height:50,
        backgroundColor:"white",
        bottom:"17%",
        right:'12%',
        marginLeft:-25,
    },
    ImageSize:{
        width:50,
        height:50,
    }
})

export default LQCamera
