/**
  * 计算整个动画的步骤数，每步动画切换详情数据
  * @param {Number} time 总时长
  * @param {Number} heartbeat 心跳时长，也即一个周期的时长
  * @param {Number} num  需更新的数量
  * @param {Number} history  每一位数据更新历史，索引按地位至高位展开
  */
export function getRollOption({
  time,
  begin,
  incr,
  len
}) {
  const end = begin + incr
  const lenEnd = end.toString().length
  const offset = len - lenEnd
  // 最大帧率： 每time周期需要切换动画的次数
  const frameMax = 10
  // 总帧数
  let frameTotal = (frameMax * time) / 1000
  if (frameTotal > incr) {
    frameTotal = incr
  }
  // 每帧毫秒数
  const frameTime = time / frameTotal
  // 单帧增量
  const frameIncr = incr / frameTotal
  const lenIncr = Math.floor(frameIncr).toString().length
  // 更新步骤明细，即每一帧的数字变化明细
  const incrs = []
  let sum = 0
  for (let i = 0; i < frameTotal; i++) {
    sum += frameIncr
    incrs.push(Math.floor(sum))
  }
  // 每一帧数据，包括动画时长，数字的变化等
  const frameData = []
  // 起点数字，并转换为数组
  let begins = begin
    .toString()
    .split('')
    .map(n => parseInt(n))
  // 重点数字
  let ends = ''
  const lastFrameCount = []
  // 初始化
  for (let i = 0; i < len; i++) {
    lastFrameCount[i] = 0
  }
  // 遍历每一帧
  for (const n of incrs) {
    const obj = {}
    // 当前帧最终实际显示数字
    ends = (n + begin)
      .toString()
      .split('')
      .map(n => parseInt(n))
    let p = lenEnd - 1
    // 遍历最终数字的每一位
    for (let h = 0; h < lenEnd; h++) {
      const st = begins[p]
      const ed = ends[p]
      const k = p + offset
      // 当前帧的当前位动画详情，包括是否发生变化，第几次变化，上一帧数字，当前帧数字，动画速度
      obj[k] = {
        begin: begins[p],
        num: ends[p]
      }
      // 当前位+1
      lastFrameCount[k]++
      // 若当前位小于或等于每一帧增量位数，则每一帧都会发生变化
      if (h + 1 <= lenIncr) {
        obj[k].changeTime = obj[k].changeTime ? obj[k].changeTime++ : 1
        obj[k].change = true
        obj[k].speed = frameTime
      }
      // 因进位发生变化，时间不一定
      else if (st != ed) {
        obj[k].changeTime = obj[k].changeTime ? obj[k].changeTime++ : 1
        obj[k].change = true
        obj[k].speed = lastFrameCount[k] * frameTime
        lastFrameCount[k] = 0
      } else {
        obj[k].change = false
        obj[k].speed = 1000
      }
      p--
    }
    // 上一帧的数字
    begins = [...ends]
    frameData.push(obj)
  }

  // 最后一针的四舍五入问题
  const lens = incrs.length - 1
  if (incrs.length != 0) {
    frameData[lens][len - 1].num = parseInt(end.toString().split('').pop())
  }

  return {
    data: frameData,
    freq: frameTime,
    total: frameTotal
  }
}
export function init({
  start,
  incr,
  len
}) {
  // 计算最大返回位数
  const nums = start
    .toString()
    .padStart(len, '0')
    .split('')
    .map(n => parseInt(n))
  const ends = (start + incr)
    .toString()
    .padStart(len, '0')
    .split('')
    .map(n => parseInt(n))
  let changeMax = 1
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] !== ends[i]) {
      changeMax = i
      break
    }
  }
  return {
    nums,
    ends,
    changeMax
  }
}
