const { verifyToken } = require("../jwt/jwt");

function isAdminCheck(req, res, next) {

  const authHeader = req.headers["authorization"];
  //console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  } else {
    const token = authHeader.slice(7);
    const userInfo = verifyToken(token);
    const { data } = userInfo;
    //console.log(data);
    if (data === "Admin" ||data === "Editor" || data === "Writer") {
        return next();
    }
    else {
        return res.status(401).send("Unauthorized");
      }
  }

  
}

module.exports = isAdminCheck;
