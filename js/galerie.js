const links = document.querySelector(".btn-group");
const btns = document.querySelectorAll(".btn");
const divs = document.querySelectorAll(".filterDiv");

links.addEventListener("click",function(e) {
    const id = e.target.dataset.id;
    if(id) {
        //remove "active" from other buttons
        btns.forEach(function(btn) {
            btn.classList.remove("active");
            e.target.classList.add("active");
        });
        //Hide Divs
        divs.forEach(function(div) {
            div.classList.remove("active")
        })
        //Show active Divs
        const element = document.getElementById(id);
        element.classList.add("active");
    }
});


