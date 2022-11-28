let contextMenuIdName = 'contextMenu';
let elementsWithContextMenuClassName = 'withContextMenu';
let add_Input_Field = document.querySelector( '#addBtn' );
let contextMenu = document.getElementById( contextMenuIdName );
let contextButtonClassName = 'contextButton';
let tasksClassName = 'tasks';
let titleClass = 'title';

const divWithListClassName = 'menu';
// const divWithList = document.querySelector(`.${divWithListClassName}`);

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
    // counter( titleClass );
    // checkingCount( divWithList, titleClass, counterClass );
    // MutationFinishedElement( titleClass, counterClass );
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
    // let title;
    let title = document.querySelector( `.${titleClass}` ).nextElementSibling;
    // console.log( title );
    const config = {
        childList: true,
    };

    const callback = function( mutationsList, observer ) {
        for( let mutation of mutationsList ) {
            if( mutation.type === 'childList' ) {
                // checkingCount( menu, titleClass, counterClass );
                let count = counter( mutation.target );
                // title = mutation.target.previousSibling;
                mutation.target.closest( `.${menuClass}` ).hidden = checkingCount( count );
                // menu.hidden = checkingCount( count );
                document.querySelector(`.${counterClass}`).innerHTML = count;
                // console.log( menu );
                // toggleFinishedMenuOn( menu );
            }
        }
    }

    const observer = new MutationObserver( callback );
    observer.observe( title, config );
}

function checkingCount( count ) {
    return count == 0 ? true : false;
}
// function toggleFinishedMenuOn( menu ) {
//     // console.log( menu );
//     menu.hidden = false;
// }

// function checkingCount( menu, titleClass, counterClass ) {
//     let title = document.querySelector( `.${titleClass}` ).nextElementSibling;

//     if( counter( title ) == 0) {

//     }

//     // let title = document.querySelector( `.${titleClass}` ).nextElementSibling;
//     // if( counter( title ) == 0 ) {
//     //     menu.hidden = true;
//     //     MutationFinishedElement( menu, titleClass, counterClass );
//     // } else {
//     //     menu.hidden = false;

//     //     // MutationFinishedElement( menu, titleClass, counterClass );
        
//     // }
// }

function counter( elem ) {
    let result = elem.childElementCount;

    // elem.hidden = result == 0 ? true : false;
    // if( result == 0 ) elem.hidden = true;
    return result;
    
    // return ;
    // let titleElem = document.querySelector( `.${title}` ).nextElementSibling;
    // MutationFinishedElement( titleElem );
    // console.log( isEmpty( titleElem ) );


    // titleElem.onchange = function() {
    //     console.log( titleElem );
    // };
    
    // titleElem.addEventListener( 'editing', (e) => console.log( e.detail ) );

    // titleElem.dispatchEvent( new CustomEvent('editing', {
    //     detail: {
    //         value : this.childElementCount
    //     }
    // }));
}

function AddBtnConfig( btn ) {
    
    let placeholder = btn.placeholder;
    btn.onfocus = () => btn.placeholder = '';
    btn.onblur = () => btn.placeholder = placeholder;

}

// add_Input_Field.addEventListener( 'focus', function( event ) {
//     let placeholderText = event.target.placeholder;
//     event.target.placeholder = placeholderText ? '' : placeholderText;
//     // if( event.target.placeholder ) {

//     // }
// });

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
    // contextmenu.style.opacity = '1';
    // contextmenu.style.display = 'flex';
    
    positionMenu( contextMenu, event );
    event.preventDefault();
};

function toggleMenuOff( contextmenu ) {
    
    // contextmenu.style.opacity = '0';
    // contextMenu.style.display = 'none';
    contextmenu.classList.remove( 'open' );
    setTimeout( original, 100 );

    function original() {
        contextmenu.innerHTML = contextMenuOriginal;
    }

}

function clickInside( e, className, tagname ) {

    if( e.target.closest(`.${className}`) && e.target.tagName == tagname ) {
        // console.log( e.target.tagName );
        return true;

    } else return false;
}

function clickListener() {

    document.addEventListener('click', function( event ) {
        toggleMenuOff( contextMenu );
        // if( !clickInside( event ) ) toggleMenuOff( contextMenu ); //не понятная строчка, поэтому пока что пропущу.
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