const bcrypt = require('bcrypt')

async function generateRoles(){
    const query = `
    INSERT INTO roles (role_name) VALUES
    ('Student'),
    ('Teacher'),
    ('Admin');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    })
}

async function generateDegrees(){
    const query = `
    INSERT INTO degrees (degrees) VALUES
    ('2'),
    ('2,5'),
    ('3'),
    ('3,5'),
    ('4'),
    ('4,5'),
    ('5'),
    ('5,5');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err);
        return;
    }
    })
}

async function generateLessonHours(){
    const query = `
    INSERT INTO lesson_hours (start_time,end_time) VALUES
    ('8:00', '9:40'),
    ('9:50', '11:20'),
    ('11:30', '13:10'),
    ('13:20', '14:50'),
    ('16:00', '17:30'),
    ('17:40', '19:20');
    `;
    client.query(query, (err, res)=>{
    if(err){
        return;
    }
    })
}

async function generateRoom(){
    const query = `
    INSERT INTO room (room_name) VALUES
    ('1a'),
    ('2a'),
    ('3a'),
    ('4a'),
    ('1b'),
    ('2b'),
    ('3b'),
    ('4b'),
    ('5a');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateRoomReservation(){
    const query = `
    INSERT INTO room_reservation (day_reservation,fk_lesson_hours,fk_room) VALUES
    ('2022-03-01','1','1'),
    ('2022-03-02','2','1'),
    ('2022-03-03','3','2'),
    ('2022-03-04','4','1'),
    ('2022-03-05','5','3'),
    ('2022-03-06','6','1');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateSex(){
    const query = `
    INSERT INTO sex (sex) VALUES
    ('Men'),
    ('Female');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}


async function generateUser(){
    //password = await bcrypt.hash('password',50);
    const query = `
    INSERT INTO users (name,surname,fk_sex,fk_role,login,password) VALUES
    ('Kamil','Frac','1','3','login1','password'),
    ('Bartosz','Kowalski','1','1','login2','password'),
    ('Dawid','Nowak','1','1','login3','password'),
    ('Marian','Mak','1','1','login4','password'),
    ('Milosz','Babiak','1','1','login5','password'),
    ('Bartek','Bobek','1','1','login6','password'),
    ('Mariusz','Caba','1','1','login7','password'),
    ('Oskar','Cach','1','1','login8','password'),
    ('Arkadiusz','Sabatowski','1','1','login9','password'),
    ('Weronika','Gabor','2','1','login10','password'),
    ('Anna','Wac','2','1','login11','password'),
    ('Marlena','Sum','2','1','login12','password'),
    ('Natalia','Nadzyk','2','1','login13','password'),
    ('Janusz','Mlot','1','2','login14','password'),
    ('Wlodzimierz','Nowak','1','2','login15','password'),
    ('Mariola','Olsz','2','2','login16','password'),
    ('Grazyna','Czernicka','2','2','login17','password');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateRemarks(){
    const query = `
    INSERT INTO remarks (fk_teacher,fk_student,remark) VALUES
    ('14','2','late for class'),
    ('15','3','poor academic performance'),
    ('15','4','truancy'),
    ('14','5','interferes with class');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateClass(){
    const query = `
    INSERT INTO class (fk_teacher,class_name) VALUES
    ('15','1a'),
    ('14','1b'),
    ('16','2a'),
    ('17','2b');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateTeachersSubject(){
    const query = `
    INSERT INTO teachers_subject (fk_teacher,fk_subject) VALUES
    ('14','1'),
    ('14','2'),
    ('15','3'),
    ('15','4'),
    ('16','5'),
    ('16','7'),
    ('17','3');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateSubject(){
    const query = `
    INSERT INTO subject (subject_name) VALUES
    ('Nature'),
    ('Physics'),
    ('Mathematics'),
    ('English'),
    ('History'),
    ('Informatics'),
    ('Physical exercises');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateStudentAssessment(){
    const query = `
    INSERT INTO student_assessment (fk_degrees,fk_student,fk_subject) VALUES
    ('1','3','1'),
    ('2','4','1'),
    ('3','5','2'),
    ('2','3','1'),
    ('3','4','1'),
    ('4','5','2'),
    ('1','5','2'),
    ('4','3','1'),
    ('2','4','1'),
    ('3','5','2'),
    ('4','6','4'),
    ('2','7','5'),
    ('3','8','2'),
    ('1','6','4'),
    ('4','7','5'),
    ('5','8','2'),
    ('4','5','2'),
    ('7','2','7'),
    ('1','9','2'),
    ('4','6','3');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateSchedule(){
    const query = `
    INSERT INTO schedule (fk_subject,fk_class,fk_reserved_room) VALUES
    ('1','1','1'),
    ('2','2','2'),
    ('1','2','3');
    `;
    client.query(query, (err, res)=>{
    if(err){
        console.log(err); return;
    }
    })
}

async function generateData(){
    await generateSex();
    await generateRoles();
    await generateDegrees();
    await generateLessonHours();
    await generateRoom();
    await generateRoomReservation();
    await generateUser();
    await generateRemarks();
    await generateClass();
    await generateSubject();
    await generateTeachersSubject();
    await generateStudentAssessment();
    await generateSchedule();
}