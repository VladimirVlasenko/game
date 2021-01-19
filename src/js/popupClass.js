export default class Popup {
    constructor(className, mainTag) {
        this.className = className
        this.mainTag = mainTag
    }
    createPopup() {
        this.mainTag = document.querySelector(`.${this.className}`)
        this.mainTag.addEventListener('click', (event) => {
            if (event.target.closest('.button_close') || event.target.closest('.button_next_game') ||
                event.target.closest('.button_main_menu') || event.target.closest('.button_ok')) {
                this.hidePopup()
            }
        })
        return this.mainTag
    }
    hidePopup() {
        this.mainTag.classList.remove('active')
    }
    showPopup() {
        this.mainTag.classList.add('active')
    }
    chooseDifficulty() {
        if (this.mainTag.classList.contains('settings')) {
            let diffButtons = this.mainTag.querySelectorAll('.levels_item')

            for (let i = 0; i < diffButtons.length; i++) {
                diffButtons[i].addEventListener('click', (event) => {

                    for (let i = 0; i < diffButtons.length; i++) {
                        if (diffButtons[i].classList.contains('pushed')) {
                            diffButtons[i].classList.remove('pushed');
                        }
                    }

                    if (event.target.closest('.levels_item') && (event.target === diffButtons[i] || event.target.parentNode === diffButtons[i])) {
                        
                        diffButtons[i].classList.add('pushed')
                        let diff = diffButtons[i].dataset.level;
                        localStorage.difficulty = `${diff}`;
                        
                    }
                })
            }
        }
    }
    defaultDifficulty(){
        let diffButtons = this.mainTag.querySelectorAll('.levels_item')
        for(let i=0; i< diffButtons.length; i++){
            if(+localStorage.difficulty === i) {
                diffButtons[i].classList.add('pushed')
            }
            if(!localStorage.difficulty || localStorage.difficulty === 'undefined') {
                localStorage.setItem('difficulty', 0);
                let timeMinut = 60;
            }
        }
    }


}
