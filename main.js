
//Geolokace
if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(position => {
       var long = position.coords.longitude;
       var lat = position.coords.latitude;

       var slong = long.toString();
       var slat = lat.toString();
       const adresa = "http://api.openweathermap.org/data/2.5/weather?lat="+slat+"&lon="+slong+"&units=metric&APPID=feb85a3ae793cb712987d6a4413ea7d5";
       $.getJSON(adresa,
        function(data){
            console.log(data);

            var teplota = data.main.temp;
            var mesto = data.name;
            var oblacnost = data.clouds.all;
            var vlhkost = data.main.humidity;
            var vitr = data.wind.speed;
            var pocasi = data.weather["0"].main;
            if (pocasi == "Rain")
            {
                pocasi = "Rainy";
            }
            if (pocasi == "Snow")
            {
                pocasi = "Snow";
            }
            if (pocasi == "Clear")
            {
                pocasi = "Clear";
            }
            if (pocasi == "Clouds")
            {
                pocasi = "Clouds";
            }
            $(".teplota").append("<b>"+teplota.toFixed(0)+"°</b>");
            $(".oblacnost").append("<b>Clouds: "+oblacnost+" %</b>");
            $(".mesto").append("<b>"+mesto+"</b>");
            $(".vlhkost").append("<b>Huminity: "+vlhkost+" %</b>");
            $(".vitr").append("<b>Wind: "+vitr.toFixed(0)+" km/h</b>");
            $(".pocasi").append("<b>"+pocasi+"</b>");
        });
    });
}

//vyhledání polohy
function najdimesto()
{
    $(".teplota").html('');
    $(".oblacnost").html('');
    $(".vlhkost").html('');
    $(".vitr").html('');
    $(".pocasi").html('');
    $(".mesto").html('');
    $(".prvni").html('');
    $(".druhy").html('');
    $(".treti").html('');
    $(".ctvrty").html('');
    $(".paty").html('');
    var hledanemesto = String($('#mesto').val());
    console.log(hledanemesto);
    var today = new Date();
    var den = today.getDay();
    var dalsidny = ["Sunday","Monday","Tuesday","Wednesday","thursday","Friday","Saturday"];
$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q="+hledanemesto+"&units=metric&appid=feb85a3ae793cb712987d6a4413ea7d5",

    //předpověď
    function(dny)
    {
        console.log(dny);
        $(".mesto").append(dny.city.name);

        $(".prvni").append("<br><b>"+dalsidny[den+1]+"</b>"+"<br><br>"+dny.list[8].main.temp.toFixed(1)+"°C");
        $(".druhy").append("<br><b>"+dalsidny[den+2]+"</b>"+"<br><br>"+dny.list[16].main.temp.toFixed(1)+"°C");
        $(".treti").append("<br><b>"+dalsidny[den+3]+"</b>"+"<br><br>"+dny.list[24].main.temp.toFixed(1)+"°C");
        $(".ctvrty").append("<br><b>"+dalsidny[den+4]+"</b>"+"<br><br>"+dny.list[32].main.temp.toFixed(1)+"°C");
        $(".paty").append("<br><b>"+dalsidny[den+5]+"</b>"+"<br><br>"+dny.list[dny.cnt-1].main.temp.toFixed(1)+"°C");
        $(".teplota").append("<b>"+dny.list["0"].main.temp.toFixed(0)+"°C</b>");
        $(".oblacnost").append("<b>Cloudy: "+dny.list["0"].clouds.all+" %</b>");
        $(".vlhkost").append("<b>huminity: "+dny.list["0"].main.humidity+" %</b>");
        var wind =dny.list["0"].wind.speed*3.6;
        $(".vitr").append("<b>wind: "+wind.toFixed(1)+"km/h</b>");
        var aktpocasi = dny.list["0"].weather["0"].main;
            if (aktpocasi == "Rain")
            {
                aktpocasi = "Rainy";
            }
            if (aktpocasi == "Snow")
            {
                aktpocasi = "Snow";
            }
            if (aktpocasi == "Clear")
            {
                aktpocasi = "Clear";
            }
            if (aktpocasi == "Clouds")
            {
                aktpocasi = "Cloudy";
            }
        $(".pocasi").append("<b>"+aktpocasi+"</b>");
    });
}