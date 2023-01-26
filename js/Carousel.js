const carosals = document.querySelectorAll('.Carousel')

curentCarosal = 0;

const carosalBtns = document.querySelectorAll('.carosalBtn');
anableBtns();

function anableBtns() {
    if (curentCarosal === 0) {
        carosalBtns[0].style.opacity = ".2";
        carosalBtns[0].classList.toggle("mutedBtn")
    } else {
        carosalBtns[0].style.opacity = "1";
        carosalBtns[0].classList.toggle("mutedBtn")
    }
    if (curentCarosal >= carosals.length - 1) {
        carosalBtns[1].style.opacity = ".2";
        carosalBtns[1].classList.toggle("mutedBtn")
    } else {
        carosalBtns[1].style.opacity = "1";
        carosalBtns[1].classList.toggle("mutedBtn")
    }
}


function NextCarosal() {
    curentCarosal++;
    if (curentCarosal === carosals.length) {
        curentCarosal = carosals.length - 1;
        return;
    }
    for (let i = 0; i < carosals.length; i++) {
        carosals[i].style.transform = `translateX(${-100 - (100 * (curentCarosal - 1)) }%)`;
    }
    anableBtns();
}

function PreviosCarosal() {
    curentCarosal--;
    if (curentCarosal < 0) {
        curentCarosal = 0;
        return;
    }
    for (let i = carosals.length - 1; i >= 0; i--) {
        carosals[i].style.transform = `translateX(${-100 - (100 * (curentCarosal - 1)) }%)`;
    }
    anableBtns();
}



// const carosalsInterval = setInterval(() => {
//     if (curentCarosal === carosals.length - 1) {
//         PreviosCarosal()
//     } else {
//         NextCarosal()
//     }
// }, 1000);