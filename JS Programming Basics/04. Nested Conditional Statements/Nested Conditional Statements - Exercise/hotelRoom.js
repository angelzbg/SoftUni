(input) => {
    const month = input.shift();
    const nights = Number(input.shift());

    const table ={
        'May': { studio: 50, apartment: 65, multStudio: nights > 14 ? 0.7 : nights > 7 ? 0.95 : 1},
        'October': { studio: 50, apartment: 65, multStudio: nights > 14 ? 0.7 : nights > 7 ? 0.95 : 1},
        'June': { studio: 75.2, apartment: 68.7, multStudio: nights > 14 ? 0.8 : 1},
        'September': { studio: 75.2, apartment: 68.7, multStudio: nights > 14 ? 0.8 : 1},
        'July': { studio: 76, apartment: 77, multStudio: 1},
        'August': { studio: 76, apartment: 77, multStudio: 1},
    };

    const multApartment = nights > 14 ? 0.9 : 1;

    console.log(`Apartment: ${(table[month].apartment*nights*multApartment).toFixed(2)} lv.`);
    console.log(`Studio: ${(table[month].studio*nights*table[month].multStudio).toFixed(2)} lv.`);
}