var loading = document.querySelector('.loading');
var loader = document.querySelector('.loader');
var load = document.querySelector('.load');
var profile = document.querySelector('.profile');
var container = document.querySelector('.container');
const track = document.querySelector('.particle-section');
var particles = document.querySelectorAll('.particles');
const slidesContainer = document.querySelector('.sections');
const slides = Array.from(slidesContainer.children);
var navLinks = document.querySelectorAll('.nav-links');
var currentActive =Array.from(document.querySelectorAll('.nav-li'));
var barsConatiner = document.querySelector('.bars');
var bars = Array.from(document.querySelectorAll('.bar'));
var body = document.body;
var darkTheme = document.querySelector('.dark');
var lightTheme = document.querySelector('.light');
var document = document.documentElement;
var wishings = document.querySelector('.wishings .msg');
var wishing = document.querySelector('.wishings');
var sideNav = document.querySelector('.sidenav');
var ham = document.querySelector('.ham');
var overlay = document.querySelector('.overlay');
var homeSvg = document.getElementById('logo-svg');


// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             var response = this.responseText;
//             var particleColor = JSON.parse(response);
//             var myColor = 'color';
//             particleColor[myColor] = "#000";
//             console.log(particleColor);
//             particles.forEach(particle => {
//                 var id = particle.id;
//                 particlesJS.load(id, particleColor, function () {});
//             });
//         }
//     };
//     xhttp.open("GET", "assets/snow-dark.json", true);
//     xhttp.send();
    
// }
//loadDoc();







window.addEventListener('load', function () {
    this.setTimeout(()=>{
    loader.classList.add('animation');
    profile.classList.add('animation');
    load.classList.add('animation');
    },2500);
    this.setTimeout(()=>{
    loading.style.display = 'none';
    container.style.display = 'block';

        var date = new Date();
    var hrs = date.getHours();

    if (hrs <= 12 ||hrs >= 6) {
        wishings.textContent = `Good Morning`;
    }
    if (hrs >= 12) {
        wishings.textContent = `Good Afternoon`;
    }
    if (hrs >= 19) {
        wishings.textContent = `Good Evening`;
    }

    this.window.onkeydown = keyDown;
    function keyDown(e) {
        var active = document.querySelector('.active');
        if (e.keyCode === 40) {
            // down Arrow
            if (currentActive[3].contains(active)) {
                return
            } else {
                nextSlide();
            }
        } else if (e.keyCode === 38) {
            // up Arrow
            if (currentActive[0].contains(active)) {
                return
            } else {
                previousSlide();
            }
        }
    }
    this.setTimeout(()=>{
    wishing.classList.add('reveale');
    },1500)

    setTimeout(function () {
        wishing.classList.remove('reveale');
    }, 4500);
    setTimeout(function () {
        wishing.style.display = "none";
    }, 4800);


    var Router = function (name, routes) {
        return {
            name: name,
            routes: routes
        };
    }

    var myFirstRoute = new Router("myFirstRoute", [{
        path: "#home",
        name: "home"
    },
    {
        path: "#portfolio",
        name: "portfolio"
    },
    {
        path: "#skills",
        name: "skills"
    },
    {
        path: "#aboutme",
        name: "about me"
    },
    {
        path: "#contact",
        name: "contact"
    }
    ]);
    const idlePeriod = 100;
    const animationDuration = 1000;
    var lastAnimation = 0;
    const slideHeight = slides[0].getBoundingClientRect().height;
    slides.forEach((slide, index) => {
        slide.style.top = slideHeight * index + 'px';
    });
    

    this.window.addEventListener('hashchange', (e) => {
        e.preventDefault();
        var id = location.hash.replace("#", "");
        var currentSlide = document.getElementById(id);

        // for slides
        var amount = currentSlide.style.top;
        slidesContainer.style.transform = 'translateY(-' + amount + ')';
        slides.forEach(slide => {
            slide.classList.remove('current-slide');
        });
        currentSlide.classList.add('current-slide');
        // for nav Class
        var slideIndex = slides.findIndex(slide => slide === currentSlide);
        currentActive.forEach(link => {
            link.classList.remove('active');
        });
        currentActive[slideIndex].classList.add('active');

    });
    
    homeSvg.addEventListener('click',()=>{
        slidesContainer.style.transform = 'translateY(-0px)';
        currentActive.forEach(li=>{
            li.classList.remove('active');
        });
        currentActive[0].classList.add('active');
    })

    var currentPath = window.location.pathname;
    
    if (currentPath === "/") {
        this.location.hash = "#home";
    } else if (currentPath === "/index.html") {
        this.location.hash = "#home";
    } else {
        var route = myFirstRoute.routes.filter(function (r) {
            return r.path === currentPath;
        })[0];
        console.log(route);
    }
    navLinks = Array.from(navLinks);
    navLinks.forEach(link => {
        link.addEventListener('click', show);
    });

    function show(e) {
        var target = e.target;
        var currentSlide = track.querySelector('.current-slide');
 
        var getHref = target.getAttribute('href').replace("#", "");

        var targetSlide = document.getElementById(getHref);

        moveSlide(currentSlide, targetSlide)
        activeNav(target);



        if (ham.classList.contains('active')) {
            ham.classList.remove('active');
            sideNav.classList.remove('nav');
            overlay.classList.remove('over');
            slidesContainer.style.transitionDelay = "0.4s";
        } else {
            
            slidesContainer.style.transitionDelay = "0s";
        }
    }

    // window PopState



    // start of the wheel Event

    var querry = window.matchMedia("(max-width:1024px)");
    if (querry.matches) {

        track.removeEventListener('mousewheeel', wheelEvent);
        var observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    var targetIndex = slides.findIndex(slide => slide == entry.target);
                    currentActive.forEach(active => {
                        active.classList.remove('active');
                    });
                    currentActive[targetIndex].classList.add('active');
                }
            });
        });
        slides.forEach((slide) => {
            slide.style.top = '0px';
            observer.observe(slide);
        });
    } else {
        this.setTimeout(() => {
            track.addEventListener('mousewheel', wheelEvent);
        }, 400);
    }
    

    
         

    // end of the wheel Event



    function wheelEvent(e) {
        var active = document.querySelector('.active');
        var deltaY = e.wheelDeltaY;
        var deltaX = e.wheelDeltaX;
        var currentTime = new Date().getTime();
        if (currentTime - lastAnimation < idlePeriod + animationDuration) {
            e.preventDefault()
            return;
        }
        var home = document.getElementById('home');
        console.log();
        if (home.classList.contains('current-slide')) {
            home.addEventListener('wheel', (e) => {
                if (e.wheelDeltaY > 0) {
                    return
                }
            })
        }
        if (deltaY < 0) {
            if (currentActive[3].contains(active)) {
                return
            } else {
                nextSlide();
            }
        } else if (deltaY > 0) {
            if (currentActive[0].contains(active)) {
                return
            } else {
                previousSlide();
            }
        }
        

        lastAnimation = currentTime;
    };

    function nextSlide() {
        wishing.classList.remove('reveale');
        var currentActive = document.querySelector('.active');
        var currentSlide = track.querySelector('.current-slide');
        var nextSlide = currentSlide.nextElementSibling;
        moveSlide(currentSlide, nextSlide);
        targetIndex = slides.findIndex(slide => slide === currentSlide);
        var targetSlide = navLinks[targetIndex];
        var nextActive = targetSlide.parentElement.nextElementSibling;
        navClass(currentActive, nextActive);
    };

    function previousSlide() {
        wishing.classList.remove('reveale');
        var currentSlide = track.querySelector('.current-slide');
        var prevSlide = currentSlide.previousElementSibling;
        moveSlide(currentSlide, prevSlide);
        var currentActive = document.querySelector('.active');
        targetIndex = slides.findIndex(slide => slide === currentSlide);
        var targetSlide = navLinks[targetIndex];
        var prevActive = targetSlide.parentElement.previousElementSibling;
        navClass(currentActive, prevActive);
    }

    var percent = ['html', 'css', 'javascript', 'bootstrap', 'angular', 'ajax'];

    var progressBars = document.querySelectorAll('.progress-bars');
    var delay = [0.5,0.7,0.9,1.1,1.3,1.5];
    progressBars.forEach((bar, i) => {
        bar.dataset.delay = delay[i];
    });
    const skillObserver = new IntersectionObserver(entry => {
        entry.forEach((enter, i) => {
            if (enter.isIntersecting) {
                barsConatiner.style.opacity = 1;
                enter.target.classList.add('bars-anime');
                enter.target.style.transition = `all 0.3s cubic-bezier(.61,.2,.94,.9)`;
                progressBars.forEach((bar, i) => {
                    bar.style.transitionDelay = bar.dataset.delay + 's';
                });
            }else{
                barsConatiner.style.opacity = 0;
                enter.target.classList.remove('bars-anime');
                progressBars.forEach((bar) => {
                    bar.style.transitionDelay = '0s';
                });
            }
        })
    });

    progressBars.forEach(bar => {
        skillObserver.observe(bar);
    })

    // portfolio-wheel function closes
    function activeNav(target) {
        currentActive.forEach(link=>{
            link.classList.remove('active');
        });
        target.parentElement.classList.add('active');
    }

    function moveSlide(currentSlide, targetSlide) {
        var amount = targetSlide.style.top;
        slidesContainer.style.transform = 'translateY(-' + amount + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    function navClass(currentActive, targetActive) {
        currentActive.classList.remove('active');
        targetActive.classList.add('active');
    }

    let trans = () => {
        document.documentElement.classList.add('transition');
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition')
        }, 1000)
    }
    darkTheme.addEventListener('click', (e) => {
        trans();
        particles.forEach(particle => {
            var id = particle.id;
            // particlesJS.load(id, 'assets/snow-dark.json', function () {
            // });
        });
        document.documentElement.setAttribute("data-theme", "dark");
        lightTheme.classList.remove('active');
        darkTheme.classList.add('active');
    })
    lightTheme.addEventListener('click', (e) => {
        trans();
        particles.forEach(particle => {
            var id = particle.id;
            // particlesJS.load(id, 'assets/particles1.json', function () {
            // });
        });
        document.documentElement.setAttribute("data-theme", "light");
        darkTheme.classList.remove('active');
        lightTheme.classList.add('active');


    });

    /// HambergerMenu


        if(ham.style.display === "block"){
            ham.style.display = 'none';
        }

    ham.addEventListener('click', () => {
        ham.classList.toggle('active');
        sideNav.classList.toggle('nav');
        overlay.classList.toggle('over');
    });
    },3000)
    overlay.addEventListener('click',()=>{
        sideNav.classList.remove('nav');
        ham.classList.remove('active');
        overlay.classList.remove('over');
    })
    

});
//skill-bars

var leftAnime = document.querySelectorAll(".left-anime");
var rightAnime = document.querySelectorAll(".right-anime");
var bottomAnime = document.querySelectorAll(".bottom-anime");

var gsapAnime = Array.from(document.querySelectorAll('.gsap'));


// var gsap = gsap.timeline();

// var gsapAnimeObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {

//         }
//     })
// });

// gsapAnime.forEach(anime => {
//     gsapAnimeObserver.observe(anime);
// });

var leftOptions= {
    root:null,
    threshold:0,
    rootMargin:"-250px"
}

var gsapLeftObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry);
        if (entry.intersectionRatio > 0) {
            gsap.fromTo(entry.target, {
                x: -120,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.3,
                ease: "Power1.easeInOut"
            });
        }else{
            entry.target.style.opacity = 0;
        }
    });
}, leftOptions);

leftAnime.forEach(anime => {
    gsapLeftObserver.observe(anime);
});

var rightOptions= {
    root:null,
    threshold: 0,
    rootMargin:"-250px"
}

var gsapRightObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.intersectionRatio> 0 ) {
            gsap.fromTo(entry.target, {
                x: 120,
                opacity:0,
            }, {
                x: 0,
                scale:1,
                opacity:1,
                duration: 0.5,
                stagger: 0.3,
                ease: "Power1.easeInOut"
            });
        }else{
            entry.target.style.opacity = 0;
        }
    });
},rightOptions);

rightAnime.forEach(anime => {
    gsapRightObserver.observe(anime);
});



bottomAnime.forEach(anime => {
    gsapBottomObserver.observe(anime);
});
var skills = document.getElementById('#skills');
var barText = document.querySelector('.bar-text');
var li = document.querySelectorAll(".bar-text li");

var delayBar = [0.5,0.7,0.9,1.1,1.3,1.5];

li.forEach((text,i)=>{
    text.dataset.delay = delayBar[i];
})
var gsapBarsObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            barText.classList.add('after');
            entry.target.classList.add('text');
            entry.target.style.transition = `all 0.3s cubic-bezier(.61,.2,.94,.9)`;
            var text = document.querySelectorAll('.text');
            text.forEach((text,i)=>{
                text.style.transitionDelay = text.dataset.delay +'s';
            });
        }else{
            barText.classList.remove('after');
            entry.target.classList.remove('text');
            var text = document.querySelectorAll('.text');
            text.forEach((text)=>{
                text.style.transitionDelay = '0s';
            });
        }
    })
})

li.forEach(li=>{
    gsapBarsObserver.observe(li);
});


// if (enter.isIntersecting) {
//     barsConatiner.style.opacity = 1;
//     enter.target.classList.add('bars-anime');
//     enter.target.style.transition = `all 0.4s linear`;
//     bars.forEach((bar, i) => {
//         bar.style.transitionDelay = bar.dataset.delay + 's';
//     });
// }else{
//     barsConatiner.style.opacity = 0;
//     enter.target.classList.remove('bars-anime');
//     bars.forEach((bar) => {
//         bar.style.transitionDelay = '0s';
//     });
// }

function querry(pixels,x){
    var querry = window.matchMedia( "(max-width:"+pixels+"px)");
    if(querry.matches){
        var gsapLeftObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target, {
                        x: -x,
                        opacity: 0,
                    }, {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.3,
                        ease: "Power1.easeInOut"
                    });
                }else{
                    entry.target.style.opacity = 0;
                }
            });
        });
        
        leftAnime.forEach(anime => {
            gsapLeftObserver.observe(anime);
        });
        
        var gsapRightObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target, {
                        x: x,
                        opacity:0,
                    }, {
                        x: 0,
                        scale:1,
                        opacity:1,
                        duration: 0.5,
                        stagger: 0.3,
                        delay: 0.7,
                        ease: "Power1.easeInOut"
                    });
                }else{
                    entry.target.style.opacity = 0;
                }
            });
        });
        
        rightAnime.forEach(anime => {
            gsapRightObserver.observe(anime);
        });
        
    }else{
        console.log('not matching');
    }
};
var querry768 = new querry(768,70);
var querry360 = new querry(360,70);
