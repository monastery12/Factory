const L1 = 20;
const L2 = 40;
const MOVE_TIME = 0.5;

var MyAction = {

    /**金币汇集
     * 形参：执行动画的节点 , 目的坐标xy
     * */
    moneyMove:function( obj_node, obj_x,obj_y){

        var x1 = obj_node.children[0].x   ; var y1 = obj_node.children[0].y
        var x2 = obj_node.children[0].x   ; var y2 = obj_node.children[0].y
        var x3 = obj_node.children[0].x   ; var y3 = obj_node.children[0].y
        var x4 = obj_node.children[0].x   ; var y4 = obj_node.children[0].y
        var x5 = obj_node.children[0].x   ; var y5 = obj_node.children[0].y
        var x6 = obj_node.children[0].x   ; var y6 = obj_node.children[0].y

        var arr_vec1 = [ cc.v2(x1,y1), cc.v2(obj_x,obj_y) ];
        var arr_vec2 = [ cc.v2(x2,y2), cc.v2( x2 + L1 , y2 + (obj_y - y2)*0.2 ),cc.v2( x2 + L1*3 ,y2 +  (obj_y - y2)*0.4 ),cc.v2( x2 + L1 ,y2 +  (obj_y - y2)*0.6 ) ,cc.v2(obj_x,obj_y) ];
        var arr_vec3 = [ cc.v2(x3,y3), cc.v2( x3 + L2 , y3 + (obj_y - y3)*0.2 ),cc.v2( x3 + L2*3 ,y3 +  (obj_y - y3)*0.4 ),cc.v2( x3 + L2 ,y3 +  (obj_y - y3)*0.6 ) ,cc.v2(obj_x,obj_y) ];
        var arr_vec4 = [ cc.v2(x4,y4), cc.v2( x4 - L1 , y4 + (obj_y - y4)*0.2 ),cc.v2( x4 - L1*3 ,y4 +  (obj_y - y4)*0.4 ),cc.v2( x4 - L1 ,y4 +  (obj_y - y4)*0.6 ) ,cc.v2(obj_x,obj_y) ];
        var arr_vec5 = [ cc.v2(x5,y5), cc.v2( x5 - L2 , y5 + (obj_y - y5)*0.2 ),cc.v2( x5 - L2*3 ,y5 +  (obj_y - y5)*0.4 ),cc.v2( x5 - L2 ,y5 +  (obj_y - y5)*0.6 ) ,cc.v2(obj_x,obj_y) ];
        var arr_vec6 = [ cc.v2(x6,y6), cc.v2(obj_x,obj_y) ];

        var call1 = cc.callFunc(function(){
            obj_node.active = false;
            obj_node[0].x = x1; obj_node[0].y = y1;
        },this);
        var call2 = cc.callFunc(function(){
            obj_node.active = false;
            obj_node[1].x = x2; obj_node[1].y = y2;
        },this);
        var call3 = cc.callFunc(function(){
            obj_node.active = false;
            obj_node[2].x = x3; obj_node[2].y = y3;
        },this);
        var call4 = cc.callFunc(function(){
            obj_node.active = false;
            obj_node[3].x = x4; obj_node[3].y = y4;
        },this);
        var call5 = cc.callFunc(function(){
            obj_node.active = false;
            obj_node[4].x = x5; obj_node[4].y = y5;
        },this);
        var call6 = cc.callFunc(function(){
            obj_node.active = false;
            obj_node[5].x = x6; obj_node[5].y = y6;
        },this);

        var action1 =  cc.sequence( cc.bezierTo(MOVE_TIME,arr_vec1 ),call1 );
        var action2 =  cc.sequence( cc.bezierTo(MOVE_TIME,arr_vec2 ),call2 );           
        var action3 =  cc.sequence( cc.bezierTo(MOVE_TIME,arr_vec3 ),call3 );           
        var action4 =  cc.sequence( cc.bezierTo(MOVE_TIME,arr_vec4 ),call4 );           
        var action5 =  cc.sequence( cc.bezierTo(MOVE_TIME,arr_vec5 ),call5 );         
        var action6 =  cc.sequence( cc.bezierTo(MOVE_TIME,arr_vec6 ),call6 );      
        
        obj_node.children[0].runAction(action1);
        obj_node.children[1].runAction(action2);
        obj_node.children[2].runAction(action3);
        obj_node.children[3].runAction(action4);
        obj_node.children[4].runAction(action5);
        obj_node.children[5].runAction(action6);
    }

}

module.exports = MyAction;