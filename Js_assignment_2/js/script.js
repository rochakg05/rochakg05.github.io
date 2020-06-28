function filterNonChildren(container_node, array) {
    var new_list = [];
    
    for (var i = 0; i < array.length; i++) {
        if (container_node.contains(array[i])) {
            new_list.push(array[i]);
        }   
    }
    
    //console.log(new_list);
    return new_list;

}

function imgCarousel( index ){

  this.current_pos = 0;
  this.old_pos = 0;
  this.auto_scroll_speed = 3000; // every two seconds
  this.speed_fact = 15;
  var pointer = this;
  this.buttons = []
  this.interval_id = 0;
  this.input_field = document.getElementsByClassName("input-wait-time")[index];
  
  var lightColor = 'rgba(157, 218, 114, 0.6)';
  var darkColor = 'rgba(72, 117, 40, 0.8)';
  
    /* Get all requisite elements */
    /* getElementsByClassName is guaranteed to give an HTMLCollection in document order */
  this.container = document.getElementsByClassName("carousel-container")[index];
  this.wrapper = document.getElementsByClassName("carousel-image-wrapper")[index];
  var img_list = this.wrapper.getElementsByTagName("img");
 
  
  this.but_prev = document.getElementsByClassName('button-prev')[index];
  this.but_next = document.getElementsByClassName('button-next')[index];
  
  // only get images within this container 
  this.image_list = filterNonChildren(this.container, img_list);



  
  /* next and previous */
  this.but_prev.addEventListener("click", function(){
    pointer.slidePrev()
  });
  

  this.but_next.addEventListener("click", function(){
    pointer.slideNext();
  });
  
    
  this.speed = pointer.container.clientWidth/20;
  
  /* add all images to list  */
  for (i=0; i<this.image_list.length; i++){
    this.image_list[i].style.width = this.container.clientWidth+'px';
    this.image_list[i].style.height = this.container.clientHeight+'px';
    this.image_list[i].style.float = 'left';
  }


  this.wrapper.style.width = this.container.clientWidth * this.image_list.length +'px';
  this.wrapper.style.height = 100+'%';
  this.wrapper.style.position = 'absolute';
  this.wrapper.style.left = 0;



  this.navigationContainer = document.createElement('div');
  this.navigationContainer.style.position = "absolute";
  this.navigationContainer.style.bottom = 0;
  this.navigationContainer.style.height = '8%';
  this.container.appendChild(this.navigationContainer);



  this.generateBullet= function(page){
    navBulletDiv = document.createElement('div');
    navBulletDiv.className = 'carousel-bullet';
    navBulletDiv.style.float = 'left';
    navBulletDiv.style.borderRadius = '50%';
    navBulletDiv.style.height = '15px';
    navBulletDiv.style.width = '15px';
    navBulletDiv.style.backgroundColor = 'rgba(157, 218, 114, 0.6)';
    navBulletDiv.style.margin = '2px';
    navBulletDiv.addEventListener('click', function(){
      pointer.goTo(page);
    });
    pointer.navigationContainer.appendChild(navBulletDiv);
    this.buttons.push(navBulletDiv);

  }
  
  for (var i=0; i<this.image_list.length; i++){
    this.generateBullet(i);
  }
  

  
  
  this.navigationContainer.style.left = 'calc(50% - '+(this.navigationContainer.clientWidth / 2)+'px)';


  this.slideNext = function(){
    pointer.old_pos = pointer.current_pos;
    // e.g. current_pos = -600 (2nd image), container.clientWidth = 600 , wrapper.clientWidth = 1800 ( 3 images )
    // current_pos = (-600 - 600) % 1800 = -1200 % 1800 = -1200; //3rd image offset
    console.log("pointer.wrapper.clientWidth = " + pointer.wrapper.clientWidth);
    pointer.current_pos = (pointer.current_pos - pointer.container.clientWidth) % pointer.wrapper.clientWidth;
    pointer.changeAnimation();
  }

  this.slidePrev = function(){
    pointer.old_pos = pointer.current_pos;
    // increase current 'x' b one width i.e. go to next image
    pointer.current_pos = pointer.current_pos + pointer.container.clientWidth;
    if (pointer.current_pos > 0){
      pointer.current_pos = -(pointer.wrapper.clientWidth - pointer.container.clientWidth);
    }
    pointer.changeAnimation();
  }

  this.goTo = function(page){
    pointer.old_pos = pointer.current_pos;
    pointer.current_pos = -page * pointer.container.clientWidth;
    pointer.changeAnimation();
  }



  this.resetButtons = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].style.backgroundColor = 'rgba(157, 218, 114, 0.6)';
    }
  }
  
  this.hoverAppropriateButton = function() {
     var reqIndex = Math.abs(pointer.current_pos / pointer.container.clientWidth);
     this.buttons[reqIndex].style.backgroundColor = darkColor;
  }

  this.changeAnimation = function(){
  
    pointer.resetButtons();
    pointer.hoverAppropriateButton();
    
    var userValue = Number(pointer.input_field.value) * 1000;
    
    if (userValue != pointer.auto_scroll_speed) {
        pointer.auto_scroll_speed =  userValue;
        clearInterval(this.interval_id);
        this.interval_id = setInterval(pointer.slideNext, pointer.auto_scroll_speed);
    }
    
    pointer.velocity = pointer.container.clientWidth/pointer.speed_fact;
    
    // if the difference is an entire window-width, 
    /*
    if (Math.abs(pointer.old_pos - pointer.current_pos) > pointer.container.clientWidth)
      pointer.velocity = pointer.velocity * pointer.image_list.length;
    */
    //update function
    function update(){
     // Case: difference smaller than frame speed
      if (Math.abs(pointer.old_pos - pointer.current_pos) < pointer.velocity){
        pointer.wrapper.style.left = pointer.current_pos+'px';
        pointer.old_pos = pointer.current_pos;
     // Case: moving to next image (in process)
      } else if (pointer.old_pos > pointer.current_pos) {
        pointer.old_pos -= pointer.velocity;
      // Case: moving to previous image (in process)
      } else {
        pointer.old_pos += pointer.velocity;
      }
      // set appropriate position for container
      pointer.wrapper.style.left = pointer.old_pos+'px';
      
      // redraw on change
      if (pointer.old_pos != pointer.current_pos)
        window.requestAnimationFrame(update);
      
    }
    window.requestAnimationFrame(update);
    window.cancelAnimationFrame(pointer);
  }
    
    // set initial button highlighting
    this.buttons[0].style.backgroundColor = darkColor;
    this.interval_id = setInterval(this.slideNext, this.auto_scroll_speed);

}



var carouselList = []
var numDivs = document.getElementsByClassName("carousel-container").length;
var currentMode = 'tablet';

function deleteAll()
{
    for (var i = 0; i < numDivs; i++) {
        delete carouselList[i];
    }
}

function recreateAll() {
    /* create carousel instances for each toplevel container */
    for (var ind = 0; ind < numDivs; ind++) {
        var myCarousel = new imgCarousel(ind)
        carouselList.push(myCarousel);
        
        //config stuff
        myCarousel.speed_fact = 20;   // slide transition

    }

}
recreateAll();

carouselList[1].speed_fact = 50;
carouselList[1].auto_scroll_speed = 5000;
setInterval(carouselList[1].slideNext, carouselList[1].auto_scroll_speed);
setInterval(carouselList[0].slideNext, carouselList[0].auto_scroll_speed);



function checkResponsiveAdjustment()
{
    var mode = '';
    if (screen.width >= 320 && screen.width < 768) {
        mode = 'phone'; 
    } else if (screen.width >= 768) {
        mode = 'tablet';
    }
    
    if (mode == currentMode) {
        return; // no change required
    }
    
    currentMode = mode;
    deleteAll();
    recreateAll();
}


setInterval(checkResponsiveAdjustment, 500);

