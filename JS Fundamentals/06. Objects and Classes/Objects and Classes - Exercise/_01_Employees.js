employees = (input = []) => {
    input.forEach((name) => {
        let employee = {
            // pointless
            name,
            number: name.length,
        };

        console.log(`Name: ${employee.name} -- Personal Number: ${employee.number}`);
    });
};
