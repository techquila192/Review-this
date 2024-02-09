const encoder = new TextEncoder();
const crypto = require('crypto');

async function authorization(req, res, next) {
    const xHubSignature = req.headers['x-hub-signature-256']
    const payload = JSON.stringify(req.body, null);
    const verify = await verifySignature(process.env.WEBHOOK_SECRET, xHubSignature, payload).catch((err)=> { console.error(err.message)});
    if(!verify)
    {
        res.status(401).send("Invalid request signature")
    }

    next();
}

//Sample i/o
//verifySignature("It's a Secret to Everybody", "sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17","Hello, World!").then((val)=>console.log(val))

async function verifySignature(secret, header, payload) {
    let parts = header.split("=");
    let sigHex = parts[1];
    let algorithm = { name: "HMAC", hash: { name: "SHA-256" } };

    let keyBytes = encoder.encode(secret);
    let extractable = false;
    let key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        [ "sign", "verify" ],
    );

    let sigBytes = hexToBytes(sigHex);
    let dataBytes = encoder.encode(payload);
    let equal = await crypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes,
    );

    return equal;
}

function hexToBytes(hex) {
    let len = hex.length / 2;
    let bytes = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
        let c = hex.slice(i, i + 2);
        let b = parseInt(c, 16);
        bytes[index] = b;
        index += 1;
    }

    return bytes;
}

module.exports = authorization;