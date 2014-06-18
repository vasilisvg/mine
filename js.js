(function() {

// We'll use this <ul>
var theUL = document.querySelector('body > ul');

// If there's a list in the localStorage, show it
if(localStorage.getItem('storedList')) {
    theUL.innerHTML = localStorage.getItem('storedList');
}
// If not, display an empty li,
// you need it to be able to edit a contenteditable ul
else {
    theUL.innerHTML = '<li></li>';
}

// As soon as we type something into the ul
// store it in localStorage
theUL.onkeyup = function() {
    setLocalStorage();
}

/* There are two states to the app
1. contenteditable: you can now add items to the list
2. shopping: you can now strikethrough itens from your list
*/

// Check if a state is stored
// If so, set the state to reflect it
if(localStorage.getItem('storedState')) {
    var theState = localStorage.getItem('storedState');
    setState(document.querySelector('[data-type]'),theState);
    if(theState == 'edit') {
        theUL.removeAttribute('contenteditable');
    }
}



//document.addEventListener( 'click', clickHandler );
document.addEventListener( 'touchstart', clickHandler );
function clickHandler( event ) {
    clickedThing = event.target;

    // the buttons
    if(clickedThing.nodeName == 'BUTTON'){

        // If the state is set to shopping, remove contenteditable
        if(clickedThing.getAttribute('data-type') == 'shop') {
            theUL.removeAttribute('contenteditable');
            setState(clickedThing,'edit');
        }
        // If the state is set to edit, add contenteditable
        else if(clickedThing.getAttribute('data-type') == 'edit') {
            theUL.setAttribute('contenteditable','');
            setState(clickedThing,'shop');
        }
        // If the delete-button is pressed, delete stuff
        else if(clickedThing.getAttribute('data-type') == 'delete') {
            deleteDeleted();
        }
        // if the prefill-button is pressed, show the prefill dropdown
        else if(clickedThing.getAttribute('data-type') == 'prefill') {
            showPrefill();
        }
        // if a prefill-list is pressed, prefill the list
        else if(clickedThing.hasAttribute('data-list')) {
            fillPrefill(clickedThing);
        }
        // this prevents iOS from highlighting the button
        // .3s after it was pressed
        event.preventDefault();
    }

    // If a <del> element is pressed
    else if(clickedThing.nodeName == 'DEL'){
        // don't do anything if the <ul> is editable
        if(clickedThing.parentNode.parentNode.hasAttribute('contenteditable')) {
            return;
        }
        // remove the <del>,
        else {
            var listItem = clickedThing.innerHTML;
            clickedThing.parentNode.innerHTML = listItem;
            setLocalStorage();
        }
    }
    // if a <li> is pressed
    else if(clickedThing.nodeName == 'LI'){
        // don't do anything if the <ul> is editable
        if(clickedThing.parentNode.hasAttribute('contenteditable')) {
            return;
        }
        // add a <del>
        else {
            var listItem = clickedThing.innerHTML;
            clickedThing.innerHTML = '<del>' + listItem + '</del>';
            setLocalStorage();
        }
    }
}


// this simply sets the state to either 'edit' or 'shop'
function setState(clickedThing,stateType) {
    clickedThing.setAttribute('data-type',stateType);
    clickedThing.innerHTML = stateType;
    localStorage.setItem('storedState', stateType);
}

// This removes all <li>'s with a <del> in them
function deleteDeleted() {
    dels = document.querySelectorAll('del');
    for(var i=0; i<dels.length; i++) {
        toDelete = dels[i].parentNode;
        dels[i].parentNode.parentNode.removeChild(toDelete);
    }
    setLocalStorage();
}

// This sets the localStorage to the innerHTML of the <ul>
function setLocalStorage() {
    theList = theUL.innerHTML;
    // if there's no <li> in the list, add one
    if (theList.indexOf('<li>') < 0 ) {
        theList = '<li>…</li>';
        theUL.innerHTML = theList;
    }
    localStorage.setItem('storedList', theList);
}

// show a menu with prefilled lists
function showPrefill() {
    document.getElementById('defaultLists').classList.toggle('active');
}

// fill the list with a prefilled list
function fillPrefill(clickedThing) {
    var theList = clickedThing.getAttribute('data-list');
    theUL.innerHTML = document.getElementById(theList).innerHTML;
    setLocalStorage();
    document.getElementById('defaultLists').classList.toggle('active');
}


 }());
