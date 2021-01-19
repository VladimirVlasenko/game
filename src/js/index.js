import '../css/font_style.css';
import '../css/style.sass';
import '../css/media.sass';
import './config.js';
import {gameDifficulty, picsObject} from './config.js';

import './popupClass.js';
import Popup from './popupClass.js';

import './soundSettingsClass.js';
import SoundCommonSettings from './soundSettingsClass.js';

document.addEventListener('DOMContentLoaded', () => {
  

  // Coздание попапа "Настройки"
  let settingsPopup1 = new Popup('settings')
  settingsPopup1.createPopup()
  settingsPopup1.defaultDifficulty()
  settingsPopup1.chooseDifficulty()

  // Создание попапа "Рейтинг"
  let ratingPopup1 = new Popup('rating')
  ratingPopup1.createPopup()

  // Создание попапа "Паузы"
  let pausePopup1 = new Popup('pause_popup')
  pausePopup1.createPopup()

  // Создание попапа "проигрыша"
  let loosePopup1 = new Popup('loose_popup')
  loosePopup1.createPopup()

  // Создание попапа "выигрыш"
  let winPopup1 = new Popup('win_popup')
  winPopup1.createPopup()




  // musicSettings.addEventListener('click', this.manageSettings.bind(musicSettings))
  let playPauseContainer = document.querySelector('.play_pause_container');
  let settingsIcon = document.querySelector('.settings_icon');
  let ratingIcon = document.querySelector('.rating_icon');
  let playButton = document.querySelector('.play_button');
  let gameName = document.querySelector('.game_name');
  let bgBigClouds = document.querySelector('.bg_big_clouds');
  let bgSmallClouds = document.querySelector('.bg_small_clouds');
  let bigCloudsContainer = document.querySelector('.big_clouds_container');
  let smallCloudsContainer = document.querySelector('.small_clouds_container');
  let smallCloud = document.querySelector('.small_cloud');
  let bigCloud = document.querySelector('.bigCloud');
  let flora = document.querySelector('.flora');
  let topMenu = document.querySelector('.topGameMenu');
  let gameField = document.querySelector('.game_field');
  let gameFieldContainer = document.querySelector('.game_field_container');
  let settingsPopup = document.querySelector('.settings');
  let timeMinut;
  let ratingPopup = document.querySelector('.rating');
  let winPopup = document.querySelector('.win_popup');
  let winTime;
  let fullTime;
  let timer;
  let loosePopup = document.querySelector('.loose_popup');
  let pausePopup = document.querySelector('.pause_popup');
  let timeResultArray = []
  let timeResultString
  let starNodeList = document.querySelectorAll('.star')
  let yourScoreContent = document.querySelector('.your_score_content')
  let leaderScoreContent = document.querySelector('.leader_score_content')
  let ratingInnerCont = document.querySelector('.rating_cont')
  let ratingItem = []
  let ratingAvatar = []
  let ratingScore = []
  let ratingLike = []
  let ratingScoreName = []
  let ratingScoreDefinition = []
  let frontContainer = []
  let timerShow = document.querySelector('.timer_field');
  let isPaused = false;
  let pauseButton = document.querySelector('.pause');
  let resumeButton = document.querySelector('.resume');
  let box = []
  let flipper = []
  let front = []
  let behindElement = []


  // Функция бегущих облаков на заднем фоне
  function infinityClouds() {
    let i = 0;
    let x = 0;
    let nextBigCloud = bigCloud.cloneNode(true);
    bigCloud.before(nextBigCloud);

    let nextSmallCloud = smallCloud.cloneNode(true);
    smallCloud.before(nextSmallCloud);

    setInterval(() => {
      i++;
      bigCloudsContainer.style.transform = `translateX(${i / 180}%)`;

      if (parseInt(i / 180) >= 50) {
        i = 0;
      }
    }, 10);
    setInterval(() => {
      x++;
      smallCloudsContainer.style.transform = `translateX(${x / 100}%)`;

      if (parseInt(x / 100) >= 50) {
        x = 0;
      }
    }, 10);
  };

  //Функция показа стартовой страницы  
  function showStartPage() {
    settingsIcon.classList.add('visible');
    ratingIcon.classList.add('visible');
    playButton.classList.add('visible');
    gameName.classList.add('visible');
    flora.classList.add('floraToTop', 'visible');
    topMenu.classList.remove('topMenuToBottom');
  }


  // Анимация загрузочного экрана
  function firstLoad() {
    setTimeout(() => {
      showStartPage();
      bgBigClouds.classList.add('bigCloudsToTop');
      bgSmallClouds.classList.add('smallCloudsToTop');
      flora.classList.add('floraToTop', 'visible');
    }, 2000);
  }


  // Запуск игры
  function goPlay() {
    hideStartScreen();
    flora.classList.add('floraToBottom');
    flora.classList.remove('visible', 'floraToTop');
    topMenu.classList.add('topMenuToBottom');
    gameField.style.display = 'block';
    gameField.style.opacity = 1;
    isPaused=false;
    gameFieldContainer.style.display = 'flex'
    pauseButton.style.display = 'block';
    resumeButton.style.display = 'none';
    clearInterval(timer)
    startTimer()
    gameFieldGenerate();
  }

  // Функция запуска таймера
  function startTimer() {
    timeMinut = gameDifficulty[localStorage.difficulty].timeMinut
    timer = setInterval(function () {

      let seconds = (timeMinut % 60); // Получаем секунды
      let minutes = (timeMinut / 60) % 60; // Получаем минуты
      // Условие если время закончилось то...
      if (timeMinut < 0) {
        // Таймер удаляется

        clearInterval(timer);
        gameFieldContainer.removeEventListener('click', flipCards);
        gameFieldContainer.style.display ="none"
        clearInterval(timer);
        loosePopup.classList.add('active');
      } else { // Иначе
        // Создаём строку с выводом времени
        
        let strTimer = `0${Math.trunc(minutes)}:${seconds}`;
        if (seconds < 10) {
          strTimer = `0${Math.trunc(minutes)}:0${seconds}`;
        }
        // Выводим строку в блок для показа таймера
        timerShow.innerHTML = strTimer;
      }
      if(isPaused) {
        timeMinut += 0
      } 
      if(!isPaused) {
        timeMinut -= 1; // Уменьшаем таймер
      }
      
    }, 1000);

  }

  // Функция возобновления-паузы игры
  function resumePauseGame(event) {
    if (event.target.closest('.resume') || event.target.closest('.pause')) {
      pausePopup.classList.toggle('active')
      if (event.target.closest('.pause')) {
        isPaused = true;
        gameFieldContainer.style.display='none'
        pauseButton.style.display = 'none';
        resumeButton.style.display = 'block';
        gameFieldContainer.removeEventListener('click', flipCards);
      }
      if (event.target.closest('.resume')) {
        isPaused = false;
        gameFieldContainer.style.display='flex'
        pauseButton.style.display = 'block';
        resumeButton.style.display = 'none';
        gameFieldContainer.addEventListener('click', flipCards);
        
      }
    }
  };

  // Генерация игрового поля
  function gameFieldGenerate() {
    gameFieldContainer.addEventListener('click', flipCards);
    gameFieldContainer.innerHTML = '';
    let index = 0;
    let namesArr = []
    let indexNameArr = 0
    front = []
    frontContainer = []
    imgItem2 = []

    for (let keyName in picsObject) {
      namesArr.push(keyName)
      indexNameArr++
    }

    let randNamesArray = namesArr.sort(function () {
      return Math.random() - 0.5;
    });
    let slicedRandNamesArray = randNamesArray.slice(0, gameDifficulty[localStorage.difficulty].elementsNumber);
    let slicedRandNamesArrayCopy = []

    for (let key in picsObject) {
      for (let b = 0; b < slicedRandNamesArray.length; b++) {
        if (key == slicedRandNamesArray[b]) {
          slicedRandNamesArrayCopy.push(key)
        }
      }
    }

    let fullArray = slicedRandNamesArray.concat(slicedRandNamesArrayCopy)

    let randFullArray = fullArray.sort(function () {
      return Math.random() - 0.5;
    });

    for (let b = 0; b < randFullArray.length; b++) {
      for (let key in picsObject) {

        if (randFullArray[b] == key) {
          box[index] = document.createElement('div')
          box[index].classList.add('game_field_item')

          flipper[index] = document.createElement('div')
          flipper[index].classList.add('flipper')
          box[index].appendChild(flipper[index])

          front[index] = document.createElement('div')
          front[index].classList.add('front', 'pics_item', key);

          front[index].style.background = `url(${picsObject[key]}) center/100% auto no-repeat`
          front[index].dataset.name = key

          frontContainer.push(front[index])

          behindElement[index] = document.createElement('div')
          behindElement[index].classList.add('behind_example')

          flipper[index].appendChild(behindElement[index])

          gameFieldContainer.appendChild(box[index])

          index++;
        }
      }
    }

    // Определение размеров квадратиков на поле

    let imgItem2 = gameFieldContainer.querySelectorAll('.behind_example');

    function addingEmptyUnit() {
      let gameFieldItems = document.querySelectorAll('.game_field_item')

      for (let i = 0; i < imgItem2.length; i++) {

        gameFieldItems[i].classList.add(`diff${+localStorage.difficulty+1}`)

        if (i == imgItem2.length - 1) {
          if (+localStorage.difficulty === 0 || +localStorage.difficulty === 2) {
            let emptyCell = document.createElement('div')
            emptyCell.classList.add('empty_game_field_item', `diff${+localStorage.difficulty+1}`)
            for (let b = 0; b < gameFieldItems.length; b++) {
              if (b == gameFieldItems.length / 2) {
                gameFieldItems[b - 1].after(emptyCell)
              }
            }
          }
        }
      }
    }
    addingEmptyUnit()

  }

  // Показ окна победы
  function showWinPopup() {
    gameFieldContainer.style.display = 'none'
    clearInterval(timer);
    for (let i = 0; i < starNodeList.length; i++) {
      if (starNodeList[i].classList.contains('active')) {
        starNodeList[i].classList.remove('active')
      }
    }
    for (let i = 0; i < starNodeList.length; i++) {

      if (winTime / fullTime < 0.6 && i == 2) {
        starNodeList[i].classList.add('active')
      }
      if (winTime / fullTime >= 0.6 && winTime / fullTime < 0.75 && i == 1) {
        starNodeList[i].classList.add('active')
      }
      if (winTime / fullTime >= 0.75 && i == 0) {
        starNodeList[i].classList.add('active')
      }

    }

    yourScoreContent.textContent = winTime + 'сек'
    let currentRecords = JSON.parse(localStorage.timeResult)

    let leadersTime = Math.min(...currentRecords) + 'сек'

    leaderScoreContent.textContent = leadersTime
    winPopup.classList.add('active');
    
  }


  // События на кнопках в попапах
  function popupEvents(event) {
    showStartPage();
    if (event.target.closest('.button_next_game')) {
      goPlay();
    }
  }


  // Определение промежуточного результата игры
  function checkMiddleResult() {
    let gameFieldItems = gameField.querySelectorAll('.game_field_item');
    let solvedItems = gameField.querySelectorAll('.solved');

    if (gameFieldItems.length === solvedItems.length) {
      fullTime = gameDifficulty[localStorage.difficulty].timeMinut

      winTime = fullTime - timeMinut;

      writeResult();
      showWinPopup();
    }
  }

  // Запись результата удачной игры
  function writeResult() {
    if (localStorage.timeResult) {
      timeResultArray = JSON.parse(localStorage.timeResult)
    }
    timeResultArray.unshift(winTime)
    timeResultString = JSON.stringify(timeResultArray)
    localStorage.timeResult = timeResultString
    return
  }

  // "Эффект переворачивания карты" "Геймплей"
  function flipCards(event) {

    let imgItem2 = document.querySelectorAll('.behind_example')
    if (event.target.classList.contains('behind_example')) {

      for (let i = 0; i < flipper.length; i++) {
        if (imgItem2[i] == event.target) {
          flipper[i].appendChild(frontContainer[i])
        }
      }
      
      event.target.parentNode.classList.add('opened');
      let opened = document.querySelectorAll('.opened');

      if (opened.length === 2) {

        let a1 = opened[0];
        let b1 = opened[1];

        if (a1.lastChild.dataset.name === b1.lastChild.dataset.name) {
          gameFieldContainer.removeEventListener('click', flipCards);
          setTimeout(() => {
            a1.classList.remove('opened');
            a1.classList.add('solved');
            b1.classList.remove('opened');
            b1.classList.add('solved');
            checkMiddleResult();
            gameFieldContainer.addEventListener('click', flipCards);
          }, 800);
        } else {
          gameFieldContainer.removeEventListener('click', flipCards);
          setTimeout(() => {
            a1.classList.remove('opened');
            b1.classList.remove('opened');
            gameFieldContainer.addEventListener('click', flipCards);
          }, 800);
        }
      }
      if (opened.length > 2) {
        let a1 = opened[0];
        let b1 = opened[1];
        let c1 = opened[2];
        a1.classList.remove('opened');
        b1.classList.remove('opened');
        c1.classList.remove('opened');
      }
    }
  }

  //  Скрытие основного контента для попапов
  let hideStartScreen = function () {
    settingsIcon.style.transition = 'opacity 2s ease';
    ratingIcon.style.transition = 'opacity 2s ease';
    playButton.style.transition = 'opacity 2s ease';
    gameName.style.transition = 'opacity 2s ease';
    settingsIcon.classList.remove('visible');
    ratingIcon.classList.remove('visible');
    playButton.classList.remove('visible');
    gameName.classList.remove('visible');
  };

  // Рендер меню "Настройки"
  function showSettings() {
    hideStartScreen();
    settingsPopup.classList.add('active');
    if (localStorage.difficulty || localStorage.difficulty === 0) {
      let levelsItems = document.querySelectorAll('.levels_item');
      for (let i = 0; i < levelsItems.length; i++) {
        if (i === (localStorage.difficulty)) {
          levelsItems[i].classList.add('pushed');
        }
      }
    }
  }

  // Рендер окошка "Рейтинг"
  function showRating() {
    hideStartScreen();
    let leadersArray = JSON.parse(localStorage.timeResult)
    let sortedLeadersArray = leadersArray.sort(function (a, b) {
      return a - b;
    })
    ratingInnerCont.innerHTML=''
    for (let i = 0; i < sortedLeadersArray.length; i++) {
      ratingItem[i] = document.createElement('div')
      ratingItem[i].classList.add('rating_item')
      ratingInnerCont.appendChild(ratingItem[i])


      ratingAvatar[i] = document.createElement('div')
      ratingAvatar[i].classList.add('rating_avatar')
      ratingItem[i].appendChild(ratingAvatar[i])


      ratingScore[i] = document.createElement('div')
      ratingScore[i].classList.add('rating_score')
      ratingItem[i].appendChild(ratingScore[i])


      ratingScoreName[i] = document.createElement('p')

      ratingScoreName[i].classList.add('rating_score_name')
      ratingScoreName[i].textContent = "Счет: "
      ratingScore[i].appendChild(ratingScoreName[i])

      ratingScoreDefinition[i] = document.createElement('p')
      ratingScoreDefinition[i].classList.add('rating_score_definition')
      ratingScoreDefinition[i].textContent = sortedLeadersArray[i] + ' сек'
      ratingScore[i].appendChild(ratingScoreDefinition[i])

      ratingLike[i] = document.createElement('div')
      ratingLike[i].classList.add('rating_like')
      ratingItem[i].appendChild(ratingLike[i])

    }
    ratingPopup.classList.add('active');
  }


  // Вызов функций по умолчанию
  infinityClouds();
  firstLoad();


  // Инициализация настроек
  let musicSettings = new SoundCommonSettings('music_label', 'music');
  musicSettings.manageSettings() //Добавляем eventListeners
  musicSettings.checkLocalStorage() //устанавливаем значения из Local Storage
  let soundSettings = new SoundCommonSettings('sound_label', 'sound');
  soundSettings.manageSettings() //Добавляем eventListeners
  soundSettings.checkLocalStorage() //устанавливаем значения из Local Storage
  


  // Настройка закрытия окна любого попапа
  document.addEventListener('click', (event) => {
    if(event.target.closest('.button_close') ||event.target.closest('.button_ok')){
          showStartPage();
    }
  });
  // EventListeners
  let mainMenuButtons = document.querySelectorAll('.button_main_menu')
  let newGameButtons = document.querySelectorAll('.button_next_game')
  for(let e=0; e < mainMenuButtons.length; e++) {
    mainMenuButtons[e].addEventListener('click', popupEvents)
    newGameButtons[e].addEventListener('click', popupEvents)
  }
  playButton.addEventListener('click', goPlay);
  playPauseContainer.addEventListener('click', resumePauseGame);
  gameFieldContainer.addEventListener('click', flipCards);
  settingsIcon.addEventListener('click', showSettings);
  ratingIcon.addEventListener('click', showRating);
});
