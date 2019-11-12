$(document).ready(function () {

    var sorting = 'all'; // Параметр сортировки
    var search_val = false; //Значение сортировки

    getSearchList(); //Получаем список параметров сортировки
    getData(sorting, search_val); //Получаем таблицу значений  

    //Анимация списка параметров сортировки [1] 
    $('.sort-zag').click(function () {
        actionMenu('sort');
    });
    //Клик вне элемента сортировки [2]
    clickAway('sort');

    //Выбор параметра сортировки
    $(document).on('click', '.sort-item', function () {

        var sort_html = $(this).html();
        var sort_selected = $(this).data('sort');
        
        //Замена текста выбранного параметра
        $('.sort-select').empty();
        $('.sort-select').append(sort_html);
        $('.sort-zag').attr('data-sort', sort_selected);

        //Анимация закрытия списка параметров сортировки [1] 
        actionMenu('sort');
    });

    //действия, при нажатии кнопки Найти
    $('#search-btn').click(function () {
        
        //Поучение введеного значения в поиск 
        var search_val = $('#search-input').val();
        //Преобразование значения
        search_val = search_val.toLowerCase();
        search_val = search_val.replace(/\s/g, '');
        //Получение выбранного  параметра сортировки
        var sorting = $('#sort-val').attr('data-sort');
        
        //Если выбран хоть один параметр и длина значения равна 0
        if (sorting !== 'all' && search_val.length == 0) {
            var search_val = false;
        }
        //То показываем все значения таблицы
        clearContent();
        getData(sorting, search_val);
    });

});

//запрос на получение данных из массива данных
//функция получает на вход 2 значения - параметр сортировки и значения поля поиска
function getData(sorting, search_val) {
    $.getJSON("../data/test1.json", function (data) {

        //Если выбран хоть один параметр сортировки и значение поиска больше 1
        if (sorting !== 'all' && search_val !== false) {
            
            //Для каждой строки таблицы
            data['teachers'].forEach(function (zag) {
                
                let arr_html = '';
                //Выбор элемента массива совпадающего с параметром сортировки
                let arr_target = zag[sorting];
                //Преобразование данных
                arr_target = arr_target.toLowerCase();
                arr_target = arr_target.replace(/\s/g, '');
                //Если удволетворяет параметру сортировки, то добавляем в таблицу строку
                if (arr_target.indexOf(search_val) !== -1) {
                    $.each(zag, function (zag, val) {
                        arr_html = arr_html + '<td>' + val + '</td>';
                    });
                    $('.data-table').append('<tr class="st-item">' + arr_html + '</tr>');
                }
            });
        //Если не задан параметр сортировки и значение поля поиска больше 1
        } else if (sorting == 'all' && search_val !== false) {
            
            //Для каждоый строки
            data['teachers'].forEach(function (zag) {

                let arr_html = '';
                //Вводим параметр подтверждения совпадения
                var arr_target_succes = false;
                
                //Проверяем каждый элемент строки на  совпадение значение поиска 
                $.each(zag, function (zag, val) {
                    
                    let arr_target = val;
                    arr_target = arr_target.toLowerCase();
                    arr_target = arr_target.replace(/\s/g, '');
                    
                    //Если совпадение есть, то устанавливаем параметру совпадения значение true
                    if (arr_target.indexOf(search_val) !== -1) {
                        arr_target_succes = true;
                    }
                    arr_html = arr_html + '<td>' + val + '</td>';
                });
                //Если значение параметра совпадения == true, то отрисовываем строку
                if (arr_target_succes == true){
                    $('.data-table').append('<tr class="st-item">' + arr_html + '</tr>');
                }
            });
        //Если не выбрано ни одног опараметра поиска и поле поиска пусто, то отрисовываем всю таблицу полностью
        } else {
            data['teachers'].forEach(function (zag) {
                
                let arr_html = '';
                $.each(zag, function (zag, val) {
                    arr_html = arr_html + '<td>' + val + '</td>';
                });

                $('.data-table').append('<tr class="st-item">' + arr_html + '</tr>');
            });
        }
    })
};

//Получение списка параметров сортировки
function getSearchList() {
    $.getJSON("../data/test1.json", function (data) {
        
        //Добавляем в массив все значения столбцов 
        let arr_zag = [];
        $.each(data['teachers'][0], function (zag) {
            arr_zag.push(zag);
        });

        arr_zag.forEach(function (zag) {
            //Отрисовываем названия столбцов
            $('.table-zag').append('<th>' + zag + '</th>')
            //Отрисовываем список параметров сортировки
            $('.sort-menu').append(
                '<div class="sort-item" data-sort="' + zag + '">' + zag + '</div>'
            )
        })

    })
};

// [1] - Выпадающий список
function actionMenu(target) {
    if ($('.' + target + '-menu').css('display') == 'none') {
        $('.' + target + '-menu').css('display', 'block');
    } else {
        $('.' + target + '-menu').css('display', 'none');
    }
    if ($('.' + target + '-zag').children('#menu-arrow').hasClass('menu-arrow-active')) {
        $('.' + target + '-zag').children('#menu-arrow').removeClass('menu-arrow-active');
    } else {
        $('.' + target + '-zag').children('#menu-arrow').addClass('menu-arrow-active');
    }
}

// [2] - Клик вне элемента
function clickAway(target) {
    $(document).mouseup(function (e) {
        var div = $('.' + target);
        if (!div.is(e.target) &&
            div.has(e.target).length === 0) {
            $('.' + target + '-menu').css('display', 'none');
            $('.' + target + '-zag').children('#menu-arrow').removeClass('menu-arrow-active');
        }
    });
}

function clearContent() {
    $('.st-item').remove();
}
