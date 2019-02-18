/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {
    try {
        let isTrues = true;
        for (let i = 0; i < array.length; i++) {
            if (fn(array[i]) == false) {
                isTrues = true
            }
        }

        return isTrues;
    } catch (e) {
        console.log('исключение');
    }
}


isAllTrue([1, 2, 3, 24, 5], n => n < 10);