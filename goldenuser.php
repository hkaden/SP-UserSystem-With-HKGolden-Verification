<?php
  function valid_token() {
    $return = $_REQUEST['token'] === $_SESSION['token'] ? true : false;
    set_token();
    return $return;
  }
  //if(!valid_token()){
  //  echo "token error";
  //  exit();
  //}
  $userid = $_POST['id'];
  $tone = $_POST['tone'];
  $url = 'http://forum15.hkgolden.com/ProfilePage.aspx?userid=' . $userid ;
  $page_content = file_get_contents($url);

  //echo 1;

  if (strpos ($page_content, $tone)){
    echo 1;
  } else {
    echo 2;
  }

 ?>
