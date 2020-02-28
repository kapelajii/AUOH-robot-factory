const axios = require("axios");
axios.get("https://fanuc-robot-http-server.herokuapp.com/").then(res => {
  console.log(res);
  const regexp = /Joint   \d{1}:    ([-| ]\d{1,2}.\d{1,2})/g;
  let joints = [];
  let matches = res.data.matchAll(regexp);
  let count = 0;
  for (const match of matches) {
   count++;
   if (count > 6) break;
    const value = parseFloat(match[1]);
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
