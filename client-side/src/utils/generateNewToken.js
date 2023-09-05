import { login } from "../services";
export const getNewToken = (dispatch)=>{
    const refreshToken = localStorage.getItem('refresh_token');    
    if(refreshToken) {
        const dataInput = {refresh:refreshToken}
        const dataInputJson  = JSON.stringify(dataInput)
        login(dataInputJson,'post','refresh/',dispatch,null);
}}

export const tokenSetting = (data,setting) =>{
    if(setting === 'clear'){
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token')
    }else if(setting === 'save'){
        localStorage.setItem('refresh_token',data.refresh);
        localStorage.setItem('access_token',data.access)
    }else{
        console.log("invalid action")
    }
}