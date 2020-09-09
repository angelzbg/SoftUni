// koito e pisal inputa i testovete za tazi zadacha e za psiholog. daje nqma da si pravq truda da q reshavam
class Kitchen {
    constructor(budget) {
        this.budget = +budget;
        this.menu = {};
        this.productsInStock = {}
        this.actionsHistory = []
    }
    loadProducts(products) {  //["product quantity price", ...
        let messageLog = []
        for (let entry of products) {
            entry = entry.split(' ')
            //let [product, quantity, price] = entry.split(' ')
            let price = +entry.pop()
            let quantity = +entry.pop()
            let product = entry.join(' ')
            if (this.budget - price >= 0) {
                if (this.productsInStock[product]) this.productsInStock[product] += quantity
                else this.productsInStock[product] = quantity
                this.budget -= price
                messageLog.push( `Successfully loaded ${quantity} ${product}`) //test 3
            } else {
                messageLog.push(`There was not enough money to load ${quantity} ${product}`)//test 4
            }
        }
        //this.actionsHistory.push(messageLog.join('\n'))
        this.actionsHistory = [...this.actionsHistory, ...messageLog]
        return this.actionsHistory.join('\n')  //test 5 pass
       
    }
    addToMenu(meal, neededIngs, price) {  //neededIngs = ['product quantity', ...
        if (!this.menu[meal]) {
            // this.menu[meal] = [neededIngs, +price]
            this.menu[meal] = {
                products: neededIngs,
                price: +price
            }
            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals on the menu, other ideas?` //? no effect //TEST 6 ERROR
        } else return `The ${meal} is already in our menu, try something different.` //test 7 - pass
 
    }
    showTheMenu() {
        let toPrint = []
        for (let key of Object.keys(this.menu)) {
            toPrint.push(`${key} - $ ${this.menu[key].price}`)
        }
        if (!toPrint.length) return ('Our menu is not ready yet, please come later...') //test 8 pass
        else {return toPrint.join('\n') + '\n'} // // TEST 9 ERROR
 
    }
    makeTheOrder(meal) {
        if (!this.menu[meal]) return (`There is not ${meal} yet in our menu, do you want to order something else?`)
        //check for products          
        let ingredientsNeeded = this.menu[meal].products
        for (let item of ingredientsNeeded) {  //item = 'product quantity'
            item = item.split(' ')
            let quantity = +item.pop()
            let product = item.join(' ')
            //let [product, quantity] = item.split(' ')
            if (this.productsInStock[product] < quantity || !this.productsInStock[product]) {
                return (`For the time being, we cannot complete your order (${meal}), we are very sorry...`) // test 15
            }
        }
 
        for (let item of ingredientsNeeded) {
            item = item.split(' ')
            let quantity = +item.pop()
            let product = item.join(' ')
            this.productsInStock[product] -= quantity
        } this.budget += this.menu[meal].price
        return (`Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`) //test 13 pass
    }
}