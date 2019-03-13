document.querySelector('#form').style.display = "none";
let buttonCloseForm = document.querySelector('#close-button');
buttonCloseForm.addEventListener('click', () => { document.querySelector('#form').style.display = "none"; });
let formLocation = document.querySelector('#addres');
let formAddName = document.querySelector('#add-name-input');
let formAddLocation = document.querySelector('#add-location-input');
let formAddComment = document.querySelector('#add-comment-input');
let formSaveButton = document.querySelector('#add-button');
var loc;
var cordination;


//Сдесь хранятся точки
var allPointComment = {};

ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.684758, 37.738521],
        zoom: 11,
        controls: ['zoomControl']
    });
    //getMyForm({{ properties.id|raw }},[e.pageX,e.pageY])
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
        `<div class=ballon_header><a class="link" href=# >{{ properties.id|raw }}</a></div>` +
        '<div class=ballon_body >{{ properties.balloonContentBody|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );

    //Слушаем эвенты и фильруем если эвент был по ссылке
    document.addEventListener('click', function (e) {
        if (e.target.closest("a")) {
            getMyForm(e.target.innerHTML, [e.pageX, e.pageY])
            myMap.balloon.close();
        }
    })
    //Создаем кластер
    var myClaster = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 5
    })

    myMap.geoObjects.add(myClaster);

    //Слушаем клик по кнопке Сохранить
    formSaveButton.addEventListener('click', () => {
        let nowTime = new Date();
        let strTime = `${nowTime.getFullYear()}.${nowTime.getMonth()}.${nowTime.getDay()} ${nowTime.getHours()}:${nowTime.getMinutes()}:${nowTime.getSeconds()}`
        if (allPointComment.hasOwnProperty(loc)) {
            allPointComment[loc].push({
                name: formAddName.value,
                local: formAddLocation.value,
                time: strTime,
                comment: formAddComment.value,
                id: loc
            })
        }
        else {
            allPointComment[loc] = [{
                name: formAddName.value,
                local: formAddLocation.value,
                time: strTime,
                comment: formAddComment.value
            }]
        }
        getAllComments(loc);
        let myPlacemark = new ymaps.Placemark(cordination, {
            balloonContentHeader: formAddLocation.value,
            balloonContentBody: formAddComment.value,
            balloonContentFooter: strTime,
            id: loc
        });
        myPlacemark.events.add('click', (event) => {
            console.log(event);
            getMyForm(cordination, event.get('pagePixels'));
        });
        myClaster.add(myPlacemark);
        formAddName.value = '';
        formAddLocation.value = '';
        formAddComment.value = '';
    });
    //шаблон баллуна метки
    BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        `<div ><div>` +
        '<div id="loc"></div><br>' +
        '</div>' +
        '<div>' +
        '<div id="comment" >{{properties.contents}}</div><br>' +
        '</div>' +
        '<div >' +
        '<input type="text" id="add-name-input"><br>' +
        '<input type="text" id="add-location-input" ><br>' +
        '<textarea id="add-comment-input" cols="20" rows="3"></textarea><br>' +
        '<button id="add-button" >сохранить</button>' +
        '</div>' +
        '</div>', {



            build: function () {

                BalloonContentLayout.superclass.build.call(this);
                var counter = 0;
                //let button = document.querySelector('#counter-button');
                //button.addEventListener('click', () => {
                // document.querySelector('#count').innerHTML = ++counter;
                //if (counter == 5) {
                //      alert('Test.');
                //        this.counter = 0;
                // /       document.querySelector('#count').innerHTML = counter;
                //    }
                //});

                // document.querySelector('#count').innerHTML = counter;
                //console.log(properties);
            },
            clear: function () {
                BalloonContentLayout.superclass.clear.call(this);
            }

        });

    function getAllComments(loc) {
        let formAllComent = document.querySelector('#comment');
        formAllComent.innerHTML = '';
        stringComment = '';
        if (allPointComment.hasOwnProperty(loc)) {
            allPointComment[loc].forEach(element => {
                stringComment += `${element.name} ${element.local} ${element.time}<br> ${element.comment}<br>`
            });

            formAllComent.innerHTML = stringComment;
        }

    }
    //Функция появления формы
    function getMyForm(cordination, pxEnter) {
        var form = document.querySelector('#form')
        ymaps.geocode(cordination, {
            results: 1
        }).then(function (res) {
            var newContent = res.geoObjects.get(0);
            loc = newContent.properties.get('text');
            form.style.display = 'block';
            form.style.top = (pxEnter[1] - 20) + 'px';
            form.style.left = (pxEnter[0]) + 'px';
            form.style.zIndex = "300";
            getAllComments(loc);
            formLocation.innerHTML = loc;
            formAddName.value = '';
            formAddLocation.value = '';
            formAddComment.value = '';

        });


    }
    //Слушаем Клик по карте
    myMap.events.add('click', function (event) {

        cordination = event.get('coords');
        var pxEnter = event.get('pagePixels');
        getMyForm(cordination, pxEnter);

    });

}