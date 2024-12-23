const UserdeatilsSchema = require("../database/schema/user");
const authenticateToken = require("../infrastructures/middleware/middleware");

const userDetails = (app) => {
  app.post("/create/user", authenticateToken, async (req, res) => {
    const { name,age,email } = req.body;
    const createUser = new UserdeatilsSchema({
      userId: req.user.id,
      name,
      age,
      email,
    });
    await createUser.save();
    res.status(201).json(createUser);
  });

  app.get("/user", authenticateToken, async (req, res) => {
    const getUser = await UserdeatilsSchema.find({ userId: req.user.id });
    res.json(getUser);
  });

  app.put("/user/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { email, age, name } = req.body;
    const updateUser = await UserdeatilsSchema.findByIdAndUpdate(
      id,
      { email, age, name },
      { new: true }
    );
    res.json(updateUser);
  });

  app.delete("/user/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    await deleteUserser.findByIdAndDelete(id);
    res.sendStatus(204);
  });
};

module.exports = userDetails;
