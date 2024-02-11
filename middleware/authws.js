const jwt = require('jsonwebtoken')


function authorization(socket) {
  const authorizationHeader = socket.handshake.headers['authorization'];
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7); // Remove 'Bearer ' prefix
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded
      // Perform further operations with the decoded JWT payload
    } catch (error) {
      return false
      // Handle invalid token
    }
  } else {
    return false
    // Handle missing or invalid Authorization header
  }

}


module.exports = authorization;