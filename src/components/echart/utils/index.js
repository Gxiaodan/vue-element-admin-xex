export function formatData(data, dimension = 2) {
  if (dimension == 2) {
    const x = []
    const y = []
    for (let i = 0; i < data.length; i++) {
      x.push(data[i].x)
      y.push(data[i].y)
    }
    return { x, y }
  } else if (dimension == 3) {
    const x = []; const y = []; let s = []
    for (let i = 0; i < data.length; i++) {
      s.push(data[i].s)
    }
    s = [...new Set(s)]
    s.forEach((item, index) => {
      const tempY = []
      data.forEach(dItem => {
        if (dItem.s == s[0] && index === 0) {
          x.push(dItem.x)
        }
        if (dItem.s == item) {
          tempY.push(dItem.y)
        }
      })
      y.push(tempY)
    })
    return { x, y, s }
  }
}
