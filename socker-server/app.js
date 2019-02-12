var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 8088;
// file:///C:/Users/85725/Desktop/react-project/socker-server/chat/index.html
app.listen(PORT);
const hasUser = new Array() // 用户标识码
io.on('connection', socket => {
    const joinId = socket.id
    const that = this

  
    // get current user datas
    socket.on('CurrentOnlineUsers', ()=> {
        socket.emit('getCurrentOnlineUsers', JSON.stringify(hasUser));
    })

    // id SocketID  userId: 1000000001,username:'123456'
    socket.on('bindUserId',data => {
        let params = data,
            oIndex  = -1
        params.id = joinId
        hasUser.forEach((item,index) =>  {
            if(item.userId === data.userId) {
                oIndex = index
            }
        })
        oIndex === -1 ? hasUser.push(params) : hasUser[oIndex].id = joinId
    })


    socket.on('systemSendMessage', data => {
        data = JSON.parse(data)
        const userId = data.userId
        let SocketID = -1
        hasUser.forEach((item,index) =>  {
            if(item.userId === userId) {
                SocketID = item.id
            }
        })
        console.log(data)
        socket.to(SocketID).emit('receiveMessage',data.message);
    })


     // 当关闭连接后触发 disconnect 事件
    socket.on('disconnect', function () {
        let  oIndex = -1
        hasUser.forEach((item,index) =>  {
            if(item.id === joinId) {
                oIndex = index
            }
        })
        if(oIndex > -1) hasUser.splice(oIndex,1)
    });
})

// show listening port
console.log('app listen at：'+PORT);