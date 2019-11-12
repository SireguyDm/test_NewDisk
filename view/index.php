<?php include('../templates/header.php') ?>

<div class="wrapper" data-page="1">
    <div class="search-section">
        <div class="s-content">
            <div class="search-bar">
                <input type="text" maxlength="64" autocomplete="off" placeholder="Поиск" id="search-input">
                <button id="search-btn">Найти</button>
            </div>
            <div class="sort">
                <div class="sort-zag" data-sort="all" id="sort-val">
                    <div class="sort-select">
                        Сортировка
                    </div>
                    <img src="../pics/icon/sort-down-arrow.png" id="menu-arrow">
                </div>
                <div class="sort-menu">
                    <div class="sort-item" data-sort="all">
                        Искать по всем
                    </div>
                </div>
            </div>
            <table>
                <tbody class="data-table">
                    <tr class="table-zag"></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
    
<script src="../js/table.js"></script>
<?php include('../templates/footer.php') ?>
