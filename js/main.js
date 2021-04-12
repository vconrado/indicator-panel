$(document).ready(()=>{
    // set map height
    utils.setMapHeight();
    mainMap.init();
});

$(window).on('resize', ()=>{
    // set map height
    utils.setMapHeight();
});