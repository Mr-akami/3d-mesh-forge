import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { runBlenderScript } from "../external/blender-script/blender-script-adapter";
import { run } from "node:test";

type BlenderResult = {
  positions: number[];
  indices: number[];
  normals: number[];
};

const app = new Hono();
app.use("/*", cors());
app.get("/", (c) => {
  console.log(c.body);
  return c.text("Hello Hono!");
});

app.post("/post", async (c) => {
  const params = await c.req.json();
  const { positions, indices, normals } = params;
  console.log(positions, indices, normals);
  const data = {
    positions,
    indices,
    normals,
  };
  const result = await runBlenderScript<BlenderResult>("a.py", data);
  console.log("Positions:", result.positions);
  console.log("Indices:", result.indices);
  console.log("Normals:", result.normals);

  return c.json({ message: "Hello Hono!", body: result });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
