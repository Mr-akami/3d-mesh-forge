import * as BABYLON from "@babylonjs/core";
// 頂点データ
// prettier-ignore
const positions = [
      -0.5, -0.5,  0.5,
       0.5, -0.5,  0.5,
       0.5,  0.5,  0.5,
      -0.5,  0.5,  0.5,
      -0.5, -0.5, -0.5,
       0.5, -0.5, -0.5,
       0.5,  0.5, -0.5,
      -0.5,  0.5, -0.5
      ];

// prettier-ignore
const indices = [
          0, 3, 1,  3, 2, 1, // front
          4, 5, 6,  4, 6, 7, // back
          4, 0, 1,  1, 5, 4, // bottom
          3, 7, 2,  7, 6, 2, // top
          4, 7, 3,  4, 3, 0, // left
          6, 5, 1,  1, 2, 6  // right
          ];

// 法線データ（頂点法線の計算）
const normals: number[] = [];
BABYLON.VertexData.ComputeNormals(positions, indices, normals);

export const customMeshRawData = {
  positions,
  indices,
  normals,
};
