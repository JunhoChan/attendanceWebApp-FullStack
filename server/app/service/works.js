const Service = require('egg').Service;



class WorkService extends Service {


  async getAllWorksList(params) {
            return this.ctx.helper.setPageRecentData(params,'works')
  }


  // 新加work
  async createNewWork(params) {
    params.createTime = this.ctx.helper.formatDate("yyyy-MM-dd hh:mm:ss");
    if(params.worker) {
        params.statusIns = `任务创建于: ${params.createTime},当前工作人员为：${params.worker}`; // 切记尾部加逗号
        params.status = 1;
    } else {
        params.statusIns = `新建任务于: ${params.createTime}`;
        params.status = 0;
    }
    const response = await this.app.mysql.insert('works', params )
    if ( response.affectedRows === 1 ) {
        return { msg: '任务添加成功', code:201  } 
    }
    return { msg: '注册失败，请联系管理员', code:400  } 
  }


 // id  status只能为2  3
  async updateWorkStatus(params) {
    const res1 = await this.app.mysql.select('works',{
         where: { id: params.id, },
         columns: ['statusIns','status'],
    })
    params.statusIns = res1[0]['statusIns'] // 当前工作介绍
    const result = await this.updateCurrentWorkStatus(params)
    return result
  }

  // 工作状态对应修改
  async updateCurrentWorkStatus(params) {
      let createTime = this.ctx.helper.formatDate("yyyy-MM-dd hh:mm:ss")    
      let statusIns = parseInt(params.status) === 2 ? 
            `${params.statusIns},任务待管理员检查,于${createTime}提交检验` :
            `${params.statusIns},任务于${createTime}完成`     
      let row = parseInt(params.status) === 2 ?
            {id:params.id, status:2,statusIns:statusIns} :
            {id:params.id, status:3,statusIns:statusIns}
      const res1 = await this.app.mysql.select('works',{
         where: { id: params.id, },
         columns: ['status'],
      })
      if( parseInt(res1[0]['status']) === 1 && row.status === 2 ) {
        const result = await this.updateStatus(row)
        return { msg: '任务修改成功', code:202  } 
      } else if( parseInt(res1[0]['status']) === 2 && row.status === 3 ) {
        const result = await this.updateStatus(row)
        return { msg: '任务修改成功', code:202  } 
      }
      return { msg: '请勿重复操作', code:202  } 
  }

  async updateStatus(params) {
      const response = await this.app.mysql.update('works',params)
      if( response.affectedRows === 1 ) {
          return { msg: '任务修改成功', code:202  } 
      }
      return { msg: '服务器问题!', code:500  } 
  }


  // 用户获取工作内容
  async getUserAllWork(params) {
    if(parseInt(params.status) === 3) { // 任务完成
        const response1 = await this.app.mysql.select('works',{
          where:{ worker: params.worker, status: 3 }
        })
        return response1
    }else {
        const response2 = await this.app.mysql.select('works',{
          where:{ worker: params.worker, status: [ 1 , 2 ] }
        })
        return response2
    }
  }

}

module.exports = WorkService;