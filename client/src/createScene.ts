import * as BABYLON from "@babylonjs/core";
import { customMeshRawData } from "./mesh-data";

export let boxOBject = {};

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class Playground {
  public static CreateScene(
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement
  ): BABYLON.Scene {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    // const camera = new BABYLON.FreeCamera(
    //   "camera1",
    //   new BABYLON.Vector3(0, 5, -10),
    //   scene
    // );

    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 4,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // // Our built-in 'sphere' shape. Params: name, options, scene
    // const sphere = BABYLON.MeshBuilder.CreateSphere(
    //   "sphere",
    //   { diameter: 2, segments: 32 },
    //   scene
    // );

    // // // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;

    const axes = new BABYLON.AxesViewer(scene, 1);

    // draw a custom mesh
    // const { positions, indices, normals } = customMeshRawData;
    // // box geometryを作成
    // const boxGeometry = new BABYLON.Geometry("boxGeometry", scene);
    // boxGeometry.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
    // boxGeometry.setIndices(indices);
    // boxGeometry.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
    // // メッシュを作成してGeometryを適用
    // const box = new BABYLON.Mesh("box", scene);
    // boxGeometry.applyToMesh(box);

    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
    const positions = box.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    const indices = box.getIndices();
    const normals = box.getVerticesData(BABYLON.VertexBuffer.NormalKind);
    const uvs = box.getVerticesData(BABYLON.VertexBuffer.UVKind);
    boxOBject = {
      box,
      positions,
      indices,
      normals,
      uvs,
    };

    // Our built-in 'ground' shape. Params: name, options, scene
    // const ground = BABYLON.MeshBuilder.CreateGround(
    //   "ground",
    //   { width: 6, height: 6 },
    //   scene
    // );

    return scene;
  }
}

export { Playground };
