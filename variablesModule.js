export let contexmenuFromModule = {
    'contextMenu' : document.getElementById( 'contextMenu' ),
    'contextButtonClassName' : 'contextButton',
    'elementsWithContextMenuClassName' : 'withContextMenu',
}
export const contextMenuOriginal = contextMenu.innerHTML;

export let inputFieldFromModuleVar = {
    'addInputField' : document.querySelector( `#addBtn` )
}

export let divsWithTasksFromModuleVar = {
    'divForTask' : document.querySelector( '.tasks' ),
    'favouritesDiv' : document.querySelector( '.favourites' ),
    'completedTasks' : document.querySelector( '.completedTasks' ),
}

export let counterVarElemFromModule = {
    'titleClass' : 'title',
    'divWithListClassName' : 'menu',
    'counterClass' : 'counterClass',
}

export const deleteDivClassName = 'delete';