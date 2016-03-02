//jQuery time
/*
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
*/

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
