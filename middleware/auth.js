export function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === `Bearer ${process.env.ADMIN_TOKEN}`) return next();
  return res.status(401).json({ message: "Unauthorized" });
}
