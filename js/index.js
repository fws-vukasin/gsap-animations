$('.thumb').each(function(e, el) {
    const timeline = gsap.timeline({paused:true});
    
    timeline.to($(el).find('.thumb__caption'), {duration: 1, y: '0px', ease: Power3.easeOut});
    timeline.from($(el).find('.thumb__caption-title'), {duration: 1, y: '100px', opacity: 0.3, ease: Power3.easeOut}, "-=.9");
    timeline.from($(el).find('.thumb__caption-link'), {duration: 1, y: '100px', ease: Power3.easeOut, delay: .1}, "-=.9");
    
    $(el).on('mouseenter', function() {
        timeline.play();
        gsap.to($(this).find('feTurbulence'), {attr:{baseFrequency: 0.09}, duration: .5});
    });
    
    $(el).on('mouseleave', function() {
        timeline.reverse();
        gsap.to($(this).find('feTurbulence'), {attr:{baseFrequency: 0}, duration: .5});
    });
});

gsap.set('.cursor', {xPercent: -50, yPercent: -50});

const ball = $('.cursor');
const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
const mouse = {x: pos.x, y: pos.y};
const speed = 0.20

const xSet = gsap.quickSetter(ball, 'x', 'px');
const ySet = gsap.quickSetter(ball, 'y', 'px');

window.addEventListener("mousemove", e => {    
    mouse.x = e.x;
    mouse.y = e.y;  
});

gsap.ticker.add(() => {

    // adjust speed for higher refresh monitors
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
    
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
});

$('a').on('mouseenter', function() {
    gsap.to(ball, {css:{opacity: .7, scaleX: 1.8, scaleY: 1.8}, duration: .2});
});

$('a').on('mouseleave', function() {
    gsap.to(ball, {css:{opacity: 1, scaleX: 1, scaleY: 1}, duration: .2});
});