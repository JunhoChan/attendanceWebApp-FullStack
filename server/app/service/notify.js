const Service = require('egg').Service;

class NotifyService extends Service {


  // 获取通告信息 
  async getNotifyMessage() {
    const result = await this.app.mysql.select('notify',{where:{id:1},columns: ['notifyContent']})
    return result
  }


  async updateNotifyMessage(params) {
  	params.id = 1
  	const result = await this.app.mysql.update('notify',params)
  	if( result.affectedRows === 1 ) {
        return { msg:'update successfully!', code: '202' }
    }
    return { msg:'update fail!', code: '400' }
  }



}
module.exports = NotifyService;