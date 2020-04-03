(function(global, document){
   'use strict';
    //Create CD object if it doesn't already exist
    if (global.CD == undefined){ global.CD = {};};
    
    //Abort if CD.alert exists
    if (global.CD.alert != undefined){console.error('CD.alert already defined. cd-alert.js is aborting.'); return;};

    //removes the element from the dom when done.
    function destroy(dialog){
        dialog.parentNode.removeChild(dialog); 
        return true;
    }

    //Get a fresh alert element
    function createElement(){
     
        const ok = document.createElement('a');
        ok.setAttribute('class','cd-ok w3-button w3-theme w3-margin w3-third');
        ok.setAttribute('style','display: block; float: right;margin-top: unset!important;');
        ok.innerText = 'OK';
              
        const cancel = document.createElement('a');
        cancel.setAttribute('class','cd-cancel w3-button w3-theme w3-margin w3-third w3-hide');
        cancel.setAttribute('style','display: block; float: right;margin-top: unset!important;');
        cancel.innerText = 'Cancel';
        
        const footer = document.createElement('footer');
        footer.setAttribute('class','w3-container w3-theme-d5');
        footer.setAttribute('style','text-align: -webkit-right;');
        footer.appendChild(ok);
        footer.appendChild(cancel);
        
        const body = document.createElement('body');
        body.setAttribute('class','w3-container w3-theme-d5 w3-padding');
        
        const header = document.createElement('header');
        header.setAttribute('class','w3-container w3-theme-d3');
        header.appendChild(document.createElement('h4'));
        
        const popup = document.createElement('div');
        popup.setAttribute('class', 'w3-modal-content w3-card-4 w3-round w3-animate-bottom');
        popup.appendChild(header);
        popup.appendChild(body);
        popup.appendChild(footer);
        
        const root = document.createElement('div');
        root.setAttribute('class', 'w3-modal');
        root.setAttribute('style', 'z-index: 10;word-wrap: break-word;display: block;');
        root.appendChild(popup);

        //Append 'destroy' function & body properties to Element
        Object.defineProperty(root, 'destroy', {value: function(){return destroy(root);}}  );
        Object.defineProperty(root, 'body', {value: root.querySelector('body')}  );
        
        return root;
    };
    
    //Get a fun random title incase one isn't specified
    function getRandomTitle(){
          var myArray = ["Whoa...","But....But....","Hold on a sec..","O Geeze..","I don't know Rick..","My man!",
             "S-S-Samantha.","Puh rum pum pow!","dont mind those stare goblins","Oh, wow.","Awww, it's you guys!",
             "Wubbalubbadubdub!","Uh ohhhh! Somersoult jump!","GRASSSSS... tastes bad!","No jumping in the sewer.",
             "BURGERTIME!","Rubber baby buggy bumpers!","I turned myself into a PICKLE!","Heavens to Murgatroyd!",
             "Hey hey hey!","You blockhead!","That's all I can stands, I can't stands no more!","Beep Beep",
             "And now, here's something we hope you'll really like.","Excellent.","Wonder Twin powers activate!",
             "Scooby-Dooby-Doo!","Sufferin' succotash!","Ay, caramba!","By the power of Greyskull!","Good greif.","D'oh!",
             "What's up, doc?","Giggity","Mmmkay","Lambs to the cosmic slaughter!","Keep Summer... safe!"
          ];
          return (myArray[Math.floor(Math.random()*myArray.length)]);
    }
    
    

    
   /* alert function: creates a popup dialog box to prompt the user for input
    *
    *message: *required*  is the contents of the message body in HTML
    *
    *
    *
    *callback = callback(selection true/false, rootElement clone)
    *
    *
    *
    *
    *
    */
    global.CD.alert = function alert(message, title, type, callback, options){
        
        //set defaults
        if (title == null)title=getRandomTitle();
        

        var dialog = createElement();

        //apply arguments
            //message
        dialog.querySelector('body').innerHTML = message;
            //title
        dialog.querySelector('header').firstChild.innerHTML = title;
            //type
        if (type == 'cancel'){
            dialog.querySelector('.cd-cancel').classList.remove('w3-hide');
        } else if (type == 'none'){
            dialog.querySelector('.cd-ok').classList.add('w3-hide');
        } else {    //default 'ok' type
                
        }
  
        //setup buttons
        if (callback == null) {
            dialog.querySelector('.cd-ok'       ).onclick = ()=>{      dialog.parentNode.removeChild(dialog);    };
            dialog.querySelector('.cd-cancel'   ).onclick = ()=>{      dialog.parentNode.removeChild(dialog);    };
        } else {
            dialog.querySelector('.cd-ok').onclick = ()=>{
                dialog.parentNode.removeChild(dialog);
                callback(true, dialog);
                                                                                
            };
            dialog.querySelector('.cd-cancel').onclick = ()=>{
                dialog
               //because JS is a garbage collected language, the dialog should remain in memory until it is no longer being referenced.
                dialog.parentNode.removeChild(dialog);
                callback(false, dialog);
                                                                                
            };            
        };
        
        document.querySelector('body').appendChild(dialog);
    
        return dialog;
    } 

})(window,document);
        