$(document).ready(()=>{
    // set map height
    utils.setMapHeight();
    mainMap.init();
    dataLoader.init().then(
        (d)=>{
            mainMap.updateMainLayer(d[0][0]);
        }
    );
});

$(window).on('resize', ()=>{
    // set map height
    utils.setMapHeight();
});