Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/F65qQCpXj/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_hand_gesture").innerHTML = results[0].label;
        document.getElementById("result_hand_gesture2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Awesome")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Peace")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "Rock")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }

        if(results[1].label == "Awesome")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if(results[1].label == "Peace")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if(results[1].label == "Rock")
        {
            document.getElementById("update_emoji2").innerHTML = "&#129304;";
        }
    }
}