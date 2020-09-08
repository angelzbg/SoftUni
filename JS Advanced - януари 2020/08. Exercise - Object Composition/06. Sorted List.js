sortedList = (list = []) => ({
    add: (el) => list.splice((list.findIndex((n) => n > el) + 1 || list.length + 1) - 1, 0, el),
    remove: (index) => (list[index] !== undefined ? list.splice(index, 1) : undefined),
    get: (index) => list[index],
    get size() {
        return list.length;
    },
});

var myList = sortedList();
for (let i = 0; i < 10; i++) {
    myList.add(i);
}
myList.remove(9);
console.log(myList.size);
myList.remove(5);
console.log(myList.size);
myList.remove(0);
console.log(myList.size);
