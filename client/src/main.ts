import { Playground } from "./createScene";
import "./style.css";
import { Engine } from "@babylonjs/core";
import "./button";
import { describeTweakpane } from "./tweakpane";
import {
  updateTriggerAtom,
  store,
  positionsAtom,
  indicesAtom,
  normalsAtom,
} from "./store/store";
import * as BABYLON from "@babylonjs/core";

const main = () => {
  // ignore prettier
  describeTweakpane();

  const renderCanvas = document.querySelector(
    "#renderCanvas"
  ) as unknown as HTMLCanvasElement;
  if (!renderCanvas) {
    return;
  }

  const engine = new Engine(renderCanvas, true);

  const scene = Playground.CreateScene(engine, renderCanvas);

  store.sub(updateTriggerAtom, () => {
    const p = store.get(positionsAtom);
    const i = store.get(indicesAtom);
    const n = store.get(normalsAtom);
    console.log("store updated");
    console.log(p, i, n);
    // 頂点データの設定
    const vertexData = new BABYLON.VertexData();
    vertexData.positions = p;
    vertexData.indices = i;
    vertexData.normals = n;
    // カスタムメッシュ作成
    const customMesh = new BABYLON.Mesh("custom", scene);
    // メッシュに頂点データを適用
    vertexData.applyToMesh(customMesh);
    // 材質の設定
    const material = new BABYLON.StandardMaterial("material", scene);
    customMesh.material = material;
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();
