(input) => {
    const kvm = Number(input.shift());
    const finalPrice = kvm*7.61;
    console.log("The final price is: " + (finalPrice*0.82).toFixed(2) + " lv.");
    console.log("The discount is: " + (finalPrice*0.18).toFixed(2) + " lv.")
}