<template>
  <div v-if="show" class="loading-screen-3d">
    <canvas ref="babylonCanvas" class="babylon-canvas"></canvas>

    <div class="loading-overlay">
      <div class="loading-info">
        <div class="loading-logo">
          <div class="logo-icon">
            <span class="logo-text">xl</span>
          </div>
          <div class="logo-info">
            <div class="brand-name">xlCig</div>
            <div class="brand-subtitle">PC BUILDING GUIDE</div>
          </div>
        </div>

        <div class="loading-text">
          <p class="loading-title">{{ animationPhase.title }}</p>
          <p class="loading-subtitle">{{ animationPhase.subtitle }}</p>
        </div>

        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-text">{{ Math.round(progress) }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Babylon.js 变量，只在客户端初始化
let BABYLON = null
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const babylonCanvas = ref(null)
const progress = ref(0)
const animationPhase = ref({
  title: "Preparing Components",
  subtitle: "Getting ready to build your dream PC..."
})

let engine = null
let scene = null
let animationInterval = null
let currentPhase = 0

const phases = [
  { title: "Preparing Components", subtitle: "Getting ready to build your dream PC..." },
  { title: "Installing Motherboard", subtitle: "Carefully placing the main board..." },
  { title: "Adding CPU & Memory", subtitle: "Installing the brain of your computer..." },
  { title: "Installing Graphics Card", subtitle: "Adding gaming power..." },
  { title: "Connecting Power", subtitle: "Plugging in the power cable..." },
  { title: "First Boot", subtitle: "Powering on for the first time..." },
  { title: "System Ready!", subtitle: "Welcome to your new PC!" }
]

const createScene = async () => {
  // 确保只在客户端运行
  if (!process.client) {
    return
  }
  
  try {
    // 动态导入 Babylon.js
    BABYLON = await import('@babylonjs/core')
    
    // 创建引擎和场景
    engine = new BABYLON.Engine(babylonCanvas.value, true)
    scene = new BABYLON.Scene(engine)
  
  // 设置相机
  const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 4, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene)
  camera.setTarget(BABYLON.Vector3.Zero())
  
  // 修复相机控制附加方法
  try {
    if (camera.attachControls) {
      camera.attachControls(babylonCanvas.value, true)
    } else if (camera.attachControl) {
      camera.attachControl(babylonCanvas.value, true)
    }
  } catch (error) {
    console.warn('Camera controls attachment failed:', error)
    // 手动设置相机控制
    scene.activeCamera = camera
  }

    // 高质量光照系统
  const ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), scene)
  ambientLight.intensity = 0.3
  ambientLight.diffuse = new BABYLON.Color3(0.8, 0.9, 1.0)
  
  const directionalLight = new BABYLON.DirectionalLight("directionalLight", new BABYLON.Vector3(-1, -1, -1), scene)
  directionalLight.intensity = 1.2
  directionalLight.diffuse = new BABYLON.Color3(1.0, 0.95, 0.9)
  directionalLight.specular = new BABYLON.Color3(1.0, 1.0, 1.0)
  
  // 启用阴影
  const shadowGenerator = new BABYLON.ShadowGenerator(2048, directionalLight)
  shadowGenerator.useExponentialShadowMap = true
  shadowGenerator.useKernelBlur = true
  shadowGenerator.blurKernel = 64
  
  // 存储阴影生成器到场景中，供其他函数使用
  scene.shadowGenerator = shadowGenerator
  
  // 补充光源
  const fillLight = new BABYLON.SpotLight("fillLight", 
    new BABYLON.Vector3(5, 8, 5), 
    new BABYLON.Vector3(-1, -1, -1), 
    Math.PI / 3, 2, scene)
  fillLight.intensity = 0.5
  fillLight.diffuse = new BABYLON.Color3(0.9, 0.8, 1.0)

  // 创建场景内容
  createRoom()
  createDesk()
  createBoy()
  createPCComponents()
  createMonitor()
  createPowerCable()
  createSweatEffect()
  
  // 启用后处理管道（暂时禁用以确保稳定性）
  // setupPostProcessing()
  
  // 开始动画序列
  startAnimationSequence()
  
  // 优化渲染设置
  engine.setHardwareScalingLevel(1/window.devicePixelRatio)
  scene.registerBeforeRender(() => {
    scene.activeCamera.alpha += 0.001 // 缓慢旋转相机
  })
  
  // 渲染循环
  engine.runRenderLoop(() => {
    scene.render()
  })
  
  } catch (error) {
    console.error('Failed to create 3D scene:', error)
    // 如果 3D 场景创建失败，显示简单的 2D 加载界面
  }
}

const setupPostProcessing = () => {
  try {
    // 创建后处理管道
    const pipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [scene.activeCamera])
    
    // 启用抗锯齿
    pipeline.samples = 4
    
    // 启用色调映射
    pipeline.imageProcessingEnabled = true
    pipeline.imageProcessing.toneMappingEnabled = true
    pipeline.imageProcessing.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES
    pipeline.imageProcessing.exposure = 1.0
    pipeline.imageProcessing.contrast = 1.2
    
    // 启用辉光效果
    pipeline.glowLayerEnabled = true
    pipeline.glowLayer.intensity = 0.5
    
    // 启用景深
    pipeline.depthOfFieldEnabled = true
    pipeline.depthOfFieldBlurLevel = BABYLON.DepthOfFieldEffectBlurLevel.Medium
    pipeline.depthOfField.focusDistance = 15000
    pipeline.depthOfField.focalLength = 50
    
    // 启用色彩校正
    pipeline.imageProcessing.vignetteEnabled = true
    pipeline.imageProcessing.vignetteWeight = 1.5
    pipeline.imageProcessing.vignetteColor = new BABYLON.Color4(0, 0, 0, 0)
    
    // 启用SSAO（屏幕空间环境光遮蔽）
    pipeline.ssaoEnabled = true
    pipeline.ssao.radius = 0.0001
    pipeline.ssao.totalStrength = 1.0
    pipeline.ssao.base = 0.2
  } catch (error) {
    console.warn('Post-processing setup failed:', error)
  }
}

const createRoom = () => {
  // 高质量地板 - 使用PBR材质
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { 
    width: 30, 
    height: 30, 
    subdivisions: 64
  }, scene)
  
  const groundMaterial = new BABYLON.PBRMaterial("groundMaterial", scene)
  groundMaterial.baseColor = new BABYLON.Color3(0.7, 0.6, 0.5)
  groundMaterial.metallicFactor = 0.1
  groundMaterial.roughnessFactor = 0.8
  ground.material = groundMaterial
  ground.position.y = -5
  ground.receiveShadows = true
  if (scene.shadowGenerator) {
    scene.shadowGenerator.addShadowCaster(ground)
  }

  // 高质量墙壁
  const wall1 = BABYLON.MeshBuilder.CreateBox("wall1", { width: 30, height: 15, depth: 0.5 }, scene)
  wall1.position = new BABYLON.Vector3(0, 2.5, -15)
  
  const wallMaterial = new BABYLON.PBRMaterial("wallMaterial", scene)
  wallMaterial.baseColor = new BABYLON.Color3(0.95, 0.95, 0.98)
  wallMaterial.metallicFactor = 0.0
  wallMaterial.roughnessFactor = 0.9
  wall1.material = wallMaterial
  wall1.receiveShadows = true

  const wall2 = BABYLON.MeshBuilder.CreateBox("wall2", { width: 0.5, height: 15, depth: 30 }, scene)
  wall2.position = new BABYLON.Vector3(-15, 2.5, 0)
  wall2.material = wallMaterial
  wall2.receiveShadows = true
}

const createDesk = () => {
  // 桌面
  const deskTop = BABYLON.MeshBuilder.CreateBox("deskTop", { width: 8, height: 0.2, depth: 4 }, scene)
  deskTop.position = new BABYLON.Vector3(0, 0, 0)
  const deskMaterial = new BABYLON.StandardMaterial("deskMaterial", scene)
  deskMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.2)
  deskTop.material = deskMaterial

  // 桌腿
  for (let i = 0; i < 4; i++) {
    const leg = BABYLON.MeshBuilder.CreateBox("leg" + i, { width: 0.3, height: 3, depth: 0.3 }, scene)
    const x = i % 2 === 0 ? -3.5 : 3.5
    const z = i < 2 ? -1.5 : 1.5
    leg.position = new BABYLON.Vector3(x, -1.5, z)
    leg.material = deskMaterial
  }
}

const createBoy = () => {
  // 高质量身体模型
  const body = BABYLON.MeshBuilder.CreateBox("body", { 
    width: 1.5, 
    height: 2, 
    depth: 0.8 
  }, scene)
  body.position = new BABYLON.Vector3(-2, 1, 0)
  
  const bodyMaterial = new BABYLON.PBRMaterial("bodyMaterial", scene)
  bodyMaterial.baseColor = new BABYLON.Color3(0.2, 0.5, 0.8)
  bodyMaterial.metallicFactor = 0.0
  bodyMaterial.roughnessFactor = 0.8
  body.material = bodyMaterial
  body.receiveShadows = true
  if (scene.shadowGenerator) {
    scene.shadowGenerator.addShadowCaster(body)
  }

  // 高质量头部模型
  const head = BABYLON.MeshBuilder.CreateSphere("head", { 
    diameter: 1.2, 
    segments: 32 
  }, scene)
  head.position = new BABYLON.Vector3(-2, 2.6, 0)
  
  const headMaterial = new BABYLON.PBRMaterial("headMaterial", scene)
  headMaterial.baseColor = new BABYLON.Color3(0.95, 0.8, 0.7)
  headMaterial.metallicFactor = 0.0
  headMaterial.roughnessFactor = 0.6
  head.material = headMaterial
  head.receiveShadows = true
  if (scene.shadowGenerator) {
    scene.shadowGenerator.addShadowCaster(head)
  }

  // 手臂
  const leftArm = BABYLON.MeshBuilder.CreateCapsule("leftArm", { 
    radius: 0.2, 
    height: 1.5,
    tessellation: 16
  }, scene)
  leftArm.position = new BABYLON.Vector3(-2.8, 1.2, 0)
  leftArm.material = headMaterial
  leftArm.receiveShadows = true
  if (scene.shadowGenerator) {
    scene.shadowGenerator.addShadowCaster(leftArm)
  }

  const rightArm = BABYLON.MeshBuilder.CreateCapsule("rightArm", { 
    radius: 0.2, 
    height: 1.5,
    tessellation: 16
  }, scene)
  rightArm.position = new BABYLON.Vector3(-1.2, 1.2, 0)
  rightArm.material = headMaterial
  rightArm.receiveShadows = true
  if (scene.shadowGenerator) {
    scene.shadowGenerator.addShadowCaster(rightArm)
  }

  // 存储角色引用以便动画
  scene.boy = { body, head, leftArm, rightArm }
}

const createPCComponents = () => {
  // 高质量主机箱
  const pcCase = BABYLON.MeshBuilder.CreateBox("pcCase", { 
    width: 1.5, 
    height: 2, 
    depth: 1.8 
  }, scene)
  pcCase.position = new BABYLON.Vector3(2, 1.1, 0)
  
  const caseMaterial = new BABYLON.PBRMaterial("caseMaterial", scene)
  caseMaterial.baseColor = new BABYLON.Color3(0.1, 0.1, 0.1)
  caseMaterial.metallicFactor = 0.8
  caseMaterial.roughnessFactor = 0.3
  caseMaterial.emissiveColor = new BABYLON.Color3(0, 0.1, 0.3) // 微弱发光
  pcCase.material = caseMaterial
  pcCase.receiveShadows = true
  if (scene.shadowGenerator) {
    scene.shadowGenerator.addShadowCaster(pcCase)
  }

  // 高质量主板
  const motherboard = BABYLON.MeshBuilder.CreateBox("motherboard", { 
    width: 1.2, 
    height: 0.1, 
    depth: 1.2 
  }, scene)
  motherboard.position = new BABYLON.Vector3(2, 0.5, 0)
  
  const mbMaterial = new BABYLON.PBRMaterial("mbMaterial", scene)
  mbMaterial.baseColor = new BABYLON.Color3(0, 0.3, 0)
  mbMaterial.metallicFactor = 0.2
  mbMaterial.roughnessFactor = 0.7
  mbMaterial.emissiveColor = new BABYLON.Color3(0, 0.05, 0)
  motherboard.material = mbMaterial
  motherboard.receiveShadows = true

  // 高质量CPU
  const cpu = BABYLON.MeshBuilder.CreateBox("cpu", { 
    width: 0.3, 
    height: 0.05, 
    depth: 0.3 
  }, scene)
  cpu.position = new BABYLON.Vector3(1.5, 0.6, 0)
  
  const cpuMaterial = new BABYLON.PBRMaterial("cpuMaterial", scene)
  cpuMaterial.baseColor = new BABYLON.Color3(0.7, 0.7, 0.7)
  cpuMaterial.metallicFactor = 0.9
  cpuMaterial.roughnessFactor = 0.1
  cpu.material = cpuMaterial
  cpu.receiveShadows = true

  // 高质量显卡 - 带散热器
  const gpu = BABYLON.MeshBuilder.CreateBox("gpu", { 
    width: 0.8, 
    height: 0.2, 
    depth: 1.8 
  }, scene)
  gpu.position = new BABYLON.Vector3(2.5, 0.8, 0)
  
  const gpuMaterial = new BABYLON.PBRMaterial("gpuMaterial", scene)
  gpuMaterial.baseColor = new BABYLON.Color3(0.8, 0.1, 0.1)
  gpuMaterial.metallicFactor = 0.4
  gpuMaterial.roughnessFactor = 0.6
  gpuMaterial.emissiveColor = new BABYLON.Color3(0.2, 0, 0)
  gpu.material = gpuMaterial
  gpu.receiveShadows = true
  if (scene.shadowGenerator) {
    scene.shadowGenerator.addShadowCaster(gpu)
  }

  // 存储组件引用
  scene.pcComponents = { pcCase, motherboard, cpu, gpu }
}

const createMonitor = () => {

  // 显示器底座
  const stand = BABYLON.MeshBuilder.CreateBox("stand", { width: 1, height: 0.2, depth: 0.8 }, scene)
  stand.position = new BABYLON.Vector3(0, 0.2, -2)
  const standMaterial = new BABYLON.PBRMaterial("standMaterial", scene)
  standMaterial.baseColor = new BABYLON.Color3(0.2, 0.2, 0.2)
  standMaterial.metallicFactor = 0.8
  standMaterial.roughnessFactor = 0.2
  stand.material = standMaterial
  stand.receiveShadows = true

  // 显示器支架
  const arm = BABYLON.MeshBuilder.CreateBox("arm", { width: 0.1, height: 1.5, depth: 0.1 }, scene)
  arm.position = new BABYLON.Vector3(0, 0.9, -2)
  arm.material = standMaterial
  arm.receiveShadows = true

  // 显示器屏幕
  const screen = BABYLON.MeshBuilder.CreateBox("screen", { width: 3, height: 2, depth: 0.2 }, scene)
  screen.position = new BABYLON.Vector3(0, 1.8, -2)
  const screenMaterial = new BABYLON.PBRMaterial("screenMaterial", scene)
  screenMaterial.baseColor = new BABYLON.Color3(0.05, 0.05, 0.05)
  screenMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0) // 初始为关闭状态
  screenMaterial.metallicFactor = 0.1
  screenMaterial.roughnessFactor = 0.1
  screen.material = screenMaterial
  screen.receiveShadows = true

  // 创建logo纹理（用于后续显示）
  const logoTexture = new BABYLON.DynamicTexture("logoTexture", { width: 512, height: 512 }, scene)
  const logoContext = logoTexture.getContext()

  // 绘制3D效果的logo
  logoContext.fillStyle = "#000000"
  logoContext.fillRect(0, 0, 512, 512)

  // 绘制主要logo形状 (简化的logo设计)
  logoContext.fillStyle = "#00f5ff"

  logoContext.font = "bold 120px Arial"
  logoContext.textAlign = "center"
  logoContext.fillText("xl", 256, 200)

  logoContext.fillStyle = "#ffffff"
  logoContext.font = "bold 40px Arial"
  logoContext.fillText("Cig", 256, 280)

  logoContext.fillStyle = "#9ca3af"
  logoContext.font = "20px Arial"
  logoContext.fillText("PC BUILDING GUIDE", 256, 320)

  logoTexture.update()

  scene.monitor = { screen, screenMaterial, logoTexture, stand, arm }
}

const createPowerCable = () => {
  // 电源线
  const cable = BABYLON.MeshBuilder.CreateBox("cable", { width: 0.1, height: 0.1, depth: 2 }, scene)
  cable.position = new BABYLON.Vector3(3, 0.5, 1)
  const cableMaterial = new BABYLON.StandardMaterial("cableMaterial", scene)
  cableMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
  cable.material = cableMaterial

  // 电源插头
  const plug = BABYLON.MeshBuilder.CreateBox("plug", { width: 0.3, height: 0.15, depth: 0.4 }, scene)
  plug.position = new BABYLON.Vector3(3, 0.5, 2.2)
  plug.material = cableMaterial

  scene.powerCable = { cable, plug }
}

const createSweatEffect = () => {
  try {
    // 创建汗珠粒子系统
    const sweatSystem = new BABYLON.ParticleSystem("sweat", 50, scene)

    // 粒子发射位置（头部）
    sweatSystem.emitter = new BABYLON.Vector3(-2, 3, 0)
    sweatSystem.minEmitBox = new BABYLON.Vector3(-0.2, 0, -0.2)
    sweatSystem.maxEmitBox = new BABYLON.Vector3(0.2, 0, 0.2)

    // 粒子颜色
    sweatSystem.color1 = new BABYLON.Color4(0.7, 0.9, 1.0, 1.0)
    sweatSystem.color2 = new BABYLON.Color4(0.8, 0.95, 1.0, 1.0)

    // 粒子大小
    sweatSystem.minSize = 0.02
    sweatSystem.maxSize = 0.05

    // 粒子生命周期
    sweatSystem.minLifeTime = 0.5
    sweatSystem.maxLifeTime = 1.0

    // 发射率
    sweatSystem.emitRate = 20

    // 重力
    sweatSystem.gravity = new BABYLON.Vector3(0, -9.8, 0)

    sweatSystem.start()

    scene.sweatSystem = sweatSystem
  } catch (error) {
    console.log('Sweat effect disabled:', error)
  }
}

const startAnimationSequence = () => {

  let currentProgress = 0
  let animationStep = 0

  // 动画序列时间点（秒）
  const sequenceTimings = [
    { time: 0, phase: 0, progress: 0 },    // 准备组件
    { time: 2, phase: 1, progress: 15 },   // 安装主板
    { time: 4, phase: 2, progress: 35 },   // 安装CPU和内存
    { time: 6, phase: 3, progress: 55 },   // 安装显卡
    { time: 8, phase: 4, progress: 75 },   // 连接电源
    { time: 10, phase: 5, progress: 85 },  // 首次开机
    { time: 13, phase: 6, progress: 100 }  // 系统就绪
  ]

  // 男孩工作动画
  if (scene.boy) {
    BABYLON.Animation.CreateAndStartAnimation(
      "armWork",
      scene.boy.rightArm,
      "rotation.x",
      30,
      240,
      0,
      Math.PI / 4,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    )

    BABYLON.Animation.CreateAndStartAnimation(
      "headNod",
      scene.boy.head,
      "rotation.x",
      30,
      180,
      0,
      Math.PI / 12,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    )
  }

  // 主动画序列
  animationInterval = setInterval(() => {
    currentProgress += 0.5

    // 检查是否到达下一个动画阶段
    const currentTiming = sequenceTimings.find(timing =>
      Math.floor(currentProgress / 10) === timing.time
    )

    if (currentTiming && currentPhase !== currentTiming.phase) {
      currentPhase = currentTiming.phase
      animationPhase.value = phases[currentPhase]
      progress.value = currentTiming.progress

      // 执行特定阶段的动画
      executePhaseAnimation(currentPhase)
    } else if (currentProgress < 130) {
      // 平滑进度更新
      const targetProgress = Math.min(100, currentProgress * 0.77)
      progress.value = targetProgress
    }

    if (currentProgress >= 130) {
      clearInterval(animationInterval)
    }
  }, 100)
}

const executePhaseAnimation = (phase) => {

  switch (phase) {
    case 1: // 安装主板
      if (scene.pcComponents && scene.pcComponents.motherboard) {
        BABYLON.Animation.CreateAndStartAnimation(
          "mbInstall",
          scene.pcComponents.motherboard,
          "position.y",
          30, 60, 0.5, 0.6, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        )
      }
      break

    case 2: // 安装CPU
      if (scene.pcComponents && scene.pcComponents.cpu) {
        BABYLON.Animation.CreateAndStartAnimation(
          "cpuInstall",
          scene.pcComponents.cpu,
          "position.y",
          30, 60, 0.6, 0.65, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        )
      }
      break

    case 3: // 安装显卡
      if (scene.pcComponents && scene.pcComponents.gpu) {
        BABYLON.Animation.CreateAndStartAnimation(
          "gpuInstall",
          scene.pcComponents.gpu,
          "position.y",
          30, 60, 0.8, 0.85, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        )
      }
      break

    case 4: // 连接电源
      if (scene.powerCable && scene.powerCable.plug) {
        BABYLON.Animation.CreateAndStartAnimation(
          "plugConnect",
          scene.powerCable.plug,
          "position.x",
          30, 60, 3, 2.5, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        )
      }
      break

    case 5: // 开机
      powerOnSequence()
      break

    case 6: // 系统就绪
      if (scene.sweatSystem) {
        scene.sweatSystem.stop()
      }
      break
  }
}

const powerOnSequence = () => {
  // 电脑指示灯亮起
  if (scene.pcComponents && scene.pcComponents.pcCase) {
    const caseGlow = BABYLON.Animation.CreateAndStartAnimation(
      "caseGlow",
      scene.pcComponents.pcCase.material,
      "emissiveColor",
      30, 60,
      new BABYLON.Color3(0, 0, 0),
      new BABYLON.Color3(0, 0.3, 0.8),
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    )
  }

  // 显示器开机 - 延迟1秒
  setTimeout(() => {
    if (scene.monitor && scene.monitor.screenMaterial) {
      // 屏幕亮起
      BABYLON.Animation.CreateAndStartAnimation(
        "screenOn",
        scene.monitor.screenMaterial,
        "emissiveColor",
        30, 90,
        new BABYLON.Color3(0, 0, 0),
        new BABYLON.Color3(0.1, 0.1, 0.2),
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      )

      // 显示logo - 延迟1.5秒
      setTimeout(() => {
        if (scene.monitor.logoTexture) {
          scene.monitor.screenMaterial.diffuseTexture = scene.monitor.logoTexture
          scene.monitor.screenMaterial.emissiveColor = new BABYLON.Color3(0.8, 0.8, 1.0)

          // logo闪烁效果
          BABYLON.Animation.CreateAndStartAnimation(
            "logoGlow",
            scene.monitor.screenMaterial,
            "emissiveColor",
            30, 180,
            new BABYLON.Color3(0.8, 0.8, 1.0),
            new BABYLON.Color3(1.2, 1.2, 1.5),
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
          )
        }
      }, 1500)
    }
  }, 1000)
}

onMounted(async () => {
  if (babylonCanvas.value) {
    await createScene()

    if (process.client && window) {
      window.addEventListener('resize', () => {
        if (engine) {
          engine.resize()
        }
      })
    }
  }
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }

  if (scene && scene.sweatSystem) {
    scene.sweatSystem.dispose()
  }

  if (engine) {
    engine.dispose()
  }
})
</script>

<style scoped>
.loading-screen-3d {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #000000 100%);
}

.babylon-canvas {
  width: 100%;
  height: 100%;
  outline: none;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 3rem;
}

.loading-info {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  min-width: 300px;
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.loading-logo {
  margin-bottom: 1.5rem;
}

.logo-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to right, #06b6d4, #3b82f6);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.logo-text {
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
}

.logo-info {
  color: white;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.brand-subtitle {
  font-size: 0.875rem;
  color: #9ca3af;
}

.loading-text {
  margin-bottom: 1.5rem;
}

.loading-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.loading-subtitle {
  color: #9ca3af;
  font-size: 0.875rem;
}

.loading-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #06b6d4, #3b82f6);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #06b6d4;
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .loading-overlay {
    padding: 1rem;
  }

  .loading-info {
    padding: 1.5rem;
    min-width: auto;
    width: 100%;
    max-width: 300px;
  }
}
</style>