

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

function selectTable(tableName){
    const query = `
    SELECT * FROM `+tableName+`; `;
    return client.query(query)
}

function selectUsersFullName(role){
    const query = `
    SELECT id,name ||' '|| surname FROM users WHERE fk_role='`+role+`'`;
    return client.query(query)
}

function selectColumnsFromTable(tableName){
    const query = `
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name   = '`+tableName+`'; `;
    return client.query(query)
}

async function selectTableCondition(tableName,col1,condition1,col2=null,condition2=null){

    var condition =col1+" ='"+condition1+"'";
    if(condition2!= null)
        condition +="AND "+ col2+"= '"+condition2+"'";
    const query =`SELECT * FROM `+tableName+` where `+condition+`;`;
    return await client.query(query);
}




async function addToTable(tableName,values){
    const columns = await getColumnNames(tableName);
    var query =` INSERT INTO `+tableName+` ( `; 

    for(var i=1 ; i < columns.length ;i++){
        
        query+=columns[i];
        if( i < columns.length-1) query+=`,`;
        else query+=`) VALUES (`
    }

    for(var i=0 ; i < values.length ;i++){
        
        query+=`'`+values[i]+`'`;
        if( i < values.length-1) query+=`,`;
        else query+=`)`
    }
    await client.query(query);
}

async function uptadeTable(tableName,values){
    const columns = await getColumnNames(tableName);
    var query =` UPDATE `+tableName+` SET `; 

    for(var i=1 ; i < columns.length ;i++){
        query+=columns[i]+`='`+values[i]+`'`;
        if( i < columns.length-1) query+=`, `;
    }
    query+=` WHERE id='`+values[0]+`'`;
    await client.query(query);
}



