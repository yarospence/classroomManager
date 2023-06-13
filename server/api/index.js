const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Check requests for a token and attach the decoded id to the request
router.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    next({ status: 401, message: "Authentication required." });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT);
    req.user = { id };
    next();
  } catch {
    next({ status: 401, message: "Invalid token." });
  }
});

router.use("/students", require("./students"));

module.exports = router;
