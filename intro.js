let loginval = document.getElementById("loginval")




document.getElementById("invsubmit").onclick = function () {
    console.log("test")
    if(loginval.value == "maker") {
        window.open("geminihtml.html")

    }
    if(loginval.value == "answerer") {
        window.open("poianswer.html")
    }
    if(loginval.value == "researcher") {
        window.open("researcher.html")
    }
    if(loginval.value == "solution") {
        window.open("solutions.html")
    }
     
}
