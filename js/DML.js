

function deleteRowFromTable(index,tableName){
    if(index <= 0) return;
    const query = `
    DELETE FROM `+tableName+`
    WHERE id = $1;
    `;
    client.query(query,[parseInt(index)],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("Deleted from "+tableName+" row  "+index);
    }
    })
}

function addUser(elements){
   
    const query = `
    INSERT INTO users (name, surname,fk_sex,fk_role,login,password) VALUES
    ($1,$2,$3,$4,$5,$6)
    `;
    client.query(query,[
        elements[0],elements[1],parseInt(elements[2]),
        parseInt(elements[3]),elements[4],elements[5]
    ],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("user added");
    }
    })
}

function editUser(elements,id){
    let classValue;
    if(elements[5] != "") classValue = parseInt(elements[5]);
    else classValue = null;
    const query = `
    UPDATE "uzytkownik"
    SET
    "imie"= $1,
    "nazwisko"= $2,
    "uprawnienie"= $3,
    "login"= $4,
    "haslo"= $5,
    "klasa"= $6
    WHERE 
    "id"= $7
    `;
    client.query(query,[
        elements[1],elements[2],parseInt(elements[3]),
        elements[4],elements[5],classValue,parseInt(id)
    ],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("edytowano");
    }
    })
}

function editUserView(elements,id){
    let classValue = null;
    if(elements[3] != "null") classValue=parseInt(elements[3]);
    const query = `
    UPDATE "user_view"
    SET
    "imie"= $1,
    "nazwisko"= $2,
    "klasa"= $3
    WHERE 
    "id"= $4
    `;
    client.query(query,[
        elements[1],elements[2],classValue,parseInt(id)
    ],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("edytowano");
    }
    })
}

function addSchedule(elements){
    const query = `
    INSERT INTO planZajec (przedmiot,klasa,zarezerwowana_sala) VALUES
    ($1,$2,$3)
    `;
    client.query(query,[
        parseInt(elements[0]),parseInt(elements[1]),parseInt(elements[2])
    ],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("dodano");
    }
    })
}

function editSchedule(elements,id){
    const query = `
    UPDATE "planzajec"
    SET
    "przedmiot"= $1,
    "klasa"= $2,
    "zarezerwowana_sala"= $3
    WHERE 
    "id"= $4
    `;
    client.query(query,[
        parseInt(elements[1]),parseInt(elements[2]), parseInt(elements[3]),id
    ],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("edytowano");
    }
    })
}


function addSubject(elements){
    console.log(elements[0])
    const query = `
    INSERT INTO przedmiot (prowadzacy,nazwa_przedmiotu) VALUES
    ($1,$2)
    `;
    client.query(query,[elements[0],elements[1]],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("dodano");
    }
    })
}

function editSubject(elements,id){
    const query = `
    UPDATE "przedmiot"
    SET
    "prowadzacy"= $1,
    "nazwa_przedmiotu"= $2
    WHERE 
    "id"= $3
    `;
    client.query(query,[parseInt(elements[1]),elements[2],id],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("edytowano");
    }
    })
}

function addRemarks(elements){
    const query = `
    INSERT INTO uwagi (nauczyciel,uczen,uwaga) VALUES
    ($1,$2,$3)
    `;
    client.query(query,[parseInt(elements[0]),parseInt(elements[1]),
    elements[2]
        ],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("dodano");
    }
    })
}

function editRemarks(elements,id){
    const query = `
    UPDATE "uwagi"
    SET
    "nauczyciel"= $1,
    "uczen"= $2,
    "uwaga"= $3
    WHERE 
    "id"= $4
    `;
    client.query(query,[parseInt(elements[1]),parseInt(elements[2]),
    elements[3],id
        ],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("edytowano");
    }
    })
}

function addRoom(elements){
    const query = `
    INSERT INTO sala (nazwa_sali) VALUES
    ($1)
    `;
    client.query(query,[elements[0]],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("dodano");
    }
    })
}

function editRoom(elements,id){
    const query = `
    UPDATE "sala"
    SET
    "nazwa_sali"= $1
    WHERE 
    "id"= $2
    `;
    client.query(query,[elements[1],parseInt(id)],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else console.log("edytowano");
    })
}


function addClass(elements){
    const query = `
    INSERT INTO klasa (wychowawca,nazwaklasy) VALUES
    ($1,$2)
    `;
    client.query(query,[parseInt(elements[0]),elements[1]],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("dodano");
    }
    })
}

function editClass(elements,id){
    const query = `
    UPDATE "klasa"
    SET
    "wychowawca"= $1,
    "nazwaklasy"= $2
    WHERE 
    "id"= $3
    `;
    client.query(query,[parseInt(elements[1]),elements[2],parseInt(id)],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("edytowano");
    }
    })
}

function addStudentAssessment(elements){
    const query = `
    INSERT INTO oceny (stopien,uczen,przedmiot) VALUES
    ($1,$2,$3)
    `;
    client.query(query,[parseInt(elements[0]),parseInt(elements[1]),parseInt(elements[2])],(err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("dodano");
    }
    })
}

function editStudentAssessment(elements,id){
    const query = `
    UPDATE "oceny"
    SET
    "stopien"= $1,
    "uczen"= $2,
    "przedmiot"= $3
    WHERE 
    "id"= $4
    `;
    client.query(query,[parseInt(elements[1]),parseInt(elements[2]),parseInt(elements[3]),parseInt(id)],
    (err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("edytowano");
    }
    })
}


