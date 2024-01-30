let loginval = document.getElementById("loginval")




document.getElementById("invsubmit").onclick = function () {
    window.alert("a")
    console.log("test")
    if(loginval.value == "maker") {
        window.open("geminihtml.html")

    }
    if(loginval.value == "creator") {
        window.open("poianswer.html")
    }
     
}
