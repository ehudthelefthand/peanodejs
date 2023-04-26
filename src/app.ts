import express from "express";
import prisma from "./db";

const app = express();

app.get("/hello/:name", (req, res) => {
  res.json({
    name: req.params.name,
    key: req.query.key,
    foo: req.query.foo,
  });
});

app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      username: "pongneng",
      password: "shhhh!",
    },
  });
  res.sendStatus(200);
});

app.put("/", (req, res) => {});
app.delete("/", (req, res) => {});

export default app;
