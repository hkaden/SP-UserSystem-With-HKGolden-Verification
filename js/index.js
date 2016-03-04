//jQuery time
/*
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
*/
$(function () {
    $('#chart').highcharts({
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['00:00AM', '01:00AM', '02:00AM', '03:00AM', '04:00AM', '05:00AM',
                '06:00AM', '07:00AM', '08:00AM', '09:00AM', '10:00AM', '11:00AM', '12:00PM',
                '01:00PM', '02:00PM', '03:00PM', '04:00PM', '05:00PM',
                    '06:00PM', '07:00PM', '08:00PM', '09:00PM', '10:00PM', '11:00PM']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});


function nextpage() {

    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({
                'left': left,
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
}


$(".next").click(nextpage);

$("#golden").click(function() {
    var goldenid;
    goldenid = $("#userid").val();
    if (goldenid == ''){
      $("#msg").fadeIn();
      $("#msg").html('<h3 class="fs-subtitle"><font color="red">未輸入會員編號！</font></h3>');
      return;
    }
    $.ajax({
        type: 'POST',
        url: 'goldenuser.php',
        data: {
            id: $("#userid").val(),
            tone: $("#tone").text()
        },
        beforeSend: function() {
            $("#msg").fadeIn();
            $("#msg").html('<h3 class="fs-subtitle"><font color="green">驗證中請耐心稍後.</font></h3>');
        },
        success: function(data) {
            if (data == 1) {

                $("#msg").fadeIn();
                $("#msg").html('<h3 class="fs-subtitle"><font color="blue">已完成驗證請填妥以下資料</font></h3>');
                $('#golden').fadeOut();
                //$("#msg").fadeOut();
                $("#reg").fadeIn();
                $("#goldenid").attr("value", goldenid);
                $("#goldenid").attr("disabled", "disabled");
                //alert('OK');
            } else {
                $("#msg").fadeIn();
                $("#msg").html('<h3 class="fs-subtitle"><font color="red">驗證失敗請確認擁有高登帳號或聯絡樓豬處理</font></h3>');
                $('#golden').fadeOut();
            }
        }
    });
    //alert(data);
});

$("#submit").click(function() {
    var regExp = /^[\d|a-zA-Z]+$/;
    var str = $("#username").val();
    if ($("#pw").val() != $("#pwagain").val()) {
        $("#msg").html('<h3 class="fs-subtitle"><font color="red">密碼與確認密碼必需相同</font></h3>');
        return;
    }
    if ($("#username").val().length > 12) {
        $("#msg").html('<h3 class="fs-subtitle"><font color="red">帳號長度不得大於12</font></h3>');
        return;
    }
    if (!regExp.test(str)) {
      $("#msg").html('<h3 class="fs-subtitle"><font color="red">帳號只能用英文或數字</font></h3>');
      return;
    }
    $.ajax({
        type: 'POST',
        url: 'register.php',
        data: {
            goldenid: $("#goldenid").val(),
            username: $("#username").val(),
            password: $("#pw").val(),
            token: $("#hid").val()
        },
        beforeSend: function() {
            $("#msg").html('<h3 class="fs-subtitle"><font color="green">資料傳送中</font></h3>');
        },
        success: function(data) {

            if (data == 1) {
                $("#msg").html('<h1 class="fs-subtitle"><font color="blue">註冊完成</font></h3>');
                $("#goldenid").val("")
                $("#username").val("")
                $("#pw").val("")
                $("#pwagain").val("")
            } else if (data == 2) {
                //$("#msg").fadeIn();
                $("#msg").html('<h3 class="fs-subtitle"><font color="red">帳號已存在</font></h3>');
                //$('#golden').fadeOut();
            } else if (data == 3) {
                $("#msg").html('<h3 class="fs-subtitle"><font color="red">一個高登帳號只能註冊一個遊戲帳號</font></h3>');
            } else if (data == 4) {
                $("#msg").html('<h3 class="fs-subtitle"><font color="red">系統錯誤請稍後或聯絡樓豬</font></h3>');
            }

        }
    });
});
