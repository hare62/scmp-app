import ajax from "./ajax";

export const reqFileUpload=(data)=>ajax("/file/file-center/fileUpload",data,"POST")
export const reqMD5=(data)=>ajax("/file/file-center/validateFileMd5",data,'GET')
