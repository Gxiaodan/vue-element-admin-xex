export default {
  backgroundColor: '#00000000',
  globe: {
    baseTexture: require('@/assets/gl/earth.jpg'),
    displacementScale: 0.1,
    shading: 'lambert',
    // environment: require('@/assets/gl/starfield.jpg'),
    light: {
      ambient: {
        intensity: 0.1
      },
      main: {
        intensity: 1.5
      }
    },
    layers: [
      {
        type: 'blend',
        blendTo: 'emission',
        texture: require('@/assets/gl/night.jpg')
      },
      {
        type: 'overlay',
        texture: require('@/assets/gl/clouds.png'),
        shading: 'lambert',
        distance: 5
      }
    ]
  },
  series: []
}
