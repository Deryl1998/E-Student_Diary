const words = "^[A-Z]{1}[a-z]{1,49}$";
const password = "^[A-Za-z0-9]{1,50}$";
const numbers = /^[0-9]+$/;
const numbers_letters = /^[A-Za-z0-9]+$/;


function getAllElementsFromForm(form)
{
    var tab=[];
    for(var i=0 ; i<form.elements.length;i++ ){
        if(form.elements[i].nodeName =="INPUT" || form.elements[i].nodeName =="SELECT"){
            if(form.elements[i].value=="" && form.elements[i].id !="class") return null;
         tab.push(form.elements[i].value);
        }
    }
    console.log(tab);
    return tab;
}


async function createSelectValuesForALl(form,tables,indexWantedColumn)
{
    Object.keys(tables).forEach(function(key) {
    createSelectValues(form,tables[key],indexWantedColumn)
    });
}

async function createSelectValues(form,table,indexWantedColumn)
{
   const array = await selectObjectKeys(table);
    for(var i=0 ; i<form.elements.length;i++ ){
        if(form.elements[i].id == table){
            Object.keys(array).forEach(function(key) {
                var option = document.createElement("option");
                option.value = array[key][0];
                option.text = array[key][indexWantedColumn];
                form.elements[i].appendChild(option)
            });
            return;
        }
    }
}

async function selectObjectKeys(table)
{
    const query = `SELECT * FROM `+table+`; `;
    const result = await client.query(query);
    var array = []
    Object.keys(result.rows).forEach(function(key) {
        var row = result.rows[key];
        array.push(Object.values(row)); 
        });
    return array;
}