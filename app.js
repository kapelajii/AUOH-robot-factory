
/**
 * FANUC ROBOT HTTP SERVER CLIENT
 * @Auhthor Kapelajii2020
 */

const axios = require("axios");
axios.get("https://fanuc-robot-http-server.herokuapp.com/").then(res => {
  console.log(res);

  // Etsitään regexp avulla Joint   1:    -78.72 vastaava merkkijono kaikille 6 akselille
  const regexp = /Joint   \d{1}:    ([-| ]\d{1,2}.\d{1,2})/g;
  let joints = [];
  // tallennetaan kaikki regexp vastaavat merkkijonot talteen
  let matches = res.data.matchAll(regexp);
  let count = 0;
  for (const match of matches) {
    count++;
    // koska datassa esiintyy vastaanvanlaisia merkkijonoja
    // myöhemmin halutaan vain kuusi ensimmäistä merkkijonoa talteen
    // nämä ovat tarvittavat akseleiden arvot
    if (count > 6) break;

    // parsitaan merkkijono desimaaliluvuksi
    const value = parseFloat(match[1]);
    // lisätään parsittu luku taulukkoon
    joints.push(value);
}

console.log(joints)
});


/* //Luo ohjelmaan luuppi, joka pyörii ikuisesti
const main_loop = () => {
  setTimeout(() => {
    //Koodi
    main_loop();
  }, 10);
};
main_loop();
//Tulosta jokaisella kierroksella aikaleima, nivelarvot lista ja pyyntöön kulunut aika
//Alla vinkkejä aikaleiman luomiseen ja viiveen laskemiseen
const time_stamp = new Date();
const delta = time_stamp - start_time_stamp; */
