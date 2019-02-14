/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn, thisArg) {
    for (var i = 0; i < array.length; i = i + 1) {
        fn.call(thisArg, array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn, thisArg) {
    var results = [];

    for (var i = 0; i < array.length; i = i + 1) {
        results.push(fn.call(thisArg, array[i], i, array));
    }

    return results;
}
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let result;

    if (initial === undefined) {
        result = array[0];
        for (let i = 1; i < array.length; i++) {
            result = fn(result, array[i], i, array);
        }

    } else {
        result = initial;
        for (let i = 0; i < array.length; i++) {
            result = fn(result, array[i], i, array);
        }
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let results = [];

    for (let key in obj) {
        if (typeof (key) === 'string') {
            results.push(key.toUpperCase());
        }
    }

    return results;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

function slice(array, from = 0, to) {
    let newArray = [];

    if (to === undefined) {
        to = array.length;
    }
    if (from < 0) {

        from = array.length + from;
        if (from < 0) {
            from = 0;
        }
    }

    if (to < 0) {
        to = array.length + to;
    }
    if (to > array.length) {
        to = array.length;
    }

    for (let i = from; i < to; i++) {
        newArray.push(array[i]);
    }

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let handler = {
        get(obj, prop) {
            return obj[prop];
        },
        set(obj, prop, value) {
            obj[prop] = value ** 2;

            return true;
        }
    };

    return new Proxy(obj, handler);
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
