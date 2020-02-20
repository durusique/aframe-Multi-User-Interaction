'use strict'

AFRAME.registerComponent('open-door-component',{
    schema: { },
    init: function(){
        const Context_AF = this; //refers to "this" component

        //add event listener for "click" event on whatever entity has this component
        Context_AF.el.addEventListener('click',function(event){
            console.log("clicked!");
            Context_AF.openDoor(); 
        });
    },

    //custom functions
    openDoor :function(){
        
    },
});