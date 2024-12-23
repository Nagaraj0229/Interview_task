const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("./auth");
const { CreateUserSchema } = require("../database/schema/user");

const registerUser = (app) => {
  app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
    };

    const accessToken = generateAccessToken(newUser);

    const user = new CreateUserSchema(newUser);
    await user.save();

    res
      .status(201)
      .json({ accessToken, message: "User registered successfully" });
  });

  app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const user = await CreateUserSchema.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, { httpOnly: true });

    res.json({ accessToken });
  });

  app.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) return res.sendStatus(401);

    const user = await CreateUserSchema.findOne({ refreshToken });
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, _decoded) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
      }
    );
  });
};

module.exports = registerUser;
