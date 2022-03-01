

function createUsersView(){
    const query = `
          CREATE OR REPLACE VIEW "users_view" AS SELECT 
          users.id,users.name,users.surname,sex.sex,roles.role_name
          FROM users
          INNER JOIN "sex"
          on users.fk_sex = sex.id
          INNER JOIN "roles"
          on users.fk_role = roles.id;
        ;
    `;
    client.query(query, (err, res)=>{
        if(err){
            console.log("users_view created " + err); return;
        }
    })
}


function createStudentAssessmentView(){
    const query = `
          CREATE OR REPLACE VIEW "student_assessment_view" AS SELECT
          degrees.degrees, users.name,users.surname, subject.subject_name
          FROM student_assessment
          INNER JOIN "degrees"
          on student_assessment.fk_degrees = degrees.id
          INNER JOIN "users"
          on student_assessment.fk_student = users.id
          INNER JOIN "subject"
          on student_assessment.fk_subject = subject.id;
        ;
    `;
    client.query(query, (err, res)=>{
        if(err){
            console.log("student_assessment_view " + err); return;
        }
    })
}

function createClassView(){
   const query = `
          CREATE OR REPLACE VIEW "class_view" AS SELECT
          class.id,users.name ||' '|| users.surname as Teacher,class.class_name
          FROM class
          INNER JOIN "users"
          on class.fk_teacher = users.id;
        ;
    `;
    client.query(query, (err, res)=>{
        if(err){
            console.log("class_view " + err); return;
        }
    })
}

function createScheduleView(){
    const query = `
          CREATE OR REPLACE VIEW "schedule_view" AS SELECT
          schedule.id,subject.subject_name,class.class_name, room.room_name,lesson_hours.start_time,
          lesson_hours.end_time, TO_CHAR(schedule.day_reservation :: DATE,'dd/mm/yyyy') as day
          FROM schedule

          INNER JOIN "teachers_subject"
          on schedule.fk_subject = teachers_subject.id
                 INNER JOIN "subject"
                 on teachers_subject.fk_subject = subject.id

          INNER JOIN "class"
          on schedule.fk_class = class.id

          INNER JOIN "lesson_hours"
          on schedule.fk_lesson_hours = lesson_hours.id
          INNER JOIN "room"
          on schedule.fk_room = room.id;
        ;
    `;
    client.query(query, (err, res)=>{
        if(err){
            console.log("schedule_view " + err); return;
        }
    })
}

 function createRemarksView(){
    const query = `
           CREATE OR REPLACE VIEW "remarks_view" AS SELECT
           remarks.id,users.name || ' ' || users.surname as Teacher,remarks.fk_student,
           remarks.remark
           FROM remarks
           INNER JOIN "users" 
           on remarks.fk_teacher = users.id;
         ;
     `;
     client.query(query, (err, res)=>{
         if(err){
             console.log("class_view " + err); return;
         }
     })
 }

 function createStudentAssessmentView(){
    const query = `
           CREATE OR REPLACE VIEW "student_assessment_view" AS SELECT
           student_assessment.id,degrees.degrees,users.name || ' ' || users.surname as full_name, subject.subject_name
           FROM student_assessment
           INNER JOIN "users" 
           on student_assessment.fk_student = users.id
           INNER JOIN "degrees" 
           on student_assessment.fk_degrees = degrees.id
           INNER JOIN "subject" 
           on student_assessment.fk_subject = subject.id;
         ;
     `;
     client.query(query, (err, res)=>{
         if(err){
             console.log("class_view " + err); return;
         }
     })
 }

function selectStudent(){
    const query = `
    godziny_lekcyjne_view where stopien >
    (
        Select stopien From godziny_lekcyjne_view WHERE id = 1
    )
`;
  return query;
}

function selectUsers(){
    const query = `
    user_view where imie in
    (
        Select imie From Uzytkownik WHERE uprawnienie = 1
    )
`;
  return query;
}

function selectScheduleView(){
    const query = `
    planZajec_view where nazwaKlasy in
    (
        Select nazwaKlasy From klasa WHERE id = 1
    )
`;
  return query;
}

function selectClassView(){
    const query = `
    klasa_view where imie in
    (
        Select imie From Uzytkownik WHERE id=1
    )
`;
  return query;
}

function createAllViews(){
    createStudentAssessmentView();
    createUsersView();
    createClassView();
    createScheduleView();
    createRemarksView();
    createStudentAssessmentView();
}
