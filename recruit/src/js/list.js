let rootapi = 'http://localhost:9000/'


 function Id(id){
       window.localStorage.setItem('dd',id)
       window.location.href='xiqing.html'
 }


 if(window.location.href.indexOf('?')!=-1) {
      var va={
        va1:window.location.href.split('?')[1].split('=')[1]
       
     }
     console.log(va)
       $.post(rootapi + 'api/qiy/val',va,function(res){
             console.log("res:",res)
        var dd=res.data;
        box(dd)
       })
  }


function box(data){
      var html = '';
   for(var i=0;i<data.length;i++){
       html +=`
       <li class='list_li' onclick=Id('${data[i]._id}')>
            <span class='three'>${data[i].job}</span>
            <span class='two'>${data[i].ctype}</span>
            <span class='one'>${data[i].address}</span>
            <span class='one ti'>${data[i].gz}</span>
            <span class='one'>${data[i].time}</span>
            <span class='one'>${data[i].xinxi}</span>
        </li>
       `;
        $('.list_ul').html(html)
}
}


var data1 = {
      'zewei':localStorage.getItem('zewei'),
      'city':localStorage.getItem('city')
}

      $.post(rootapi + 'api/qiy/yao',data1,function(data){
      var cc=data.data
      console.log(data.data)
      box(cc)

})

//模糊查询

function btn(){
      var va={
          va:$('.search-input').val()
      }
     
      console.log(va)
$.post(rootapi + 'api/qiy/val',va,function(res){
      console.log("res:",res)
 var cc=res.data;
 box(cc)
})
}




