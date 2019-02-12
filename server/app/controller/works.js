'use strict';

const Controller = require('egg').Controller;

class WorkController extends Controller {
 
	// 查看工作列表
	async index() {
		const ctx  = this.ctx;
	  	const params = ctx.request.query;
	  	const res = await ctx.service.works.getAllWorksList(params);
	    ctx.body  = res;
	    ctx.status = 200;		
	}

	// 新增工作
	async create() {
	  	const ctx = this.ctx;
	  	const params = ctx.request.body;
	  	const res = await ctx.service.works.createNewWork(params);
	    ctx.body  = res;
	    ctx.status = 201;
	}

	// 修改工作细节 包括委派人员
	async update() {
	  	const ctx = this.ctx;
	  	const params = ctx.request.body;
	  	const res = await ctx.service.works.updateWorkStatus(params);
	    ctx.body  = res;
	    ctx.status = 202;
	}
	
	// 当前接受任务 包括完成和未完成 username
	async getUserAllWork() {
		const ctx  = this.ctx;
	  	const params = ctx.request.query;
	  	const res = await ctx.service.works.getUserAllWork(params);
	    ctx.body  = res;
	    ctx.status = 200;		
	}



}

module.exports = WorkController;
