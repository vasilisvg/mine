// About the list

var theUL = document.querySelector('ul');
if(localStorage.getItem('storedList')) {
    theUL.innerHTML = localStorage.getItem('storedList');
}
else {
    theUL.innerHTML = '<li></li>';
}
var theList = theUL.innerHTML;
//alert(theList);
theUL.onkeyup = function() {
    setLocalStorage();
}


// onclick

//document.addEventListener( 'click', clickHandler );
document.addEventListener( 'touchstart', clickHandler );
function clickHandler( event ) {
    $this = event.target;

    // the button
    if($this.nodeName == 'BUTTON'){
        if($this.getAttribute('data-type') == 'shop') {
            theUL.removeAttribute('contenteditable');
            setState($this,'edit');
        }
        else if($this.getAttribute('data-type') == 'edit') {
            theUL.setAttribute('contenteditable','');
            setState($this,'shop');
        }
        else if($this.getAttribute('data-type') == 'delete') {
            deleteDeleted();
        }
    }

    // The Del
    else if($this.nodeName == 'DEL'){
        if($this.parentNode.parentNode.hasAttribute('contenteditable')) {
            return;
        }
        else {
            var listItem = $this.innerHTML;
            $this.parentNode.innerHTML = listItem;
            setLocalStorage();
        }
    }
    else if($this.nodeName == 'LI'){
        if($this.parentNode.hasAttribute('contenteditable')) {
            return;
        }
        else {
            var listItem = $this.innerHTML;
            $this.innerHTML = '<del>' + listItem + '</del>';
            setLocalStorage();
        }
    }
}



function setState($this,stateType) {
    $this.setAttribute('data-type',stateType);
    $this.innerHTML = stateType;
}
function deleteDeleted() {
    dels = document.querySelectorAll('del');
    for(var i=0; i<dels.length; i++) {
        toDelete = dels[i].parentNode;
        dels[i].parentNode.parentNode.removeChild(toDelete);
    }
    setLocalStorage();
}
function setLocalStorage() {
    theList = theUL.innerHTML;
    localStorage.setItem('storedList', theList);
    localStorage.getItem('storedList');
}
