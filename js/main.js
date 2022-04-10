
/*----------------- navigation menu --------------------*/

(() =>{
  
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
  navMenu = document.querySelector(".nav-menu"),
  closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu(){
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu(){
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect(){
  	document.querySelector(".fade-out-effect").classList.add("active");
  	setTimeout(() =>{
      document.querySelector(".fade-out-effect").classList.remove("active");
  	},300)
  }

})();

function bodyScrollingToggle(){
  document.body.classList.toggle("hidden-scrolling");
}

/*-------------------Art shows FAQ--------------------*/
(() =>{
    let toggles = document.getElementsByClassName('toggle');
    let contentDiv = document.getElementsByClassName('content');
    let icons = document.getElementsByClassName('icon');

    for(let i=0; i<toggles.length; i++){
        toggles[i].addEventListener('click', ()=>{
            if( parseInt(contentDiv[i].style.height) != contentDiv[i].scrollHeight){
                contentDiv[i].style.height = contentDiv[i].scrollHeight + "px";
                icons[i].classList.remove('fa-plus');
                icons[i].classList.add('fa-minus');
            }
            else{
                contentDiv[i].style.height = "0px";
                icons[i].classList.remove('fa-minus');
                icons[i].classList.add('fa-plus');
            }

            for(let j=0; j<contentDiv.length; j++){
                if(j!==i){
                    contentDiv[j].style.height = "0px";
                    icons[j].classList.remove('fa-minus');
                    icons[j].classList.add('fa-plus');
                }
            }
        });
    }
})();


 


/*---------------- art filter and popup -------------------*/ 

(() =>{
     
  const filterContainer = document.querySelector(".art-filter"),
  artItemsContainer = document.querySelector(".art-items"),
  artItems = document.querySelectorAll(".art-item"),
  popup = document.querySelector(".art-popup"),
  prevBtn = popup.querySelector(".pp-prev"),
  nextBtn = popup.querySelector(".pp-next"),
  closeBtn = popup.querySelector(".pp-close"),
  projectDetailsContainer = popup.querySelector(".pp-details"),
  projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  /* filter art items*/
  filterContainer.addEventListener("click", (event)=>{
    if(event.target.classList.contains("filter-item") && 
      !event.target.classList.contains("active")){
       // deactivate existing active 'filter-item'
       filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
       // activate new 'filter item'
       event.target.classList.add("active","outer-shadow");
       const target = event.target.getAttribute("data-target");
       artItems.forEach((item) =>{
        if(target === item.getAttribute("data-category") || target === 'all'){
            item.classList.remove("hide");
            item.classList.add("show");
        }
        else{
            item.classList.remove("show");
            item.classList.add("hide");
        }
       }) 
    }
  })

  artItemsContainer.addEventListener("click", (event) =>{
    if(event.target.closest(".art-item-inner")){
       const artItem = event.target.closest(".art-item-inner").parentElement;
       // get the artItem index
       itemIndex = Array.from(artItem.parentElement.children).indexOf(artItem);
       screenshots = artItems[itemIndex].querySelector(".art-item-img img").getAttribute("data-screenshots");
       // convert screenshots into array
       screenshots = screenshots.split(",");
       if(screenshots.length === 1){
           prevBtn.style.display="none";
           nextBtn.style.display="none";
       }
       else{
          prevBtn.style.display="block";
          nextBtn.style.display="block";
       }
       slideIndex = 0;
       popupToggle();
       popupSlide();
       popupDetails();
    }
  })

  closeBtn.addEventListener("click", () =>{
    popupToggle();
    if(projectDetailsContainer.classList.contains("active")){
      popupDetailsToggle();
    }
  })

  function popupToggle(){
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlide(){
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    /*activate loader until the popupImg loaded */
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src=imgSrc;
    popupImg.onload = () =>{
      // deactivate loader after the popupImg loaded
      popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
  }



  function popupDetails(){
     // if art-item-details not exists
     if(!artItems[itemIndex].querySelector(".art-item-details")){
         projectDetailsBtn.style.display="none";
         return; /*end function execution*/
     }
     projectDetailsBtn.style.display="block";
    // get the project details
    const details = artItems[itemIndex].querySelector(".art-item-details").innerHTML;
    // set the project details
    popup.querySelector(".pp-project-details").innerHTML = details;
    // get the project title
    const title = artItems[itemIndex].querySelector(".art-item-title").innerHTML;
    // set the project title
    popup.querySelector(".pp-title h2").innerHTML = title;
    // get the project category
    const category = artItems[itemIndex].getAttribute("data-category");
    // set the project category
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
  }
  
  projectDetailsBtn.addEventListener("click",() =>{
    popupDetailsToggle();
  })

  function popupDetailsToggle(){
    if(projectDetailsContainer.classList.contains("active")){
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px"
    }
    else{
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
       projectDetailsContainer.classList.add("active");
       projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
       popup.scrollTo(0,projectDetailsContainer.offsetTop);
    }
  }

})();
