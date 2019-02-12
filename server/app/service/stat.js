const Service = require('egg').Service;



class StatService extends Service {


  // 计算上周的数据
  async getWorkComprehensiveStat() {
    const results = []
    const lastWeekDays = this.SetWeekDate() // 上周天数 周一到周五
    const res1 = await this.getLastWeekData(lastWeekDays[0])
    const res2 = await this.getLastWeekData(lastWeekDays[1])
    const res3 = await this.getLastWeekData(lastWeekDays[2])
    const res4 = await this.getLastWeekData(lastWeekDays[3])
    const res5 = await this.getLastWeekData(lastWeekDays[4])
    results.push(res1,res2,res3,res4,res5)             
    return results
  }


  // 查找上周对应发布任务周期的数据
  async getLastWeekData(day) {
    const sql = `select count(*) as workPublishedCount from works where createTime like '%${day}%' `
    const result = await this.app.mysql.query(sql)
    return result[0]['workPublishedCount']
  }
 

 // 获取当月数据量
  SetWeekDate() {
    var dataValue = new Date()
    var year = dataValue.getFullYear()
    var month = dataValue.getMonth() + 1
    var day = dataValue.getDate()

    var thisWeekStart; //本周周一的时间
    if (dataValue.getDay() == 0) {  //周天的情况
    thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((dataValue.getDay()) + 6) * 86400000;
    }
     else {
      
          thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((dataValue.getDay()) - 1) * 86400000;
    }

    const WeekArr = []
     
    var prevWeekStart = thisWeekStart - 7 * 86400000;//上周周一的时间
    var prevWeekEnd = thisWeekStart - 1 * 86400000;//上周周日的时间

    WeekArr.push(this.formatDate(new Date(prevWeekStart))) //开始时
    WeekArr.push(this.formatDate(new Date(prevWeekStart + 24 * 60 * 60 * 1000 )))
    WeekArr.push(this.formatDate(new Date(prevWeekStart + 24 * 60 * 60 * 1000 *2 )))
    WeekArr.push(this.formatDate(new Date(prevWeekStart + 24 * 60 * 60 * 1000 *3 ))) 
    WeekArr.push(this.formatDate(new Date(prevWeekStart + 24 * 60 * 60 * 1000 *4 )))
    return WeekArr
  }



  formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) { 
             mymonth = "0" + mymonth;
     }
    if (myweekday < 10) {
             myweekday = "0" + myweekday;
    }
   return (myyear + "-" + mymonth + "-" + myweekday);
  }




}
module.exports = StatService;