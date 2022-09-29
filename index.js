function onSubmit(){
    const text = document.getElementById('answer').value;
    console.log(text);

    const msg = "【送信内容】\n" + text;
    sendText(msg);
}