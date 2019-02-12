'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 用户
  router.resources('users','/api/admin/users',controller.users)  

  // 委派人员列表
  router.get('/api/admin/getWorkerList', controller.users.getWorkerList)

  // 任务
  router.resources('works','/api/admin/works',controller.works)    

  // 公告
  router.resources('notifys','/api/admin/notifys',controller.notify) 

  // 考勤信息列表
  router.get('/api/admin/getAttendanceInfoList', controller.attendance.index)   
  
  // 更改考勤信息
  router.get('/api/admin/upAttendanceState', controller.attendance.upAttendanceState)      

  // 获取stat数据
  router.get('/api/admin/getWorkComprehensiveStat', controller.stat.index)     

  // 更新用户评价
  router.post('/api/admin/updateUserAchievement' , controller.users.updateUserAchievement)

  // 用户接口

  // 用户登录
  router.post('/v1/api/userLogin', controller.users.userLogin) 

  // 签到
  router.get('/v1/api/numberSignIn', controller.attendance.numberSignIn) 

  // 用户获取任务列表
  router.get('/v1/api/getUserAllWork' , controller.works.getUserAllWork)

  // 获取通告信息
  router.get('/v1/api/getNotifyMessage' , controller.notify.getNotifyMessage)  

  // 修改工作状态
  router.put('/v1/api/works/666' , controller.works.update)



};
