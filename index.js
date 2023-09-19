const { createCB } = require('xmlbuilder2');
const { createWriteStream } = require('fs');

const filename = 'members.xml';
const outFile = createWriteStream(filename);

const xmlBuilder = createCB();
xmlBuilder.on('data', (chunk) => outFile.write(chunk));
xmlBuilder.on('end', () => outFile.end());
xmlBuilder.dec({'encoding': 'UTF-8'});
xmlBuilder.ele('customers');

for (let i = 0; i < 15; i++) {
    const customer = {
        address: {
            address1: 'Dream street 33',
            address2: 'Room 2',
            city: 'New york',
            country: 'US',
            postal: '00-000',
            province: 'Maryland',
            street: 'Dream street',
        },
        agreement1: true,
        agreement2: false,
        agreement3: false,
        birthDate: '2018-02-03',
        company: {
            name: 'Corporation',
            nip: '888-22-33-334'
        },
        email: `jon_unique${getRandomInt(100000000, 999999999)}@example.com`,
        firstName: 'Jon',
        lastName: 'Doe',
        gender: 'male',
        labels: {
            label: [
                {
                    key: 'label_key_1',
                    value: 'label_value_1'
                },
                {
                    key: 'label_key_2',
                    value: 'label_value_2'
                }
            ]
        },
        loyaltyCardNumber: getRandomInt(100000000, 999999999),
        phone: `+48${getRandomInt(100000000, 999999999)}`,
    };

    xmlBuilder.ele({customer: customer});
}

xmlBuilder.end();

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
