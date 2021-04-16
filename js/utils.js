var utils={
    /**
     * Apply a percentage of the total height to components in main row where is the map component.
     * @param {double} offset, a percentage value between 0 and 1, default 0.6(60%)
     */
    setMainRowHeight:(offset)=>{
        if(!offset) offset=0.6;
        let mainRowHeight=window.innerHeight*offset;
        $('#mainmap').height(mainRowHeight);
        $('#treeview').height(mainRowHeight);
    }
};