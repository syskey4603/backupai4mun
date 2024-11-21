document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const intro = document.getElementById("intro");
        intro.style.opacity = "0";
        intro.style.transition = "opacity 1s ease";
        setTimeout(function() {
            intro.style.display = "none";
        }, 1000);
    }, 3000);
});
