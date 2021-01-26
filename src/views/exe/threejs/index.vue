<!--suppress ALL -->
<template>
  <div class="container" style="background: rgb(12 25 30 / 30%);">
    <div ref="canvasContent" class="canvas_content" />
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { AxesHelper } from 'three/src/helpers/AxesHelper'
import * as d3geo from 'd3-geo'

export default {
  name: 'ThreeMap',
  data() {
    return {
      map: null,
      scene: null,
      camera: null,
      renderer: null,
      cube: null,
      angle: 0,
      sphere: null,
      speed: 0.01,
      texture: null
    }
  },
  mounted() {
    this.init()

    this.initSome()

    this.animate()
  },
  // destroyed(){
  //   console.log("实例已经被销毁");
  // },
  methods: {
    animate() {
      // 一定要在此函数中调用
      if (this.texture) this.texture.offset.x -= 0.01
      requestAnimationFrame(this.animate)
    },
    render() {
      requestAnimationFrame(this.render)
      this.renderer.render(this.scene, this.camera)
    },
    init() {
      const width = window.innerWidth
      const height = window.innerHeight

      this.scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.01,
        3000000
      )
      this.camera.position.set(0, 0, 30)
      this.camera.lookAt(0, 0, 0)

      const helper = new AxesHelper(1000, 1000)
      this.scene.add(helper)

      // 点光源
      var pointLight = new THREE.PointLight(0xff7f00, 1, 0)
      pointLight.position.set(0, 0, 20)
      pointLight.castShadow = true
      this.scene.add(pointLight)
      this.scene.add(new THREE.HemisphereLight(0x443333, 0x000000))

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(width, height)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.outputEncoding = THREE.sRGBEncoding
      this.$refs.canvasContent.append(this.renderer.domElement)
      new OrbitControls(this.camera, this.renderer.domElement)
      this.initSome()
      this.render()
    },
    initSome() {
      this.texture = new THREE.TextureLoader().load('line.png')
      this.texture.wrapS = THREE.MirroredRepeatWrapping // 每个都重复
      this.texture.wrapT = THREE.RepeatWrapping
      /*
      水平和垂直方向纹理的包裹方式
      THREE.RepeatWrapping
      THREE.ClampToEdgeWrapping
      THREE.MirroredRepeatWrapping
    */
      this.texture.repeat.set(10, 1)
      this.texture.repeat = new THREE.Vector2(2, 1)
      this.texture.needsUpdate = true
      // this.texture.flipY = false
      // this.texture.rotation = 180
      // this.texture.rotation = (0.5, 0.5)
      const material = new THREE.MeshBasicMaterial({
        map: this.texture,
        // side: THREE.FrontSide,
        shadowSide: THREE.BackSide,
        transparent: true,
        // skinning: true,
        // colorWrite: false
        polygonOffset: true
        // polygonOffsetFactor: 1
      })

      // 创建顶点数组
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(10, 0, 10),
        new THREE.Vector3(0, 0, 10)
      ]

      // CatmullRomCurve3创建一条平滑的三维样条曲线
      const curve = new THREE.CatmullRomCurve3(points) // 曲线路径

      // 创建管道
      const tubeGeometry = new THREE.TubeGeometry(curve, 80, 0.6, 50, false) // p1：路径；p2:组成管道的分段数64；p3:管道半径1；p4:管道横截面的分段数8；

      const mesh = new THREE.Mesh(tubeGeometry, material)
      // mesh.castShadow = true
      // mesh.up = (0, 0, -1)
      // mesh.position.set(0, 0, -1)
      // mesh.rotation.z = 180
      this.scene.add(mesh)
    }
  }
}
</script>

<style scoped></style>
