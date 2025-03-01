let carouselWrapper = document.querySelector('.carousel-wrapper');
let carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const zoomButton = document.getElementById('zoom-toggle');
const descButton = document.getElementById('show-desc');
const descModal = document.getElementById('desc-modal');
const descText = document.getElementById('desc-text');
const closeDescButton = document.getElementById('close-desc');

let currentSlide = 0;
let itemWidth = 0;
let isZoomed = false;

function calculateDimensions() {
    const firstItem = carouselItems[0];
    const itemStyle = getComputedStyle(firstItem);
    itemWidth = firstItem.offsetWidth + 
                parseFloat(itemStyle.marginLeft) + 
                parseFloat(itemStyle.marginRight);
}

function updateCarousel() {
    carouselWrapper.style.transform = `translateX(${-currentSlide * itemWidth}px)`;
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === carouselItems.length - 1;
    
    carouselItems.forEach(item => item.classList.remove('active'));
    carouselItems[currentSlide].classList.add('active');
}

function toggleZoom() {
    const activeItem = carouselItems[currentSlide];
    const activeImage = activeItem.querySelector('img');
    
    if(isZoomed) {
        activeImage.style.transform = 'scale(1)';
        zoomButton.textContent = '🔍';
        activeItem.style.zIndex = '3';
    } else {
        activeImage.style.transform = 'scale(2)';
        zoomButton.textContent = '➖';
        activeItem.style.zIndex = '5';
    }
    isZoomed = !isZoomed;
}

function update_zoom(prevIndex){
    const prevItem = carouselItems[currentSlide+prevIndex];
    const prevImage = prevItem.querySelector('img');
    const activeItem = carouselItems[currentSlide];
    const activeImage = activeItem.querySelector('img');
    
    if(isZoomed) {
        prevImage.style.transform = 'scale(1)';
        prevItem.style.zIndex = '3';
        activeImage.style.transform = 'scale(2)';
        activeItem.style.zIndex = '5';
    }
}

function showDescription() {
    descText.textContent = carouselItems[currentSlide].dataset.description;
    descModal.style.display = 'block';
}

function closeDescription() {
    descModal.style.display = 'none';
}

function resetZoom() {
    isZoomed = false;
    carouselItems.forEach(item => {
        item.querySelector('img').style.transform = 'scale(1)';
        item.style.zIndex = '1';
    });
    carouselItems[currentSlide].classList.add('active');
    zoomButton.textContent = '🔍';
}

prevButton.addEventListener('click', () => {
    if(currentSlide > 0) {
        currentSlide--;
        update_zoom(1);
        updateCarousel();
        closeDescription();
    }
});

nextButton.addEventListener('click', () => {
    if(currentSlide < carouselItems.length - 1) {
        currentSlide++;
        update_zoom(-1);
        updateCarousel();
        closeDescription();
    }
});

zoomButton.addEventListener('click', toggleZoom);
descButton.addEventListener('click', showDescription);
closeDescButton.addEventListener('click', closeDescription);
window.addEventListener('click', (e) => {
    if(e.target === descModal) closeDescription();
});

calculateDimensions();
window.addEventListener('resize', () => {
    calculateDimensions();
    updateCarousel();
});

for (let index = 0; index < 5; index++) {
    carouselWrapper.insertAdjacentHTML('beforeend', `<div class="carousel-item" data-description="Описание восьмого изображения"><img class="responsive-proportional" src="image${index+1}.jpg" alt="Image ${index+1}"></div>`);
}

carouselWrapper = document.querySelector('.carousel-wrapper');
carouselItems = document.querySelectorAll('.carousel-item');

updateCarousel();
