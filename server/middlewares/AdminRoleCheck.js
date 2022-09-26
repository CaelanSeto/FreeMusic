const { verify } = require("jsonwebtoken");

const adminRoleCheck = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "Admin not logged in!" });

  try {
    const validToken = verify(accessToken, "noSecretAtAll");

    if (!validToken) {
      return res.json({ error: "User has invalid token!" });
    }
    //Check token validity
    //req.user = validToken["user"];

    const role = validToken["role"];
    console.log(role);

    if (role == "admin")
    {
        return next();
    }
    else
    {
        return res.json({ error: "User not admin!" });
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { adminRoleCheck };