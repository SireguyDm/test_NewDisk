$(document).ready(function () {    
    
    //Получаем из сессии картинку
    getPreviewUrl(false);
    
    var picture = $('#img-preview');
    var const_width = picture.width(); //ширина картинки
    var const_height = picture.height(); //Высота картинки
    var change_size_interval;
    
    //добавление файла картинки
    $('#img').change(function () {
        var input = $(this)[0];
        let pic_size = $(this)[0].files[0].size; //Размер файла
        
        //Если размер файла меньше 5MB
        if (pic_size < 5242880){
            if (input.files && input.files[0]) {
                if (input.files[0].type.match('image.jpeg')) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //Получаем путь и отображаем картинку
                        var prev_url = e.target.result;
                        $('#img-preview').attr('src', prev_url);
                        //Отправляем путь картинки в сессию
                        sendPreviewUrl('add', prev_url);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
        //Если размер больше 5MB, выдаем ошибку
        } else {
            $('#form').append('<p id="error-text">Размер не должен превышать 5MB</p>');
        }
        
    });
    
    //Удаление картинки
    $('#reset-img-preview').click(function () {
        $('#img-preview').attr('src', '../pics/placeholder-600x455.png');
        //Удаляем из сессии
        sendPreviewUrl('delete', 'false');
        return false;
    });
    
    //Зажимаем ползунок размера картинки
    $('#changeSize').mousedown(function(){
        change_size_interval = setInterval(function() {
            var size = $('#changeSize').val();
            picture.width(const_width * (size / 100));
            picture.height(const_height * (size / 100));
        }, 1000);
        
    });
    
    //Отпускаем ползунок размера картинки
    $('#changeSize').mouseup(function(){
        clearInterval(change_size_interval);
        var size = $(this).val();
        picture.width(const_width * (size / 100));
        picture.height(const_height * (size / 100));
        
    });
      
});

//Получаем картинку из сессии
function getPreviewUrl(prev_url){
    $.post('../php/preview.php', {
        prev_url
    }, function (data) {
        var data = JSON.parse(data);
        if (data !== 'false'){
            $('#img-preview').attr('src', ''+ data +'');
        }
    });
};

//Отправляем путь картинки в сессию
function sendPreviewUrl(action, prev_url){
    $.post('../php/preview.php', {
        action,
        prev_url
    });
};