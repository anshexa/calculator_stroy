<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("keywords", "");
$APPLICATION->SetPageProperty("description", "Калькулятор");
$APPLICATION->SetTitle("Калькулятор");
?>

<?php
$iblock_id = 4;
$arOrder = Array("SORT"=>"ASC");
$arFilter = Array(
    "IBLOCK_ID"=>IntVal($iblock_id),
    "ACTIVE"=>"Y");
    //выбираем разделы
    $res_r = CIBlockSection::GetList($arOrder, $arFilter, $bIncCnt = false);
    while($ob3 = $res_r->GetNext()){
        $id_r = $ob3["ID"];
        $name_r = $ob3["NAME"];
        $mas[$id_r] = $name_r;
    }
// список элементов
$res_elem=CIBlockElement::GetList($arOrder, $arFilter, false);
while($ob2 = $res_elem->GetNextElement()){
    $arFields = $ob2->GetFields();
    $id_e = $arFields["ID"];
    $name_e = $arFields["NAME"];
    $id_r = $arFields["IBLOCK_SECTION_ID"];
    // находим свойства элемента
    $arProps = $ob2->GetProperties();
    $price = $arProps[PRICE][VALUE];
    $unit_measure = $arProps[UNIT_MEASURE][VALUE];
    $use_formula = $arProps[USE_FORMULA][VALUE];
    $masE[$id_r][]=array('id'=>$id_e, 'name_service'=>$name_e, 'price'=>$price, 'unit_measure'=>$unit_measure, 'use_formula'=>$use_formula);
}
?>

<link rel="stylesheet" href="/calculator_stroy/calc_stroy.css">

<div class="groupbox">
   <h2>Расчет</h2>
   <div class="unit">
      <p>Единицы измерения</p>
      <div class="form-check">
         <input class="form-check-input" type="radio" name="flexRadioDefault" id="unit_m">
         <label class="form-check-label" for="unit_m">
            Метры
         </label>
      </div>
      <div class="form-check">
         <input class="form-check-input" type="radio" name="flexRadioDefault" id="unit_cm">
         <label class="form-check-label" for="unit_cm">
            Сантиметры
         </label>
      </div>
      <div class="form-check">
         <input class="form-check-input" type="radio" name="flexRadioDefault" id="unit_mm">
         <label class="form-check-label" for="unit_mm">
            Миллиметры
         </label>
      </div>
   </div>
   <button type="button" class="btn color addroom" id="btn_addroom1" title="Добавить комнату"
      onclick="func_addroom(this)"><i class="fa fa-plus"></i> Комната</button>
   <div class="room_inpt" id="room_inpt">
      <form action="" class="form_room">
         <div class="row"><strong>Размеры комнаты <span class="numb_room">1</span></strong></div>
         <div class="row">
            <div class="col">
               <p class="form-label">Длина</p>
               <div class="input-group mb-3">
                  <input type="text" class="form-control length_room" id="length_room1" value="1">
               </div>
            </div>
            <div class="col">
               <p class="form-label">Ширина</p>
               <div class="input-group mb-3">
                  <input type="text" class="form-control width_room" id="width_room1" value="1">
               </div>
            </div>
            <div class="col">
               <p class="form-label">Высота</p>
               <div class="input-group mb-3">
                  <input type="text" class="form-control height_room" id="height_room1" value="1">
               </div>
            </div>
         </div>

         <div class="row">
            <strong>Двери</strong>
         </div>
         <div class="door_inpt" id="door_inpt_room1">
            <div class="form_door" id="form_door1_room1">
               <div class="row">
                  <div class="col">
                     <p class="form-label">Кол-во</p>
                     <div class="input-group mb-3">
                        <input type="text" class="form-control quantity_door" id="quantity_door1_room1" value="1">
                     </div>
                  </div>
                  <div class="col">
                     <p class="form-label">Ширина</p>
                     <div class="input-group mb-3">
                        <input type="text" class="form-control width_door" id="width_door1_room1" value="1">
                     </div>
                  </div>
                  <div class="col">
                     <p class="form-label">Высота</p>
                     <div class="input-group mb-3">
                        <input type="text" class="form-control height_door" id="height_door1_room1" value="1">
                     </div>
                  </div>
                  <div class="col delete_door">
                  </div>
                  <div class="col add_new_door">
                     <button type="button" class="btn color add_door" id="btn_add_door1_room1" title="Добавить дверь"
                        onclick="func_add_door(this)"><i class="fa fa-plus"></i>
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <strong>Окна</strong>

         </div>
         <div class="window_inpt" id="window_inpt_room1">
            <div class="form_window" id="form_window1_room1">
               <div class="row">
                  <div class="col">
                     <p class="form-label">Кол-во</p>
                     <div class="input-group mb-3">
                        <input type="text" class="form-control quantity_window" id="quantity_window1_room1" value="1">
                     </div>
                  </div>
                  <div class="col">
                     <p class="form-label">Ширина</p>
                     <div class="input-group mb-3">
                        <input type="text" class="form-control width_window" id="width_window1_room1" value="1">
                     </div>
                  </div>
                  <div class="col">
                     <p class="form-label">Высота</p>
                     <div class="input-group mb-3">
                        <input type="text" class="form-control height_window" id="height_window1_room1" value="1">
                     </div>
                  </div>
                  <div class="col delete_window">
                  </div>
                  <div class="col add_new_window">
                     <button type="button" class="btn color add_window" id="btn_add_window1_room1" title="Добавить окно"
                        onclick="func_add_window(this)"><i class="fa fa-plus"></i>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <button type="button" class="btn color calculate" id="btn_calculate_room1"
            onclick="func_calc(this)">Рассчитать</button>

         <div class="calculation">
            <p>Площадь пола/потолка</p>
            <strong>
               <div class="square_floor" id="square_floor_room1">∞</div>
            </strong>
         </div>
         <div class="calculation">
            <p>Периметр комнаты</p>
            <strong>
               <div class="perimeter" id="perimeter_room1">∞</div>
            </strong>
         </div>
         <div class="calculation">
            <p>Площадь двери</p>
            <strong>
               <div class="square_door" id="square_door_room1">∞</div>
            </strong>
         </div>
         <div class="calculation">
            <p>Площадь окна</p>
            <strong>
               <div class="square_window" id="square_window_room1">∞</div>
            </strong>
         </div>
         <div class="calculation">
            <p>Площадь стен</p>
            <strong>
               <div class="square_wall" id="square_wall_room1">∞</div>
            </strong>
         </div>
         <br>
         <div class="price_list">
            <div class="price_list_item">
               <div class="table_price">
                  <table>
                     <thead>
                        <tr>
                           <td>Наименование услуги</td>
                           <td>Ед.изм.</td>
                           <td>Кол-во</td>
                           <td>Цена</td>
                           <td>Коэфф-т</td>
                           <td>Сумма</td>
                           <td>Комментарий</td>
                           <td>
                              <button type="button" class="btn color add_rowtable" id="btn_add_rowtable1_room1"
                                 title="Добавить строку" onclick="func_add_rowtable(this)"><i class="fa fa-plus"></i>
                              </button>
                           </td>
                        </tr>
                     </thead>
                     <tbody class="table_body" id="table_body_room1">
                        <tr class="rowtable" id="rowtable1_room1">
                           <td>
                              <span class="sp_service_select">
                                 <select class="service_select" id="service_select_rowtable1_room1" data-row="1"
                                    onchange="fill_servicefields(this)" onmouseover="show_fulltext(this)"
                                    onmouseout="hide_fulltext()">
                                    <option value="" hidden>Выберите услугу</option>
                                    <?php
                                    foreach($masE as $k=>$v){
                                       echo '<optgroup label="'.$mas[$k].'">';
                                       $i=0;
                                       foreach($v as $val){
                                          $i=$i+1;
                                          $name_service=$val["name_service"];
                                          $unit_measure=$val["unit_measure"];
                                          $price=$val["price"];
                                          $useformula=$val["use_formula"];
                                          echo '<option data-unitservice="'.$unit_measure.'" data-priceservice="'.$price.'" data-useformula="'.$useformula.'">', $val["name_service"], '</option>';
                                       }
                                       echo '</optgroup>';
                                    }
                                    ?>
                                 </select>
                              </span>
                           </td>
                           <td class="unit_service" id="unit_service_rowtable1_room1">
                           </td>
                           <td>
                              <div class="input-group mb-3">
                                 <input type="text" class="form-control quantity_service" size="3"
                                    id="quantity_service_rowtable1_room1" onchange="calc_sumservice(this)" data-row="1"
                                    value="">
                              </div>
                           </td>
                           <td>
                              <div class="input-group mb-3">
                                 <input type="text" class="form-control price_service" size="7"
                                    id="price_service_rowtable1_room1" onchange="calc_sumservice(this)" data-row="1"
                                    value="">
                              </div>
                           </td>
                           <td class="coeff_service" id="coeff_service_rowtable1_room1" data-row="1"></td>
                           <td class="sum_service" id="sum_service_rowtable1_room1"></td>
                           <td>
                              <div class="input-group mb-3">
                                 <input type="text" class="form-control comment_service"
                                    id="comment_service_rowtable1_room1" value="">
                              </div>
                           </td>
                           <td>
                              <div class="col delete_rowtable"></div>
                           </td>
                        </tr>
                     </tbody>
                     <tfoot class="table_foot" id="table_foot_room1">
                        <tr>
                           <th>Итого</th>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <th class="total_sum_service" id="total_sum_service_room1">0</th>
                           <td></td>
                           <td></td>
                        </tr>
                     </tfoot>
                  </table>
               </div>
            </div>
         </div>
         <hr>
      </form>
   </div>
</div>

<script src="/calculator_stroy/calc_stroy.js"></script>

<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>