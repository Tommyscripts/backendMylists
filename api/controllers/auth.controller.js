const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ListModel = require("../models/list.model");
const UserModel = require("../models/user.model");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isBcryptHash(value) {
  return typeof value === "string" && /^\$2[aby]\$/.test(value);
}

async function passwordMatches(inputPassword, storedPassword) {
  if (!storedPassword || !inputPassword) {
    return false;
  }

  if (isBcryptHash(storedPassword)) {
    return bcrypt.compare(inputPassword, storedPassword);
  }

  return String(inputPassword) === String(storedPassword);
}

async function signup(req, res) {
  try {
    const { email, password, username, confirmPassword, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (confirmPassword !== undefined && String(password) !== String(confirmPassword)) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const allowedRole = role === "admin" ? "admin" : "user";
    const safeUserData = {
      username: String(username || "").trim(),
      email: normalizedEmail,
      password: bcrypt.hashSync(password, 10),
      role: allowedRole,
    };

    if (!safeUserData.username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await UserModel.create(safeUserData);
    const lists = await ListModel.findOne({ name: "Todos los productos" });
    const listas = await ListModel.create({ name: "Lista de compra" });
    const listas2 = await ListModel.create({ name: "Lista de casa" });

    if (lists) user.listas.push(lists._id.toString());
    user.listas.push(listas._id.toString());
    user.listas.push(listas2._id.toString());
    await user.save();

    const payload = { email: user.email };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "10h" });
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(500).json({ error: `Error creating user: ${error.message || error}` });
  }
}

async function login(req, res) {
  try {
    const identifier = String(req.body.email || req.body.username || "").trim();
    const normalizedIdentifier = identifier.toLowerCase();
    const password = String(req.body.password || "");

    if (!identifier || !password) {
      return res.status(400).json({ error: "Email or password incorrect" });
    }

    const candidates = await UserModel.find({
      $or: [
        { email: identifier },
        { email: normalizedIdentifier },
        { email: { $regex: new RegExp(`^${escapeRegex(identifier)}$`, "i") } },
        { username: identifier },
        { username: normalizedIdentifier },
        { username: { $regex: new RegExp(`^${escapeRegex(identifier)}$`, "i") } },
      ],
    }).limit(20);

    let matchedUser = null;
    for (const candidate of candidates) {
      const isMatch = await passwordMatches(password, candidate.password);
      if (isMatch) {
        matchedUser = candidate;
        if (!isBcryptHash(candidate.password)) {
          candidate.password = bcrypt.hashSync(password, 10);
          await candidate.save();
        }
        break;
      }
    }

    if (!matchedUser) {
      return res.status(400).json({ error: "Email or password incorrect" });
    }

    const token = jwt.sign({ email: matchedUser.email }, process.env.SECRET, {
      expiresIn: "10h",
    });

    return res.status(200).json({ email: matchedUser.email, token });
  } catch (error) {
    return res.status(500).json({ error: "Error logging user" });
  }
}

module.exports = {
  signup,
  login,
};
