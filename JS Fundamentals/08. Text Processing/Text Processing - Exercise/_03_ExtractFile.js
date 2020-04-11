extractFile = (path) => {
    let file = path.match(/(?<name>[a-zA-Z0-9\._\- ]+)\.(?<extension>[a-zA-Z]+)$/).groups;
    console.log(`File name: ${file.name}\nFile extension: ${file.extension}`);
}