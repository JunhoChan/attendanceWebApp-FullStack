'use strict';

const Controller = require('egg').Controller;

class AttendanceController extends Controller {

	// 成员签到
	async numberSignIn() {
	  	const ctx  = this.ctx
	  	const params = ctx.request.query
	  	const res = await ctx.service.attendance.numberSignIn(params);
	    ctx.body  = res;
	    ctx.status = 200;		
	}

	// 获取考勤信息列表
	async index() {
	  	const ctx  = this.ctx
	  	const params = ctx.request.query
	  	const res = await ctx.service.attendance.getAttendanceInfoList(params);
	    ctx.body  = res;
	    ctx.status = 200;			
	}

	async upAttendanceState() {
	  	const ctx  = this.ctx
	  	const params = ctx.request.query
	  	const res = await ctx.service.attendance.upAttendanceState(params);
	    ctx.body  = res;
	    ctx.status = 202;
	}

}

module.exports = AttendanceController;
