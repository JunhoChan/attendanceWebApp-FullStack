/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
import AxiosApi from './../utils/ajax';   // 自己写的工具函数，封装了请求数据的通用接口
import { message } from 'antd';


export const getUserList = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.get('users', { params:params } );
        if(res.status === 200) {
            await dispatch({
                type: 'admin.getUserList',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

export const createUser = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.post('users' ,  params );
        if(res.status === 201) {
            await dispatch({
                type: 'admin.createUser',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 更新用户信息接口
export const updateUser = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.put('users/' + params.id ,  params );
        if(res.status === 202) {
            await dispatch({
                type: 'admin.updateUser',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 获取委派人员列表
export const getWorkerList = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.get('getWorkerList');
        if(res.status === 200) {
            await dispatch({
                type: 'admin.getWorkerList',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 新增任务
export const createWork = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.post( 'works', params );
        if(res.status === 202) {
            await dispatch({
                type: 'admin.createWork',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 获取工作数据列表
export const getWorkDatasList = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.get('works', {params: params});
        if(res.status === 200) {
            await dispatch({
                type: 'admin.getWorkDatasList',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 获取考勤数据列表
export const getAttendanceDatasList = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.get('getAttendanceInfoList', {params: params});
        if(res.status === 200) {
            await dispatch({
                type: 'admin.getAttendanceDatasList',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 更新考勤状态
export const upAttendanceState = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.get('upAttendanceState', {params: params});
        if(res.status === 202) {
            await dispatch({
                type: 'admin.upAttendanceState',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 更新考勤状态
export const getWorkComprehensiveStat = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.get('getWorkComprehensiveStat');
        if(res.status === 200) {
            await dispatch({
                type: 'admin.getWorkComprehensiveStat',
                payload: res.data.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};


// 获取公告信息
export const getNotifyMessage = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.get('notifys');
        if(res.status === 200) {
            await dispatch({
                type: 'admin.getNotifyMessage',
                payload: res.data[0],
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};


// 修改公告信息
export const updateNotifyMessage = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.put('notifys/666',params);
        if(res.status === 202) {
            await dispatch({
                type: 'admin.updateNotifyMessage',
                payload: res.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 修改公告信息
export const updateWorkStatus = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.put('works/666',params);
        if(res.status === 202) {
            await dispatch({
                type: 'admin.updateWorkStatus',
                payload: res.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

// 修改用户评价信息
export const updateUserAchievement = (params = {}) => async(dispatch) => {
    try {
        const res = await AxiosApi.post('updateUserAchievement',params);
        if(res.status === 202) {
            await dispatch({
                type: 'admin.updateUserAchievement',
                payload: res.data,
            });
        }
        return res;
    } catch(err) {
        message.error('网络错误，请重试');
    }
};