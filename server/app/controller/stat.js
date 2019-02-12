'use strict';

const Controller = require('egg').Controller;

class StatController extends Controller {

   async index() {
  	const ctx  = this.ctx
  	const res = await ctx.service.stat.getWorkComprehensiveStat();
    ctx.body  = res;
    ctx.status = 200;
   }


}

module.exports = StatController;
