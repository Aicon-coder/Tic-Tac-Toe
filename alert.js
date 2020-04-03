 
 /************************************ 
 **  domTools/alert.js              **
 **  Read 'Example Usage' below     **
 *************************************/
(function(global, document){
   'use strict';
    //Create CD object if it doesn't already exist
    if (global.CD == undefined){ global.CD = {};};

    //Create CD.domTools object if it doesn't already exist
    if (global.CD.domTools == undefined){ global.CD.domTools = {};};
    
    //Abort if CD.alert exists
    if (global.CD.domTools.alert != undefined){console.error('CD.alert already defined. cd-alert.js is aborting.'); return;};

    //removes the element from the dom when done.
    function destroy(root){
        root.parentNode.removeChild(root); 
        return true;
    }

    //Get a fresh alert element
    function createElement(){
     
        let ok = document.createElement('a');
        ok.setAttribute('class','cd-ok w3-button w3-theme w3-margin w3-third');
        ok.setAttribute('style','display: block; float: right;margin-top: unset!important; margin-right:unset!important');
        ok.innerText = 'OK';
              
        let cancel = document.createElement('a');
        cancel.setAttribute('class','cd-cancel w3-button w3-theme w3-margin w3-third w3-hide');
        cancel.setAttribute('style','display: block; float: right;margin-top: unset!important; margin-right:unset!important');
        cancel.innerText = 'Cancel';
        
        let footer = document.createElement('footer');
        footer.setAttribute('class','w3-container w3-theme-d5');
        footer.setAttribute('style','text-align: -webkit-right;');
        footer.appendChild(ok);
        footer.appendChild(cancel);
        
        let body = document.createElement('body');
        body.setAttribute('class','w3-container w3-theme-d5 w3-padding');
        body.setAttribute('style','height: fit-content');
        
        let loader = document.createElement('div');
        loader.setAttribute('class','lds-ring w3-display-topmiddle');
        loader.innerHTML = '<div></div><div></div><div></div><div></div></div>'; 

        let header = document.createElement('header');
        header.setAttribute('class','w3-container w3-theme-d3');
        header.appendChild(document.createElement('h4'));
        
        let content = document.createElement('div');
        content.setAttribute('class', 'w3-modal-content w3-card-4 w3-round w3-animate-bottom');
        content.appendChild(header);
        content.appendChild(body);
        content.appendChild(footer);
        
        let root = document.createElement('div');
        root.setAttribute('class', 'w3-modal');
        root.setAttribute('style', 'z-index: 10;word-wrap: break-word;display: block;');
        root.appendChild(content);

        //Append 'destroy' function & body properties to Element
        Object.defineProperty(root, 'destroy',  {value: function(){return destroy(root);}}  );
        Object.defineProperty(root, 'content',  {value: content}  );
        Object.defineProperty(root, 'header',   {value: header}  );
        Object.defineProperty(root, 'body',     {value: body}  );
        Object.defineProperty(root, 'addLoader',{value: function(){ 
                root.loader = root.body.appendChild(loader); 
                root.loader.destroy = ()=>{ 
                        root.loader.parentElement.removeChild(root.loader);  } }} );
        Object.defineProperty(root, 'ok',       {value: ok}  );
        Object.defineProperty(root, 'cancel',   {value: cancel}  );
        Object.defineProperty(root, 'expand',   {value: ()=>{
                console.log('expand function running, This is just a temporary quick fix. should be redone properly later');
                root.style.paddingTop='0';
                root.content.style.width='100%';
                root.header.expandButton.style.display='none';
        }});
        
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

    function setupOptions(root){            var o = root.options;

            if (o.enableX) {
                const X = document.createElement('i');
                X.setAttribute('class','fa fa-window-close w3-padding w3-right w3-xlarge w3-button');
                X.setAttribute('style','margin-right: -16px;');
                X.onclick = ()=>{root.cancel.click();}
                root.header.insertBefore(X,root.header.firstElementChild);
            }

            if (!!o.iFrame) {
                const iFrame = document.createElement('iframe');
                iFrame.setAttribute('class','w3-code');
                iFrame.setAttribute('style','width: -webkit-fill-available;resize: vertical;');
                iFrame.src = "data:text/html;charset=utf-8," + escape(o.iFrame);
                root.body.append(iFrame);
            }

            if (o.enableExpand) {
                const expand = document.createElement('i');
                expand.setAttribute('class','fa fa-expand w3-padding w3-right w3-xlarge w3-button');
                expand.setAttribute('style','margin-right: -16px;');
                expand.onclick = ()=>{root.expand();}
                root.header.insertBefore(expand,root.header.firstElementChild);
                root.header.expandButton=expand;
            }
            return root;
    }
    
    

    



    function alert(message, title, type, callback, options){
        
        //set defaults
        if (!message)message="";
        if (!title )title=getRandomTitle();
        

        //start with a fresh element
        var root = new createElement();
        if (!options) options = {};       root.options = options;

        //Apply arguments
            //title
        root.header.firstChild.innerHTML = title;
            //type
        if (type == 'cancel'){
            root.cancel.classList.remove('w3-hide');

        } else if (type == 'loader'){
            root.addLoader();
            
            //Object.defineProperty(root.loader, 'loader', {value: loader}  );
            
        } else if (type == 'yes-no'){
            root.cancel.classList.remove('w3-hide');
            root.ok.innerText = 'Yes';
            root.cancel.innerText = 'No';
    
        } else if (type == 'none'){
            root.ok.classList.add('w3-hide');
        } else {    //default 'ok' type
                
        }


        if (typeof(message) == 'object'){
            root.body.appendChild(message);
        } else { 
            root.body.innerHTML = root.body.innerHTML+message;
        }


        //***********************/
        //**   setup buttons   **/
        //***********************/
        root.ok.onclick =       ()=>{   root.destroy();
                                        if(callback) callback(true, root.body);      };
        root.cancel.onclick =   ()=>{   root.destroy();
                                        if (callback) callback(false, root.body);    };
        root = setupOptions(root);
        
        document.body.appendChild(root);

        return root;
    } 

    alert.help = ()=>{ const helpText =`Help info for alert.js:
Creates a popup dialog box to prompt the user for input
CD.domTools.alert( message, title, type, callback, options);


Example Usage:
%cCD.domTools.alert( "It's time", "Time to decide...", "yes-no", (x)=>{console.log('User selected ' + x)});%c
   

| PARAMETERS | DEFAULT       | TYPE         | DESCRIPTION                                         |%c
|------------|---------------|--------------|-----------------------------------------------------|
| message    | *required*    | string/HTML  |                                                     |
|            |               |  /element    | appended to the content dialog body                 |
| title      | random phrase | string/HTML 	| content of dialog title                             |
| type       | 'ok'          | string      	| configures the dialog for a specific purpose        |
|            |               |              |    'ok' - shows only the ok button,                 |
|            |               |              |    'cancel' - shows both 'ok' & 'cancel' buttons,   |
|            |               |              |    'yes-no' - same as cancel but changes button     |
|            |               |              |               text to "Yes" & "No",                 |
|            |               |              |    'none' - shows neither button and requires the   |
|            |               |              |             objects 'destroy()' property to be      |
|            |               |              |             invoked when done,                      |
|            |               |              |    'loader' - same as 'none' but with a css loader  |
|            |               |              |               in the message 	                      |
| callback   | null          | function    	| "callback(selection, element)" executes when either |
|            |               |              |    button is selected after destroying its self.    |
|            |               |              |    'selection' returns:                             |
|            |               |              |    TRUE  - if 'ok' is selected                      |
|            |               |              |    FALSE - if 'cancel' is selected element          |
|            |               |              |    'element' returns the body element of the dialog,|
|            |               |              |    useful for processing user input forums          |
| options    | {}            | object      	| additional alert options:                           |
|            |               |              |    enableX: boolean - includes an 'x' in the header |
|            |               |              |    iFrame: src - used by api.js for showing errors  |
|            |               |              |    enableExpand: boolean - full size button         |
`;

console.log(helpText, "color: GREEN","font-weight: bold","");};

global.CD.domTools.alert = alert


})(window,document);