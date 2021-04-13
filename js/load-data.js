/**
 * Using the appropriate data model to guide the loading of CSV data.
 */
var dataLoader={
    filePath:"ivm_rmvale.json",// path to the data model file
    dataModel:{},
    data:[],// store the type {key:"",values:[]}

    loadData:(key, callbackfn)=>{
        d3.csv("data/"+key+".csv").then(
            (data, error)=>{
                if (error) throw error;
                try {
                    dataLoader.data.push({key:key,values:dataLoader.processCSV(data)});   
                } catch (error) {
                    console.error(error+"\nCSV data file format error for ("+key+".csv)");
                }
                callbackfn();
            }
        );
    },

    loadDataModel:(callbackfn)=>{
        d3.json("model/"+dataLoader.filePath).then(
            (data, error)=>{
                if (error) throw error;
                dataLoader.dataModel=data;
                if(callbackfn) callbackfn();
            }
        );
    },

    processCSV:(csv)=>{
        let data = [];
        csv.forEach(
            (d)=>{
                if(d["geocode"] && d["value"])
                    data[d["geocode"]]=parseFloat(d["value"].replace(",","."));
                else
                    throw "There is something wrong with the csv data. Mandatory column name \"geocode\" and/or \"value\" is missing."
            }
        );
        return data;
    },

    getAllData:()=>{
        dataLoader.loadDataModel(
            ()=>{
                dataLoader.getAllKeys(dataLoader.dataModel).forEach(
                    (key)=>{
                        dataLoader.loadData(key,
                            ()=>{
                                console.log("data file is loaded for key:"+key);
                            }
                        );
                    }
                );
            }
        );
    },

    getAllKeys: (obj, parentKey)=>{
        let keys = [];
        for(let prop in obj){
            if(Object.prototype.toString.call(obj[prop])=="[object Array]" && obj[prop].length) {
                obj[prop].forEach(element => {
                    keys=keys.concat(dataLoader.getAllKeys(element, obj["key"]));
                });
            }else{
                if (prop=="key") {
                    keys.push((!parentKey?"":parentKey+"-")+obj[prop]);
                }
            }
        }
        return keys;
    }

};