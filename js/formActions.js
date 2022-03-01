
function getAllElementsFromForm(form)
{
    var tab=[];
    for(var i=0 ; i<form.elements.length;i++ ){
        if(form.elements[i].nodeName =="INPUT" || form.elements[i].nodeName =="SELECT"){
            if(form.elements[i].value!="") 
                tab.push(form.elements[i].value);
        }
    }
    return tab;
}

async function setAllElementsInForm(tab,form)
{
    for(var i=0 ; i<form.elements.length;i++ ){
        if(form.elements[i].nodeName =="INPUT")
            form.elements[i].value = tab[i];
        if(form.elements[i].nodeName =="SELECT"){
            var select = form.elements[i];
            for(var j=0;j<select.options.length;j++){
                if(select.options[j].text==tab[i].trim()){
                    select.value = select.options[j].value;
                    break;
                }
            }
        }
    }
}

async function createSelectValues(selects,tables,indexWantedColumn=0)
{
    for(var i =0; i<selects.length; i++){
        var array = await getObjectKeys( await selectTable(tables[i]));
        createSelectValue(selects[i],array,indexWantedColumn)
    }
 
}

async function createSelectValuesColumns(selects,tables)
{
    Object.keys(selects).forEach(function(key) {
        createSelectColumn(selects[key],tables[key])
    });
}


async function createSelectValue(select,array,indexWantedColumn=0)
{   
        Object.keys(array).forEach(function(key) {
            var option = document.createElement("option");
            option.value = array[key][0];
            option.text = array[key][indexWantedColumn];
            select.appendChild(option)
    });
    
}

async function createSelectColumn(select,table)
{   
   var array = await getColumnNames(table);
       Object.keys(array).forEach(function(key) {
            var option = document.createElement("option");
            option.value = array[key];
            option.text = array[key];
            select.appendChild(option)
    });
}
async function getObjectKeys(result)
{
    var array = [];
    Object.keys(result.rows).forEach(function(key) {
        var row = result.rows[key];
        array.push(Object.values(row)); 
        });
    return array;
}

async function getColumnNames(table)
{
    var array = []
    const  result = await selectColumnsFromTable(table);
    Object.keys(result.rows).forEach(function(key) {
        var row = result.rows[key];
        array.push(Object.values(row)); 
        });
    return array;
}