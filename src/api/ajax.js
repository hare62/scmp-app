import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from "react-native"
import progressUtil from '../utils/progressUtil';

const BaseURL="http://47.108.27.242:8080"

export default async function ajax(url,data={},type="POST"){
    let progressWith=null
    const token =await AsyncStorage.getItem("token")
    //data=JSON.stringify(data)
    return new Promise((resolve,reject)=>{
        let promise,user_id
        if(type==="GET"){
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if(dataStr!==''){
                dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            if (url){
                promise=axios.get(BaseURL+url,{
                    headers: {
                        'Content-Type':"application/json",
                        'token': token
                    }//设置header信息
                })
            }else{
                promise=axios.get(BaseURL+url,{
                    headers: {
                        'Content-Type':"application/json",
                        'Authorization': " "+user_id
                    }//设置header信息
                })
            }
        }else if(type==="POST"){
            if(url){
                promise=axios.post(BaseURL+url,data,{
                    headers: {
                        // 'Content-Type':"application/json",
                        'Accept': 'application/json',
                        'token': token
                    },//设置header信息
                    onUploadProgress:(e)=>{
                        progressWith = (e.loaded / e.total)
                        DeviceEventEmitter.emit("progress",progressWith);
                    }
                })
            }else{
                promise=axios.post(BaseURL+url,data)
            }
        }else{
            promise=axios.put(BaseURL+url,data,{
                headers: {
                    'Content-Type':"application/json",
                    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhMDVlMmUwNjE3NTk0NjNhYmU1M2QyMTU5MWVhNjBmOCIsImlhdCI6MTU4ODk4OTg4MCwiZXhwIjoxNTg4OTkzNDgwfQ.5jzPCgWt6OksZ8r4c1CMZQxdTS_NnP0JPKRMTmDMibpAuX5WEnaQaw3IJhHzRQCdkOOWTvSayUAdIHXtdelzoQ'
                }//设置header信息
            })
        }
        promise.then(reponse=>{
            resolve(reponse.data)
        }).catch(error=>{
        })
        return 0
    })
}
