/**
 * Created by admin on 2017/8/3.
 */


$(function () {
    //导航栏开始--------------------------------------------------------------------------------------------------
//headerTop 悬浮显示的状态
    $('.headerNav li').mouseover(function () {
        if ($(this).children()[0]) {
            $(this).children()[0].style.color = '#ff0012';
        }

        var uls = this.getElementsByClassName('navSon')[0];
        if (uls) {
            $(uls).css('display', 'block');
        }
    });
    $('.headerNav li').mouseout(function () {
        if ($(this).children()[0]) {
            $(this).children()[0].style.color = '#fff'
        }

        var uls = this.getElementsByClassName('navSon')[0];
        if (uls) {
            $(uls).css('display', 'none');
        }
    });

    // 导航栏的下拉列表
    $('.headerNav >li:nth-child(2)').on('mouseover', function () {
        $('.more').addClass('moreImg');
    });
    $('.headerNav >li:nth-child(2) ').on('mouseout', function () {
        $('.more').removeClass('moreImg');
    });
    //导航栏结束---------------------------------------------------------------------------------------------------


    //轮播图开始---------------------------------------------------------------------------------------------------
    //数组--每一个数组元素都是一个键值对的对象

    var width = document.body.clientWidth;
    var dc=width/1920;
    window.addEventListener("resize", function () {
        var width = document.body.clientWidth;
    });


    var animations = [
        {
            index:0,

            left: -417*dc+'px',
            transform: 'translateZ(20px) scale(1)',
        },//0
        {
            index:1,

            left: -117*dc+'px',
            transform: 'translateZ(10px) scale(0.8)',
        },//1
        {
            index:2,

            left: 217*dc+'px',
            transform: 'translateZ(0) scale(0.6)',
        },//2
        {
            index:3,

            left: -1017*dc+'px',
            transform: 'translateZ(0) scale(0.6)',
        },//3
        {
            index:4,

            left: -717*dc+'px',
            transform: 'translateZ(10px) scale(0.8)',
        }//4
    ];
    var animationsImg = [
        {
            index:0,

            opacity:1,
        },//0
        {
            index:1,

            opacity:0.7,
        },//1
        {
            index:2,

            opacity:0.4,
        },//2
        {
            index:3,

            opacity:0.4,
        },//3
        {
            index:4,

            opacity:0.7,
        }//4
    ];

    var arr=[],bannerArr=[];
    var arrImg=[],bannerArrImg=[];
    for(var i=0;i<animations.length;i++){
        arr.push(animations[i]);
        bannerArr.push(animations[i]);
        arrImg.push(animationsImg[i]);
        bannerArrImg.push(animationsImg[i]);
    }
    $(function () {
        var timer = null;

        //图片散开
        // var flag = true;


        function assign() {
            arr=[];
            arrImg=[];
            $(".ulExample li").each(function (index, element) {
                arr.push(bannerArr[index]);

                $(this).animate(animations[index], 500, function () {
                    $(this).css('transform',animations[index].transform );

                });
            });
            //img透明度变换
            $(".ulExample li img").each(function (index, element) {
                arrImg.push(bannerArrImg[index]);

                $(this).animate(animationsImg[index], 1000, function () {});
            });
            // /*$(".ulExample li").each(function (index, element) {
            //  $(this).animate(animations[index],{
            //  speed:500,
            //  step:function () {
            //  $(this).css('transform',animations[index].transform );
            //  }
            //  });
            //  });*/
        }

        clock();

        function clock() {
            clearInterval(timer);
            timer = setInterval(function () {
                animations.unshift(animations.pop());
                animationsImg.unshift(animationsImg.pop());

                assign();
            }, 2000);
        }

        /*//停止
        $('.ulExample').mouseover(function () {
                clearInterval(timer);
                $(this).stop(true,true);
        });

        //开始
        $('.ulExample').mouseout(function () {
                clock();
        });*/

        //点击
        $('.ulExample li').click(function () {
            clearInterval(timer);
            var num=$(this).index();

            var arr1=arr.splice(arr.length-num);
            var arr2=arrImg.splice(arrImg.length-num);

            for(var i=arr1.length-1;i>=0;i--){
                arr.unshift(arr1[i]);
                arrImg.unshift(arr2[i]);
            }
            animations=arr;
            animationsImg=arrImg;

            assign();
            clock();
        })
    });







    //轮播图结束---------------------------------------------------------------------------------------------------


    //弹窗开始-----------------------------------------------------------------------------------------------------
    // 获取验证码图片
    // 内网
    var url='http://192.168.1.68:8000/';
    //外网
    // var url='';

    function getImg() {
        $.ajax({
            type: 'GET',
            url: url+'userapplication/imageCode',
            datatype: 'json',
            data: {},
            success: function () {
                $('.imgaa > img').attr('src', url+'userapplication/imageCode')
            }
        })
    }

    $('.contact').on('click', function () {
        $('.popups').css('display', 'block');
        getImg();
        // 点击更改验证码
        $('.imgaa').on('click', function () {
            getImg();
        })
    });
    // 关闭弹窗
    $('.exit').on('click', function () {
        $('.popups').css('display', 'none');
        // 关闭弹窗，清空数据
        $('.try input').each(function (index,ele) {
            $(ele)[0].value = '';
            ele.nextElementSibling.style.display = 'none'
        })
    });




    // 弹窗的正则匹配
    function checkInput(element,reg) {
        element.onblur = function () {
            if (reg.test(element.value)) {//匹配
                element.nextElementSibling.style.display = 'none'
            }else{//匹配错误
                element.nextElementSibling.style.display = 'block'
            }
        };
    }

    var arr1=[/^[^\s]+$/,/^[1]\d{10}$/,/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_-]+([.][a-zA-Z]+){1,2}$/,/^[^\s]+$/,/^[^\s]+$/,/^[^\s]+$/]
    // console.log(arr)
    var ds=$('.popups .try input');
    for(var i=0;i<ds.length;i++){
        checkInput(ds[i],arr1[i])
    }
    /* //姓名
     var regName=/^[^\s]+$/;
     checkInput($('.compellation'),regName);
     //手机号
     var regPhone=/^[1]\d{10}$/;
     checkInput($('.phone'),regPhone);
     //邮箱
     var regEMail=/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_-]+([.][a-zA-Z]+){1,2}$/;
     checkInput($('.email'),regEMail);
     // 公司
     var regCompany=/^[^\s]+$/;
     checkInput($('.company'),regCompany);
     //职位
     var regPosition=/^[^\s]+$/;
     checkInput($('.position'),regPosition);
     //验证码
     var regYzm = /^[^\s]+$/;
     checkInput($('.yzm'),regYzm);*/


    //提交
    $('.present').on('click',function () {

        for(var i=0;i<ds.length;i++){
            if(arr1[i].test(ds[i].value)){
                ds[i].nextElementSibling.style.display = 'none';
            }else{
                ds[i].nextElementSibling.style.display = 'block';
            }
        }
        var kael=false;
        for(var i=0;i<ds.length;i++){
            if(arr1[i].test(ds[i].value)){
                kael=true
            }else{
                kael=false;
                break;
            }
        }



        // 提交之前的判断，验证用户输入的信息正则表达式是否匹配
        if(kael ){
            var info = {
                platformname: 0,
                username: ds[0].value,
                phone: ds[1].value,
                email: ds[2].value,
                company: ds[3].value,
                position: ds[4].value,
                imgcode:ds[5].value
            };
            // console.log(info)
            info = JSON.stringify(info);
            // console.log(info);
            $.ajax({
                type: 'POST',
                url: url+ 'userapplication/createuserapplication',
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data: info,
                success: function (response) {
                    // console.log(response);
                    $('.popups').css('display', 'none');
                    $('.try input').each(function (index,ele) {
                        $(ele)[0].value = '';
                        ele.nextElementSibling.style.display = 'none'
                    });
                    alert('发送成功')
                }
            })
        }
    });



    //弹窗结束-------------------------------------------------------------------------------------------------

});

$(window).scroll(function(){
    if(($(this).scrollTop())/100 >= 1.6){
        $('.backTop').fadeIn();
    }
    else{
        $('.backTop').fadeOut();}
});
$('.backTop').click(function(){
    $('body,html').animate({scrollTop:0},300);
});


(function (win) {
    var docEl = win.document.documentElement;
    var time;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 1920) {
            width = 1920;
        } else if (width < 800) {
            width = 800;
            // console.log(width)
        }
        var rem = width / 19.2;
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function () {
        clearTimeout(time);
        time = setTimeout(refreshRem, 1);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(time);
            time = setTimeout(refreshRem, 1);
        }
    }, false);

    refreshRem();

})(window);
