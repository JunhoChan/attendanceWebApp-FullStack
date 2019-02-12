const Service = require('egg').Service;


class AttendanceService extends Service {

  // 成员签到 流程 先检查当前是否有签到 没有 添加 无
  async numberSignIn(params) {
    const currentDate = this.ctx.helper.getCurrentDateTime()
    const sql = `select id,workStatus from attendance where username = '${params.username}' and createTime like '%${currentDate}%' `
    const queryResult = await await this.app.mysql.query(sql);
    if( !queryResult[0] ) {     
      return { msg: '请联系管理员!', code: 500 }
    }
    if( parseInt(queryResult[0].workStatus) === 0 ) {
        params.id = queryResult[0].id
        params.createTime = this.ctx.helper.formatDate("yyyy-MM-dd hh:mm:ss")     
        return this.updateAttendance(params)
    }else {
        return { msg: '今日已签到!', code: 200 }
    }
  }  



  // 获取信息列表 pamras { pagesize pagenum currentDate  }
  async getAttendanceInfoList(params) {
      const userList = await this.app.mysql.select('user',{columns: ['username']})
      const currentDate = this.ctx.helper.getCurrentDateTime()
      const queryIsOrNotExistData = await this.app.mysql.select('attendance',{
          where:{ createTime: currentDate } , limit: 1
      })
      if( !queryIsOrNotExistData[0] ) {
          const result = userList.forEach((item) => {
            if( this.createAttendanceItem(item.username,currentDate)) return false;
          })
         if( !result ) return { msg:'服务器异常',code: 500 }
      }
      return this.ctx.helper.setAttendancePageRecentData(params,'attendance');
  }


  // 更改考勤信息
  async upAttendanceState(params) {
      const result = await this.app.mysql.update('attendance', params);
      if( result.affectedRows === 1 ) {
        return { msg:'update successfully!', code: '202' };
      }
      return { msg:'update fail!', code: '400' };
  }


  async createAttendanceItem(uname,cDate) {
      const currentDate = this.ctx.helper.getCurrentDateTime()
      const response = await this.app.mysql.insert('attendance',  { username: uname,createTime: cDate })
      if( response.affectedRows === 1  ) {
          return true;
      }
      return false;
  }

  // 添加签到
  async updateAttendance(params) {
          // 添加签到
      const response = await this.app.mysql.update('attendance',
            {id:params.id, signInTime: params.createTime, workStatus:1})
      if ( response.affectedRows === 1 ) {
          return { msg: '今日成功签到!', code: 201 }
      }
      return  { msg: '服务器异常!', code: 500 }
  }


}

module.exports = AttendanceService;