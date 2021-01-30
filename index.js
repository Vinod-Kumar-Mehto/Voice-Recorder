let audioIn ={audio: true}


    navigator.mediaDevices.getUserMedia(audioIn)
.then((mediaStreamObj) => {
    console.log(mediaStreamObj)
    let audio = document.querySelector("audio");
    console.log(audio.srcObject)
    if("srcObject" in audio){
        audio.srcObject = mediaStreamObj;
    }else{
        audio.src = window.URL.createObjectURL(mediaStreamObj);
    }
    audio.onloadedmetadata = function (event){
        audio.play();
    };

    let start = document.getElementById("btnStart");
    let stop = document.getElementById("btnStop");
    let playAudio = document.getElementById("adioplay");
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    console.log(mediaRecorder);
    
    start.addEventListener("click", function (e){
        mediaRecorder.start();
    })

    stop.addEventListener("click", function(e){
        mediaRecorder.stop();
    });

    mediaRecorder.ondataavailable = function (e){
        dataArray.push(e.data)
    }
    let dataArray =[];
    mediaRecorder.onstop = function (e){
        let audioData = new Blob(dataArray, {"type" : "audio/mp3;"});
        dataArray =[];

        playAudio.src  = window.URL.createObjectURL(audioData);
       
    }
})
.catch((err) => console.log(err.name, err.message));