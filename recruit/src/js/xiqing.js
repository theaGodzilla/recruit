let rootapi = 'http://localhost:9000/'
    var ID=localStorage.getItem('dd')
    console.log(ID)
    var data={
        ID:ID
    }
    $.post(rootapi+'api/qiy/byId',data,function(res){
         console.log(res)
         var yq=res.data[0].yq.split(';');
        console.log(yq)
         var top=``;
         var xibox=``;
         for(var i=0;i<res.data.length;i++){
             top=`
             <div class='container'>
                    <div class="top-con">
        
                            <div class='top-title'>
                                    ${res.data[i].job}
                            </div>
                            <div class='tao' onclick=showdiv()>
                                投简历
                            </div>
                     
                        <p class="h1">
                                ${res.data[i].gz}/${res.data[i].address}${res.data[i].xueli}
                        </p>
                        <p class='xinx'>
                                ${res.data[i].time} &nbsp;&nbsp;  ${res.data[i].xinxi} 
                        </p>
                    </div>
                </div>
             
             `;
             for(var j=0;j<yq.length;j++){
                   xibox=`
                        <p class='you'>职位诱惑：</p>
                            <h2 class='h2'>
                                    ${res.data[i].ctype}
                            </h2>
                            <h2 class='h2'>
                                    ${res.data[i].like}
                            </h2>
                            <p class='you'>职位描述：</p>
                            <h3 class='h3'>职位描述</h3>
                                <ul class='boxul'>
                            
                                    <li>${res.data[i].yq.split('；')[0]}</li>
                                    <li>${res.data[i].yq.split('；')[1]}</li>
                                    <li>${res.data[i].yq.split('；')[2]}</li>
                                 
                                </ul>
                    `;

             }
             
         }
         $('.top').html(top)
         $('.xibox').html(xibox)
    })


    $('.nav-item').click('nav-list',function(){
        window.location.href="index.html"
        console.log("")
  })

  //弹窗
function showdiv(){
    $('.Box').css('height',$(window).height()).css('width',$(window).width());
    $('.Box').show();
    box()
}

function box(){
    var top=($(window).height()-$('.show').height())/2;
    var left=($(window).width()-$('.show').width())/2;
    $('.show').css({top:top,left:left}).show()
}
//关闭模态框

$('.show').click('.span1',function(){
    $('.Box').hide()
    $('.show').hide()

})