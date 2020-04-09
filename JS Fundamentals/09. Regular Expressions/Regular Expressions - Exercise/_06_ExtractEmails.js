extractEmails = ([input]) => {
    let pattern = /(?<=\s)[a-z0-9]+([\._-]?[a-z0-9]+)?@[a-z]+\-?[a-z]+(\.[a-z]+\-?[a-z])+/g;
    while( (result = pattern.exec(input)) !== null ) {
        console.log(result[0]);
    }
}


extractEmails([ 'Please contact us at: support@github.com.' ]);
extractEmails([ 'Just send email to s.miller@mit.edu and j.hopking@york.ac.uk for more information.' ]);
extractEmails([ 'Many users @ SoftUni confuse email addresses. We @ Softuni.BG provide high-quality training @ home or @ class. –- steve.parker@softuni.de.' ]);