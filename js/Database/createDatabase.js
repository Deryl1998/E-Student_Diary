
function createUser(){
    const query = `
            CREATE TABLE users(
            id bigserial primary key,
            name VARCHAR ( 50 ) NOT NULL,
            surname VARCHAR ( 50 ) NOT NULL,
            fk_sex BIGINT NOT NULL,
                FOREIGN KEY (fk_sex)
                      REFERENCES sex (id) ON DELETE CASCADE,
            fk_role BIGINT NOT NULL,
                 FOREIGN KEY (fk_role)
                      REFERENCES roles (id) ON DELETE CASCADE,
            login VARCHAR ( 50 ) NOT NULL,
            UNIQUE(login),
            password VARCHAR ( 50 ) NOT NULL,
            sha_code text GENERATED ALWAYS AS (encode(sha256(password::bytea), 'hex')) STORED
        );
    `;
    client.query(query, (err, res)=>{
        if(err){
            console.log("user " + err); return;
        }
        else{
            console.log("table user created"); return;
        }
    })
}

function createSex(){
    const query = `
            CREATE TABLE sex(
            id bigserial primary key,
            sex VARCHAR ( 50 ) NOT NULL
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("sex " + err); return;
    }else{
        console.log("table sex created"); return;
    }
    })
}

function createStudentClass(){
    const query = `
            CREATE TABLE student_class(
            id bigserial primary key,
            fk_class BIGINT NOT NULL,
                FOREIGN KEY (fk_class)
                      REFERENCES class (id) ON DELETE CASCADE,
            fk_student BIGINT NOT NULL,
                FOREIGN KEY (fk_student)
                    REFERENCES users (id) ON DELETE CASCADE
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("class " + err); return;
    }else{
        console.log("table student_class created"); return;
    }
    })
}


function createClass(){
    const query = `
            CREATE TABLE class(
            id bigserial primary key,
            fk_teacher BIGINT NOT NULL,
            class_name VARCHAR ( 50 ) NOT NULL
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("class " + err); return;
    }else{
        console.log("table class created"); return;
    }
    })
}

function addConstraintToClass(){
    const query = `
            ALTER TABLE class
            ADD CONSTRAINT fk_teacher
                FOREIGN KEY (fk_teacher)
                   REFERENCES users (id) ON DELETE CASCADE
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

function createSchedule(){
    const query = `
            CREATE TABLE schedule(
            id bigserial primary key,
            fk_subject BIGINT NOT NULL,
                 FOREIGN KEY (fk_subject)
                      REFERENCES teachers_subject (id) ON DELETE CASCADE,
            fk_class BIGINT NOT NULL,
                FOREIGN KEY (fk_class)
                      REFERENCES class (id) ON DELETE CASCADE,
            fk_reserved_room BIGINT NOT NULL,
                   FOREIGN KEY (fk_reserved_room)
                      REFERENCES room (id) ON DELETE CASCADE
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("schedule " + err); return;
    }else{
        console.log("table schedule created"); return;
    }
    })
}


 function createTeachersSubject(){
    const query = `
            CREATE TABLE teachers_subject(
            id bigserial primary key,
            fk_teacher BIGINT NOT NULL,
            FOREIGN KEY (fk_teacher)
                      REFERENCES users (id) ON DELETE CASCADE,
            fk_subject BIGINT NOT NULL,
                      FOREIGN KEY (fk_subject)
                                REFERENCES subject (id) ON DELETE CASCADE
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("teachers_subject " + err); return;
    }else{
        console.log("table taechers_subject created"); return;
    }
    })
}

function createSubject(){
    const query = `
            CREATE TABLE subject(
            id bigserial primary key,
            subject_name VARCHAR ( 50 ) NOT NULL
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("subject " + err); return;
    }else{
        console.log("table subject created"); return;
    }
    })
}

 function createRemarks(){
    const query = `
            CREATE TABLE remarks(
            id bigserial primary key,
            fk_teacher BIGINT NOT NULL,
                 FOREIGN KEY (fk_teacher)
                    REFERENCES users (id) ON DELETE CASCADE,
            fk_student BIGINT NOT NULL,
                   FOREIGN KEY (fk_student)
                      REFERENCES users (id) ON DELETE CASCADE,
            remark VARCHAR ( 255 ) NOT NULL
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("remarks " + err); return;
    }else{
        console.log("table remarks created"); return;
    }
    })
}


function createRoles(){
    const query = `
            CREATE TABLE roles(
            id bigserial primary key,
            role_name VARCHAR ( 50 ) NOT NULL
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("roles " + err); return;
    }else{
        console.log("table roles created"); return;
    }
    })
}

function createStudentAssessment(){
    const query = `
            CREATE TABLE student_assessment(
            id bigserial primary key,
            fk_degrees BIGINT NOT NULL,
                  FOREIGN KEY (fk_degrees)
                         REFERENCES degrees (id) ON DELETE CASCADE,
            fk_student BIGINT NOT NULL,
                  FOREIGN KEY (fk_student)
                      REFERENCES users (id) ON DELETE CASCADE,
            fk_subject BIGINT NOT NULL,
                   FOREIGN KEY (fk_subject)
                         REFERENCES teachers_subject (id) ON DELETE CASCADE
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("student_assessment " + err); return;
    }else{
        console.log("table student_assessment created"); return;
    }
    })
}

function createDegrees(){
    const query = `
            CREATE TABLE degrees(
            id bigserial primary key,
            degrees CHARACTER(3)  NOT NULL
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("degrees " + err); return;
    }else{
        console.log("table degrees created"); return;
    }
    })
}

function createRoomReservation(){
    const query = `
            CREATE TABLE room_reservation(
            id bigserial primary key,
            day_reservation DATE NOT NULL,
            fk_lesson_hours BIGINT NOT NULL,
                 FOREIGN KEY (fk_lesson_hours)
                    REFERENCES lesson_hours (id) ON DELETE CASCADE ,
            fk_room BIGINT NOT NULL,
                 FOREIGN KEY (fk_room)
                    REFERENCES room (id) ON DELETE CASCADE
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("room_reservation " + err); return;
    }else{
        console.log("table room_reservation created"); return;
    }
    })
}

 function createRoom(){
    const query = `
            CREATE TABLE room(
            id bigserial primary key,
            room_name VARCHAR ( 50 ) NOT NULL
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("room " + err); return;
    }else{
        console.log("table room created"); return;
    }
    })
}

 function createLessonHours(){
    const query = `
            CREATE TABLE lesson_hours(
            id bigserial primary key,
            start_time TIME NOT NULL,
            end_time TIME  NOT NULL
        );
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("lesson_hours " + err); return;
    }else{
        console.log("table lesson_hours created"); return;
    }
    })
}

async function isExists (tableName){
    const query ={
        text:`SELECT FROM information_schema.tables WHERE table_name= $1::text`,
        values: [tableName],
    }
    const result = await client.query(query);
return result.rowCount;
}


function createDatabaseUsers(){
     const query = `
            CREATE USER student NOSUPERUSER NOCREATEDB NOCREATEROLE LOGIN PASSWORD 'student';
            CREATE USER teacher NOSUPERUSER NOCREATEROLE LOGIN PASSWORD 'teacher';
    

            REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM student;
            REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM teacher;
            
            GRANT USAGE ON SCHEMA public  TO student;
            GRANT USAGE ON SCHEMA public TO teacher;
            GRANT SELECT,REFERENCES on all tables in schema public  TO student;
            GRANT SELECT,REFERENCES,INSERT,UPDATE on all tables in schema public TO teacher;
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log("Database roles " + err); return;
    }
    })


}


async function createTables(){
    //connect();
    if(await isExists("room") == 0){ 
        createRoom();
    }
    if(await isExists("roles") == 0){
        createRoles()
    } 
    if(await isExists("degrees") == 0) {
        createDegrees();
    }
    if(await isExists("lesson_hours") == 0) {
        createLessonHours();
    }
    if(await isExists("room_reservation") == 0){
        createRoomReservation();
    }
    if(await isExists("users") == 0) {
        createClass();
        createSex();
        createUser();
        addConstraintToClass();
    }
    if(await isExists("remarks") == 0) {
        createRemarks();
    }
    if(await isExists("subject") == 0){
        createSubject();
        createTeachersSubject();
    }
    if(await isExists("student_assessment") == 0) {
        createStudentAssessment();
    }
    if(await isExists("student_class") == 0) {
        createStudentClass();
    }
    if(await isExists("schedule") == 0) {
        createSchedule();
        generateData();
        createAllViews();
        createDatabaseUsers();
    }
   // disconnect();
}

createTables();