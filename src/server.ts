import app from "./app";

const port = process.env.PORT || 3009;

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
