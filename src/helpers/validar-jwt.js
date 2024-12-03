const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");
const { invalidTokens } = require("./invalidar-jwt");

const validarJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ mensaje: "No hay token en la petición" });
  }

  if (invalidTokens.has(token)) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }

  try {
    const { uid } = jwt.verify(token, SECRET_KEY);
    req.uid = uid;
    console.log(uid);
    //acá puedo obtener un usuario mediante el id
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ mensaje: "Token no válido" });
  }
};

module.exports = {
  validarJWT,
};
