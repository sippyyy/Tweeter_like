import { post, get, put, postNoneAuthorized, del } from "../utils"
import { tokenSetting } from "../utils/generateNewToken"
import { getNewToken } from "../utils/generateNewToken"
import { getBaseInfo } from "../features/user/userInfoSlice";
import { closeNormalPopup } from "../components/Popup/NormalPopup";

export const apiTweet = async (dataInput, method, endpoint, params, dispatch, accessToken) => {
    let res = ''
    try {
        if (method === 'post') {
            res = await post(`api/tweets/${endpoint}`, dataInput, accessToken);
        } else if (method === 'get') {
            res = await get(`api/tweets/${endpoint}`, params, accessToken);
        } else if (method === 'put') {
            res = await put(`api/tweets/${endpoint}`, dataInput, params, accessToken);
        } else if (method === 'delete') {
            res = await del(`api/tweets/${endpoint}`, accessToken);
        }
        const { status, data } = res
        if (status === 200 || status === 201) {
            closeNormalPopup()
            return data
        } else {
            console.log("something went wrong")
        }
    } catch (err) {
        const { status, message } = err.response
        if (status === 401 || status === 403) {
            getNewToken(dispatch)
        }
    }
}

export const apiUser = async (dataInput, method, endpoint, params, dispatch, accessToken) => {
    let res = ''
    try {
        if (method === 'post') {
            res = await post(`api/user/${endpoint}`, dataInput, accessToken);
        } else if (method === 'get') {
            res = await get(`api/user/${endpoint}`, params, accessToken);
        } else if (method === 'put') {
            res = await put(`api/user/${endpoint}`, dataInput, accessToken);
        } else if (method === 'non-author') {
            res = await postNoneAuthorized(`api/user/${endpoint}`, dataInput);
        }
        const { status, data, message } = res
        if (status === 200 || status === 201) {
            // closeNormalPopup()
            return data
        } else if (status === 401 || status === 403) {
            getNewToken(dispatch)
        } else {
            console.log(message ? message : "Something went wrong")
        }
    } catch (err) {
        console.log(err)
        const { status, message } = err.response
        if (status === 401) {
            console.log(message)
            getNewToken(dispatch)
        }
    }
}

export const login = async (dataInput, method, endpoint, dispatch, direct) => {
    let res = ''
    try {
        res = await postNoneAuthorized(`api/token/${endpoint}`, dataInput);
        const { status, data, message } = res
        if (status === 200 || status === 201) {
            tokenSetting(data, 'save')
            if (dispatch) {
                dispatch(getBaseInfo(data.access))
            }
            if (direct) {
                direct('/')
            }
        } else {
            console.log(message ? message : "Something went wrong")
        }
    } catch (err) {
        const { status } = err.response
        if (status === 401 || status === 403) {
            tokenSetting(null, 'clear')
            if (dispatch) {
                dispatch(getBaseInfo(''))
            }
        }
    }
}