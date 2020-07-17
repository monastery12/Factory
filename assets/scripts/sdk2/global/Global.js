//window.BigInt = require('BigInt').BigInt;
//window.BigIntMath = require('BigInt').BigIntMath;

window.randomInt = function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

window.messageTips = function (msg) {
    cc.systemEvent.emit("GAME_MESSAGE_TIPS", msg);
}

window.ledLine = function (msg) {
    cc.systemEvent.emit("LED_LINE", msg);
}

window.stringLimit = function (orgStr, limit) {            //限制字符串长度
    if (orgStr.length > limit) {
        return orgStr.slice(0, limit) + "...";
    } else {
        return orgStr;
    }
}

window.debugMode = function () {
    if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME) {
        return true;
    } else {
        return false;
    }
}


window.illegalNumber = function (num, min, max) {
    if (typeof num === 'number' && !isNaN(num) && !(num == Infinity)) {

        var illegal = false;

        if (min != undefined) {
            if (num < min) {
                illegal = true;
            }
        }

        if (max != undefined) {
            if (num > max) {
                illegal = true;
            }
        }

        if (!illegal) {
            return false;
        }

        // if ((min != undefined) && (max != undefined)) {
        //     if (num >= min && num <= max) {
        //         return false;
        //     }
        // } else {
        //     return false;
        // }
    }

    if (debugMode()) {
        cc.error("illegal number");
    } else {
        //request到服务器
        cc.error("illegal number");
    }

    return true;
}

window.exitGame = function () {
    cc.log("exitMiniProgram");
    wx.exitMiniProgram();
}

window.illegalString = function (str, notNullString) {
    if (typeof (str) == "string") {
        if (notNullString) {
            if (str.length > 0) {
                return false;
            }
        } else {
            return false;
        }
    }

    return true;
}

//* title
//* message
//* ok {func, target, args}
//* cancel {func, target, args}
window.messageBox = function (param) {
    UIManager.openViewByParam({
        createType: 1, viewType: 1, pfbUrl: "prefabs/other/message_box",
        viewName: "MessageBox", customParam: param
    });
}

//大于等于
// sdkVersionUnless(2.0.0, 2.0.4) 返回 false
//==================================================
window.sdkVersionUnless = function (left, right) {
    var leftArr = left.split(".");
    var rightArr = right.split(".");

    for (var i = 0; i < leftArr.length; i++) {
        if (parseInt(leftArr[i]) < parseInt(rightArr[i])) {
            return false;
        } else if (parseInt(leftArr[i]) > parseInt(rightArr[i])) {
            return true;
        }
    }

    return true;
}

window.checkDifferentDay = function (ls, ns) {
    if (Math.floor((ls / 3600 + 8) / 24) != Math.floor((ns / 3600 + 8) / 24)) {
        return true;
    } else {
        return false;
    }
}

var getAuthing = false;

window.checkAndGetAuth = function (auth, callback) {
    if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME) {
        callback();
        return;
    }

    cc.systemEvent.emit("AUTH_TIME_LOCK", true);

    wx.getSetting({
        success: res => {

            if (res.authSetting[auth]) {
                cc.systemEvent.emit("AUTH_TIME_LOCK", false);
                callback();
            } else if (res.authSetting[auth] == false) {
                wx.openSetting({
                    success: osRes => {
                        if (osRes.authSetting[auth]) {
                            setTimeout(callback, 200);
                        } else {
                            messageTips("请给予对应权限");
                        }
                    },
                    fail: () => {
                        messageTips("授权面板拉取失败");
                    },
                    complete: () => {
                        //getAuthing = false;
                        cc.systemEvent.emit("AUTH_TIME_LOCK", false);
                    }
                })
            } else if (res.authSetting[auth] == undefined) {
                wx.authorize({
                    scope: auth,
                    success: () => {
                        callback();
                    },
                    fail: () => {
                        messageTips("未通过授权无法使用该功能");
                    },
                    complete: () => {
                        //getAuthing = false;
                        cc.systemEvent.emit("AUTH_TIME_LOCK", false);
                    }
                })
            }
        },
        fail: () => {
            messageTips("获取授权信息失败");
            cc.systemEvent.emit("AUTH_TIME_LOCK", false);
            //getAuthing = false;
        },
    })
}

window.recursionCocosNode = function (root, everyCall) {
    everyCall(root);
    if (root.children) {
        for (var cr of root.children) {
            recursionCocosNode(cr, everyCall);
        }
    }
}


window.changeParentWithoutMove = function (node, target) {
    var wp = node.convertToWorldSpaceAR(cc.v2(0, 0));
    target.addChild(node);
    node.position = target.convertToNodeSpaceAR(wp);
}

window.convertPosNodeToNode = function(dst, src, pos) {
    var wp = src.convertToWorldSpaceAR(pos);
    return dst.convertToNodeSpaceAR(wp);
}

window.jumpMiniProgram = function(param, succ, fail) {
    if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME) {
        return;
    }

    if (sdkVersionUnless(wx.getSystemInfoSync().SDKVersion, "2.2.0")) {
        wx.navigateToMiniProgram({
            appId: param.appId,
            path: param.path,
            extraData: param.extraData,
            envVersion: param.envVersion,
            success: succ,
            fail: fail
        })
    } else {
        if (param.qcode_url) {
            wx.previewImage({
                urls : [param.qcode_url],
                success: succ,
                fail: fail
            });
        } else {
            messageTips("微信版本过低");
        }
    }
}

var uniqueIdCount = (new Date()).getTime() * 1000 + 1;

window.getUniqueHandleId = function () {
    return uniqueIdCount++;
}

/**
 * 2019/3/18
 * 数字显示
 */
window.numberShow = function (num) {
    if( num < 1000 ){
        return num;
    }else if( 1000<= num && num< 1000000  ){
        var INT =   parseInt( (num / 1000)*100 ) /100 ;
        return INT.toString() + "K";

    }else if( 1000000 <= num && num < 1000000000 ){
        var INT = parseInt( (num / 1000000)*100 )/100;
        return INT.toString() + "M";
    }else if( 1000000000<= num && num < 1000000000000){
        var INT = parseInt( (num / 1000000000)*100 )/100;
        return INT.toString() + "G";
    }
    else{
        return num ;
    }
}

//取概率
window.quanZhong = function ( index ){
    if( index === 0 ){
        return ;
    }

    if(index == 1 ){
        return 1;
    }

    var sum = 0;
    for( var m  = 0 ; m < index ; m++ ){
        sum += Math.pow(2,m);
    }

    var rnum = Math.random() * sum ;                       //

    for(var i = 1; i <= index ; i++){

        if(rnum <= 1 ){
            // console.log("随机任务",i);
            return 1;
        }

        if(rnum >= Math.pow(2,index ) ){
            return index ;
        }

        if(  rnum >= Math.pow(2, (i-1) )   && rnum < Math.pow(2,i)   ){
            // console.log("随机任务",i);
            return i;
        }
    }
}