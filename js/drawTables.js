
function drawTable(viewName,tableName){
    document.getElementById('table').innerHTML=null;
    const query = `
    SELECT * FROM `+viewName+`; `;
    client.query(query, (err, res)=>{
        if(err){
            return;
        }
        else {
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
                        HTML += "<td contenteditable='true'>"+ data[i][res.fields[j].name] +"</td>";
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
                    drawTable(viewName,tableName);
            }.bind(this, parseInt(deleteButtons[i].value),tableName));}
          

            let editButtons =  document.getElementsByName('editBtn');
            for(var i=0; i<editButtons.length;i++){
                editButtons[i].addEventListener('click', function(index,tableName,markedRow) {
                    var table = document.getElementById("table");
                    var elements=[];
                    var n = table.rows[0].cells.length;
                        for(var j = 0; j < n-2 ; j++){
                             elements.push(table.rows[markedRow].cells[j].innerHTML);
                        }
                   if(tableName=="users") editUser(elements,index);
                   if(tableName=="sala") editRoom(elements,index);
                   if(tableName=="przedmiot") editSubject(elements,index);
                   if(tableName=="planZajec") editSchedule(elements,index);
                   if(tableName=="uwagi") editRemarks(elements,index);
                   if(tableName=="klasa") editClass(elements,index);
                   if(tableName=="oceny") editStudentAssessment(elements,index);
            }.bind(this, parseInt(editButtons[i].value),tableName,parseInt(editButtons[i].id)+1));}

        }
    })
}

