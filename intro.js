let loginvalue = 24248

let loginval = document.getElementById("loginval")
let invsubmit = document.getElementById("invsubmit")

document.getElementById('loginval').onkeydown = function(e){
    if(e.key === 'Enter'){
        console.log(loginval.value)
    }
 };

document.getElementById("invsubmit").onclick = function () {
    window.open("geminihtml.html")
    
};
