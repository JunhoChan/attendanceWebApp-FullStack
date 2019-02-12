module.exports = {

	// 时间转换
	formatDate(format) {
		const CurrentDate = new Date()
	    var args = {
	        "M+": CurrentDate.getMonth() + 1,
	        "d+": CurrentDate.getDate(),
	        "h+": CurrentDate.getHours(),
	        "m+": CurrentDate.getMinutes(),
	        "s+": CurrentDate.getSeconds(),
	        "q+": Math.floor((CurrentDate.getMonth() + 3) / 3),
	        S: CurrentDate.getMilliseconds()
	    };
	    if (/(y+)/.test(format))
	        format = format.replace(
	            RegExp.$1,
	            (CurrentDate.getFullYear() + "").substr(4 - RegExp.$1.length)
	        );
	    for (var i in args) {
	        var n = args[i];
	        if (new RegExp("(" + i + ")").test(format))
	            format = format.replace(
	                RegExp.$1,
	                RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
	            );
	    }
	    return format;
	},

	// 获取当前日期时间
	getCurrentDateTime() {
		const date   = new Date()
			 day    = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate(),
			 month  = date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
			  year  = date.getFullYear()
		return 	 year + '-' + month + '-' + day 
	},


	// 分页数据 return Object
	async setAttendancePageRecentData(params,tableName) {
		let pageNum = 1;
        let pageSize = 5;
        if (params.hasOwnProperty("pageNum") && params.pageNum >= 1) {
            pageNum = parseInt(params.pageNum)
        }
        if (params.hasOwnProperty("pageSize")) {
            pageSize = parseInt(params.pageSize)
        }
        let offsetNum = parseInt(pageNum * pageSize - pageSize)
		if ( params.type === 'join' ) { // 正常出勤
			let sql1 = `select COUNT(*) from ${tableName} where createTime = '${params.currentDate}' and workStatus IN(0,1)`;
	        let res1 = await this.app.mysql.query(sql1);
	        if( res1[0]['COUNT(*)'] === 0 ) return {  msg:'当前没有数据!' , code:'200' }
	        let res2 = await this.app.mysql.select( tableName ,{
	        	where: { createTime: params.currentDate,  workStatus: [0, 1]  },
	            limit: pageSize,
	            offset: offsetNum, 
	        })
	        let obj = {};
	        obj.data = res2;
	        obj.total = res1[0]['COUNT(*)'];
	        return obj
		} else {
			let sql1 = `select COUNT(*) from ${tableName} where createTime = '${params.currentDate}' and workStatus IN(2,3)`;
	        let res1 = await this.app.mysql.query(sql1);
	        if( res1[0]['COUNT(*)'] === 0 ) return {  msg:'当前没有数据!' , code:'200' }
	        let res2 = await this.app.mysql.select( tableName ,{
	        	where: { createTime: params.currentDate,  workStatus: [2, 3]  },
	            limit: pageSize,
	            offset: offsetNum, 
	        })
	        let obj = {};
	        obj.data = res2;
	        obj.total = res1[0]['COUNT(*)'];
	        return obj			
		}
	},


	// 公用分页数据 return Object
	async setPageRecentData(params,tableName) {
        let pageNum = 1;
        let pageSize = 5;
        if (params.hasOwnProperty("pageNum") && params.pageNum >= 1) {
            pageNum = parseInt(params.pageNum)
        }
        if (params.hasOwnProperty("pageSize")) {
            pageSize = parseInt(params.pageSize)
        }
        let offsetNum = parseInt(pageNum * pageSize - pageSize)
        let res1 = await this.app.mysql.select( tableName ,{
            limit: pageSize,
            offset: offsetNum, 
        })
        let sql2 = `select COUNT(*) from ${tableName}`;
        let res2 = await this.app.mysql.query(sql2);
        let obj = {};
        obj.data = res1;
        obj.total = res2[0]['COUNT(*)'];
        return obj
	},

};