/*---------------- Modern art lightbox -------------------*/ 

$(document).ready(function () {
    // set lightbox img max height
    const wHeight = $(window).height();
    $(".lightbox-img").css("max-height",wHeight+"px");
  
    // lightbox 
    $(".modernart-item-inner").click(function(){
      index = $(this).parent(".modernart-item").index();
      $(".lightbox").addClass("open");
      lightboxSlideShow();
    })

    // close lightbox 
    $(".lightbox-close").click(function(){
      $(".lightbox").removeClass("open");
    })
  
    // close lightbox when clicked outside of img-box 
      $(".lightbox").click(function(event){
        if($(event.target).hasClass("lightbox")){
          $(this).removeClass("open");
        }
      })
  })
  
  function lightboxSlideShow(){
    const imgSrc = $(".modernart-item").eq(index).find("img").attr("data-large");
    const category = $(".modernart-item").eq(index).find("h4").html();
    $(".lightbox-img").attr("src",imgSrc);
    $(".lightbox-category").html(category)
  }
  

  
  
  
  
  