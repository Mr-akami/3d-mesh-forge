import bpy
print("Hello from Blender")


def test_bpy():
    try:
        # 新しいシーンを作成
        scene = bpy.data.scenes.new(name="TestScene")
        # 現在のシーンをその新しいシーンに切り替え
        bpy.context.window.scene = scene

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