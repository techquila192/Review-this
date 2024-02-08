const jwt = require('jsonwebtoken');


function authorization(req, res, next) {
// request has a authorization : bearer $token header
const bearer_token = req.headers.authorization;
var  token;
if (bearer_token && bearer_token.startsWith('Bearer ')) {
    token = bearer_token.split('Bearer ')[1];
}
else
{
    res.status(401).send("Invalid authorization");
}

try{
const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
req.body.github=decoded_token.username;
req.body.fullName=decoded_token.name;
req.body.type=decoded_token.type;
req.body.token=decoded_token.token;
next();
}
catch(err){
    res.status(500).json({err:err.message});
}

}

module.exports = authorization