personInfo = (firstName = '', lastName = '', age = 1) => {
    let person = { firstName, lastName, age };
    Object.entries(person).forEach( ([key, value]) => {
        console.log(`${key}: ${value}`);
    });
};