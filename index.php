<?php
session_start();
function set_token() {
	$_SESSION['token'] = md5(microtime(true).rand(000001,9999999999).time().uniqid());
}
function randtext()
{
    $password_len = 15;    //字串長度
    $password = '';
    $word = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';   //亂數內容
    $len = strlen($word);
    for ($i = 0; $i < $password_len; $i++) {
        $password .= $word[rand() % $len];
    }
    echo $password;
}

if(!isset($_SESSION['token']) || $_SESSION['token']=='') {
 set_token();
}
?>
<!DOCTYPE html>
<html >
   <head>
      <meta charset="UTF-8">
      <title>HKGolden SP Server</title>
      <link rel="stylesheet" href="css/reset.css">
      <link rel="stylesheet" href="css/font-awesome.css">
      <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
      <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/grids-responsive-min.css">
      <link rel="stylesheet" href="css/style.css">
   </head>
   <body>
      <input id="hid" name="hid" type="hidden" value="<?php echo $_SESSION['token']; ?>" />
      <div class="header">
         <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
            <ul class="pure-menu-list">
               <li>
                  <font color="#FFFFF">Server Status: </font>
                  <?php
                     $connection = @fsockopen("127.0.0.1", 1234);
                     if ($connection) {
                     echo '<font color="#FFFFF">Login Server: </font>', '<font color="#52D017">','<i class="fa fa-check fa-2x"></i> ','</font>';
                     fclose($connection);
                     } else {
                     echo '<font color="#FFFFF">Login Server: </font>', '<font color="#FF0000">','<i class="fa fa-close fa-2x"></i> ','</font>';
                     }
                     $connection = @fsockopen("127.0.0.1", 9303);
                     if ($connection) {
                     echo '<font color="#FFFFF">Channl 1: </font>', '<font color="#52D017">','<i class="fa fa-check fa-2x"></i>','</font>';
                     fclose($connection);
                     } else {
                     echo '<font color="#FFFFF">Channl 1: </font>', '<font color="#FF0000">','<i class="fa fa-close fa-2x"></i>','</font>';
                     }
                     ?>
               </li>
            </ul>
         </div>
      </div>
      <!-- multistep form -->
      <form id="msform">
         <!-- progressbar -->
         <!-- fieldsets -->
         <fieldset>
            <h2 class="fs-title">聲明</h2>
            <h3 class="fs-subtitle">Step 1</h3>
            <h3 class="fs-subtitle">此伺服器專為高登仔而設<br>
               因此註冊帳號需通過高登帳號驗證<br>
               如閣下非高登會員請立即離開<br>
            </h3>
            <input type="button" name="next" class="next action-button" value="Next" />
         </fieldset>
         <fieldset>
            <h2 class="fs-title">高登帳號驗證</h2>
            <input type="text" id="userid" placeholder="高登會員編號" />
            <h3 class="fs-subtitle">
               驗證代碼：
               <text id="tone"><?php randtext(); ?></text>
            </h3>
            <h3 class="fs-subtitle">說明：將驗證代碼複製到個人檔案中的「個人網頁」欄位中後輸入會員編號進行驗證</h3>
            <input type="button" name="next" id="golden" class="action-button" value="驗證" />
            <div id="msg" style="display:none"></div>
            <br>
            <div id="reg" style="display:none">
      <form id="regform">
      <input type="text" name="goldenid" id="goldenid" placeholder="高登id" class="goldenid"/>
      <input type="text" name="username" id="username" placeholder="帳號" class="reg"/>
      <input type="password" name="pw" id="pw" placeholder="密碼" class="reg"/>
      <input type="password" name="pwagain" id="pwagain" placeholder="確認密碼" class="reg"/>
      <input type="button" name="next" id="submit" class="action-button" value="送出" />
      </form>
      </div>
      </fieldset>
      </form>
      <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
      <script src='http://thecodeplayer.com/uploads/js/jquery.easing.min.js'></script>
      <script src="js/validation.min.js"></script>
      <script src="js/index.js"></script>
   </body>
</html>
