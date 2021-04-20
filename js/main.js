$(document).ready(()=>{
    // set map height
    utils.setMainRowHeight();
    mainMap.init();
    dataLoader.init().then(
        (d)=>{
            mainMap.updateMainLayer(d[0][0]);
            // start TreeView
            treeview
                .makeJsonEntryData(dataLoader.dataModel)
                .display();
        }
    );
});

$(window).on('resize', ()=>{
    // set map height
    utils.setMainRowHeight();
});