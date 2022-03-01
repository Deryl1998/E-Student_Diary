
function drawTable(res,tableName){
    document.getElementById('table').innerHTML=null;
    var data =  res.rows;
    var HTML = "<table>";
    HTML += "<thred>";
    HTML += "<tr>";
    for(var j=0; j<res.fields.length;j++){
         HTML += "<td>"+ res.fields[j].name+ "</td>";
    }
    HTML += "<td>"+ "edit"+ "</td>";
    HTML += "<td>"+ "delete"+ "</td>";
    HTML += "</tr>";
    for(var i=0; i < res.rowCount; i++){
         HTML += "<tr>";
            for(var j=0; j<res.fields.length;j++){
                HTML += "<td>"+ data[i][res.fields[j].name] +"</td>";
                }
                HTML += "<td> <button style='width:100%' name='editBtn'   id='"+i+"'value='"+ data[i][res.fields[0].name]+"'>Edit</button>" + "</td>";
                HTML += "<td> <button style='width:100%' name='deleteBtn' value='"+ data[i][res.fields[0].name]+"'>Delete</button>" + "</td>";
            HTML += "</tr>";
            }
    HTML += "</thred>";
    HTML +="</table>";
    document.getElementById('table').innerHTML=HTML;
    let deleteButtons =  document.getElementsByName('deleteBtn');
            for(var i=0; i<deleteButtons.length;i++){
                deleteButtons[i].addEventListener('click', function(index,tableName) {
                    deleteRowFromTable(index,tableName);
                    window.location.reload(true);
            }.bind(this, parseInt(deleteButtons[i].value),tableName));}

    let editButtons =  document.getElementsByName('editBtn');
            for(var i=0; i<editButtons.length;i++){
                editButtons[i].addEventListener('click', function(markedRow) {
                    var table = document.getElementById("table");
                    var elements=[];
                    var n = table.rows[0].cells.length - 2;
                    for(var j = 0; j < n ; j++){
                            elements.push(table.rows[markedRow].cells[j].innerHTML);
                        }
                    editTable(elements);
                 }.bind(this,parseInt(editButtons[i].id)+1));}

}

async function editTable(elements){
    var editFrom=document.querySelector('#editForm');
    editFrom.style.display='block';
    document.querySelector('#addForm').style.display='none';
    setAllElementsInForm(elements,editFrom);
    window.scrollTo(0, 0);
}

async function filterTable(form,tableName,viewName){

    items = await getAllElementsFromForm(form);
    if(items.length==2) {
        const res = await selectTable(viewName)
        drawTable(res,tableName)
        return;
    }
    var secondValue = (items.length == 4)? items[3]:null;
    const res = await selectTableCondition(viewName,items[0],items[1],items[2],secondValue)
    drawTable(res,tableName);
}


async function drawOnPage(tableName,viewName){
    const result = await selectTable(viewName)   
    drawTable(result,tableName);
}
