'use strict'

const screenWidth = window.screen.width
gsap.registerPlugin(ScrollTrigger);

/*
gsap.set(".ball", {xPercent: -50, yPercent: -50});

const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.35;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});
gsap.ticker.add(() => {

  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});*/


//smooth scroll
function smoothScroll(content, viewport, smoothness) {
    content = gsap.utils.toArray(content)[0];
    smoothness = smoothness || 1;

    gsap.set(viewport || content.parentNode, { overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0 });
    gsap.set(content, { overflow: "visible", width: "100%" });

    let getProp = gsap.getProperty(content),
        setProp = gsap.quickSetter(content, "y", "px"),
        setScroll = ScrollTrigger.getScrollFunc(window),
        removeScroll = () => content.style.overflow = "visible",
        killScrub = trigger => {
            let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
            scrub && scrub.kill();
            trigger.animation.progress(trigger.progress);
        },
        height, isProxyScrolling;

    function refreshHeight() {
        height = content.clientHeight;
        content.style.overflow = "visible"
        document.body.style.height = height + "px";
        return height - document.documentElement.clientHeight;
    }

    ScrollTrigger.addEventListener("refresh", () => {
        removeScroll();
        requestAnimationFrame(removeScroll);
    })
    ScrollTrigger.defaults({ scroller: content });
    ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

    ScrollTrigger.scrollerProxy(content, {
        scrollTop(value) {
            if (arguments.length) {
                isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
                setProp(-value);
                setScroll(value);
                return;
            }
            return -getProp("y");
        },
        scrollHeight: () => document.body.scrollHeight,
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
    });

    return ScrollTrigger.create({
        animation: gsap.fromTo(content, { y: 0 }, {
            y: () => document.documentElement.clientHeight - height,
            ease: "none",
            onUpdate: ScrollTrigger.update
        }),
        scroller: window,
        invalidateOnRefresh: true,
        start: 0,
        end: refreshHeight,
        refreshPriority: -999,
        scrub: smoothness,
        onUpdate: self => {
            if (isProxyScrolling) {
                killScrub(self);
                isProxyScrolling = false;
            }
        },
        onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
    });
}

document.addEventListener("DOMContentLoaded", function() { 

    $('.index-recommends-slider').slick({
        Infinity: true,
        arrows: true,
        autoplay:true,
        autoplaySpeed: 2000,
        dots: false,
        speed: 500,
        variableWidth: true,
        slidesToShow: 2,
        slidesToScroll: 1,
    });
    
    $('.index-slider-1').slick({
        Infinity: false,
    arrows: true,
    autoplay:true,
    autoplaySpeed: 2000,
    dots: false,
    speed: 500,
    variableHeight:true,
    slidesToShow: 2.5,
    slidesToScroll: 1,
        responsive: [
            { breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
    
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
      });
      $('.index-slider-2').slick({
        Infinity: false,
        arrows: true,
        autoplay:true,
        autoplaySpeed: 2000,
        dots: false,
        speed: 500,
        //variableHeight:true,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        rtl:true,
        responsive: [
            { breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
    
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    $('.index-slider-3').slick({
        Infinity: false,
        arrows: true,
        autoplay:true,
        autoplaySpeed: 2000,
        dots: false,
        speed: 500,
        variableHeight:true,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
    
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    

    smoothScroll(".smooth-scroll");


   if (document.querySelector(".body-index")){
    document.querySelector('.body-index').style.backgroundPosition=`100% 0px`;
    gsap.to('.body-index', {
        backgroundPosition: `100% ${innerHeight / 3}px`,
        lazy:false,
        scrollTrigger: {
            trigger: '#viewport',
            start: "0% top",
            end: "bottom top",
            scrub: true
        }
    })
} 
if (document.querySelector(".context-body")){
   // document.querySelector('.context-body').style.backgroundPosition=`100% -190px`;
    gsap.to('.context-body', {
        backgroundPosition: `100% ${innerHeight / 3}px`,
        lazy:false,
        scrollTrigger: {
            trigger: '#viewport',
            start: "0% top",
            end: "bottom top",
            scrub: true
        }
    })
}
    //section0
    //banner animation
    if (document.querySelector(".section0")){
var tl=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
tl.to(".header-slider-slide-animate-2-div-in",{duration:1, x:20, ease:"sine"},'start')
tl.to(".header-slider-slide-animate-3-div-in",{duration:1, x:-20},'start')
tl.to(".header-slider-slide-animate-9",{duration:1, y:10},'start')
tl.to(".header-slider-slide-animate-6",{duration:1, y:15},'start')
tl.to(".header-slider-slide-animate-7",{duration:1, delay:0.3, y:18},'start')
tl.to(".header-slider-slide-animate-8",{duration:1, delay:0.1, y:13},'start')
tl.to(".header-slider-slide-animate-10",{duration:1, delay:0.2, y:7},'start')
tl.to(".header-slider-slide-animate-11",{duration:1, delay:0.2, y:15},'start')
tl.to(".header-slider-slide-animate-12",{duration:1,y:-15},'start')

gsap.to('.section0', {
    backgroundPosition: `100% -20%`,
    lazy:false,
    scrollTrigger: {
        trigger: '.section0',
        start: "top top",
        end: "bottom top",
        scrub: true
    }
})
    }


    //section1
    if (document.querySelector(".section1")){
   gsap.from('.section1-h', {
        scrollTrigger: {
            trigger: '.section1',
            start:"10% bottom"
        },
        y: -100, opacity: 0, lazy:false,

    })
   gsap.utils.toArray(".section1-card-text").forEach((section, i) => {
         gsap.from(section, {
           opacity:0,
           delay:i/3,
           lazy:false,
           scrollTrigger: {
               trigger:".section1",
               start:"10% bottom"
           }, 
         });
       })

       gsap.utils.toArray(".section1-card-img").forEach((section, i) => {
         TweenMax.from(section, {
            yPercent:100,
            delay:i/3,
            lazy:false,
           scrollTrigger: {
               trigger:".section1",
               start:"30% bottom"
           }, 
         });
        })  
        gsap.utils.toArray(".section1-card").forEach((section, i) => {
            section.bg=section.querySelector(".section1-card-img")
          
            let  hover = gsap.to(section.bg, {scale:1.1, repeat:-1, yoyo:true, duration: 1, paused: true,});
    
            section.addEventListener("mouseenter", () => hover.play());
            section.addEventListener("mouseleave", () => hover.pause());
          
           })   
 

    //    let h1 = document.querySelector(".service-parallax1");
     
    } 

//section2
       if (document.querySelector(".section2")){
        gsap.from('.section2-h', {
            scrollTrigger: {
                trigger: '.section2',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.utils.toArray(".section2-slider").forEach((section, i) => {
          TweenMax.from(section, {
            opacity:0,
            yPercent:-50,
             delay:i/2,
             lazy:false,
            scrollTrigger: {
                trigger:".section2",
                start:"30% bottom"
            }, 
          });
        })
    }
       
//section3
//block3 animation
if (document.querySelector('.section3')){
    var tg=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
    tg.to(".index-seobservice-animate-1",{duration:1,delay:0.3, y:10},'start')
    tg.to(".index-seobservice-animate-2",{duration:1, y:15},'start')
    tg.to(".index-seobservice-animate-3",{duration:1, delay:0.3, y:18},'start')
    tg.to(".index-seobservice-animate-4",{duration:1, delay:0.1, y:-13},'start')
    tg.to(".index-seobservice-animate-5",{duration:1, delay:0.2, y:7},'start')


    gsap.utils.toArray(".section3-ul-li").forEach((section, i) => {
        gsap.from(section, {
          opacity:0,
          yPercent:-100,
           delay:i/3,
           lazy:false,
          scrollTrigger: {
              trigger:".section3-ul",
              start:"30% bottom"
          }, 
        });
      })

      gsap.from(".section3-text", {
        opacity:0,
        yPercent:-100,
         lazy:false,
        scrollTrigger: {
            trigger:".section3",
            start:"10% bottom"
        }, 
      });

      
      gsap.from(".section3-img", {
        opacity:0,
        xPercent:100,
         lazy:false,
        scrollTrigger: {
            trigger:".section3-img",
            start:"100% bottom",
            end:"+=400"
        }, 
      });
    }

    if (document.querySelector(".section4")){
        gsap.from('.section4-h', {
            scrollTrigger: {
                trigger: '.section4',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
            gsap.from(".section4-slider", {
              opacity:0,
              yPercent:-50,
               lazy:false,
              scrollTrigger: {
                  trigger:".section4",
                  start:"20% bottom"
              }, 
            });
          
    }

    if (document.querySelector(".section5")){
        gsap.from('.section5-h', {
            scrollTrigger: {
                trigger: '.section5',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.from('.section5-img', {
            scrollTrigger: {
                trigger: '.section5',
               start:"20% bottom",
           //     end:"+=1000"
            },
            y: 500, lazy:false, duration:3,
    
        })
    gsap.utils.toArray(".section5-ul-li").forEach((section, i) => {
        gsap.from(section, {
          opacity:0,
          yPercent:-100,
           delay:i/3,
           lazy:false,
          scrollTrigger: {
              trigger:".section5",
              start:"30% bottom"
          }, 
        });
      })


    }

    if (document.querySelector(".section6")){
        //block animation
var tr=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
tr.to(".index-form-bottom-left",{duration:2, y:-30, x:-30},'start')
tr.to(".index-form-bottom-right",{duration:2, y:40, x:25},'start')
tr.to(".index-form-bottom-down",{duration:2, y:0,x:30,},'start')

        gsap.from('.section6-h', {
            scrollTrigger: {
                trigger: '.section6',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.to('.section6-back', {
            backgroundPosition: `0 ${innerHeight / 2}px`,
            lazy:false,
            scrollTrigger: {
                trigger: '.section6',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        })
          
    }



    if (document.querySelector(".section7")){
        gsap.from('.section7-h', {
            scrollTrigger: {
                trigger: '.section7',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.utils.toArray(".section7-ul-li").forEach((section, i) => {
            gsap.from(section, {
              opacity:0,
              yPercent:-100,
               delay:i/3,
               lazy:false,
              scrollTrigger: {
                  trigger:".section7-ul",
                  start:"30% bottom"
              }, 
            });
          })
    
          
    }

    
    if (document.querySelector(".section8")){
        gsap.from('.section8-h', {
            scrollTrigger: {
                trigger: '.section8',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.utils.toArray(".section8-ul-li").forEach((section, i) => {
            gsap.from(section, {
             opacity:0,
           //   xPercent:-50,
               delay:i/3,
               scale:0.5,
               lazy:false,
              scrollTrigger: {
                  trigger:".section8-ul",
                  start:"10% bottom"
              }, 
            });
          })

          gsap.utils.toArray(".section8-ul-li").forEach((section, i) => {
            section.bg=section.querySelector(".section8-ul-img")
          
            let  hover = gsap.to(section.bg, {scale:1.1, repeat:-1, yoyo:true, duration: 1, paused: true,});
    
            section.addEventListener("mouseenter", () => hover.play());
            section.addEventListener("mouseleave", () => hover.pause());
          
           })  
    
          
    }

    
    if (document.querySelector(".section9")){
        //block animation
        gsap.from('.section9-h', {
            scrollTrigger: {
                trigger: '.section9',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.from('.section9-back', {
          //  backgroundPosition: `0 ${innerHeight / 10}px`,
          opacity:0,
            lazy:false,
            scrollTrigger: {
                trigger: '.section9',
                start: "100% bottom",
                end: "+=400",
                scrub: true
            }
        })   
    }

    if (document.querySelector(".section10")){
        gsap.from('.section10-h', {
            scrollTrigger: {
                trigger: '.section10',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.utils.toArray(".section10-ul-li").forEach((section, i) => {
            gsap.from(section, {
              opacity:0,
              yPercent:-100,
               delay:i/3,
               lazy:false,
              scrollTrigger: {
                  trigger:".section10-ul",
                  start:"30% bottom"
              }, 
            });
          })
    
          
    }

    
    if (document.querySelector(".section11")){
        gsap.from('.section11-h', {
            scrollTrigger: {
                trigger: '.section11',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
            gsap.from(".section11-ul-li1", {
              opacity:0,
             // yPercent:-100,
             scale:0.5,
            //   delay:i/3,
               lazy:false,
              scrollTrigger: {
                  trigger:".section11-ul-li1",
                  start:"10% bottom"
              }, 
            });    

            gsap.from(".section11-ul-li2", {
                opacity:0,
               // yPercent:-100,
               scale:0.5,
               //  delay:i/3,
                 lazy:false,
                scrollTrigger: {
                    trigger:".section11-ul-li2",
                    start:"10% bottom"
                }, 
              });  
          
    }

    if (document.querySelector(".section12")){
        gsap.from('.section12-h', {
            scrollTrigger: {
                trigger: '.section12',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.from('.section12-text', {
            scrollTrigger: {
                trigger: '.section12',
                start:"20% bottom"
            },
            y: -50, opacity: 0, lazy:false, delay:.2
    
        })
    
            gsap.from(".section12-ul", {
              opacity:0,
              yPercent:-100,
               delay:.4,
               lazy:false,
              scrollTrigger: {
                  trigger:".section12",
                  start:"30% bottom"
              }, 
            });
           
          gsap.from('.section12-img', {
            scrollTrigger: {
                trigger: '.section12',
                start:"40% bottom"
            },
            x: -100, opacity: 0, lazy:false, delay:.6
    
        })

    }
    if (document.querySelector(".section13")){
        gsap.from('.section13-h', {
            scrollTrigger: {
                trigger: '.section13',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.from('.section13-text', {
            scrollTrigger: {
                trigger: '.section13',
                start:"20% bottom"
            },
            y: -50, opacity: 0, lazy:false, delay:.2
    
        })
    
            gsap.from(".section13-ul", {
              opacity:0,
              yPercent:-100,
               delay:.4,
               lazy:false,
              scrollTrigger: {
                  trigger:".section13",
                  start:"30% bottom"
              }, 
            });
           
          gsap.from('.section13-img', {
            scrollTrigger: {
                trigger: '.section13',
                start:"40% bottom"
            },
            x: -100, opacity: 0, lazy:false, delay:.6
    
        })
    }

    if (document.querySelector(".section14")){
        gsap.from('.section14-h', {
            scrollTrigger: {
                trigger: '.section14',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
            gsap.from(".section14-ul-li1", {
              opacity:0,
             // yPercent:-100,
             scale:0.5,
            //   delay:i/3,
               lazy:false,
              scrollTrigger: {
                  trigger:".section14-ul-li1",
                  start:"10% bottom"
              }, 
            });    

            gsap.from(".section14-ul-li2", {
                opacity:0,
               // yPercent:-100,
               scale:0.5,
               //  delay:i/3,
                 lazy:false,
                scrollTrigger: {
                    trigger:".section14-ul-li2",
                    start:"10% bottom"
                }, 
              });  
          
    }

    if (document.querySelector(".section15")){
        var tr=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
        tr.to(".context-preference-animate-1",{duration:1, y:-10 },'start')
        tr.to(".context-preference-animate-2",{duration:1, y:10 },'start')
        tr.to(".context-preference-animate-3",{duration:1, scale:1.1},'start')

        
gsap.utils.toArray(".context-preference-back").forEach((section, i) => {
    //   section = document.querySelector(".index-seobservice-items-ul-li"); 
     gsap.to(section, {
      lazy:false,
       yPercent:-100,
      // opacity:0,
     //  ease: "circ",
       scrollTrigger: {
           trigger:".context-preference",
           start:"30% bottom",
           end:"300% bottom",
         scrub: true
       }, 
     });
  })

        gsap.from('.section15-h', {
            scrollTrigger: {
                trigger: '.section15',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.utils.toArray(".section15-ul-li").forEach((section, i) => {
            gsap.from(section, {
              opacity:0,
              yPercent:-100,
               delay:i/3,
               lazy:false,
              scrollTrigger: {
                  trigger:".section15-ul",
                  start:"30% bottom"
              }, 
            });
          })
    
        }
        
        if (document.querySelector(".section16")){
            gsap.from('.section16-h', {
                scrollTrigger: {
                    trigger: '.section16',
                    start:"10% bottom"
                },
                y: -100, opacity: 0, lazy:false,
        
            })
                gsap.from(".section16-ul-li1", {
                  opacity:0,
                 // yPercent:-100,
                 scale:0.5,
                //   delay:i/3,
                   lazy:false,
                  scrollTrigger: {
                      trigger:".section16-ul-li1",
                      start:"10% bottom"
                  }, 
                });    
    
                gsap.from(".section16-ul-li2", {
                    opacity:0,
                   // yPercent:-100,
                   scale:0.5,
                   //  delay:i/3,
                     lazy:false,
                    scrollTrigger: {
                        trigger:".section16-ul-li2",
                        start:"10% bottom"
                    }, 
                  });  
              
        }
        if (document.querySelector('.section17')){
            var tg=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
            tg.to(".index-seobservice-animate-1",{duration:1,delay:0.3, y:10},'start')
            tg.to(".index-seobservice-animate-2",{duration:1, y:15},'start')
            tg.to(".index-seobservice-animate-3",{duration:1, delay:0.3, y:18},'start')
            tg.to(".index-seobservice-animate-4",{duration:1, delay:0.1, y:-13},'start')
            tg.to(".index-seobservice-animate-5",{duration:1, delay:0.2, y:7},'start')
        
        }     
        if (document.querySelector('.section18')){
            var tl=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
tl.to(".index-seobservice-animate-28",{duration:1, y:20, ease:"sine"},'start')
tl.to(".index-seobservice-animate-29",{duration:1, y:-20},'start')
tl.to(".index-seobservice-animate-30",{duration:1, y:10},'start')
tl.to(".index-seobservice-animate-31",{duration:1, y:15},'start')
tl.to(".index-seobservice-animate-32",{duration:1, delay:0.3, y:18},'start')
tl.to(".index-seobservice-animate-33",{duration:1, delay:0.1, y:13},'start')
tl.to(".index-seobservice-animate-34",{duration:1, delay:0.2, y:7},'start')
tl.to(".index-seobservice-animate-35",{duration:1, delay:0.2, y:15},'start')
tl.to(".index-seobservice-animate-36",{duration:1,y:-15},'start')
tl.to(".index-seobservice-animate-37",{duration:1, delay:0.2, y:15},'start')
tl.to(".index-seobservice-animate-38",{duration:1,y:-15},'start')

            gsap.from('.section18-h', {
                scrollTrigger: {
                    trigger: '.section18',
                    start:"10% bottom"
                },
                y: -100, opacity: 0, lazy:false,
        
            })
            gsap.from('.section18-p', {
                scrollTrigger: {
                    trigger: '.section18',
                    start:"20% bottom"
                },
                y: -50, opacity: 0, lazy:false, delay:.2
        
            })
        
                gsap.from(".section18-btn", {
                  opacity:0,
                  yPercent:-100,
                   delay:.4,
                   lazy:false,
                  scrollTrigger: {
                      trigger:".section18",
                      start:"30% bottom"
                  }, 
                });
               
              gsap.from('.section18-img', {
                scrollTrigger: {
                    trigger: '.section18-img',
                    start:"20% bottom"
                },
                x: -100, opacity: 0, lazy:false, 
        
            })
        
        }          

        if (document.querySelector(".section19")){
           
            gsap.utils.toArray(".section19-text").forEach((section, i) => {
                  gsap.from(section, {
                    opacity:0,
                    delay:i/3,
                    lazy:false,
                    scrollTrigger: {
                        trigger:".section19",
                        start:"10% bottom"
                    }, 
                  });
                })
                gsap.utils.toArray(".section19-text2").forEach((section, i) => {
                    gsap.from(section, {
                      opacity:0,
                      delay:i/3,
                      lazy:false,
                      scrollTrigger: {
                          trigger:".section19",
                          start:"10% bottom"
                      }, 
                    });
                  })
         
                gsap.utils.toArray(".section19-img").forEach((section, i) => {
                  TweenMax.from(section, {
                     yPercent:100,
                     delay:i/3,
                     lazy:false,
                    scrollTrigger: {
                        trigger:".section19",
                        start:"30% bottom"
                    }, 
                  });
             
                })  
                gsap.utils.toArray(".section19-ul-li").forEach((section, i) => {
                    section.bg=section.querySelector(".section19-img")
                  
                    let  hover = gsap.to(section.bg, {scale:1.1, repeat:-1, yoyo:true, duration: 1, paused: true,});
            
                    section.addEventListener("mouseenter", () => hover.play());
                    section.addEventListener("mouseleave", () => hover.pause());
                  
                   })   
           
             } 


             if (document.querySelector(".section20")){
                gsap.from('.section20-h', {
                    scrollTrigger: {
                        trigger: '.section20',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                gsap.utils.toArray(".section20-slider").forEach((section, i) => {
                  TweenMax.from(section, {
                    opacity:0,
                    yPercent:-50,
                     delay:i/2,
                     lazy:false,
                    scrollTrigger: {
                        trigger:".section20",
                        start:"30% bottom"
                    }, 
                  });
                })
            }

            if (document.querySelector(".section21")){
                gsap.from('.section21-h', {
                    scrollTrigger: {
                        trigger: '.section21',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                gsap.utils.toArray(".section21-ul-li").forEach((section, i) => {
                    gsap.from(section, {
                     opacity:0,
                   //   xPercent:-50,
                       delay:i/3,
                       scale:0.5,
                       lazy:false,
                      scrollTrigger: {
                          trigger:".section21-ul",
                          start:"10% bottom"
                      }, 
                    });
                  })
            
                  
            }

            if (document.querySelector(".section22")){
                gsap.from('.section22-h', {
                    scrollTrigger: {
                        trigger: '.section22',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                gsap.from('.section22-img', {
                    scrollTrigger: {
                        trigger: '.section22',
                       start:"20% bottom",
                   //     end:"+=1000"
                    },
                    y: 500, lazy:false, duration:3,
            
                })
            gsap.utils.toArray(".section22-ul-li").forEach((section, i) => {
                gsap.from(section, {
                  opacity:0,
                  yPercent:-100,
                   delay:i/3,
                   lazy:false,
                  scrollTrigger: {
                      trigger:".section22",
                      start:"30% bottom"
                  }, 
                });
              })
        
        
            }

            if (document.querySelector(".section23")){
                gsap.from('.section23-h', {
                    scrollTrigger: {
                        trigger: '.section23',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                gsap.utils.toArray(".section23-ul-li").forEach((section, i) => {
                    gsap.from(section, {
                      opacity:0,
                      yPercent:-100,
                       delay:i/3,
                       lazy:false,
                      scrollTrigger: {
                          trigger:".section23-ul",
                          start:"30% bottom"
                      }, 
                    });
                  })
            
                  
            }
            if (document.querySelector('.section24')){
                var tg=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
                tg.to(".index-seobservice-animate-1",{duration:1,delay:0.3, y:10},'start')
                tg.to(".index-seobservice-animate-2",{duration:1, y:15},'start')
                tg.to(".index-seobservice-animate-3",{duration:1, delay:0.3, y:18},'start')
                tg.to(".index-seobservice-animate-4",{duration:1, delay:0.1, y:-13},'start')
                tg.to(".index-seobservice-animate-5",{duration:1, delay:0.2, y:7},'start')

                
            
            }   
            if (document.querySelector('.section25')){
            gsap.from('.section25-h', {
                scrollTrigger: {
                    trigger: '.section25',
                    start:"10% bottom"
                },
                y: -100, opacity: 0, lazy:false,
        
            })
            gsap.utils.toArray(".section25-ul-li").forEach((section, i) => {
                gsap.from(section, {
                    opacity:0,
                    //   xPercent:-50,
                     //  delay:i/3,
                        scale:0.5,
                   lazy:false,
                  scrollTrigger: {
                      trigger:section,
                      start:"10% bottom"
                  }, 
                });
              })
            }

            if (document.querySelector(".section26")){
                var tt=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
                tt.to(".index-seobservice-animate-26",{duration:1,delay:0.3, y:-10},'start')
                tt.to(".index-seobservice-animate-27",{duration:1, y:15},'start')
            }
         
            if (document.querySelector(".section27")){
                gsap.from('.section27-h', {
                    scrollTrigger: {
                        trigger: '.section27',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                gsap.utils.toArray(".section27-p").forEach((section, i) => {
                    gsap.from(section, {
                      opacity:0,
                      yPercent:-20,
                       delay:i/3,
                       lazy:false,
                      scrollTrigger: {
                          trigger:".section27",
                          start:"30% bottom"
                      }, 
                    });
                  })
            
                  
            }   

            if (document.querySelector(".section28")){
                gsap.from('.section28-h', {
                    scrollTrigger: {
                        trigger: '.section28',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
            gsap.utils.toArray(".section28-ul-li").forEach((section, i) => {
                gsap.from(section, {
                  opacity:0,
                  yPercent:-100,
                   delay:i/3,
                   lazy:false,
                  scrollTrigger: {
                      trigger:".section28",
                      start:"30% bottom"
                  }, 
                });
              })
        
        
            }


            
            if (document.querySelector(".section29")){
                gsap.from('.section29-h', {
                    scrollTrigger: {
                        trigger: '.section29',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                    gsap.from('.section29-p', {
                        scrollTrigger: {
                            trigger: '.section29',
                            start:"10% bottom"
                        },
                        y: -100, opacity: 0, lazy:false, delay:.3
                
                    })

                    gsap.from(".section29-img", {
                        opacity:0,
                        xPercent:100,
                         lazy:false,
                         delay:.6,
                        scrollTrigger: {
                            trigger:".section29-img",
                            start:"10% bottom",
                            end:"+=400"
                        }, 
                      });
        
        
            }

            if (document.querySelector(".section30")){
                gsap.from('.section30-h', {
                    scrollTrigger: {
                        trigger: '.section30',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                gsap.from('.section30-img', {
                    scrollTrigger: {
                        trigger: '.section30',
                       start:"20% bottom",
                   //     end:"+=1000"
                    },
                    y: 500, lazy:false, duration:3,
            
                })
            gsap.utils.toArray(".section30-ul-li").forEach((section, i) => {
                gsap.from(section, {
                  opacity:0,
                  yPercent:-100,
                   delay:i/3,
                   lazy:false,
                  scrollTrigger: {
                      trigger:".section30",
                      start:"30% bottom"
                  }, 
                });
              })
        
        
            }

            if (document.querySelector(".section31")){
                gsap.from('.section31-h', {
                    scrollTrigger: {
                        trigger: '.section31',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
        
            gsap.utils.toArray(".section31-ul-li").forEach((section, i) => {
                gsap.from(section, {
                  opacity:0,
                  yPercent:-100,
                   delay:i/3,
                   lazy:false,
                  scrollTrigger: {
                      trigger:".section31",
                      start:"30% bottom"
                  }, 
                });
              })
            }

            if (document.querySelector(".section32")){
                var tu=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
                tu.to(".index-seobservice-animate-15",{duration:1, x:20, ease:"sine"},'start')
                tu.to(".index-seobservice-animate-16",{duration:1, x:-20},'start')
                tu.to(".index-seobservice-animate-17",{duration:1, y:10},'start')
                tu.to(".index-seobservice-animate-18",{duration:1, y:15},'start')
                tu.to(".index-seobservice-animate-19",{duration:1, delay:0.3, y:18},'start')
                tu.to(".index-seobservice-animate-20",{duration:1, delay:0.1, y:13},'start')
                tu.to(".index-seobservice-animate-21",{duration:1, delay:0.2, y:3},'start')
                tu.to(".index-seobservice-animate-22",{duration:1, delay:0.2, y:15},'start')
                tu.to(".index-seobservice-animate-23",{duration:1,y:15},'start')
                tu.to(".index-seobservice-animate-24",{duration:1, x:20, ease:"sine"},'start')
            }

            if (document.querySelector(".section33")){
                gsap.from('.section33-h', {
                    scrollTrigger: {
                        trigger: '.section33',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                gsap.utils.toArray(".section33-p").forEach((section, i) => {
                    gsap.from(section, {
                      opacity:0,
                      yPercent:-20,
                       delay:i/3,
                       lazy:false,
                      scrollTrigger: {
                          trigger:".section33",
                          start:"30% bottom"
                      }, 
                    });
                  })
            }   

            
            if (document.querySelector(".section34")){
                gsap.from('.section34-h', {
                    scrollTrigger: {
                        trigger: '.section34',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
                gsap.utils.toArray(".section34-p").forEach((section, i) => {
                    gsap.from(section, {
                      opacity:0,
                      yPercent:-20,
                       delay:i/3,
                       lazy:false,
                      scrollTrigger: {
                          trigger:".section34",
                          start:"30% bottom"
                      }, 
                    });
                  })
            }   

            
            if (document.querySelector(".section35")){
                gsap.from('.section35-h', {
                    scrollTrigger: {
                        trigger: '.section35',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
        
            gsap.utils.toArray(".section35-ul-li").forEach((section, i) => {
                gsap.from(section, {
                  opacity:0,
                  yPercent:-100,
                   delay:i/3,
                   lazy:false,
                  scrollTrigger: {
                      trigger:".section35",
                      start:"30% bottom"
                  }, 
                });
              })
            }

            if (document.querySelector(".section36")){
                var tg=gsap.timeline({repeat:-1, yoyo:true, ease:"none"})
                tg.to(".index-seobservice-animate-6",{duration:1,delay:0.3, y:10},'start')
                tg.to(".index-seobservice-animate-7",{duration:1, y:15},'start')
                tg.to(".index-seobservice-animate-8",{duration:1, delay:0.3, y:18},'start')
                tg.to(".index-seobservice-animate-9",{duration:1, delay:0.1, y:-13},'start')
                tg.to(".index-seobservice-animate-10",{duration:1, delay:0.2, y:7},'start')
                tg.to(".index-seobservice-animate-11",{duration:1, y:15},'start')
                tg.to(".index-seobservice-animate-12",{duration:1, delay:0.3, y:18},'start')
                tg.to(".index-seobservice-animate-13",{duration:1, delay:0.1, y:-13},'start')
                tg.to(".index-seobservice-animate-14",{duration:1, delay:0.2, y:7},'start')              
                tg.to(".about-exp-animation-1",{duration:1,delay:0.3, y:10},'start')
                tg.to(".about-exp-animation-3",{duration:1, y:15},'start')
                tg.to(".about-exp-animation-4",{duration:1, delay:0.3, y:18},'start')
                tg.to(".about-exp-animation-5",{duration:1, delay:0.1, y:-13},'start')
                
            }

            if (document.querySelector(".section37")){
                gsap.from('.section37-h', {
                    scrollTrigger: {
                        trigger: '.section37',
                        start:"10% bottom"
                    },
                    y: -100, opacity: 0, lazy:false,
            
                })
            gsap.utils.toArray(".section37-ul-li").forEach((section, i) => {
                gsap.from(section, {
                  opacity:0,
                  yPercent:-100,
                   delay:i/3,
                   lazy:false,
                  scrollTrigger: {
                      trigger:".section37",
                      start:"30% bottom"
                  }, 
                });
              })
        
        
            }

            if (document.querySelector(".section38")){
                gsap.from('.section38-h', {
                     scrollTrigger: {
                         trigger: '.section38',
                         start:"10% bottom"
                     },
                     y: -100, opacity: 0, lazy:false,
             
                 })
                gsap.utils.toArray(".section38-text").forEach((section, i) => {
                      gsap.from(section, {
                        opacity:0,
                        delay:i/3,
                        lazy:false,
                        scrollTrigger: {
                            trigger:".section38",
                            start:"10% bottom"
                        }, 
                      });
                    })
             
                    gsap.utils.toArray(".section38-img").forEach((section, i) => {
                      TweenMax.from(section, {
                         yPercent:100,
                         delay:i/3,
                         lazy:false,
                        scrollTrigger: {
                            trigger:".section38",
                            start:"30% bottom"
                        }, 
                      });
                      gsap.utils.toArray(".section38-card").forEach((section, i) => {
                        section.bg=section.querySelector(".section38-img")
                      
                        let  hover = gsap.to(section.bg, {scale:1.1, repeat:-1, yoyo:true, duration: 1, paused: true,});
                
                        section.addEventListener("mouseenter", () => hover.play());
                        section.addEventListener("mouseleave", () => hover.pause());
                      
                       })
                    })   
               
                 } 

                 

    if (document.querySelector(".section39")){
        gsap.from('.section39-h', {
            scrollTrigger: {
                trigger: '.section39',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.from('.section39-p', {
            scrollTrigger: {
                trigger: '.section39',
                start:"20% bottom"
            },
            y: -50, opacity: 0, lazy:false, delay:.3
    
        })
        gsap.from('.section39-btn', {
            scrollTrigger: {
                trigger: '.section39',
                start:"20% bottom"
            },
            y: -50, opacity: 0, lazy:false, delay:.6
    
        })
    
          gsap.from('.section39-img', {
            scrollTrigger: {
                trigger: '.section39',
                start:"40% bottom"
            },
            x: -100, opacity: 0, lazy:false, delay:.9
    
        })
    }

    if (document.querySelector(".section40")){
        gsap.from('.section40-h', {
            scrollTrigger: {
                trigger: '.section40',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
    gsap.utils.toArray(".section40-ul-li").forEach((section, i) => {
        gsap.from(section, {
          opacity:0,
          yPercent:-100,
           delay:i/3,
           lazy:false,
          scrollTrigger: {
              trigger:".section40",
              start:"0% bottom"
          }, 
        });
      })


    }

    if (document.querySelector(".section41")){
        gsap.from('.section41-h', {
            scrollTrigger: {
                trigger: '.section41',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
        gsap.from('.section41-p', {
            scrollTrigger: {
                trigger: '.section41',
                start:"10% bottom"
            },
            y: -100, opacity: 0, lazy:false,
    
        })
    gsap.utils.toArray(".section41-ul-li").forEach((section, i) => {
        gsap.from(section, {
          opacity:0,
          yPercent:-100,
           delay:i/3,
           lazy:false,
          scrollTrigger: {
              trigger:".section41",
              start:"30% bottom"
          }, 
        });
      })


    }     
})



//phone autoform

  function regular() {
    let pattern = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;
    document.querySelector("#viewport").innerHTML = document.querySelector("#viewport").innerHTML.replace(pattern, '+7($2)$3-$4-$5');
}
if((!document.querySelector(".contacts-map"))){
regular();
}

  //phone mask for form
  var phoneInput = document.querySelectorAll('.phone')
  phoneInput.forEach(el =>
  el.addEventListener('keydown', function(event) {
     if( !(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
      var mask = '+7 (111) 111-11-11'; // Задаем маску
      if (/[0-9\+\ \-\(\)]/.test(event.key)) {
          // Здесь начинаем сравнивать this.value и mask
          // к примеру опять же
          var currentString = this.value;
          var currentLength = currentString.length;
          if (/[0-9]/.test(event.key)) {
              if (mask[currentLength] == '1') {
                  this.value = currentString + event.key;
              } else {
                  for (var i=currentLength; i<mask.length; i++) {
                  if (mask[i] == '1') {
                      this.value = currentString + event.key;
                      break;
                  }
                  currentString += mask[i];
                  }
              }
          }
      } 
  }));
  
/*
  function paralax() {
      
    // Contains the items you want to parallax.
    var parallaxContainers = document.querySelectorAll('.parallax-container');
    [].forEach.call(parallaxContainers, function(parallaxContainer){
    // The elements you want to parallax.
    var parallaxItems = document.getElementsByClassName('parallax');
    
    // Use this value to adjust the amount of parallax in response to mouse movement.
    var fixer = 0.0030;
    
    parallaxContainer.addEventListener("mousemove", function(event){
        
        // get the mouseX - negative on left, positive on right
        var pageX =  event.pageX - (parallaxContainer.getBoundingClientRect().width * 0.5);
        
        // same here, get the y. use console.log(pageY) to see the values
        var pageY =  event.pageY - (parallaxContainer.getBoundingClientRect().height * 0.5);  

        
        for (let i = 0; i < parallaxItems.length; i++) {
            var item = parallaxItems[i];
            var speedX = item.getAttribute("data-speed-x");
            var speedY = item.getAttribute("data-speed-y");
            
            // Instead of using 'TweenLite.set' you can use 'TweenLite.to' which results in a smoother initial transition (when the mouse enters) at the cost of some preformance. 
            // Change the '+' to '-' if you want to invert the parallax motion in relation to the mouse movement.
            TweenLite.set(item, {
                x: (item.offsetLeft + pageX * speedX ) * fixer,
                y: (item.offsetTop + pageY * speedY) * fixer
            });
        }
    });
})
};
if (innerWidth>=768){
paralax();
}*/