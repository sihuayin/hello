import {
  Engine,
  Scene,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  ArcRotateCamera,
  SceneLoader
} from '@babylonjs/core';
import "./style.css"

const canvas = document.getElementById("renderCanvas") as unknown as HTMLCanvasElement;

// 初始化引擎
const engine = new Engine(canvas, true);
// 初始化场景
const scene = new Scene(engine);
// 使用FreeCamera相机
// const camera = new FreeCamera("camera1",
//   new Vector3(0, 5, -10),
//   scene
// );

const camera = new ArcRotateCamera("camera1",
  -Math.PI / 2,
  Math.PI / 2.5,
  15,
  Vector3.Zero(),
  scene
);

camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);
  
// 使用HemisphericLight灯光
const light = new HemisphericLight("light",
  new Vector3(0, 1, 0),
  scene
);
light.intensity = 0.7;
  
// 圆球元素 类方法
const sphere = MeshBuilder.CreateSphere("sphere",
  {diameter: 2, segments: 32}, 
  scene
);

sphere.position.y = 1;
  
// 平面
MeshBuilder.CreateGround("ground", 
  {width: 6, height: 6},
  scene
);

loadModel()

// 执行渲染
engine.runRenderLoop(() => {
  scene.render();
});

async function loadModel() {
  const result = await SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  const house1 = scene.getMeshByName("detached_house")!;
  house1.position.y = 2;
  const house2 = result.meshes[2];
  house2.position.y = 1;
}