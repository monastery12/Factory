// var t_obj = {
//     unit:44,
//     time:4,
// }

// var json_obj = JSON.stringify(t_obj);
// console.log( typeof(json_obj) );

// var p_obj = JSON.parse(json_obj);
// console.log(p_obj);

var quanZhong = function ( index ){
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

//quanZhong(30);





