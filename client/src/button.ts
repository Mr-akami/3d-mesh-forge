import { customMeshRawData } from "./mesh-data";
import { boxOBject } from "./createScene";
import {
  store,
  positionsAtom,
  indicesAtom,
  normalsAtom,
  updateTriggerAtom,
} from "./store/store";

const button = document.getElementById("myButton");

if (button) {
  button.addEventListener("click", async () => {
    // alert("Button clicked!");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // const { positions, indices, normals } = customMeshRawData;
    const { positions, indices, normals } = boxOBject;

    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: JSON.stringify({ positions, indices, normals }),
      headers: myHeaders,
    });
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }
    const data = await response.json();
    console.log("client response");
    console.log(data.body.positions);
    store.set(positionsAtom, data.body.positions);
    store.set(indicesAtom, data.body.indices);
    store.set(normalsAtom, data.body.normals);

    const p = store.get(positionsAtom);
    const i = store.get(indicesAtom);
    const n = store.get(normalsAtom);
    console.log(p, i, n);

    store.set(updateTriggerAtom, (s) => s + 1);
  });
}
