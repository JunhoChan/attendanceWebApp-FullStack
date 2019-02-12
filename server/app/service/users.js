const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class UserService extends Service {


  // 创建用户
  async createNewUser(params) {  // '${params.password}'
  	let createTime = Date.parse(new Date());
    let response = await this.app.mysql.insert('user',{username: params.name, 
        		password:params.psw, phone:params.phone, createdTime: createTime })
     if ( response.affectedRows === 1 ) 
      {
        	return { msg: '注册成功', code:201  }	
      }
      else
      {
        	return { msg: '注册失败，请联系管理员', code:400  }	
      }
}


  // 获取所有用户列表
   async getUserInfoList(params) {
      return this.ctx.helper.setPageRecentData(params,'user')
   }

   // 更新用户数据
   async updateUserData(params) {
      const row = {
        username: params.name,
        password: params.psw,
        phone   : params.phone
      };
      const options = {
        where: {
          userId: params.id
        }
      };
      const result = await this.app.mysql.update('user', row, options);
      if( result.affectedRows === 1 ) {
        return { msg:'update successfully!', code: '202' };
      }
      return { msg:'update fail!', code: '500' };
   }
  

   // 委派人员
   async getAssignment() {
      const condition = {
         columns: ['userId', 'username'], // 要查询的表字段
         orders: [ ['userId','desc'] ], // 排序方式
      }
      const result = await  this.app.mysql.select('user', condition)
      if(!result) return { msg: '系统问题！' , code: 400 }
      const convertResult = this.convertWorkerData(result)
      return { data: convertResult , code: 200 }
   }

   // 转换 title:  value key
   convertWorkerData(jsonStr) {
      const newArr = []
      JSON.parse( JSON.stringify(jsonStr) ).forEach((item,index) => {
          let obj = {}
          obj.title = item.username
          obj.value = item.username
          obj.key   = index
          newArr.push(obj)
      })
      return newArr
   }

   // 用户登录
   async userLogin(params) {
      const row = {
          where: { username: params.username, password: params.password },
          columns: ['userId','username','scope','value'],
      }
      const result = await this.app.mysql.select('user', row)
      if(!result[0]) return { msg:'账号与密码不匹配!', code:200 }
      return { data: result , msg:'登录成功!', code: 200 }
   }

   // 更新用户评价
   async  updateUserAchievement(params) {
      const row = {
        value: parseInt(params.value)
      };
      const options = {
        where: {
          userId: params.userId
        }
      };
      const result = await this.app.mysql.update('user', row, options);
      if( result.affectedRows === 1 ) {
        return { msg:'更新成功', code: '202' };
      }
      return { msg:'服务器问题!', code: '500' };
   }


}

module.exports = UserService;