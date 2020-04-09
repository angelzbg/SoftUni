personInfo = (firstName, lastName, age) => {
    let person = { firstName, lastName, age };
    Object.entries(person).forEach( ([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}