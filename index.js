let slider = document.querySelector('.slider')
let createNewButton = document.querySelector('.new')
let blackPenButton = document.querySelector('.black')
let eraseButton = document.querySelector('.erase')
let colorModeButton = document.querySelector('.color-mode')
let clearGridButton = document.querySelector('.clear')
let rainbowModeButton = document.querySelector('.rainbow')
let shadeModeButton = document.querySelector('.shader')
let colorPicker = document.querySelector('.colors')
let currentColor = 'black';

(function() {
    createNewGrid(16)
    document.querySelector('.grid').addEventListener('mouseenter', setColor, true)
    blackPenButton.classList.add('selected')
})()

blackPenButton.addEventListener('click', (e) => {
    removeListeners()
    currentColor = 'black'
    addColorListeners(e)
    unselectButtons()
    e.target.classList.add('selected')
})

eraseButton.addEventListener('click', (e) => {
    removeListeners()
    currentColor = 'inherit'
    addColorListeners(e)
    unselectButtons()
    e.target.classList.add('selected')
})

colorModeButton.addEventListener('click', (e) => {
    removeListeners()
    currentColor = colorPicker.value
    addColorListeners(e)
    unselectButtons()
    e.target.classList.add('selected')
})

colorPicker.addEventListener('input', () => {
    if([...colorModeButton.classList].includes('selected')){
        currentColor = colorPicker.value
    }
})

rainbowModeButton.addEventListener('click', (e) => {
    removeListeners()
    addColorListeners(e)
    unselectButtons()
    e.target.classList.add('selected')
})

shadeModeButton.addEventListener('click', (e) => {
    removeListeners()
    addColorListeners(e)
    unselectButtons()
    e.target.classList.add('selected')
})

clearGridButton.addEventListener('click', () => {
    document.querySelectorAll('.grid > *').forEach(square => {
        square.style.backgroundColor = 'inherit'
    })
})

function addColorListeners(e){
    let grid = document.querySelector('.grid')
    removeHslAttributes()
    if(e.target.textContent === 'Rainbow Mode'){
        grid.addEventListener('mouseenter', paintRainbow, true)
    } else if(e.target.textContent === 'Shading Mode') {
        grid.addEventListener('mouseenter', addShades, true)
    } else {
        grid.addEventListener('mouseenter', setColor, true)
    }
}

function setColor(e){
    e.target.style.backgroundColor = currentColor
    e.target.parentNode.style.backgroundColor = 'inherit'
}

function paintRainbow(e){
    console.log(getRandomColor())
    e.target.style.backgroundColor = getRandomColor()
    e.target.parentNode.style.backgroundColor = 'inherit'
}

function getRandomColor(){
    let var1 = Math.floor(Math.random() * 361);
    let var2 = Math.floor(Math.random() * 101);
    let var3 = Math.floor(Math.random() * 101);
    return `hsl(${var1}, ${var2}%, ${var3}%)`
}

function addShades(e){
    let squareColor = e.target.style.backgroundColor
    if(squareColor === '' || squareColor === 'inherit'){
        e.target.setAttribute('data-hsl', '100')
    }
    if(e.target.hasAttribute('data-hsl')){
        let currentDarkness = Number(e.target.getAttribute('data-hsl'))
        if(currentDarkness > 0){
            let newDarkness = currentDarkness - 10
            let opacity = (120 - newDarkness) / 100
            e.target.style.backgroundColor = `hsla(0, 0%, ${newDarkness}%, ${opacity})`
            e.target.setAttribute('data-hsl', `${newDarkness}`)
        }
    }
    e.target.parentNode.style.backgroundColor = 'inherit'
}

function removeListeners(){
    let grid = document.querySelector('.grid')
    grid.removeEventListener('mouseenter', setColor, true)
    grid.removeEventListener('mouseenter', paintRainbow, true)
    grid.removeEventListener('mouseenter', addShades, true)
}

function removeHslAttributes(){
    document.querySelectorAll('.grid > *').forEach(square =>{
        square.removeAttribute('data-hsl')
    })
}

createNewButton.addEventListener('click', () => {
    let sliderValue = slider.value
    removeSquares()
    createNewGrid(sliderValue)
})

function createNewGrid(squares){
    let grid = document.querySelector('.grid')
    for(let i = 0; i < squares ** 2; i++){
        let square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
    }
    grid.style.gridTemplateColumns = `repeat(${squares}, 1fr)`
}

function removeSquares(){
    let grid = document.querySelector('.grid')
    while(grid.firstChild){
        grid.removeChild(grid.firstChild)
    } 
}

function unselectButtons(){
    document.querySelectorAll('.controls > *').forEach(button => {
        button.classList.remove('selected')
    })
}

slider.addEventListener('input', () => {
    document.querySelector('.slider-value').textContent = slider.value
})
