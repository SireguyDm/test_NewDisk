<?php 

session_start();

$prev_url = (((isset($_REQUEST['prev_url'])) && $_REQUEST['prev_url'] !== "")?$_REQUEST['prev_url']:'false'); //Путь картинки
$action = (((isset($_REQUEST['action'])) && $_REQUEST['action'] !== "")?$_REQUEST['action']:'false'); //Текущие действие

//Если в сессии нет картинки и файл с картинкой не выбран
if (!isset($_SESSION['prevUrl']) && $prev_url == 'false'){
    $data = 'false';
//Если в сессии уже хранится картинка и новый файл не выбран
} else if (isset($_SESSION['prevUrl']) && $prev_url == 'false') {
    //То возвращаем путь до картинки
    $data = $_SESSION['prevUrl'];
//Если выбран новый файл
} else if ($prev_url !== 'false') {
    //Перезаписываем сессию
    $_SESSION['prevUrl'] = $prev_url;
    $data = 'true';
}
//Если удаляем старую картинку
if ($action == 'delete'){
    unset($_SESSION['prevUrl']);
}

echo json_encode($data);
?>