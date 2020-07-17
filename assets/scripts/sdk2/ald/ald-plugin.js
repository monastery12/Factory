
var AldPlugin = {

    //自定义事件埋点
    //wx.aldSendEvent('事件名称',{'参数key' : '参数value'})
    sendEvent (eventName, eventArgs) {
        if (cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME && wx.aldSendEvent) {
            cc.log('sendEvnet (' + eventName + ') args = ' + JSON.stringify(eventArgs));
            wx.aldSendEvent(eventName, eventArgs)
           // messageTips("接入成功");
        } else {
            //messageTips("阿拉丁未接入");
            //JQLog('环境不支持，无法上报统计');
        }
    },

    //将微信的wx.OnShareAppMessage替换成wx.aldOnShareAppMessage
    //分享，监听用户点击右上角菜单的“转发”按钮时触发的事件

    /*
        examples:
        wx.aldOnShareAppMessage(function(){
            return {
            imageUrl : 'https://favicon.yandex.net/favicon/aldwx.com', //转发显示图片的链接
            title    : '分享title', //转发标题
            query    : 'id=89&select=2'//查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.getLaunchOptionSync() 或 wx.onShow() 获取启动参数中的 query。
            }
        })
    */
    onShareAppMessage (callback) {
        if (cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME && wx.aldOnShareAppMessage) {
            wx.aldOnShareAppMessage(callback);
        } else {
            messageTips("阿拉丁未接入");
            //JQLog('环境不支持，无法上报统计');
        }
    },

    //将微信的wx.shareAppMessage替换成wx.aldShareAppMessage
    // 分享，主动拉起转发，进入选择通讯录界面

    /*
        examples:
        wx.aldShareAppMessage({
            imageUrl : 'https://favicon.yandex.net/favicon/aldwx.com',//转发标题
            title    : '分享title',//转发标题
            query    : 'id=89&select=2'//查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.getLaunchOptionSync() 或 wx.onShow() 获取启动参数中的 query。
        })
    */
    shareAppMessage (dataObject) {
        if (cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME && wx.aldShareAppMessage) {
            wx.aldShareAppMessage(dataObject);
        } else {
            messageTips("阿拉丁未接入");
            //JQLog('环境不支持，无法上报统计');
        }
    },
}

module.exports = AldPlugin;