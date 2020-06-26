function imgCarousel(){

  current_pos = 0;
  this.old_pos = 0;
  
  /* Get all requisite elements */
  this.container = document.getElementsByClassName("carousel-container")[0];
  this.wrapper = document.getElementsByClassName("carousel-image-wrapper")[0];
  this.image_list = this.wrapper.getElementsByTagName("img");
  this.but_prev = document.getElementById('button-prev');
  this.but_next = document.getElementById('button-next');
  
  /* next and previous */
  this.but_prev.addEventListener("click", function(){
    pointer.slidePrev()
  });
  

  this.but_next.addEventListener("click", function(){
    pointer.slideNext();
  });
  
    
  var pointer = this;
  this.speed = pointer.container.clientWidth/20;
  
  /* add all images to list  */
  for (i=0; i<this.image_list.length; i++){
    this.image_list[i].style.width = this.container.clientWidth+'px';
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
    navBulletDiv.style.float = 'left';
    navBulletDiv.style.borderRadius = '50%';
    navBulletDiv.style.height = '15px';
    navBulletDiv.style.width = '15px';
    navBulletDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    navBulletDiv.style.margin = '2px';
    navBulletDiv.addEventListener('click', function(){
      pointer.goTo(page);
    });
    pointer.navigationContainer.appendChild(navBulletDiv);

  }
  
  for (var i=0; i<this.image_list.length; i++){
    this.generateBullet(i);
  }
  
  
  
  this.navigationContainer.style.left = 'calc(50% - '+(this.navigationContainer.clientWidth / 2)+'px)';


  this.slideNext = function(){
    pointer.old_pos = current_pos;
    current_pos = (current_pos - pointer.container.clientWidth)%pointer.wrapper.clientWidth;
    pointer.changeAnimation();
  }

  this.slidePrev = function(){
    pointer.old_pos = current_pos;
    current_pos = current_pos + pointer.container.clientWidth;
    if (current_pos > 0){
      current_pos = -(pointer.wrapper.clientWidth - pointer.container.clientWidth);
    }
    pointer.changeAnimation();
  }

  this.goTo = function(page){
    pointer.old_pos = current_pos;
    current_pos = -page * pointer.container.clientWidth;
    console.log(current_pos)
    pointer.changeAnimation();
  }





  this.changeAnimation = function(){
    
    pointer.velocity = pointer.container.clientWidth/20;
    if (Math.abs(pointer.old_pos - current_pos) > pointer.container.clientWidth)
      pointer.velocity = pointer.velocity * pointer.image_list.length;

    function move(){
      if (Math.abs(pointer.old_pos - current_pos)<pointer.velocity){
        pointer.wrapper.style.left = current_pos+'px';
        pointer.old_pos = current_pos;
      }
      else if (pointer.old_pos > current_pos)
        pointer.old_pos = pointer.old_pos - pointer.velocity;
      else
        pointer.old_pos = pointer.old_pos + pointer.velocity;
      pointer.wrapper.style.left = pointer.old_pos+'px';
      
      if (pointer.old_pos != current_pos)
        window.requestAnimationFrame(move);
      
    }
    window.requestAnimationFrame(move);
    window.cancelAnimationFrame(pointer);
  }
}



/* need at least one instance, of course */
new imgCarousel();
