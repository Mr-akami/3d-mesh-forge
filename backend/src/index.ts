import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("/*", cors());
app.get("/", (c) => {
  console.log(c.body);
  return c.text("Hello Hono!");
});

app.post("/post", (c) => {
  console.log(c.body);
  return c.json({ message: "Hello Hono!", body: c.body });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
