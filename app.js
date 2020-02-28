
/**
 * FANUC ROBOT HTTP SERVER CLIENT
 * @Auhthor Kapelajii2020
 */

//Luo ohjelmaan luuppi, joka pyörii ikuisesti
const main_loop = () => {
  setTimeout(() => {
    // tallennetaan ohjelman aloitusaika  
    const start_time_stamp = new Date();
    // haetaan akseliarvot serveriltä 
    const axios = require("axios");
    axios.get("https://fanuc-robot-http-server.herokuapp.com/").then(res => {
    // console.log(res);

        // Etsitään regexp avulla Joint   1:    -78.72 vastaava merkkijono kaikille 6 akselille
        const regexp = /Joint   \d{1}:    ([-| ]\d{1,2}.\d{1,2})/g;
        let joints = [];
        // tallennetaan kaikki regexp vastaavat merkkijonot talteen
        let matches = res.data.matchAll(regexp);
        let count = 0;
        for (const match of matches) {
            count++;
            // koska datassa esiintyy vastaanvanlaisia merkkijonoja
            // halutaan vain kuusi ensimmäistä merkkijonoa talteen
            // nämä ovat tarvittavat akseleiden arvot
            if (count > 6) break;

            // parsitaan merkkijono desimaaliluvuksi
            const value = parseFloat(match[1]);
            // lisätään parsittu luku taulukkoon
            joints.push(value);
            } 

        // tulosta jokaisella kierroksella aikaleima, nivelarvot lista ja pyyntöön kulunut aika
        // tallennetaan haun lopetusaika 
        const time_stamp = new Date();
        const delta = time_stamp - start_time_stamp; 
        //toISOString() komennolla saadan ajan formaatti muutettu ISO-standardin mukaiseksi
        console.log(time_stamp.toISOString()+" [ " +joints +" ] "+delta+" ms")
});
    main_loop();
  }, 10);
};
main_loop();
