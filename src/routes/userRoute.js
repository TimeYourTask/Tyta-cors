module.exports = (app) => {
  const userCtrl = require("../controllers/userCtrl");

  app.post("/user/register", userCtrl.userRegister);
  app.get("/users", userCtrl.getUsers);
  app.get("/user/:_id", userCtrl.getOneUser);
};
