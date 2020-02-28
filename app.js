

const axios = require('axios');
axios.get('https://fanuc-robot-http-server.herokuapp.com/')
 .then((res) => {
 console.log(res);
 });
