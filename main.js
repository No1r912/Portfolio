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

let scrollFrame = null;

function handleScroll(){

    if(scrollFrame) return;

    scrollFrame = requestAnimationFrame(() => {

        stickyHeader();
        activeNav();
        updateProgressBar();
        toggleBackToTop();
        revealOnScroll();
        scrollFrame = null;

    });

}

window.addEventListener("scroll", handleScroll, { passive:true });

/*======================================================
    SMOOTH SCROLL
======================================================*/

const navLinks = document.querySelectorAll('nav a, .mobile-menu a, .footer-links a');

navLinks.forEach(link => {

    link.addEventListener("click", function(e){

        const targetId = this.getAttribute("href");

        if(targetId.startsWith("#")){

            e.preventDefault();

            const target = document.querySelector(targetId);

            if(target){

                target.scrollIntoView({

                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "auto"
                        : "smooth"

                });

            }

        }

    });

});

/* GLOBAL ELEMENTS */

const header = document.querySelector("header");
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll("nav a, .mobile-menu a");
const compactExperience = window.matchMedia(
    "(max-width: 768px), (prefers-reduced-motion: reduce)"
).matches;

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

            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth"

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

    if(!sections.length) return;

    // Start from the first navigable section. This prevents unlinked content
    // (such as the stats block) from clearing the current navigation state.
    let current = sections[0].id;
    const marker = window.scrollY + (header?.offsetHeight || 0) + 80;

    sections.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        if(marker >= sectionTop){

            current = section.id;

        }

    });


    links.forEach(link=>{

        const isCurrent = link.getAttribute("href") === "#" + current;
        link.classList.toggle("active", isCurrent);

        if (isCurrent) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }

    });

}

// Mark the initial section before the first scroll event occurs.
activeNav();




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

    menuBtn.setAttribute("aria-expanded", mobileMenu.classList.contains("active"));

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
            menuBtn?.setAttribute("aria-expanded", "false");
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
        menuBtn?.setAttribute("aria-expanded", "false");

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
        menuBtn?.setAttribute("aria-expanded", "false");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    }

});

/*======================================================
    SYNCHRONIZED IDENTITY TRANSITION
======================================================*/

function initializeIdentityTransition() {
    const name = document.getElementById("hero-identity");
    const portrait = document.querySelector(".profile-image");
    const no1rPhoto = portrait?.querySelector(".profile-photo-one");
    const hazwanPhoto = portrait?.querySelector(".profile-photo-two");
    if (!name || !portrait || !no1rPhoto || !hazwanPhoto) return;

    const identityTransitionTiming = {
        stableDuration: 4000,
        glitchDuration: 320,
        switchPoint: 160
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const no1rImagePath = portrait.dataset.no1rImage || no1rPhoto.getAttribute("src");
    const hazwanImagePath = portrait.dataset.hazwanImage?.trim() || "";
    let currentIdentity = "no1r";
    let timer = 0;

    const preloadImage = (path) => new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image.src);
        image.onerror = () => {
            console.warn(`Unable to preload profile image: ${path}`);
            resolve("");
        };
        image.src = path;
        if (image.complete && image.naturalWidth > 0) resolve(image.src);
    });

    const no1rImageReady = preloadImage(no1rImagePath);
    const hazwanImageReady = hazwanImagePath
        ? preloadImage(hazwanImagePath)
        : no1rImageReady;

    const applyIdentity = (identity, hazwanImage) => {
        currentIdentity = identity;
        const isHazwan = identity === "hazwan";
        name.textContent = isHazwan ? "Hazwan" : "No1r";
        name.dataset.text = name.textContent;
        name.setAttribute("aria-label", name.textContent);
        portrait.dataset.identity = identity;
        portrait.setAttribute("aria-label", `Profile photo for ${name.textContent}`);
        if (isHazwan && hazwanImage) hazwanPhoto.src = hazwanImage;
        if (!isHazwan && hazwanImage) no1rPhoto.src = hazwanImage;
    };

    const clearTransition = () => {
        window.clearTimeout(timer);
        name.classList.remove("is-glitching");
        portrait.classList.remove("is-glitching");
    };

    const scheduleNextTransition = () => {
        if (document.hidden || reducedMotion.matches) return;
        timer = window.setTimeout(() => {
            name.classList.add("is-glitching");
            portrait.classList.add("is-glitching");

            timer = window.setTimeout(() => {
                const nextIdentity = currentIdentity === "no1r" ? "hazwan" : "no1r";
                const imageReady = nextIdentity === "hazwan" ? hazwanImageReady : no1rImageReady;
                imageReady.then((image) => {
                    if (document.hidden || reducedMotion.matches) {
                        clearTransition();
                        return;
                    }
                    applyIdentity(nextIdentity, image);
                    timer = window.setTimeout(() => {
                        clearTransition();
                        scheduleNextTransition();
                    }, identityTransitionTiming.glitchDuration - identityTransitionTiming.switchPoint);
                });
            }, identityTransitionTiming.switchPoint);
        }, identityTransitionTiming.stableDuration);
    };

    applyIdentity("no1r", "");

    Promise.all([no1rImageReady, hazwanImageReady]).then(([no1rImage, hazwanImage]) => {
        if (hazwanImagePath && !hazwanImage) {
            console.warn("The Hazwan profile image could not be loaded; using the available No1r profile image.");
        }
        applyIdentity("no1r", no1rImage);
        scheduleNextTransition();
    });

    document.addEventListener("visibilitychange", () => {
        clearTransition();
        scheduleNextTransition();
    });

    reducedMotion.addEventListener("change", () => {
        clearTransition();
        scheduleNextTransition();
    });
}

initializeIdentityTransition();

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
const projectSearchData = [...projectCards].map((card) => ({
    card,
    category: card.dataset.category?.toLowerCase() || "none",
    title: card.querySelector("h3")?.textContent.toLowerCase() || "",
    description: card.querySelector("p")?.textContent.toLowerCase() || ""
}));

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


    projectSearchData.forEach(({ card, category, title, description }) => {
        const matchesFilter =
            currentFilter === "all" ||
            category === currentFilter;

        const matchesSearch =
            title.includes(searchValue) ||
            description.includes(searchValue);

        const isVisible = matchesFilter && matchesSearch;
        card.hidden = !isVisible;
        if (isVisible) visibleProjects++;
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
    searchInput.addEventListener("input", filterProjects);
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
    PROJECT PREVIEW LOADING
======================================================*/

const projectsSection = document.getElementById("projects");
const projectLoadingPanel = document.getElementById("project-loading");
const projectLoadingMessage = document.getElementById("project-loading-message");
const projectLoadingRetry = document.getElementById("project-loading-retry");
const projectImageRetryCounts = new WeakMap();
const PROJECT_IMAGE_TIMEOUT_MS = 20000;
let failedProjectImages = [];
let projectPreviewLoadingStarted = false;

function setProjectImageState(image, state) {
    const frame = image.closest(".project-image");
    if (!frame) return;

    frame.classList.toggle("is-loading", state === "loading");
    frame.classList.toggle("has-load-error", state === "error");
    frame.setAttribute("aria-busy", String(state === "loading"));
}

document.querySelectorAll("#projects .project-slider").forEach((image) => {
    image.addEventListener("load", () => setProjectImageState(image, "loaded"));
    image.addEventListener("error", () => setProjectImageState(image, "error"));
    setProjectImageState(
        image,
        image.complete ? (image.naturalWidth > 0 ? "loaded" : "error") : "loading"
    );
});

function getInitialProjectPreviews() {
    const featuredImage = document.querySelector(".featured-project .project-slider");
    const grid = document.querySelector(".project-grid");
    const cards = [...(grid?.querySelectorAll(".project-card") || [])];
    const firstCardTop = cards[0]?.getBoundingClientRect().top;
    const firstRowImages = cards
        .filter((card) => Math.abs(card.getBoundingClientRect().top - firstCardTop) < 2)
        .map((card) => card.querySelector(".project-slider"))
        .filter(Boolean);

    return [featuredImage, ...firstRowImages].filter(Boolean);
}

function waitForProjectImage(image, source = null) {
    return new Promise((resolve) => {
        let timeoutId;
        const finish = () => {
            image.removeEventListener("load", finish);
            image.removeEventListener("error", finish);
            window.clearTimeout(timeoutId);
            resolve(image.naturalWidth > 0);
        };

        image.addEventListener("load", finish);
        image.addEventListener("error", finish);
        image.loading = "eager";
        timeoutId = window.setTimeout(finish, PROJECT_IMAGE_TIMEOUT_MS);
        if (source) image.src = source;

        if (image.complete) finish();
    });
}

function showProjectLoading(message, isError = false) {
    if (!projectLoadingPanel || !projectsSection) return;

    projectLoadingPanel.hidden = false;
    projectLoadingPanel.classList.toggle("has-error", isError);
    projectLoadingMessage.textContent = message;
    projectLoadingRetry.hidden = !isError;
    projectLoadingRetry.disabled = false;
    projectsSection.setAttribute("aria-busy", String(!isError));
}

function settleProjectPreviews(results, images) {
    failedProjectImages = images.filter((image, index) =>
        !results[index] && image.naturalWidth === 0
    );

    if (failedProjectImages.length > 0) {
        showProjectLoading("Some project previews could not be loaded.", true);
        return;
    }

    projectsSection?.setAttribute("aria-busy", "false");
    if (projectLoadingPanel) projectLoadingPanel.hidden = true;
}

async function loadInitialProjectPreviews() {
    if (projectPreviewLoadingStarted) return;
    projectPreviewLoadingStarted = true;

    const images = getInitialProjectPreviews();
    const pending = images.filter((image) => !image.complete);
    const failed = images.filter((image) => image.complete && image.naturalWidth === 0);

    if (pending.length === 0) {
        if (failed.length > 0) {
            failedProjectImages = failed;
            showProjectLoading("Some project previews could not be loaded.", true);
        } else {
            projectsSection?.setAttribute("aria-busy", "false");
        }
        return;
    }

    showProjectLoading("INITIALIZING PROJECTS...");
    const results = await Promise.all(pending.map((image) => waitForProjectImage(image)));
    const resultByImage = new Map(pending.map((image, index) => [image, results[index]]));
    settleProjectPreviews(
        images.map((image) => resultByImage.get(image) ?? image.naturalWidth > 0),
        images
    );
}

async function retryProjectPreviews() {
    failedProjectImages = failedProjectImages.filter((image) => image.naturalWidth === 0);
    if (failedProjectImages.length === 0) {
        settleProjectPreviews([], []);
        return;
    }

    const retryImages = [...failedProjectImages];
    projectLoadingRetry.disabled = true;
    showProjectLoading("RETRYING PROJECT PREVIEWS...");
    const requests = retryImages.map((image) => {
        const original = image.dataset.projectOriginalSrc || image.getAttribute("src");
        image.dataset.projectOriginalSrc = original;
        const retryUrl = new URL(original, document.baseURI);
        const attempt = (projectImageRetryCounts.get(image) || 0) + 1;
        projectImageRetryCounts.set(image, attempt);
        retryUrl.searchParams.set("retry", String(attempt));

        return waitForProjectImage(image, retryUrl.href);
    });

    const results = await Promise.all(requests);
    settleProjectPreviews(results, retryImages);
    projectLoadingRetry.disabled = false;
}

projectLoadingRetry?.addEventListener("click", retryProjectPreviews);

if (projectsSection && "IntersectionObserver" in window) {
    const projectLoadingObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        loadInitialProjectPreviews();
    }, { rootMargin: "0px 0px 15% 0px" });

    projectLoadingObserver.observe(projectsSection);
} else if (projectsSection) {
    const checkProjectVisibility = () => {
        if (projectsSection.getBoundingClientRect().top > window.innerHeight) return;
        window.removeEventListener("scroll", checkProjectVisibility);
        loadInitialProjectPreviews();
    };

    window.addEventListener("scroll", checkProjectVisibility, { passive: true });
    checkProjectVisibility();
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

        const progress = height > 0
            ? Math.min(1, Math.max(0, scrollTop / height))
            : 0;
        progressBar.style.transform = `scaleX(${progress})`;
        backToTop?.style.setProperty("--scroll-progress", `${progress * 100}%`);

    }

}
updateProgressBar();

const copyrightYear = document.getElementById("copyright-year");
if (copyrightYear) {
    copyrightYear.textContent = String(new Date().getFullYear());
}


/*======================================================
    MOUSE GLOW EFFECT
======================================================*/

const glow = document.querySelector(".mouse-glow");

if(!compactExperience && window.matchMedia("(pointer: fine)").matches){

    document.addEventListener("mousemove", (e) => {

        if(glow){

            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";

        }

    }, { passive:true });

}

/*======================================================
    PARTICLES.JS
======================================================*/

if(!compactExperience && typeof particlesJS !== "undefined"){

    particlesJS("particles-js",{

        particles:{

            number:{
                value:30,
                density:{
                    enable:true,
                    value_area:1100
                }
            },

            color:{
                value:"#00ff9d"
            },

            shape:{
                type:"circle"
            },

            opacity:{
                value:.2,
                random:true
            },

            size:{
                value:2,
                random:true
            },

            move:{
                enable:true,
                speed:.55,
                random:true,
                out_mode:"out"
            },

            line_linked:{
                enable:true,
                color:"#00c8ff",
                opacity:.12,
                distance:145
            }

        }

    });

}

const particleMotionSpeed = .55;
const updateAmbientMotion = () => {
    document.body.classList.toggle("page-hidden", document.hidden);
    const systems = window.pJSDom || [];
    systems.forEach((system) => {
        if (system.pJS) {
            system.pJS.particles.move.speed = document.hidden ? 0 : particleMotionSpeed;
        }
    });
};

document.addEventListener("visibilitychange", updateAmbientMotion);
updateAmbientMotion();

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
    IMAGE SLIDER
======================================================*/

const projectSliders = [...document.querySelectorAll(".lab-slider")].flatMap((slider) => {
    const image = slider.querySelector(".project-slider");
    const images = slider.dataset.images?.split(",").map((src) => src.trim()).filter(Boolean) || [];
    if (!image || images.length < 2) return [];

    return [{
        slider,
        image,
        images,
        index: Math.max(0, images.findIndex((source) =>
            new URL(source, document.baseURI).pathname ===
            new URL(image.getAttribute("src"), document.baseURI).pathname
        )),
        timer: null,
        inView: false
    }];
});

const projectMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

const stopProjectSlider = (state) => {
    if (state.timer === null) return;
    window.clearInterval(state.timer);
    state.timer = null;
};

const advanceProjectSlider = (state) => {
    const nextIndex = (state.index + 1) % state.images.length;
    const nextImage = new Image();

    nextImage.onload = () => {
        state.image.style.opacity = "0";
        window.setTimeout(() => {
            state.index = nextIndex;
            state.image.src = state.images[nextIndex];
            state.image.style.opacity = "1";
        }, 160);
    };
    nextImage.src = state.images[nextIndex];
};

const syncProjectSliders = () => {
    const shouldRun = !document.hidden && !projectMotionPreference.matches;
    projectSliders.forEach((state) => {
        if (shouldRun && state.inView && state.timer === null) {
            state.timer = window.setInterval(() => advanceProjectSlider(state), 4000);
        } else if ((!shouldRun || !state.inView) && state.timer !== null) {
            stopProjectSlider(state);
        }
    });
};

if ("IntersectionObserver" in window) {
    const projectSliderObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const state = projectSliders.find(({ slider }) => slider === entry.target);
            if (state) state.inView = entry.isIntersecting;
        });
        syncProjectSliders();
    }, { rootMargin: "120px 0px" });

    projectSliders.forEach(({ slider }) => projectSliderObserver.observe(slider));
} else {
    projectSliders.forEach((state) => { state.inView = true; });
}

document.addEventListener("visibilitychange", syncProjectSliders);
projectMotionPreference.addEventListener("change", syncProjectSliders);
syncProjectSliders();


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

/*======================================================
    skills dropdown
======================================================*/

const skillButtons = document.querySelectorAll(".skill-dropdown");


skillButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const skill = button.parentElement;


        skill.classList.toggle("active");


    });

});

/* ====================================================== */
/* CONTACT / SECURE CHANNEL JAVASCRIPT */
/* ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const secureHub = document.querySelector('.secure-hub');

    if (!secureHub) return;


    /* ================================================== */
    /* SCROLL REVEAL */
    /* ================================================== */

    const contactObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                secureHub.classList.add('contact-visible');

                observer.unobserve(secureHub);

            });

        },
        {
            threshold: 0.18
        }
    );

    contactObserver.observe(secureHub);


    /* ================================================== */
    /* CONNECTION NODES */
    /* ================================================== */

    const nodes = secureHub.querySelectorAll(
        '.connection-node'
    );

    const nodeLines = {
        'node-email': '.line-email',
        'node-github': '.line-github',
        'node-linkedin': '.line-linkedin',
        'node-discord': '.line-discord'
    };


    nodes.forEach(node => {

        node.addEventListener('mouseenter', () => {

            node.classList.add('node-active');

            Object.keys(nodeLines).forEach(nodeClass => {

                if (!node.classList.contains(nodeClass)) return;

                const line = secureHub.querySelector(
                    nodeLines[nodeClass]
                );

                if (line) {
                    line.classList.add('line-active');
                }

            });

        });


        node.addEventListener('mouseleave', () => {

            node.classList.remove('node-active');

            Object.values(nodeLines).forEach(selector => {

                const line = secureHub.querySelector(selector);

                if (line) {
                    line.classList.remove('line-active');
                }

            });

        });

    });


    /* ================================================== */
    /* CORE INTERACTION */
    /* ================================================== */

    const core = secureHub.querySelector('.core-center');

    if (core) {

        core.addEventListener('mouseenter', () => {
            core.classList.add('core-active');
        });

        core.addEventListener('mouseleave', () => {
            core.classList.remove('core-active');
        });

    }


    /* ================================================== */
    /* CONTACT INFORMATION HOVER */
    /* ================================================== */

    const infoItems = secureHub.querySelectorAll(
        '.info-item'
    );


    infoItems.forEach(item => {

        item.addEventListener('mouseenter', () => {
            item.classList.add('info-active');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('info-active');
        });

    });


    /* ================================================== */
    /* CV / RESUME BUTTON */
    /* ================================================== */

    const cvButton = secureHub.querySelector(
        '.cv-download'
    );


    if (cvButton) {

        cvButton.addEventListener('click', () => {

            cvButton.classList.add('download-active');

            setTimeout(() => {
                cvButton.classList.remove('download-active');
            }, 500);

        });

    }


    /* ================================================== */
    /* KEYBOARD ACCESSIBILITY */
    /* ================================================== */

    nodes.forEach(node => {

        node.addEventListener('focus', () => {
            node.classList.add('node-active');
        });

        node.addEventListener('blur', () => {
            node.classList.remove('node-active');
        });

    });


    /* ================================================== */
    /* REDUCED MOTION */
    /* ================================================== */

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    if (reducedMotion.matches) {
        secureHub.classList.add('reduced-motion');
    }

});

/* ======================================================
   LIGHTWEIGHT VIEWPORT FADE-INS
   ====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const fadeTargets = document.querySelectorAll([
        ".section-title",
        ".about-card",
        ".about-content",
        ".stat",
        ".skills-left",
        ".skills-right",
        ".project-toolbar",
        ".featured-project",
        ".project-grid",
        ".timeline-item",
        ".accordion-item",
        ".secure-hub",
        "footer"
    ].join(","));

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    fadeTargets.forEach((element, index) => {
        element.classList.add("fade-in");
        element.style.setProperty("--fade-delay", `${(index % 4) * 70}ms`);
    });

    if(reduceMotion || !("IntersectionObserver" in window)){
        fadeTargets.forEach(element => element.classList.add("is-visible"));
        return;
    }

    const fadeObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if(!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -36px"
    });

    fadeTargets.forEach(element => fadeObserver.observe(element));

});
