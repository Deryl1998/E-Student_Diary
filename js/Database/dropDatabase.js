function dropUser(userName){
    const query = `
    REASSIGN OWNED BY `+ userName +` TO postgres;
    REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM `+ userName +`;
    REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM `+ userName+`;
    REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM `+ userName+`;
    REVOKE ALL ON SCHEMA public FROM ` +userName+`;
    Drop user `+ userName+`;
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    console.log("usunieto " + userName);
    })
}

function dropTables(){
    const query = `
    DROP TABLE IF EXISTS
    users,
    class,
    schedule,
    subject,
    remarks,
    roles,
    student_assessment,
    degrees,
    room_reservation,
    room,
    sex,
    student_class,
    teachers_subject,
    lesson_hours CASCADE ;
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    console.log("deleted tables");
    })
}

function dropALLDATABASE(){
    const query = `
    DROP DATABASE IF EXISTS
    postgres WITH (FORCE);
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    console.log("Database was deleted");
    })
}

function dropDataBase(){
    dropTables();
    window.alert("database was deleted");
}
