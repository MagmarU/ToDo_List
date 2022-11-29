import { counterVarElemFromModule } from './variablesModule.js';

function init() {
    AddBtnConfig( inputFieldFromModuleVar.addInputField );
    clickListener();
    contextListener();
    contextClickListener();
    MutationFinishedElement( 
        counterVarElemFromModule.divWithListClassName, 
        counterVarElemFromModule.titleClass, 
        counterVarElemFromModule.counterClass );
}

import { inputFieldFromModuleVar } from './variablesModule.js';

inputFieldFromModuleVar.addInputField.addEventListener( 'keydown', function( event ) {
    if( event.key == 'Enter' ) {
        addTask( inputFieldFromModuleVar.addInputField );
    }
});

import { divsWithTasksFromModuleVar } from './variablesModule.js';

function addTask( elem ) {
    let text = elem.value[0].toUpperCase() + elem.value.slice(1);

    let newP = document.createElement('p');
    newP.innerHTML = `<span>${text}</span>`;

    divsWithTasksFromModuleVar.divForTask.append( newP );
    addMarker( newP, 'tasks' );
    elem.value = null;
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

import { contexmenuFromModule } from './variablesModule.js';

function contextListener() {

    document.addEventListener( 'contextmenu', function( event ) {
        let elem = contexmenuFromModule.elementsWithContextMenuClassName;
        if( clickInside( event, elem, 'P' ) ) {
            checkContextButtons( event.target.closest( `.${elem}` ) );
            toggleMenuOn( contexmenuFromModule.contextMenu, event );
        }
    });

}

let currentElement;

function toggleMenuOn( contextmenu, event ) {

    currentElement = event.target.closest('p');

    contextmenu.classList.add( 'open' );
    
    positionMenu( contexmenuFromModule.contextMenu, event );
    event.preventDefault();
};

import { contextMenuOriginal } from './variablesModule.js';

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

function showHiddenBtn( btn, action ) {
    btn.hidden = action;
}

function addMarker( div, markerName ) {
    div.setAttribute( 'data-marker', markerName );
}

function markerHandler( elem ) {
    let returnToThisClassDiv = {
        'favourites': divsWithTasksFromModuleVar.favouritesDiv,
        'tasks': divsWithTasksFromModuleVar.divForTask
    }
    return returnToThisClassDiv[ elem.dataset.marker ];
}

function positionMenu( contextmenu, e ) {
    let clickCoords = getCursorPosition( e );
    contextmenu.style.top = clickCoords.y + 'px';
    contextmenu.style.left = clickCoords.x + 'px';

}

function clickListener() {

    document.addEventListener('click', function( event ) {
        toggleMenuOff( contexmenuFromModule.contextMenu );
    });

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
            return 'markAsUncompleted';
        }
    };
    
    let a = obj[div.className.split(" ")[0]]();

    let btnsName = document.querySelector( `[data-action = "${a}"]` );
    showHiddenBtn( btnsName, false );
};

function contextClickListener() {
    document.addEventListener( 'click', function( event ) {
        if( clickInside( event, contexmenuFromModule.contextButtonClassName, 'INPUT' ) ) {
            clickHandler( event );
        } 
    });
}

function clickHandler( e ) {
    let actionHandler = {
        favourites() {
            divsWithTasksFromModuleVar.favouritesDiv.append( currentElement );
            addMarker( currentElement, 'favourites' );
        },
        delete() {
            currentElement.remove();
        },
        deleteFromFavourites() {
            divsWithTasksFromModuleVar.divForTask.append( currentElement );
            addMarker( currentElement, 'tasks' );
        },
        markAsUncompleted() {
            markerHandler( currentElement ).append( currentElement );
        },
        markAsCompleted() {
            divsWithTasksFromModuleVar.completedTasks.append( currentElement );
        }

    }
    actionHandler[e.target.dataset.action]();
}

init();