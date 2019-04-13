let rootpath='http://localhost:9000';

function submit1(){
    var studData={
        xuehao:$('#email').val(),
        mima:$('#pass2').val(),
    }
    $.post(rootpath+'/api/studer/sreg',studData,function(res){
         console.log(res)
        if(res.err==0){
            window.localStorage.setItem('xuehao',$('#email').val())
            $('.two').css('display','block');
            $('.one').css('display','none');
        }
        else{
            alert('学号不存在')
        }
    })
}








function bnt1(){
   var em=localStorage.getItem("xuehao");
    var content={
        xuehao:em,
        email:$('.email').val(),
        language:$('.language').val(),
        major:$('.major').val(),
        xueli:$('.xueli').val(),
        job:$('#zewei').val(),
        like:$('.like').val(),
        city:$('#city').val()
    }
    // console.log(898)
    $.post(rootpath+'/api/studer/upstuder',content,function(res){
        console.log(res);
        console.log($('#zewei').val())
        // Android   Android 
         window.localStorage.setItem('zewei',$('#zewei').val())
         window.localStorage.setItem('city',$('#city').val())
        // window.localStorage.setItem('zewei','web')
        //  window.localStorage.setItem('city','广州')
         location='list.html';
    })
}



