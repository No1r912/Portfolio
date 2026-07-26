/*======================================================
    DARK / LIGHT MODE TOGGLE
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const themeBtn = document.getElementById("theme-toggle");

    const icon = themeBtn?.querySelector("i");


    // Load saved theme

    const savedTheme = localStorage.getItem("theme");


    if(savedTheme === "light"){

        document.body.classList.add("light-mode");

        if(icon){

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }

    }



    // Toggle button

    if(themeBtn){

        themeBtn.addEventListener("click",()=>{


            document.body.classList.toggle("light-mode");


            const isLight =
            document.body.classList.contains("light-mode");



            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );



            if(icon){

                if(isLight){

                    icon.classList.remove("fa-moon");
                    icon.classList.add("fa-sun");

                }

                else{

                    icon.classList.remove("fa-sun");
                    icon.classList.add("fa-moon");

                }

            }


        });

    }


});

/*======================================================
    LOADING SCREEN
======================================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");
    const progress = document.querySelector(".loading-bar span");
    const access = document.querySelector(".access");
    const text = document.getElementById("loader-text");


    // Stop if loader elements don't exist
    if(!loader || !progress || !access || !text){
        return;
    }


    const messages = [
        "Initializing system...",
        "Loading modules...",
        "Connecting to secure server...",
        "Scanning environment...",
        "Encrypting session...",
        "Access verification..."
    ];


    let percent = 0;
    let index = 0;



    // Text animation

    const messageInterval = setInterval(() => {


        if(index < messages.length){

            text.textContent = messages[index];

            index++;

        }

        else{

            clearInterval(messageInterval);

        }


    },450);



    // Progress animation

    const loading = setInterval(() => {


        percent++;


        progress.style.width = percent + "%";



        if(percent >= 100){


            clearInterval(loading);



            access.textContent = "ACCESS GRANTED";



            setTimeout(() => {



                loader.classList.add("loader-hide");



                setTimeout(() => {



                    loader.style.display = "none";



                },800);



            },900);



        }


    },25);


});


window.addEventListener("scroll", () => {

    stickyHeader();
    activeNav();
    updateProgressBar();
    toggleBackToTop();
    revealOnScroll();

});

/*======================================================
    SMOOTH SCROLL
======================================================*/

const navLinks = document.querySelectorAll('nav a, .mobile-menu a');

navLinks.forEach(link => {

    link.addEventListener("click", function(e){

        const targetId = this.getAttribute("href");

        if(targetId.startsWith("#")){

            e.preventDefault();

            const target = document.querySelector(targetId);

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        }

    });

});

/* GLOBAL ELEMENTS */

const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

const backToTop = document.getElementById("backToTop");


/*======================================================
    BACK TO TOP BUTTON
======================================================*/

function toggleBackToTop(){

    if(!backToTop) return;


    if(window.scrollY > 400){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

}


if(backToTop){

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*======================================================
    ANIMATED STAT COUNTER
======================================================*/

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {

    const target = Number(counter.dataset.target);

    let count = 0;

    const duration = 1500; // 1.5 seconds

    const increment = target / (duration / 16);


    function update(){

        count += increment;


        if(count < target){

            counter.textContent = Math.floor(count);

            requestAnimationFrame(update);

        }

        else{

            counter.textContent = target;

        }

    }


    update();

};



const counterObserver = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            startCounter(entry.target);


            counterObserver.unobserve(entry.target);


        }


    });


},{
    threshold:0.5
});



counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/*======================================================
    ACTIVE NAVIGATION LINK
======================================================*/


function activeNav(){

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });


    links.forEach(link=>{

        link.classList.remove("active");


        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

}




/*======================================================
    MOBILE MENU
======================================================*/

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

/*=========================================
    OPEN / CLOSE MENU
=========================================*/

if(menuBtn){

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if(mobileMenu.classList.contains("active")){

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");

    }

    else{

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    }

});

}

/*=========================================
    CLOSE WHEN CLICKING LINK
=========================================*/

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        if(mobileMenu){
            mobileMenu.classList.remove("active");
        }

        if(menuBtn){

            const icon = menuBtn.querySelector("i");

            if(icon){

                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");

            }

        }

    });

});

/*=========================================
    CLOSE WHEN CLICKING OUTSIDE
=========================================*/

document.addEventListener("click", (event) => {

    if(

        !mobileMenu.contains(event.target) &&
        !menuBtn.contains(event.target)

    ){

        mobileMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    }

});

/*=========================================
    CLOSE WITH ESC KEY
=========================================*/

document.addEventListener("keydown", (event) => {

    if(event.key === "Escape"){

        mobileMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    }

});




/*======================================================
    TYPED.JS
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const typingElement = document.getElementById("typing-text");

    // Check if the HTML element exists
    if (!typingElement) {
        console.error("Element #typing-text not found.");
        return;
    }

    // Check if Typed.js is loaded
    if (typeof Typed === "undefined") {
        console.error("Typed.js is not loaded.");
        return;
    }

    // Initialize Typed.js
    new Typed("#typing-text", {

        strings: [

            "Cybersecurity Enthusiast",
            "Junior Front-End Developer",
            "IT Student",
            "Continuous Learner"

        ],

        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1800,
        startDelay: 500,
        smartBackspace: true,
        loop: true,
        showCursor: true,
        cursorChar: "_"

    });

});

/*======================================================
    CUSTOM CURSOR STYLE
======================================================*/

const style = document.createElement("style");

style.innerHTML = `

.typed-cursor{
    color:#00ff9d;
    font-weight:bold;
    animation:blink .8s infinite;
}

@keyframes blink{

    0%{
        opacity:1;
    }

    50%{
        opacity:0;
    }

    100%{
        opacity:1;
    }

}

`;

document.head.appendChild(style);

/*======================================================
    TERMINAL CURSOR BLINK
======================================================*/

const cursorStyle = document.createElement("style");

cursorStyle.innerHTML = `

.typed-cursor{

    color:#00ff9d;

    font-weight:bold;

    animation:blink .8s infinite;

}

@keyframes blink{

    0%{

        opacity:1;

    }

    50%{

        opacity:0;

    }

    100%{

        opacity:1;

    }

}

`;

document.head.appendChild(cursorStyle);




/*======================================================
    SCROLL REVEAL
======================================================*/

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

const revealOnScroll = () => {

    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/*======================================================
    STAGGER ANIMATION
======================================================*/

const staggerGroups = document.querySelectorAll(

    ".project-grid, .tool-grid, .certificate-grid, .stats"

);

staggerGroups.forEach(group => {

    const children = group.children;

    Array.from(children).forEach((child, index) => {

        child.style.transitionDelay = `${index * 0.12}s`;

    });

});

/*======================================================
    FADE IN NAVBAR
======================================================*/

const navbar = document.querySelector("header");

window.addEventListener("load", () => {

    if(navbar){

        navbar.style.opacity = "0";

        navbar.style.transform = "translate(-50%, -30px)";

        setTimeout(() => {

            navbar.style.transition = ".8s ease";

            navbar.style.opacity = "1";

            navbar.style.transform = "translate(-50%, 0)";

        }, 300);

    }

});

/*======================================================
    HERO FADE
======================================================*/

window.addEventListener("load", () => {

    const heroLeft = document.querySelector(".hero-left");
    const heroRight = document.querySelector(".hero-right");

    if(heroLeft){

        heroLeft.classList.add("active");

    }

    if(heroRight){

        heroRight.classList.add("active");

    }

});





/*======================================================
    PROJECT FILTER
======================================================*/

const filterButtons = document.querySelectorAll(".project-filter button");
const projectCards = document.querySelectorAll(".project-card");
const searchInput = document.getElementById("project-search");

let currentFilter = "all";

/*======================================================
    PROJECT EXPAND SYSTEM
======================================================*/

const expandButtons = document.querySelectorAll(".expand-project");


expandButtons.forEach(button => {

    button.addEventListener("click", function(){

        const project = this.closest(
            ".project-card, .featured-project"
        );


        project.classList.toggle("active");


        if(project.classList.contains("active")){

            this.innerHTML = `
            <i class="fas fa-eye-slash"></i>
            Hide Details
            `;

        }
        else{

            this.innerHTML = `
            <i class="fas fa-eye"></i>
            View Details
            `;

        }

    });

});

/*======================================================
    FILTER FUNCTION
======================================================*/

function filterProjects(){

    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let visibleProjects = 0;


    projectCards.forEach(card => {


        const category = card.dataset.category
            ? card.dataset.category.toLowerCase()
            : "none";


        const title = card.querySelector("h3")
            ? card.querySelector("h3").textContent.toLowerCase()
            : "";


        const description = card.querySelector("p")
            ? card.querySelector("p").textContent.toLowerCase()
            : "";



        const matchesFilter =
            currentFilter === "all" ||
            category === currentFilter;



        const matchesSearch =
            title.includes(searchValue) ||
            description.includes(searchValue);



        if(matchesFilter && matchesSearch){


            card.style.display = "block";


            setTimeout(()=>{

                card.style.opacity="1";
                card.style.transform="translateY(0)";

            },100);


            visibleProjects++;


        }

        else{


            card.style.display="none";


        }


    });


    showNoProjectsMessage(visibleProjects);

}

/*======================================================
    FILTER BUTTONS
======================================================*/

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>

            btn.classList.remove("active")

        );

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterProjects();

    });

});

/*======================================================
    SEARCH
======================================================*/

if(searchInput){
    searchInput.addEventListener("keyup", filterProjects);
}

/*======================================================
    NO PROJECTS MESSAGE
======================================================*/

const projectGrid = document.querySelector(".project-grid");

const emptyMessage = document.createElement("div");

emptyMessage.className = "no-projects";

emptyMessage.innerHTML = `

    <i class="fas fa-folder-open"></i>

    <h3>No Projects Found</h3>

    <p>Try another search or category.</p>

`;

emptyMessage.style.display = "none";

if(projectGrid){
    projectGrid.appendChild(emptyMessage);
}

function showNoProjectsMessage(count){

    if(count === 0){

        emptyMessage.style.display = "flex";

    }

    else{

        emptyMessage.style.display = "none";

    }

}

/*======================================================
    INITIALIZE
======================================================*/

filterProjects();









/*======================================================
    CERTIFICATE ACCORDION
======================================================

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {

    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {

        const isOpen = item.classList.contains("active");

        /*=========================================
            CLOSE ALL ITEMS
        =========================================

        accordionItems.forEach(accordion => {

            accordion.classList.remove("active");

            accordion.querySelector(".accordion-content").style.maxHeight = null;

        });

        /*=========================================
            OPEN SELECTED ITEM
        =========================================

        if(!isOpen){

            item.classList.add("active");

            content.style.maxHeight = content.scrollHeight + "px";

        }

    });

});

/*======================================================
    OPEN FIRST ACCORDION BY DEFAULT
======================================================

if(accordionItems.length > 0){

    accordionItems[0].classList.add("active");

    const firstContent = accordionItems[0].querySelector(".accordion-content");

    firstContent.style.maxHeight = firstContent.scrollHeight + "px";

}

/*======================================================
    CERTIFICATE CARD HOVER EFFECT
======================================================

const certificateCards = document.querySelectorAll(".certificate-card");

certificateCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});

/*======================================================
    OPTIONAL: VIEW CERTIFICATE
======================================================

const certificateButtons = document.querySelectorAll(".view-certificate");

certificateButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        const url = button.getAttribute("href");

        if(url){

            window.open(url, "_blank");

        }

    });

});

/*======================================================
    UPDATE PROGRESS BAR ON SCROLL
======================================================*/
function updateProgressBar(){

    const progressBar = document.querySelector(".scroll-progress");

    if(progressBar){

        const scrollTop = window.scrollY;

        const height =
        document.documentElement.scrollHeight -
        window.innerHeight;


        progressBar.style.width =
        (scrollTop / height) * 100 + "%";

    }

}


/*======================================================
    MOUSE GLOW EFFECT
======================================================*/

const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {

    if(glow){

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    }

});

/*======================================================
    PARTICLES.JS
======================================================*/

if(typeof particlesJS !== "undefined"){

    particlesJS("particles-js",{

        particles:{

            number:{
                value:50
            },

            color:{
                value:"#00ff9d"
            },

            shape:{
                type:"circle"
            },

            opacity:{
                value:.3
            },

            size:{
                value:2.5
            },

            move:{
                enable:true,

                speed:1
            },

            line_linked:{
                enable:true,

                color:"#00ff9d",

                opacity:.2
            }

        }

    });

}

/*======================================================
    BUTTON RIPPLE EFFECT
======================================================*/

document.querySelectorAll(".btn-primary, .btn-secondary").forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left =

            e.clientX - rect.left - size/2 + "px";

        ripple.style.top =

            e.clientY - rect.top - size/2 + "px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/*======================================================
    COMING SOON GLOW EFFECT
======================================================*/


const comingProjects = document.querySelectorAll(".coming-project");


comingProjects.forEach(card => {


    card.addEventListener("mouseenter",()=>{


        card.style.boxShadow =
        "0 0 35px rgba(0,255,157,.18)";


    });



    card.addEventListener("mouseleave",()=>{


        card.style.boxShadow =
        "none";


    });


});


/*======================================================
    NOVA IMAGE SLIDER
======================================================*/

const novaSlider = document.querySelector(".nova-slider");


if(novaSlider){


    const imageElement = novaSlider.querySelector(".project-slider");


    const images = novaSlider.dataset.images
    .split(",")
    .map(img => img.trim());


    let index = 0;


    setInterval(()=>{


        index++;


        if(index >= images.length){

            index = 0;

        }


        imageElement.style.opacity = "0";


        setTimeout(()=>{


            imageElement.src = images[index];


            imageElement.onload = ()=>{

                imageElement.style.opacity = "1";

            };


        },300);



    },3000);



}


/*======================================================
    STICKY HEADER FUNCTION
======================================================*/

function stickyHeader(){

    if(window.scrollY > 80){

        header.classList.add("scrolled");

        header.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.35)";

    }

    else{

        header.classList.remove("scrolled");

        header.style.boxShadow = "none";

    }

}