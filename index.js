let slider = document.querySelector('.slider')
let createNewButton = document.querySelector('.new')

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

slider.addEventListener('input', () => {
    document.querySelector('.slider-value').textContent = slider.value
})
