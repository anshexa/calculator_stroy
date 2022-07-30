var unit;

function func_calc(obj) {
	var square_floor;
	var square_wall;
	var perimeter;
	var square_door = 0;
	var square_window = 0;
	var select_unit = 0;

	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);

	// двери
	var door_inpt = document.getElementById('door_inpt_room' + numb_room);
	// количество форм дверей
	let count_door = door_inpt.getElementsByClassName('form_door').length;
	for (let i = 1; i <= count_door; i++) {
		let quantity_door = Number(document.getElementById('quantity_door' + i + '_room' + numb_room).value.replace(',', '.'));
		let width_door = Number(document.getElementById('width_door' + i + '_room' + numb_room).value.replace(',', '.'));
		let height_door = Number(document.getElementById('height_door' + i + '_room' + numb_room).value.replace(',', '.'));
		let square_door_n = width_door * height_door * quantity_door;
		square_door = square_door + square_door_n;
	}

	// окна
	var window_inpt = document.getElementById('window_inpt_room' + numb_room);
	// количство форм окон
	let count_window = window_inpt.getElementsByClassName('form_window').length;
	for (let i = 1; i <= count_window; i++) {
		let quantity_window = Number(document.getElementById('quantity_window' + i + '_room' + numb_room).value.replace(',', '.'));
		let width_window = Number(document.getElementById('width_window' + i + '_room' + numb_room).value.replace(',', '.'));
		let height_window = Number(document.getElementById('height_window' + i + '_room' + numb_room).value.replace(',', '.'));
		let square_window_n = width_window * height_window * quantity_window;
		square_window = square_window + square_window_n;
	}

	// комната
	var length_room = Number(document.getElementById('length_room' + numb_room).value.replace(',', '.'));
	var width_room = Number(document.getElementById('width_room' + numb_room).value.replace(',', '.'));
	var height_room = Number(document.getElementById('height_room' + numb_room).value.replace(',', '.'));

	square_floor = length_room * width_room;
	perimeter = (length_room + width_room) * 2;
	square_wall = ((length_room * height_room) * 2) + ((width_room * height_room) * 2) - square_door - square_window;

	// проверяем единицы измерения
	if (document.getElementById('unit_m').checked) {
		select_unit = 1;
	}
	if (document.getElementById('unit_cm').checked) {
		// переводим см в м
		square_door = square_door / 100 / 100;
		square_window = square_window / 100 / 100;
		square_floor = square_floor / 100 / 100;
		perimeter = perimeter / 100;
		square_wall = square_wall / 100 / 100;

		select_unit = 1;
	}
	if (document.getElementById('unit_mm').checked) {
		// переводим мм в м
		square_door = square_door / 1000 / 1000;
		square_window = square_window / 1000 / 1000;
		square_floor = square_floor / 1000 / 1000;
		perimeter = perimeter / 1000;
		square_wall = square_wall / 1000 / 1000;

		select_unit = 1;
	}
	if (select_unit == 0) {
		alert('Выберите единицы измерения');
		return;
	}

	// выводим результаты
	document.getElementById('square_floor_room' + numb_room).innerHTML = square_floor + ' м<sup>2</sup>';
	document.getElementById('perimeter_room' + numb_room).innerHTML = perimeter + ' м';
	document.getElementById('square_door_room' + numb_room).innerHTML = square_door + ' м<sup>2</sup>';
	document.getElementById('square_window_room' + numb_room).innerHTML = square_window + ' м<sup>2</sup>';
	document.getElementById('square_wall_room' + numb_room).innerHTML = square_wall + ' м<sup>2</sup>';

	// изменяем кол-ва услуг в таблице
	change_quantity_service(obj);
}

// изменяем кол-ва услуг в таблице
function change_quantity_service(obj) {
	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);
	// перебираем все строки табл
	// parent
	let table_body = document.getElementById('table_body_room' + numb_room);
	let rowtable = table_body.getElementsByClassName('rowtable');
	let count_rowtable = rowtable.length;
	for (let i = 1; i <= count_rowtable; i++) {
		// выбрана ли услуга
		let service_select = document.getElementById('service_select_rowtable' + i + '_room' + numb_room);
		let service_select_val = service_select.value;
		if (service_select_val.length > 0) {
			let opt = service_select.options[service_select.selectedIndex];
			let useformula = opt.dataset.useformula;
			// там где есть формула..
			switch (useformula) {
				case 'Площадь потолка':
				case 'Площадь пола':
				case 'Периметр комнаты':
				case 'Площадь стен':
					fill_servicefields(service_select);
				default:
					break
			}
		}
	}
}


var numb_room = 1;


function func_addroom(obj) {
	numb_room++;
	var room_inpt = document.getElementById('room_inpt');
	let forms_room = room_inpt.getElementsByClassName('form_room');
	let first_room = forms_room[0];
	let room_clone = first_room.cloneNode(true);

	// меняем номер комнаты
	room_clone.querySelector('span.numb_room').textContent = numb_room;

	// меняем id элементов и сбрасываем значения полей ввода
	// размеры комнаты
	room_clone.getElementsByClassName('length_room')[0].id = 'length_room' + numb_room;
	room_clone.getElementsByClassName('length_room')[0].value = 1;
	room_clone.getElementsByClassName('width_room')[0].id = 'width_room' + numb_room;
	room_clone.getElementsByClassName('width_room')[0].value = 1;
	room_clone.getElementsByClassName('height_room')[0].id = 'height_room' + numb_room;
	room_clone.getElementsByClassName('height_room')[0].value = 1;

	// двери
	room_clone.getElementsByClassName('add_door')[0].id = 'btn_add_door1_room' + numb_room;
	room_clone.getElementsByClassName('door_inpt')[0].id = 'door_inpt_room' + numb_room;
	// количество форм дверей
	let count_door = room_clone.getElementsByClassName('form_door').length;
	// оставляем 1 дверь, остальные удаляем, начиная с конца
	for (let i = count_door; i > 1; i--) {
		room_clone.getElementsByClassName('form_door')[i - 1].remove();
	}
	room_clone.getElementsByClassName('form_door')[0].id = 'form_door1_room' + numb_room;
	room_clone.getElementsByClassName('quantity_door')[0].id = 'quantity_door1_room' + numb_room;
	room_clone.getElementsByClassName('quantity_door')[0].value = 1;
	room_clone.getElementsByClassName('width_door')[0].id = 'width_door1_room' + numb_room;
	room_clone.getElementsByClassName('width_door')[0].value = 1;
	room_clone.getElementsByClassName('height_door')[0].id = 'height_door1_room' + numb_room;
	room_clone.getElementsByClassName('height_door')[0].value = 1;

	// окна
	room_clone.getElementsByClassName('add_window')[0].id = 'btn_add_window1_room' + numb_room;
	room_clone.getElementsByClassName('window_inpt')[0].id = 'window_inpt_room' + numb_room;
	// количество форм окон
	let count_window = room_clone.getElementsByClassName('form_window').length;
	// оставляем 1 окно, остальные удаляем, начиная с конца
	for (let i = count_window; i > 1; i--) {
		room_clone.getElementsByClassName('form_window')[i - 1].remove();
	}
	room_clone.getElementsByClassName('form_window')[0].id = 'form_window1_room' + numb_room;
	room_clone.getElementsByClassName('quantity_window')[0].id = 'quantity_window1_room' + numb_room;
	room_clone.getElementsByClassName('quantity_window')[0].value = 1;
	room_clone.getElementsByClassName('width_window')[0].id = 'width_window1_room' + numb_room;
	room_clone.getElementsByClassName('width_window')[0].value = 1;
	room_clone.getElementsByClassName('height_window')[0].id = 'height_window1_room' + numb_room;
	room_clone.getElementsByClassName('height_window')[0].value = 1;

	// кнопка рассчитать
	room_clone.getElementsByClassName('calculate')[0].id = 'btn_calculate_room' + numb_room;

	// поля расчета
	room_clone.getElementsByClassName('square_floor')[0].id = 'square_floor_room' + numb_room;
	room_clone.getElementsByClassName('square_floor')[0].innerHTML = '∞';
	room_clone.getElementsByClassName('square_wall')[0].id = 'square_wall_room' + numb_room;
	room_clone.getElementsByClassName('square_wall')[0].innerHTML = '∞';
	room_clone.getElementsByClassName('perimeter')[0].id = 'perimeter_room' + numb_room;
	room_clone.getElementsByClassName('perimeter')[0].innerHTML = '∞';
	room_clone.getElementsByClassName('square_door')[0].id = 'square_door_room' + numb_room;
	room_clone.getElementsByClassName('square_door')[0].innerHTML = '∞';
	room_clone.getElementsByClassName('square_window')[0].id = 'square_window_room' + numb_room;
	room_clone.getElementsByClassName('square_window')[0].innerHTML = '∞';

	// таблица
	room_clone.getElementsByClassName('add_rowtable')[0].id = 'btn_add_rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('table_body')[0].id = 'table_body_room' + numb_room;
	// количество строк
	let count_rowtable = room_clone.getElementsByClassName('rowtable').length;
	// оставляем 1 строку, остальные удаляем, начиная с конца
	for (let i = count_rowtable; i > 1; i--) {
		room_clone.getElementsByClassName('rowtable')[i - 1].remove();
	}
	room_clone.getElementsByClassName('rowtable')[0].id = 'rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('service_select')[0].id = 'service_select_rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('sp_service_select')[0].addEventListener('submit', form_submitHandler);
	room_clone.getElementsByClassName('unit_service')[0].id = 'unit_service_rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('unit_service')[0].innerHTML = '';
	room_clone.getElementsByClassName('quantity_service')[0].id = 'quantity_service_rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('quantity_service')[0].value = '';
	room_clone.getElementsByClassName('quantity_service')[0].style.visibility = 'hidden';
	room_clone.getElementsByClassName('price_service')[0].id = 'price_service_rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('price_service')[0].value = '';
	room_clone.getElementsByClassName('price_service')[0].style.visibility = 'hidden';
	room_clone.getElementsByClassName('coeff_service')[0].id = 'coeff_service_rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('coeff_service')[0].innerHTML = '';
	room_clone.getElementsByClassName('sum_service')[0].id = 'sum_service_rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('sum_service')[0].innerHTML = '';
	room_clone.getElementsByClassName('comment_service')[0].id = 'comment_service_rowtable1_room' + numb_room;
	room_clone.getElementsByClassName('comment_service')[0].value = '';
	room_clone.getElementsByClassName('comment_service')[0].style.visibility = 'hidden';
	room_clone.getElementsByClassName('table_foot')[0].id = 'table_foot_room' + numb_room;
	room_clone.getElementsByClassName('total_sum_service')[0].id = 'total_sum_service_room' + numb_room;
	room_clone.getElementsByClassName('total_sum_service')[0].innerHTML = '0';

	room_inpt.appendChild(room_clone);
}


// добавляем дверь в комнату, из которой вызвана функция
function func_add_door(obj) {
	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);
	// parent
	let door_inpt = document.getElementById('door_inpt_room' + numb_room);
	let forms_door = door_inpt.getElementsByClassName('form_door');
	let first_door = forms_door[0];
	let door_clone = first_door.cloneNode(true);

	let count_door = forms_door.length;
	let next_numdoor = count_door + 1;
	// меняем id элементов и сбрасываем значения полей ввода
	door_clone.getElementsByClassName('quantity_door')[0].id = 'quantity_door' + next_numdoor + '_room' + numb_room;
	door_clone.getElementsByClassName('quantity_door')[0].value = 1;
	door_clone.getElementsByClassName('width_door')[0].id = 'width_door' + next_numdoor + '_room' + numb_room;
	door_clone.getElementsByClassName('width_door')[0].value = 1;
	door_clone.getElementsByClassName('height_door')[0].id = 'height_door' + next_numdoor + '_room' + numb_room;
	door_clone.getElementsByClassName('height_door')[0].value = 1;
	door_clone.getElementsByClassName('delete_door')[0].id = 'delete_door' + next_numdoor + '_room' + numb_room;
	door_clone.getElementsByClassName('delete_door')[0].innerHTML = '<button type="button" class="btn color del_elem" id="btn_del_door' + next_numdoor + '_room' + numb_room + '" title="Удалить дверь"	onclick="func_del_elem(this)"><i class="fa fa-minus"></i></button>';
	door_clone.getElementsByClassName('add_door')[0].style.display = 'none';
	door_clone.id = 'form_door' + next_numdoor + '_room' + numb_room;

	door_inpt.appendChild(door_clone);
}


// добавляем окно в комнату, из которой вызвана функция
function func_add_window(obj) {
	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);
	// parent
	let window_inpt = document.getElementById('window_inpt_room' + numb_room);
	let forms_window = window_inpt.getElementsByClassName('form_window');
	let first_window = forms_window[0];
	let window_clone = first_window.cloneNode(true);

	let count_window = forms_window.length;
	let next_numwindow = count_window + 1;
	// меняем id элементов и сбрасываем значения полей ввода
	window_clone.getElementsByClassName('quantity_window')[0].id = 'quantity_window' + next_numwindow + '_room' + numb_room;
	window_clone.getElementsByClassName('quantity_window')[0].value = 1;
	window_clone.getElementsByClassName('width_window')[0].id = 'width_window' + next_numwindow + '_room' + numb_room;
	window_clone.getElementsByClassName('width_window')[0].value = 1;
	window_clone.getElementsByClassName('height_window')[0].id = 'height_window' + next_numwindow + '_room' + numb_room;
	window_clone.getElementsByClassName('height_window')[0].value = 1;
	window_clone.getElementsByClassName('delete_window')[0].id = 'delete_window' + next_numwindow + '_room' + numb_room;
	window_clone.getElementsByClassName('delete_window')[0].innerHTML = '<button type="button" class="btn color del_elem" id="btn_del_window' + next_numwindow + '_room' + numb_room + '" title="Удалить окно"	onclick="func_del_elem(this)"><i class="fa fa-minus"></i></button>';
	window_clone.getElementsByClassName('add_window')[0].style.display = 'none';
	window_clone.id = 'form_window' + next_numwindow + '_room' + numb_room;

	window_inpt.appendChild(window_clone);
}


function func_add_rowtable(obj) {
	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);
	// parent
	let table_body = document.getElementById('table_body_room' + numb_room);
	let rowtable = table_body.getElementsByClassName('rowtable');
	let first_rowtable = rowtable[0];
	let rowtable_clone = first_rowtable.cloneNode(true);

	let count_rowtable = rowtable.length;
	let next_numrowtable = count_rowtable + 1;
	// меняем id элементов и сбрасываем значения полей ввода
	rowtable_clone.getElementsByClassName('service_select')[0].id = 'service_select_rowtable' + next_numrowtable + '_room' + numb_room;
	rowtable_clone.getElementsByClassName('service_select')[0].dataset.row = next_numrowtable;
	rowtable_clone.getElementsByClassName('sp_service_select')[0].addEventListener('submit', form_submitHandler);
	rowtable_clone.getElementsByClassName('unit_service')[0].id = 'unit_service_rowtable' + next_numrowtable + '_room' + numb_room;
	rowtable_clone.getElementsByClassName('unit_service')[0].innerHTML = '';
	rowtable_clone.getElementsByClassName('quantity_service')[0].id = 'quantity_service_rowtable' + next_numrowtable + '_room' + numb_room;
	rowtable_clone.getElementsByClassName('quantity_service')[0].dataset.row = next_numrowtable;
	rowtable_clone.getElementsByClassName('quantity_service')[0].value = '';
	rowtable_clone.getElementsByClassName('quantity_service')[0].style.visibility = 'hidden';
	rowtable_clone.getElementsByClassName('price_service')[0].id = 'price_service_rowtable' + next_numrowtable + '_room' + numb_room;
	rowtable_clone.getElementsByClassName('price_service')[0].dataset.row = next_numrowtable;
	rowtable_clone.getElementsByClassName('price_service')[0].value = 'Цена';
	rowtable_clone.getElementsByClassName('price_service')[0].style.visibility = 'hidden';
	rowtable_clone.getElementsByClassName('coeff_service')[0].id = 'coeff_service_rowtable' + next_numrowtable + '_room' + numb_room;
	rowtable_clone.getElementsByClassName('coeff_service')[0].dataset.row = next_numrowtable;
	rowtable_clone.getElementsByClassName('coeff_service')[0].innerHTML = '';
	rowtable_clone.getElementsByClassName('sum_service')[0].id = 'sum_service_rowtable' + next_numrowtable + '_room' + numb_room;
	rowtable_clone.getElementsByClassName('sum_service')[0].innerHTML = '';
	rowtable_clone.getElementsByClassName('comment_service')[0].id = 'comment_service_rowtable' + next_numrowtable + '_room' + numb_room;
	rowtable_clone.getElementsByClassName('comment_service')[0].value = '';
	rowtable_clone.getElementsByClassName('comment_service')[0].style.visibility = 'hidden';
	rowtable_clone.getElementsByClassName('delete_rowtable')[0].id = 'delete_rowtable' + next_numrowtable + '_room' + numb_room;
	rowtable_clone.getElementsByClassName('delete_rowtable')[0].innerHTML = '<button type="button" class="btn color del_elem"	id="btn_del_rowtable' + next_numrowtable + '_room' + numb_room + '"	title="Удалить строку" onclick="func_del_elem(this)"><i class="fa fa-minus"></i></button>';
	rowtable_clone.id = 'rowtable' + next_numrowtable + '_room' + numb_room;

	table_body.appendChild(rowtable_clone);

}

// сброс select
function form_submitHandler({ target }) {
	target.reset();
}


function func_del_elem(obj) {
	let elem = obj.id.substr(obj.id.indexOf('btn_del_') + 8);

	// удаляем элемент
	let id_del_elem = '';
	if (elem.indexOf('door') != -1 || elem.indexOf('window') != -1) {
		id_del_elem = 'form_' + elem;
	}
	if (elem.indexOf('rowtable') != -1) {
		id_del_elem = elem;
	}
	document.getElementById(id_del_elem).remove();

	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);

	// если удаляем дверь
	if (elem.indexOf('door') != -1) {
		// parent
		let door_inpt = document.getElementById('door_inpt_room' + numb_room);
		// количество форм дверей
		let count_door = door_inpt.getElementsByClassName('form_door').length;
		//переназначаем id оставшихся элементов
		for (let i = 1; i <= count_door; i++) {
			door_inpt.getElementsByClassName('form_door')[i - 1].id = 'form_door' + i + '_room' + numb_room;
			door_inpt.getElementsByClassName('quantity_door')[i - 1].id = 'quantity_door' + i + '_room' + numb_room;
			door_inpt.getElementsByClassName('width_door')[i - 1].id = 'width_door' + i + '_room' + numb_room;
			door_inpt.getElementsByClassName('height_door')[i - 1].id = 'height_door' + i + '_room' + numb_room;
			// кнопка удалить
			if (i > 1) {
				door_inpt.getElementsByClassName('delete_door')[i - 1].id = 'delete_door' + i + '_room' + numb_room;
				door_inpt.getElementsByClassName('del_elem')[i - 2].id = 'btn_del_door' + i + '_room' + numb_room;
			}
		}
	}

	// если удаляем окно
	if (elem.indexOf('window') != -1) {
		// parent
		let window_inpt = document.getElementById('window_inpt_room' + numb_room);
		// количество форм окон
		let count_window = window_inpt.getElementsByClassName('form_window').length;
		//переназначаем id оставшихся элементов
		for (let i = 1; i <= count_window; i++) {
			window_inpt.getElementsByClassName('form_window')[i - 1].id = 'form_window' + i + '_room' + numb_room;
			window_inpt.getElementsByClassName('quantity_window')[i - 1].id = 'quantity_window' + i + '_room' + numb_room;
			window_inpt.getElementsByClassName('width_window')[i - 1].id = 'width_window' + i + '_room' + numb_room;
			window_inpt.getElementsByClassName('height_window')[i - 1].id = 'height_window' + i + '_room' + numb_room;
			// кнопка удалить
			if (i > 1) {
				window_inpt.getElementsByClassName('delete_window')[i - 1].id = 'delete_window' + i + '_room' + numb_room;
				window_inpt.getElementsByClassName('del_elem')[i - 2].id = 'btn_del_window' + i + '_room' + numb_room;
			}
		}
	}

	// если удаляем строку таблицы
	if (elem.indexOf('rowtable') != -1) {
		// parent
		let table_body = document.getElementById('table_body_room' + numb_room);
		// количество строк в таблице
		let count_rowtable = table_body.getElementsByClassName('rowtable').length;
		//переназначаем id оставшихся элементов
		for (let i = 1; i <= count_rowtable; i++) {
			table_body.getElementsByClassName('rowtable')[i - 1].id = 'rowtable' + i + '_room' + numb_room;
			table_body.getElementsByClassName('service_select')[i - 1].id = 'service_select_rowtable' + i + '_room' + numb_room;
			table_body.getElementsByClassName('service_select')[i - 1].dataset.row = i;
			table_body.getElementsByClassName('unit_service')[i - 1].id = 'unit_service_rowtable' + i + '_room' + numb_room;
			table_body.getElementsByClassName('quantity_service')[i - 1].id = 'quantity_service_rowtable' + i + '_room' + numb_room;
			table_body.getElementsByClassName('quantity_service')[i - 1].dataset.row = i;
			table_body.getElementsByClassName('price_service')[i - 1].id = 'price_service_rowtable' + i + '_room' + numb_room;
			table_body.getElementsByClassName('price_service')[i - 1].dataset.row = i;
			table_body.getElementsByClassName('coeff_service')[i - 1].id = 'coeff_service_rowtable' + i + '_room' + numb_room;
			table_body.getElementsByClassName('coeff_service')[i - 1].dataset.row = i;
			table_body.getElementsByClassName('sum_service')[i - 1].id = 'sum_service_rowtable' + i + '_room' + numb_room;
			table_body.getElementsByClassName('comment_service')[i - 1].id = 'comment_service_rowtable' + i + '_room' + numb_room;
			// кнопка удалить
			if (i > 1) {
				table_body.getElementsByClassName('delete_rowtable')[i - 1].id = 'delete_rowtable' + i + '_room' + numb_room;
				table_body.getElementsByClassName('del_elem')[i - 2].id = 'btn_del_rowtable' + i + '_room' + numb_room;
			}
		}
		// итоговая сумма
		calc_total_sumservice(obj);
	}
}


// заполнение полей таблицы услуг
function fill_servicefields(obj) {
	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);
	// определяем, из какой строки вызвана функция
	let numb_row = obj.dataset.row;

	let opt = obj.options[obj.selectedIndex];

	// ед. изм.
	let unit_service = opt.dataset.unitservice;
	document.getElementById('unit_service_rowtable' + numb_row + '_room' + numb_room).innerHTML = unit_service;

	// кол-во
	let quantity_service = '';
	// кол-во взять из формулы или ввести
	let useformula = opt.dataset.useformula;
	// вписываем кол-во только если ед.изм. услуги м2
	if (unit_service == 'м2') {
		// если в свойствах выбрана формула
		if (useformula.length > 0) {
			switch (useformula) {
				case 'Площадь потолка':
				case 'Площадь пола':
					let square_floor = document.getElementById('square_floor_room' + numb_room).innerHTML;
					square_floor = square_floor.replace(' м', '').replace('<sup>2</sup>', '');
					quantity_service = Number(square_floor);
					break
				case 'Периметр комнаты':
					let perimeter = document.getElementById('perimeter_room' + numb_room).innerHTML;
					perimeter = perimeter.replace(' м', '');
					quantity_service = Number(perimeter);
					break
				case 'Площадь стен':
					let square_wall = document.getElementById('square_wall_room' + numb_room).innerHTML;
					square_wall = square_wall.replace(' м', '').replace('<sup>2</sup>', '');
					quantity_service = Number(square_wall);
					break
				default:
					break
			}
		}
	}
	// если шт, шт., пог.м., компл., точка, тонна, м3, нет значения
	else {
		//alert('Введите количество вручную');
	}

	// если число
	if (typeof (quantity_service) == 'number' && !Number.isNaN(quantity_service)) {
	}
	else {
		quantity_service = '';
	}
	document.getElementById('quantity_service_rowtable' + numb_row + '_room' + numb_room).value = quantity_service;
	document.getElementById('quantity_service_rowtable' + numb_row + '_room' + numb_room).style.visibility = 'visible';

	// цена
	let price_service = Number((opt.dataset.priceservice).replace(',', '.'));
	// если цена - число
	if (typeof (price_service) == 'number' && !Number.isNaN(price_service)) {
	}
	else {
		price_service = '';
		//alert('Введите цену вручную');
	}
	document.getElementById('price_service_rowtable' + numb_row + '_room' + numb_room).value = price_service;
	document.getElementById('price_service_rowtable' + numb_row + '_room' + numb_room).style.visibility = 'visible';

	// коэффициент
	document.getElementById('coeff_service_rowtable' + numb_row + '_room' + numb_room).textContent = '1';

	// комментарий
	document.getElementById('comment_service_rowtable' + numb_row + '_room' + numb_room).style.visibility = 'visible';

	// сумма
	calc_sumservice(obj);
}


// сумма в строке таблицы
function calc_sumservice(obj) {
	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);
	// определяем, из какой строки вызвана функция
	let numb_row = obj.dataset.row;

	// выбрана ли услуга
	let service_select = document.getElementById('service_select_rowtable' + numb_row + '_room' + numb_room).value;
	if (service_select.length > 0) {
		let quantity_service = document.getElementById('quantity_service_rowtable' + numb_row + '_room' + numb_room).value;
		let price_service = document.getElementById('price_service_rowtable' + numb_row + '_room' + numb_room).value;
		let coeff_service = document.getElementById('coeff_service_rowtable' + numb_row + '_room' + numb_room).innerHTML;

		if (quantity_service.length > 0 && price_service.length > 0 && coeff_service.length > 0) {
			quantity_service = Number(quantity_service.replace(',', '.'));
			price_service = Number(price_service.replace(',', '.'));
			coeff_service = Number(coeff_service.replace(',', '.'));
		}

		let sum_service = '';
		if (typeof (quantity_service) == 'number' && !Number.isNaN(quantity_service)) {
			if (typeof (price_service) == 'number' && !Number.isNaN(price_service)) {
				if (typeof (coeff_service) == 'number' && !Number.isNaN(coeff_service)) {
					sum_service = price_service * quantity_service * coeff_service;
				}
			}
		}
		document.getElementById('sum_service_rowtable' + numb_row + '_room' + numb_room).textContent = sum_service;
		// итоговая сумма
		calc_total_sumservice(obj);
	}
	else {
		/*alert('услуга не выбрана')*/
	}
}

// итоговая сумма по таблице
function calc_total_sumservice(obj) {
	// определяем, из какой комнаты вызвана функция
	let numb_room = obj.id.substr(obj.id.indexOf('room') + 4);
	let total_sum_service = 0;

	// все суммы таблицы
	let table_body = document.getElementById('table_body_room' + numb_room);
	let all_sum_service = table_body.getElementsByClassName('sum_service');
	for (let sum_service of all_sum_service) {
		sum_service = Number(sum_service.textContent);
		if (typeof (sum_service) == 'number' && !Number.isNaN(sum_service)) {
			total_sum_service = total_sum_service + sum_service;
		}

	}
	document.getElementById('total_sum_service_room' + numb_room).textContent = total_sum_service;
}


let tooltip_elem;


// показываем полный текст выбранной услуги
function show_fulltext(obj) {
	let target = obj;

	// получаем выбранную услугу в select
	let tooltip_html = obj.value;
	if (!tooltip_html) return;

	// создадим элемент для подсказки
	tooltip_elem = document.createElement('div');
	tooltip_elem.className = 'tooltip';
	tooltip_elem.innerHTML = tooltip_html;
	let service_select = document.getElementById('room_inpt');
	service_select.append(tooltip_elem);

	// спозиционируем его сверху от аннотируемого элемента (top-center)
	let coords = target.getBoundingClientRect();

	let left = coords.left + (target.offsetWidth - tooltip_elem.offsetWidth) / 2;
	if (left < 0) left = 0; // не заезжать за левый край окна

	let top = coords.top - tooltip_elem.offsetHeight - 5;
	if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
		top = coords.top + target.offsetHeight + 5;
	}

	tooltip_elem.style.left = left + 'px';
	tooltip_elem.style.top = top + 'px';
};


// скрываем выведенный полный текст выбранной услуги
function hide_fulltext() {
	if (tooltip_elem) {
		tooltip_elem.remove();
		tooltip_elem = null;
	}
};
