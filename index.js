let express = require('express');
let fetch = require('node-fetch');

let application = express();
application.set('port', process.env.PORT || 3000);

application.get('/api/weather', (request, response) => {
    let appId = '6f74f0373d6297d58a4d9f7e65cf022d';
    let zipCode = request.query.zipcode;
    let endpoint = 'http://api.openweathermap.org/data/2.5/weather?zip='+ zipCode + '&appid=' + appId;  

    let date = new Date();
    let dateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    console.log(dateTime + '|API Request|' + request.url); 
    console.log(dateTime + '|Zip Code|' + zipCode); 
    console.log(dateTime + '|Endpoint|' + endpoint);
    
    fetch(endpoint)
        .then((res) => {
            let date = new Date();
            let dateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

            if (res.status !== 200) {
                console.log(dateTime + '|Error|' + res.status);
                return;
            }

            return res.json();
        })
        .then((json) => {
            console.log(json);
            response.json(json);
        })
        .catch((error) => {
            console.log(error);
        });    
});

const port = application.get('port');
application.listen(port, () => {
    console.log('Application listening on port ' + port + '!');
});