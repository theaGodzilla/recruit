let rootapi = 'http://localhost:9000/'

$.post(rootapi + 'api/qiy/type', { text: $('.jishu_box .one')[0].innerText }, function (res) {
    // console.log(res)
        das(res.data, '.jishu')
        // das(res.data, '.design')
})

$.post(rootapi + 'api/qiy/type', { text: $('.jishu_box .two')[0].innerText }, function (res) {
    // console.log(res)
        // das(res.data, '.jishu')
        das(res.data, '.design')
})



//技术
$('.jishu_box .one').click(function () {
    $(this).addClass('ligth').siblings().removeClass('ligth');
    $('.job_box1').css('display', 'none');
    $('.job_box1').eq($(this).index()).css('display', 'block')

    var text = $(this).text();
    $.post(rootapi + 'api/qiy/type', { text: text }, function (res) {
        // console.log(res)
           das(res.data, '.jishu')
    })
})

function  das(data,type){
    // var data = res.data
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += `
       <li class="job_itit" onclick='reg()'>
            <div class='job_top'>
                    <h2 class='title'>${data[i].job}</h2>
                    <span class="time">${data[i].time}</span>

                    <p class="year">${data[i].xueli}</p>
                    <span class="wage">${data[i].gz}</span>
                    <span class="span1">${data[i].company}</span>
                    <span class="span1">地图</span>
                    <span class="span1">移动端</span>
            </div>
            <div class="job_bottom">
                    <img class='bo_log' src="../img/Cgp3O1idm3CAUuraAAK4M8uoNew039.jpg"></img>
                    <p class='bo_1'>阿里巴巴-高德</p>
                    <p class="bo_2">
                    ${data[i].address}
                    </p>
            </div>
     </li>
       `;
    }
    $(type +' .job_list').html(html)
}
function reg(){
    var beng=confirm('请登录');
    if(beng){
        window.location.href='xue_reg.html'
    }
    
}

//设计
$('.design-tab .jishu_list').click(function () {
    $(this).addClass('ligth').siblings().removeClass('ligth');
    $('.design .job_box').css('display', 'none');
    $('.design .job_box').eq($(this).index()).css('display', 'block')

    var text = $(this).text();
    $.post(rootapi + 'api/qiy/type', { text: text }, function (res) {
        // console.log(res)
        das(res.data, '.design')
    })
})

//搜索框的模糊查询
function ff(){
    var ty=$('.search-input').val();
    window.location.href='list.html?ty='+ty;
}
