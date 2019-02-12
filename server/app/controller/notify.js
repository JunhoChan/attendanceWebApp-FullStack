'use strict';

const Controller = require('egg').Controller;

class NotifyController extends Controller {

	// 获取通告信息
	async index() {
	  	const ctx  = this.ctx
	  	const res = await ctx.service.notify.getNotifyMessage();
	    ctx.body  = res;
	    ctx.status = 200;		
	}

	// 修改通告信息
	async update() {
		const ctx = this.ctx;
	  	const params = ctx.request.body
	  	const res = await ctx.service.notify.updateNotifyMessage(params);
	    ctx.body  = res;
   		ctx.status = 202;
	}

	// 获取通告信息
	async getNotifyMessage() {
	  	const ctx  = this.ctx
	  	const res = await ctx.service.notify.getNotifyMessage();
	    ctx.body  = res;
	    ctx.status = 200;		
	}



}

module.exports = NotifyController;
