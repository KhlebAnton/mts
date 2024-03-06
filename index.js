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
   // photoMenu.classList.toggle('hidden');
    sendMessageToApp('Screenshot');
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
    ////document.querySelector('.photo_wrapper').classList.remove('hidden');
}
function hidePhotoMenu() {
   /// document.querySelector('.photo_wrapper').classList.add('hidden');
}
$(".btn_again").on("click",function (){
    $(".photo_wrapper").addClass("hidden");
})
$(".btn_share").on("click",function (){
    sendMessageToApp("share")
})

function sendMessageToApp(msg){
    window.parent.postMessage(msg, "*");
}
window.addEventListener('message', (msg) => {
    msg = msg.data;
    console.log("receiveMessage " + msg)
    if (msg.includes("onContentLoading")) {
        //$(".btn_start_game.animated").addClass("go")
        let progress = Math.round((msg.split(" ")[1]));
        console.log("onContentLoading " + progress)
        setProgress(progress)
        //showLoadingProgress(progress)
        //percentElement.innerText = progress + '%';
    }
    if (msg.includes("PhotoDone")) {
        console.log("PhotoDone")
        let data = msg.split("PhotoDone ")[1];
        $(".photo_wrapper").removeClass("hidden");
        $("#screenData").attr("src", data);
    }
    if (msg.includes("showLoading")) {
        console.log("showLoader")
        showLoader()
    }
    if (msg.includes("hideLoading")) {
        console.log("hideLoader")
        hideLoader()
    }
});



//stick
$(function() {
    var wasTouched = false;
    var joystick = $('<div class="joystick"></div>');
    var stick = $('<div class="stick"></div>').appendTo(joystick);
    var container = $('.joystick-container');
    var joystickRadius = 100;
    var stickRadius = 30;
    var dragging = false;
    function mousedown(x,y){
        joystick.css({
            'width': joystickRadius * 2,
            'height': joystickRadius * 2,
            'margin-left': -joystickRadius,
            'margin-top': -joystickRadius,
            'left': x,
            'top': y
        }).appendTo(container);
        stick.css({
            'left': joystickRadius,
            'top': joystickRadius
        });
        dragging = true;
        updateStickPosition(x, y); // Обновляем позицию стика и выводим данные в консоль
    }
    function move(x,y){
        if (dragging) {
            updateStickPosition(x, y);
        }
    }
    function mouseup(){
        if (dragging) {
            joystick.remove();
            dragging = false;
            sendMessageToApp('stopMoving');
        }
    }
    if(getOS() == "Desktop") {
        container.mousedown(function (e) {
            mousedown(e.pageX, e.pageY)
        });

        $(document).mousemove(function (e) {
            move(e.pageX, e.pageY)
        }).mouseup(function () {
            mouseup();
        });
    }
    else {
        $("body").on("touchmove", function (e) {
            if (!wasTouched) {
                wasTouched = true;
                mousedown(e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY)
            } else {
                move(e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY)
            }
        }).on("touchend touchcancel", function (e) {
            if (wasTouched) {
                wasTouched = false;
                mouseup()
            }
        })
    }
    document.body.addEventListener("click", printMousePos);
    function printMousePos(event) {
        sendMessageToApp('screenClick ' + event.clientX + ' ' + event.clientY);
    }

    function updateStickPosition(pageX, pageY) {
        var x = pageX - container.offset().left;
        var y = pageY - container.offset().top;
        var dx = x - (joystick.offset().left + joystickRadius);
        var dy = y - (joystick.offset().top + joystickRadius);
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > (joystickRadius - stickRadius)) {
            var angle = Math.atan2(dy, dx);
            dx = (joystickRadius - stickRadius) * Math.cos(angle);
            dy = (joystickRadius - stickRadius) * Math.sin(angle);
        }
        stick.css({
            'left': joystickRadius + dx,
            'top': joystickRadius + dy
        });
        // Нормализация значений от -1 до 1 для вывода
        var normalizedX = dx / (joystickRadius - stickRadius);
        var normalizedY = dy / (joystickRadius - stickRadius)
        //if(getOS() == "Desktop")
          //  normalizedY = normalizedY * (-1);
        sendMessageToApp('AxeX ' + normalizedX.toFixed(2) + ' AxeY ' + normalizedY.toFixed(2));
    }
});

///
let userAgent = navigator.userAgent || navigator.vendor || window.opera;
function getOS(){
    if(isIOS()) {
        console.log("IOS platform");
        return "IOS";
    }
    if(this.isAndroid()) {
        console.log("Android platform");
        return "Android"
    }
    if(isIOS() == false && isAndroid() == false){
        console.log("unknown platform error");
        return "Desktop";
    }
}
function isIOS() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
    } else {
        return navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform);
    }
}
function isAndroid(){
    return /android/i.test(userAgent)
}

const logoName = document.getElementById('logo_name');
const progressTime = document.getElementById('progress_time');
const headLogo = document.getElementById('head_logo');
const loaderScreen = document.getElementById('loader');
//show loader 
function showLoader() {
    loaderScreen.classList.remove('hidden');
    //анимация логотипа
    setTimeout( () => {
        logoName.classList.add('animated')
    }, 2000 )
    //появление таймера
    setTimeout( () => {
        progressTime.classList.remove('hidden');
        headLogo.classList.remove('hidden');
    }, 6000 )
}
//hide loader
function hideLoader() {
    loaderScreen.classList.add('hidden');
    progressTime.classList.add('hidden');
    headLogo.classList.add('hidden');
    logoName.classList.remove('animated')
    
}

//set progress
function setProgress(int) {
    progressTime.textContent = int;
}

