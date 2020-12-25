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
// import {Reflector}  from 'three/examples/js/objects/Reflector'

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
      speed: 0.01
    }
  },
  mounted() {
    this.init()
  },
  methods: {
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
      pointLight.position.set(0, 0, 10)
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
      var geometry = new THREE.PlaneGeometry(200, 200, 200)
      var material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      })
      var plane = new THREE.Mesh(geometry, material)
      plane.position.z = 1
      plane.receiveShadow = true
      this.scene.add(plane)
      // var geometry = new THREE.SphereGeometry(5, 32, 32);
      // var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
      // var sphere = new THREE.Mesh(geometry, material);
      // sphere.castShadow = true;
      // this.scene.add(sphere);
      // sphere.position.z = 20;
      const loader = new THREE.FileLoader()
      const _this = this
      loader.load('./three/sx_fill.json', function(data) {
        const jsonData = JSON.parse(data)
        _this.initMap(jsonData)
      })

      // loader.load("./three/xian.json", function(data) {
      //   let jsonData = JSON.parse(data);
      //   _this.initBuildingMap(jsonData);
      // });
    },

    // 加载 geojson地图
    initMap(chinaJson) {
      // 建一个空对象存放对象
      this.map = new THREE.Object3D()

      const _this = this

      // 墨卡托投影转换
      const projection = d3geo
        .geoMercator()
        .center([109.30848, 35.25906])
        .scale(80)
        .translate([0, 0])

      chinaJson.features.forEach(elem => {
        // 定一个省份3D对象
        const province = new THREE.Object3D()
        // 每个的 坐标 数组
        const coordinates = elem.geometry.coordinates
        // 循环坐标数组
        coordinates.forEach(multiPolygon => {
          multiPolygon.forEach(polygon => {
            // 这里的坐标要做2次使用：1次用来构建模型，1次用来构建轮廓线
            const shape = new THREE.Shape()
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 0xffffff
            })
            const linGeometry = new THREE.Geometry()
            for (let i = 0; i < polygon.length; i++) {
              const [x, y] = projection(polygon[i])
              if (i === 0) {
                shape.moveTo(x, -y)
              }
              shape.lineTo(x, -y)
              linGeometry.vertices.push(new THREE.Vector3(x, -y, 0.205))
            }

            const extrudeSettings = {
              depth: 0.2,
              bevelEnabled: false
            }

            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
            const material = new THREE.MeshPhongMaterial({
              color: '#02A1E2',
              emissiveIntensity: 10,
              lightMapIntensity: 10,
              transparent: true,
              opacity: 0.3,
              flatShading: true
            })
            var img2 = './three/long.jpg'
            const material1 = new THREE.MeshBasicMaterial({
              map: new THREE.TextureLoader().load(img2),
              // color: "#ffffff",
              transparent: true,
              opacity: 0.5
            })

            const mesh = new THREE.Mesh(geometry, [material, material1])
            const line = new THREE.Line(linGeometry, lineMaterial)
            mesh.castShadow = true
            province.add(mesh)
            province.add(line)
          })
        })

        // 将geo的属性放到省份模型中
        province.properties = elem.properties
        if (elem.properties.contorid) {
          const [x, y] = projection(elem.properties.contorid)
          province.properties._centroid = [x, y]
        }

        _this.map.add(province)
      })
      this.map.position.z = 1.1
      this.scene.add(this.map)
    },
    initBuildingMap(chinaJson) {
      var Shader = {
        vertexShader: `
        varying vec3 vp;
        void main(){
           vp = position;
           gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
        fragmentShader: `
        varying vec3 vp;
        uniform vec3 u_color;
        uniform vec3 u_tcolor;
        uniform float u_r;
        uniform float u_length;
        uniform float u_max;
        float getLeng(float x, float y){
            return  sqrt((x-0.0)*(x-0.0)+(y-0.0)*(y-0.0));
        }
        void main(){
            float uOpacity = 0.3;
            vec3 vColor = u_color;
            float uLength = getLeng(vp.x,vp.z);
            if ( uLength <= u_r && uLength > u_r - u_length ) {
                float op = sin( (u_r - uLength) / u_length ) ;
                uOpacity = op;
                if( vp.y<0.0){
                    vColor = u_color * op;
                }else{
                    vColor = u_tcolor;
                };
            }
            gl_FragColor = vec4(vColor,uOpacity);
        }
    `
      }
      // 墨卡托投影转换
      const projection = d3geo
        .geoMercator()
        .center([108.9275, 34.2475])
        .scale(100000)
        .translate([0, 0])

      chinaJson.features.forEach(elem => {
        const coordinates = elem.geometry.coordinates
        coordinates.forEach(multiPolygon => {
          var heartShape = new THREE.Shape()
          multiPolygon.forEach((polygon, index) => {
            const [x, y] = projection(polygon)
            console.log(x, y)
            if (index == 0) {
              heartShape.moveTo(x, y)
            }
            heartShape.lineTo(x, y)
          })
          const extrudeSettings = {
            depth: parseInt(Math.random() * 10 + 1),
            bevelEnabled: false
          }

          const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
          const material = new THREE.MeshBasicMaterial({
            color: '#02A1E2',
            transparent: true,
            opacity: 0.6
          })

          var material1 = new THREE.ShaderMaterial({
            vertexShader: Shader.vertexShader,
            fragmentShader: Shader.fragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
              u_color: { value: new THREE.Color('#5588aa') },
              u_tcolor: { value: new THREE.Color('#f55c1a') },
              u_r: { value: 0.05 },
              u_length: { value: 20 }, // 扫过区域
              u_max: { value: 50 } // 扫过最大值
            },
            transparent: true,
            depthWrite: false
          })
          var dalte = 0.25
          setInterval(() => {
            material1.uniforms.u_r.value += dalte * 50
            if (material1.uniforms.u_r.value >= 50) {
              material1.uniforms.u_r.value = 20
            }
          }, 30)
          const mesh = new THREE.Mesh(geometry, [material, material1])
          this.scene.add(mesh)
        })
      })
    },
    render() {
      requestAnimationFrame(this.render)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
<style lang="less">
.abc {
  color: #1b200d;
}

.container {
  width: 100%;
  height: 100%;
  position: relative;

  .canvas_content {
    position: absolute;
  }
}
</style>
