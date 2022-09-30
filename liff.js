$(document).ready(function () {
    // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
    // LINE DevelopersのLIFF画面より確認可能
    var liffId = "1657519737-xOkVknjY";
    console.log(`init liff, ID : ${liffId}`);
    initializeLiff(liffId);
})

function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            // Webブラウザからアクセスされた場合は、LINEにログインする
            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("LINEアカウントにログインしてください。");
                liff.login({redirectUri: location.href});
            }else{
                console.log('Login Success');
            }
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
}

function sendText(text) {
    if (!liff.isInClient()) {
        shareTargetPicker(text);
    } else {
        sendMessages(text);
    }
}


// LINEトーク画面上でメッセージ送信
function sendMessages(text) {
    console.log('in sendMessages()');
    liff.sendMessages([{
        'type': 'text',
        'text': text
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

// Webブラウザからメッセージ送信
function shareTargetPicker(text) {
    console.log('in shareTargetPicker');
    liff.shareTargetPicker([{
        'type': 'text',
        'text': text
    }]).catch((error) => {
        console.log(error);
        window.alert('Failed to send message ' + error);
    });
}

