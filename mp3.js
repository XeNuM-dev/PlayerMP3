let player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      mixBtn = document.querySelector('.mix'),
      stopBtn = document.querySelector('.stop'),
      repeatBtn = document.querySelector('.repeat'),
      volumeBtn = document.querySelector('#volume'),
      music = document.querySelector('.music'),
      progressContainer = document.querySelector('.progress__container'),
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      cover = document.querySelector('.cover__img'),
      imgSrc = document.querySelector('.img__src'),
      mixSrc = document.querySelector('.mix__src'),
      mixSrc2 = document.querySelector('.mix__src_2'),
      repeatSrc = document.querySelector('.rep__src'),
      repeatSrcActive = document.querySelector('.repeat_src_2')

const songs = ['10.01.21(меньше баса)', '17.01.21(громкость)', '18.09.2020 (измененный)','23.01.2021(готово)','25.09.2020','28.02.21(готово)']   

let songIndex = 0
let isRandom = false;

// Load song
function loadSong(song) {
    title.innerHTML = song
    music.src = `audio/${song}.mp3`
    cover.src = `img/cover${songIndex + 1}.jpg`
}
loadSong(songs[songIndex])

// Start song
function playSong() {
    player.classList.add('play')
    imgSrc.src = 'img/pause.png'
    music.play()
}

function stop() {
    music.pause()
    music.currentTime = 0
    player.classList.remove('play')
    imgSrc.src = 'img/play.png'
}

function pauseSong() {
    player.classList.remove('play')
    imgSrc.src = 'img/play.png'
    music.pause()
}

function audioVolume() {
    let v = this.value
    music.volume = v / 100
}

volumeBtn.addEventListener('click', audioVolume)

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})


// next song
function nextSong() {
    if (isRandom) {
        songIndex = getRandomInt(songs.length - 1) 
    } else {
        songIndex++;
    }

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    changeSong();
}
nextBtn.addEventListener('click', nextSong)


// Prev song
function prevSong() {
    if (isRandom) {
        songIndex = getRandomInt(songs.length - 1);
    } else {
        songIndex--;
    }

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    changeSong();
}

function changeSong() {
    loadSong(songs[songIndex])
    playSong()
}

prevBtn.addEventListener('click', prevSong)

stopBtn.addEventListener('click', stop)


// Progress bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`   
}
          
music.addEventListener('timeupdate', updateProgress)

// Set progress
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = music.duration

    music.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)


// Autoplay
music.addEventListener('ended', nextSong)


//Mix
mixBtn.addEventListener('click', () => {
    isRandom = isRandom == true ? false : true;
    if(isRandom) {
        mixSrc2.src = 'img/shuffle-button.png'
    }else {
        mixSrc.src = 'img/buttonMixActive2.png'
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//repeat button
repeatBtn.addEventListener('click', () => {
    if (music.loop == false) {
        repeatSrc.src = 'img/repeat1.png'
        music.loop = true
    }else if (music.loop == true) {
        music.loop = false
        repeatSrcActive.src = 'img/repeat2.png'
    }
})
