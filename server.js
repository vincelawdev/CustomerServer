const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customers = require('./customers.json');

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(cors());

app.post('/search', (req, res) => {
    try {
        const {first_name, surname, email, mobile} = req.body;

        const checkFieldMatches = (customer, search, propertyName) => {
            if (typeof search === 'undefined' || search === '') {
                return true;
            }
            if (typeof customer[propertyName] === 'undefined') {
                return false;
            }
            return customer[propertyName].toLowerCase() === search.toLowerCase();
        }
    
        const filterFields = (customer) => {
            return checkFieldMatches(customer, first_name, 'first_name') && 
                checkFieldMatches(customer, surname, 'surname') && 
                checkFieldMatches(customer, email, 'email') && 
                checkFieldMatches(customer, mobile, 'mobile');
        };
    
        res.send(customers.filter(filterFields));
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error')
    }    
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Customer Server listening on port ${port}!`));
