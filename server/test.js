const net = require('follow-redirects').https;
const fs = require('fs');
const auth_key = Buffer.from('f37fb2214f8b2c0736853677b7704ea1:fe0451589f943f7aa571f200a8fcae30').toString('base64');

const goatOptions = {
    'method': 'GET',
    'hostname': 'api.roadgoat.com',
    'port': 443,
    'path': '/api/v2/destinations/auto_complete?q=barcelona-spain',
    'headers': {
        'Authorization': `Basic ${auth_key}`
    },
    'maxRedirects': 20
};

const getCity = (request, result) => {
    const req = net.request(goatOptions, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        const body = Buffer.concat(chunks);
        result.status(200).json({ status: 200, data: JSON.parse(body.toString())})
        console.log(JSON.parse(body.toString()));
    })

    res.on("error", function (error) {
        console.error(error);
    });
});
req.end();
}

module.exports = { getTest }