let contextMenuIdName = 'contextMenu';
let elementsWithContextMenuClassName = 'withContextMenu';
let add_Input_Field = document.querySelector( '#addBtn' );
let contextMenu = document.getElementById( contextMenuIdName );
let contextButtonClassName = 'contextButton';
let tasksClassName = 'tasks';
let titleClass = 'title';

const divWithListClassName = 'menu';

const contextMenuOriginal = contextMenu.innerHTML;

const favouritesDivClassName = 'favourites';
const favouritesDiv = document.querySelector( `.${favouritesDivClassName}` );

let divForTask = document.querySelector( `.${tasksClassName}` );
const deleteDivClassName = 'delete';

const completedTasksClassName = 'completedTasks';
const counterClass = 'counterClass';
let completedTasks = document.querySelector( `.${completedTasksClassName}` );

let currentElement;


function init() {
    AddBtnConfig( add_Input_Field );
    clickListener();
    contextListener();
    contextClickListener();
    MutationFinishedElement( divWithListClassName, titleClass, counterClass );
}

function addTask( elem ) {
    let text = elem.value[0].toUpperCase() + elem.value.slice(1);

    let newP = document.createElement('p');
    newP.innerHTML = `<span>${text}</span>`;

    divForTask.append( newP );
    addMarker( newP, 'tasks' );
    elem.value = null;
}

function isEmpty( elem ) {
    return Boolean( elem.childElementCount );
}

function MutationFinishedElement( menuClass, titleClass, counterClass ) {
    let title = document.querySelector( `.${titleClass}` ).nextElementSibling;
    const config = {
        childList: true,
    };

    const callback = function( mutationsList, observer ) {

        for( let mutation of mutationsList ) {
            
            if( mutation.type === 'childList' ) {
                
                let count = counter( mutation.target );
                mutation.target.closest( `.${menuClass}` ).hidden = checkingCount( count );
                document.querySelector(`.${counterClass}`).innerHTML = count;
                
            }
        }
    }

    const observer = new MutationObserver( callback );
    observer.observe( title, config );
}

function checkingCount( count ) {
    return count == 0 ? true : false;
}

function counter( elem ) {

    let result = elem.childElementCount;
    return result;

}

function AddBtnConfig( btn ) {
    
    let placeholder = btn.placeholder;
    btn.onfocus = () => btn.placeholder = '';
    btn.onblur = () => btn.placeholder = placeholder;

}

add_Input_Field.addEventListener( 'keydown', function( event ) {
    if( event.key == 'Enter' ) {
        addTask( add_Input_Field );
    }
});

function contextListener() {

    document.addEventListener( 'contextmenu', function( event ) {
    if( clickInside( event, elementsWithContextMenuClassName, 'P' ) ) {
        checkContextButtons( event.target.closest( `.${elementsWithContextMenuClassName}` ) );
        toggleMenuOn( contextMenu, event );
    }
    });

}

function toggleMenuOn( contextmenu, event ) {

    currentElement = event.target.closest('p');

    contextmenu.classList.add( 'open' );
    
    positionMenu( contextMenu, event );
    event.preventDefault();
};

function toggleMenuOff( contextmenu ) {
    
    contextmenu.classList.remove( 'open' );
    setTimeout( original, 100 );

    function original() {
        contextmenu.innerHTML = contextMenuOriginal;
    }

}

function clickInside( e, className, tagname ) {

    if( e.target.closest(`.${className}`) && e.target.tagName == tagname ) {
        return true;
    } else return false;
}

function clickListener() {

    document.addEventListener('click', function( event ) {
        toggleMenuOff( contextMenu );
    });

}

function getCursorPosition( e ) {

    let posX = 0;
    let posY = 0;

    if( !e ) var e = window.event;

    if( e.pageX || e.pageY ) {
        posX = e.pageX;
        posY = e.pageY;
    } else if ( e.clientX || e.clientY ) {
        posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {
        x: posX,
        y: posY
    };

}

function positionMenu( contextmenu, e ) {
    let clickCoords = getCursorPosition( e );
    contextmenu.style.top = clickCoords.y + 'px';
    contextmenu.style.left = clickCoords.x + 'px';

}

function checkContextButtons( div ) {
    let obj = {
        tasks() {
            return 'favourites';
        },
        favourites() {
            return 'deleteFromFavourites';
        },
        completedTasks() {
            showHiddenBtn( document.querySelector( '[data-action = "markAsCompleted"]' ), true )
            return 'markAsUnompleted';
        }
    };
    
    let a = obj[div.className.split(" ")[0]]();

    let btnsName = document.querySelector( `[data-action = "${a}"]` );
    showHiddenBtn( btnsName, false );
};

function showHiddenBtn( btn, action ) {
    btn.hidden = action;
}

function addMarker( div, markerName ) {
    div.setAttribute( 'data-marker', markerName );
}

function markerHandler( elem ) {
    returnToThisClassDiv = {
        'favourites': favouritesDiv,
        'tasks': divForTask
    }
    return returnToThisClassDiv[ elem.dataset.marker ];
}

function clickHandler( e ) {
    let actionHandler = {
        favourites() {
            favouritesDiv.append( currentElement );
            addMarker( currentElement, 'favourites' );
        },
        delete() {
            currentElement.remove();
        },
        deleteFromFavourites() {
            divForTask.append( currentElement );
            addMarker( currentElement, 'tasks' );
        },
        markAsUnompleted() {
            markerHandler( currentElement ).append( currentElement );
        },
        markAsCompleted() {
            completedTasks.append( currentElement );
        }

    }
    actionHandler[e.target.dataset.action]();
}

function contextClickListener() {
    document.addEventListener( 'click', function( event ) {
        if( clickInside( event, contextButtonClassName, 'INPUT' ) ) {
            clickHandler( event );
        } 
    });
}

init();