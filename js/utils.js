var utils={
    /**
     * Apply a percentage of the total height to main map component.
     * @param {double} offset, a percentage value between 0 and 1, default 0.6(60%)
     */
    setMapHeight:(offset)=>{
        if(!offset) offset=0.6;
        let mapHeight=window.innerHeight*offset;
        $('#mainmap').height(mapHeight);
    },

    /**
     * Load a CSV data using background request
     */
    getCSV:(url)=>{

    }
};
