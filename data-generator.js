const Chance = require('chance');
const chance = new Chance();
const fs = require('fs');

const ACTIVITY_TYPES = ['Call', 'SMS', ''];
const date = {start: 1491019200000, end:1493524800000}
const SEEDS = ['5387467238', '7038762345', '5376462406', '2068454617', '2223557131'];
const CONTACTS = ['7267656920', '2604154787', '6404354735', '4772775348', '2303159102',
                '6489525157', '4473959797', '4732422478', '7137508637', '8475002105',
                '9819265620', '7278033761', '2625735719', '9567718725', '9229302302']
const TOWERS = ["111-111-11111-11111", "222-222-22222-22222", "333-333-33333-33333", "444-444-44444-44444", "555-555-55555-55555"];

generateData(10000);

function generateData(total) {
    const data = [];
    for (let i = 0; i < total; i++){
        let seed = chance.pickone(SEEDS);
        const record = {
            _id: chance.guid(),
            activityType: chance.pickone(ACTIVITY_TYPES),
            date: new Date(chance.integer({ min: date.start, max: date.end })).toISOString(),
            seed: seed,
            contact: chance.pickset(CONTACTS, chance.integer({min: 0, max: CONTACTS.length})),
            tower: chance.pickone(TOWERS),
            latitude: chance.latitude({ min: 38.938751, max: 38.978824 }),
            longitude: chance.longitude({ min: -77.406521, max: -77.327712 }),
            context: `${chance.sentence().slice(0, -1)} ${seed} ${chance.sentence().toLowerCase()}`
        }
        data.push(record);        
    }

    // sort the data
    data.sort((a, b) => {
        if (a.date < b.date) {
            return -1;
        } else if (a.date > b.date) {
            return 1;
        } else {
            return 0;
        }
    })
    fs.writeFileSync('db.json', JSON.stringify({ data: data }, null, 2));
}
