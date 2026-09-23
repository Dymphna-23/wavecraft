/* plus shell safety */
(function () {
    function show() { var m = document.getElementById("main-content"); if (m) { try { if (getComputedStyle(m).display === "none") m.style.display = "block"; } catch (e) { m.style.display = "block"; } } }
    if (document.readyState !== "loading") setTimeout(show, 2500);
    else document.addEventListener("DOMContentLoaded", function () { setTimeout(show, 2500); });
})();