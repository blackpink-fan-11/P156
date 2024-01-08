AFRAME.registerComponent("game-play",{
    schema:{
      elementId:{type:"string",default:"#coin1"}
    },
    update:function(){
        this.isCollided(this.data.elementId)
    },
    init: function () {
        var duration = 100;
        const timerEl = document.querySelector("#timer");
        this.startTimer(duration, timerEl);
      },
    startTimer: function (duration, timerEl) {
        var minutes;
        var seconds;
    
        setInterval(()=> {
          if (duration >=0) {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
    
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
    
            timerEl.setAttribute("text", {
              value: minutes + ":" + seconds,
            });
    
            duration -= 1;
          } 
          else {
            this.gameOver();        
          }
        },1000)
      },
    isCollided:function(elementId){
        const element = document.querySelector(elementId);
        element.addEventListener("collide", (e) =>{
            if (elementId.includes("#coin")) {
                element.setAttribute("visible",false);
                 console.log("ring collision"); 
                } 
            
            if (elementId.includes("#fish")) {
                 console.log("fish collision"); 
                }     
        })
    },
    updateScore: function () {
        var element = document.querySelector("#score");
        var count = element.getAttribute("text").value;
        var currentScore = parseInt(count);
        currentScore += 70;
        element.setAttribute("text", {
          value: currentScore,
        });
      },
      gameOver: function () {
        var planeEl = document.querySelector("#plane_model");
        var element = document.querySelector("#game_over_text");
        element.setAttribute("visible", true);
        planeEl.setAttribute("dynamic-body", {
          mass: 1
        });
      },
})