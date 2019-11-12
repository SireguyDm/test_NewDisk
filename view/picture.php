<?php 
    session_start();
    include('../templates/header.php');
?>
<div class="wrapper" data-page="2">
    <div class="preview_section">
        <form id="form" action="" method="post" enctype="multipart/form-data">
            <div class="select_file">
                <input type="file" id="img" accept="image/jpeg" name="img" />
            </div>
            <div>
                <img id="img-preview" src="../pics/placeholder-600x455.png" />
            </div>
            <button id="reset-img-preview">Удалить изображение</button>
            <p>Размер изображения</p>
            <div class="range">
                <p>50%</p>
                <input type="range" min="50" max="150" step="1" value="100" id="changeSize"> 
                <p>150%</p>
            </div>
        </form>
    </div>
</div>

<script src="../js/preview.js"></script>
<?php include('../templates/footer.php') ?>
