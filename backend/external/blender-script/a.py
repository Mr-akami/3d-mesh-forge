import bpy
import sys
import json

print("Hello from Blender")

input_data = sys.stdin.read()

data = json.loads(input_data)


def test_bpy():
    positions = data["positions"]
    indices = data["indices"]
    normals = data["normals"]
    # print("positions", positions)
    # print("indices", indices)
    # print("normals", normals)
    try:
        # 新しいシーンを作成
        scene = bpy.data.scenes.new(name="TestScene")
        # 現在のシーンをその新しいシーンに切り替え
        bpy.context.window.scene = scene

        # メッシュを作成
        mesh = bpy.data.meshes.new("TestMesh")
        obj = bpy.data.objects.new("TestObject", mesh)
        scene.collection.objects.link(obj)
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)

        # positionsはフラットなリストなので、(x, y, z)のタプルに変換して2倍にスケール
        scaled_positions = [
            (positions[i] * 2, positions[i + 1] * 2, positions[i + 2] * 2)
            for i in range(0, len(positions), 3)
        ]
        # indicesを3つずつのタプルに変換（面データ）
        face_indices = [
            (indices[i], indices[i + 1], indices[i + 2])
            for i in range(0, len(indices), 3)
        ]
        # normalsもフラットなリストなので、(x, y, z)のタプルに変換
        normal_vectors = [
            (normals[i], normals[i + 1], normals[i + 2])
            for i in range(0, len(normals), 3)
        ]
        
        # メッシュの頂点、面を設定
        mesh.from_pydata(scaled_positions, [], face_indices)
        
        # メッシュの更新
        mesh.update()
        
        # メッシュの法線を設定
        mesh.normals_split_custom_set_from_vertices(normal_vectors)

        # 2倍にスケールされたメッシュの頂点、インデックス、法線を取り出す
        positions_out = [v.co for v in mesh.vertices]
        indices_out = [f.vertices[:] for f in mesh.polygons]
        normals_out = [v.normal for v in mesh.vertices]

        # 結果をリストに変換して出力
        positions_out = [coord for v in positions_out for coord in v]
        indices_out = [index for face in indices_out for index in face]
        normals_out = [norm for n in normals_out for norm in n]

        # JSON形式で出力
        output = {
            "positions": positions_out,
            "indices": indices_out,
            "normals": normals_out
        }
        print(f"RESULT:{json.dumps(output)}")
        # シーンが正常に作成されたかを確認
        if scene.name == "TestScene":
            print("bpy is working correctly. New scene created successfully.")
        else:
            print("bpy imported, but scene creation failed.")

        # テストが終わったのでシーンを削除
        bpy.data.scenes.remove(scene)
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    test_bpy()
