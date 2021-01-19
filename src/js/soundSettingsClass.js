export default class SoundCommonSettings {
    
    
    constructor(className, name, labelText, mainTag, state) {
        this.className = className
        this.name = name
        this.labelText = labelText
        this.mainTag = mainTag
        this.state = state
    }
    manageSettings(){
        this.mainTag = document.querySelector(`.${this.className}`)
        this.labelText = this.mainTag.querySelector('p')
        this.mainTag.addEventListener('click', (event)=>{
            if(event.target.closest('.music_label') || event.target.closest('.sound_label')) {
                this.switchSetting()
            }
        })
    }
    checkLocalStorage(){
        if(localStorage[this.name] === 'off') {
                    this.turnOffSetting()
                    return
                } else if(localStorage[this.name] === 'on') {
                    this.turnOnSetting()
                    return
                }

        if(!localStorage[this.name]) {
            localStorage[this.name] === 'on'
            this.turnOnSetting()
        }
    }
    turnOnSetting(){
        this.mainTag.classList.remove('off')
        this.labelText.textContent = 'on';
        localStorage[this.name] = 'on';
    }
    turnOffSetting(){
        this.mainTag.classList.add('off')
        this.labelText.textContent = 'off';
        localStorage[this.name] = 'off';
    }

    switchSetting() {
        this.mainTag.classList.toggle('off')
        let state = this.mainTag.classList.contains('off') ? 'off' : 'on'
        localStorage[this.name] = state
        this.labelText.textContent = state
    }
}