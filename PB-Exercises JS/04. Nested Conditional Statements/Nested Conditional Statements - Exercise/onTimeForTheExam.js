(input) => {
    let HourIzpit = Number(input.shift());
    let MinIzpit = Number(input.shift());
    let HourPrist = Number(input.shift());
    let MinPrist = Number(input.shift());
    let ObMinIzpit = HourIzpit * 60 + MinIzpit;
    let ObMinPrist = HourPrist * 60 + MinPrist;
    if (ObMinIzpit==ObMinPrist || (ObMinIzpit>ObMinPrist && ObMinIzpit-ObMinPrist<=30))
    {
        console.log("On time");
    }
    if (ObMinIzpit > ObMinPrist && ObMinIzpit - ObMinPrist >30)
    {
        console.log("Early");
    }
    if (ObMinPrist>ObMinIzpit)
    {
        console.log("Late");
    }
    if (Math.abs(ObMinPrist-ObMinIzpit)!=0)
    {
        let hours = Math.floor(Math.abs(ObMinPrist - ObMinIzpit) / 60);
        let mins = Math.abs(ObMinPrist - ObMinIzpit) % 60;
        if (hours >=1)
        {
            if (mins < 10) console.log(hours + ":0" + mins + " hours");
            else console.log(hours + ":" + mins + " hours");
        }
        else console.log(mins + " minutes");
        if ((ObMinPrist - ObMinIzpit) < 0)
            console.log(" before the start");
        else
            console.log(" after the start");
    }
}