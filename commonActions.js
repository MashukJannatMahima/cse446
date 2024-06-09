const fs = require('fs')


// This function and it will return the user you want
const findUser = async (username) => {

    const allUser = await readDataFromFile( 'user'  )

    const targetUser = allUser.filter( ( element ) => {
        if( element.username === username ){
            return element.username
        }
    })

    return targetUser[0]
}


// This function adds data into the existing data list.
/*  NOTE: while calling the function you need to pass the "data" which will be stored and 
          "dbName" that has value either "user" or "post" since we are storing these two data into two different file.
          "dbName" is being used to tell the function in where to store the data
*/
const writeDataIntoFile = async ( data, dbName ) => {
    try {
        const dataToStore = data
        
        const allData = await readDataFromFile(dbName)

        // adding the new data to the array
        allData.push( dataToStore )

        // converting it to string format since "writeFile" does not support raw array or object
        const stringifyData = JSON.stringify(allData) 
        
        const dbPath = dbName === 'post' ? './Data/DUMMY_POST_DB.js' : './Data/DUMMY_USER_DB.js' 
        await fs.promises.writeFile(dbPath, stringifyData)

        return { message: 'data updated', data: dataToStore }
        
    } catch ( err ) {
        console.error( err )
    }
}


// This function fetches all the available data 
/*
    NOTE: while calling the function you need to pass "dbName" that has value either "user" or "post" since we are storing these two data into two different file.
          "dbName" is being used to tell the function from which file we want to fetch data
*/
const readDataFromFile = async (dbName) => {
    try {
        const dbPath = dbName === 'post' ? './Data/DUMMY_POST_DB.js' : './Data/DUMMY_USER_DB.js' 
        const fileData = await fs.promises.readFile(dbPath)
            
        const stringified = fileData.toString();

        // if the file is empty
        if( !stringified){
            return []
        } 

        const parsedData = JSON.parse( fileData )

        // if the file cannot be parsed
        if( !parsedData  ){
            return []
        }

        return parsedData 
        
    } catch ( err ) {
        console.error( err )
    }
}


// if you want to use any function available in this file from outside of this file, you need to add the function name below.
module.exports = { writeDataIntoFile, readDataFromFile, findUser }
