document.body.style.height = window.innerHeight + 'px';

window.addEventListener('resize', function() {
  document.body.style.height = window.innerHeight + 'px';
});

//show animation menu
const animBtn = document.querySelector(".animation");
const animMenu = document.querySelector(".animation_menu");
animBtn.addEventListener('click', () => {
    animBtn.classList.toggle('active_menu');
    animMenu.classList.toggle('hidden');
})


//show info menu
const infoBtn = document.querySelector('.info');
const infoMenu = document.querySelector('.info_menu');
infoBtn.addEventListener('click', () => {
    infoBtn.classList.toggle('active_info');
    infoMenu.classList.toggle('hidden');
});

//close btn info menu
const closeBtnInfo = document.querySelector('.btn_close_info');
closeBtnInfo.addEventListener('click', () => {
    infoMenu.classList.toggle('hidden');
    infoBtn.classList.toggle('active_info');
})
//show photo
const shotBtn = document.querySelector('.shot');
const photoMenu = document.querySelector('.photo_wrapper');
shotBtn.addEventListener('click', () => {
    photoMenu.classList.toggle('hidden');
});
const closeBtnPhoto = document.querySelector('.btn_close_photo');
closeBtnPhoto.addEventListener('click', () => {
    photoMenu.classList.toggle('hidden');
})


/// show hide
///anim
function showAnimMenu() {
    document.querySelector(".animation").classList.add('active_menu');
    document.querySelector(".animation_menu").classList.remove('hidden');
}
function hideAnimMenu() {
    document.querySelector(".animation").classList.remove('active_menu');
    document.querySelector(".animation_menu").classList.add('hidden');
}
//info 
function showInfoMenu() {
    document.querySelector('.info').classList.add('active_info');
    document.querySelector('.info_menu').classList.remove('hidden');
}
function hideInfoMenu() {
    document.querySelector('.info').classList.remove('active_info');
    document.querySelector('.info_menu').classList.add('hidden');
}
//photo
function showPhotoMenu() {
    document.querySelector('.photo_wrapper').classList.remove('hidden');
}
function hidePhotoMenu() {
    document.querySelector('.photo_wrapper').classList.add('hidden');
}