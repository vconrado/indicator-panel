$(document).ready(()=>{
    // set map height
    utils.setMainRowHeight();
    mainMap.init();
    dataLoader.init().then(
        (d)=>{
            mainMap.updateMainLayer(d[0][0]);
        }
    );

    treeview.init();
});

$(window).on('resize', ()=>{
    // set map height
    utils.setMapHeight();
});