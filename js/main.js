import gallery from './gallery.js'

// const refs = {
//     galleryRef: document.querySelector('.js-gallery'),
//     modalRef: document.querySelector('.lightbox'),
//     imgRef: document.querySelector('.lightbox__image'),
// };

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.lightbox');
const imgRef = document.querySelector('.lightbox__image');


const markup = gallery.map(
    ({ preview, original, description }, index) =>
      `<li class="gallery__item">
      <a class="gallery__link" href=''>
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/> 
      </a> 
      </li>`,
  )
    .join('');

galleryRef.innerHTML = markup;


const onClickModalOpen = evt => {
    evt.preventDefault();

    if (evt.target.localName === 'img') {
        imgRef.src = evt.target.dataset.source;
        imgRef.alt = evt.target.alt;
        imgRef.dataset.index = evt.target.dataset.index;

        modalRef.classList.add('is-open');
    }
};

const onClickModalClose = evt => {
    if (evt.target.localName !== 'img') {
        modalRef.classList.remove('is-open');
        imgRef.src = '';
        imgRef.alt = '';
    }
};


galleryRef.addEventListener('click', onClickModalOpen);
window.addEventListener('click', onClickModalClose);

window.addEventListener('keyup', evt => {
    if (evt.key === 'Escape') {
        modalRef.classList.remove('is-open');
    }
});

window.addEventListener('keydown', evt => {
    if (evt.code === 'ArrowRight') {
        onArrowRight();
    }
    if (evt.code === 'ArrowLeft') {
        onArrowLeft();
    }

});

function onArrowRight() {
    let index = +imgRef.dataset.index;
    if (index === gallery.length - 1) {
        newSrc(0);
        return
    }
    newSrc(index, 1);
};

function onArrowLeft() {
    let index = +imgRef.dataset.index;
    if (index === 0) {
        newSrc(gallery.length - 1);
        return;
    }
    newSrc(index, -1);
};


function newSrc(index, step = 0) {
    imgRef.dataset.index = `${index + step}`;
    imgRef.src = gallery[index + step].original;
};