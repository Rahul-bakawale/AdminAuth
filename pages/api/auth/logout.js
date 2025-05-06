import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
      })
    );

    return res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(405).end();
  }
}
