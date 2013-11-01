WhenInDOM
=========

A library agnostic javascript function for listening when node gets inserted to DOM.
Should work in older browsers too, but will be slower as cannot use mutationObservers.

## Usage
    
    // Lets say you have a div not rendered
    var a = document.createElement('div');
    
    // you can listen to when it gets rendered like this
    var myObserver = new WhenInDOM(a, function () {
      alert('Got inserted to dom');
    });
    
    // lets insert it
    setTimeout(function () {
        document.body.appendChild(a);
    }, 1000);
    
When observing should be stopped before element has recieved in DOM, the following should be done:
    
    myObserver.stop();
    

## Happy birthday Mikk Pristavka!

Hope it will cheer You up more than once.