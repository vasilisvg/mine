// About the list

var theUL = document.querySelector('ul');
if(localStorage.getItem('storedList') != '') {
    theUL.innerHTML = localStorage.getItem('storedList');
}
else {
    theUL.innerHTML = '<li>…</li>';
}
var theList = theUL.innerHTML;
//alert(theList);
theUL.onkeyup = function() {
    theList = theUL.innerHTML;
    localStorage.setItem('storedList', theList);
    localStorage.getItem('storedList');
    console.log(localStorage.getItem('storedList'));
}


// onclick

document.addEventListener( 'click', clickHandler );
function clickHandler( event ) {
    $this = event.target;

    // the button
    if($this.nodeName == 'BUTTON'){
        if($this.getAttribute('data-type') == 'shop') {
            theUL.removeAttribute('contenteditable');
            setState($this,'edit')
        }
        else if($this.getAttribute('data-type') == 'edit') {
            theUL.setAttribute('contenteditable','');
            setState($this,'shop')
        }
    }
    else if($this.nodeName == 'DEL'){
        if($this.parentNode.parentNode.getAttribute('contenteditable') != null) {
            return;
        }
        else {
            var listItem = $this.innerHTML;
            $this.parentNode.innerHTML = listItem;
        }
    }
    else if($this.nodeName == 'LI'){
        if($this.parentNode.getAttribute('contenteditable') != null) {
            return;
        }
        else {
            var listItem = $this.innerHTML;
            $this.innerHTML = '<del>' + listItem + '</del>';
        }
    }
}



function setState($this,stateType) {
    $this.setAttribute('data-type',stateType);
    $this.innerHTML = stateType;
}
