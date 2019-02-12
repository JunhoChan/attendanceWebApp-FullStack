'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {

  // 获取所有用户的信息 get	  
  async index() {
  	const ctx  = this.ctx
  	const params = ctx.request.query
  	const res = await ctx.service.users.getUserInfoList(params);
    ctx.body  = res;
    ctx.status = 200;
  }

  // 添加用户 ctx.request.body;
  async create() {
  	const ctx = this.ctx;
  	const params = ctx.request.body;
  	const res = await ctx.service.users.createNewUser(params);
    ctx.body  = res;
    ctx.status = 201;
  }

  // 更新用户数据
  async update() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const res = await ctx.service.users.updateUserData(params);
    ctx.body = res;
    ctx.status = 202;
  }

  // 委派工作人员
  async getWorkerList() {
    const ctx = this.ctx;
    const res = await ctx.service.users.getAssignment();
    ctx.body = res;
    ctx.status = 200;    
  }

  // 用户登录
  async userLogin() {
      const ctx = this.ctx;
      const params = ctx.request.body;
      const res = await ctx.service.users.userLogin(params);
      ctx.body  = res;
      ctx.status = 200;
  } 

  // 更新用户评价
  async updateUserAchievement() {
      const ctx = this.ctx;
      const params = ctx.request.body;
      const res = await ctx.service.users.updateUserAchievement(params);
      ctx.body  = res;
      ctx.status = 202;    
  }
  

}

module.exports = UsersController;
