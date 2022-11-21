module.exports = (server) => {
  const userCtrl = require("../controllers/user");

  server.post("/user/register", userCtrl.userRegister);
  server.get("/users", userCtrl.getUsers);
};
