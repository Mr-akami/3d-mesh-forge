import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { runBlenderScript } from "../external/blender-script/blender-script-adapter";
import { run } from "node:test";

const app = new Hono();
app.use("/*", cors());
app.get("/", (c) => {
  console.log(c.body);
  return c.text("Hello Hono!");
});

app.post("/post", async (c) => {
  const a = await c.req.json();
  console.log(a);
  const data = {
    nums: [1, 2, 3],
  };
  runBlenderScript("a.py", data);

  return c.json({ message: "Hello Hono!", body: a });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
