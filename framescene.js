import mkhand from './handangles.js'
import imgLst from './handTest.js'
const hand = mkhand()
let imgLstIdx = 0

const scenes = []
let currentRender = 0

let lastFinger = 0
let currentFinger = 0

let accTheta = 0
let accPhi = 0
let accSpin = 0

function mkhs (callback) {
  let lastSignal = false
  return function holderSensor (signal) {
    if (lastSignal && !signal) {
      callback()
    }
    lastSignal = signal
  }
}

const mkScene = handlers => snapad => {
  for (const hdl of handlers) {
    hdl.sensor(snapad[hdl.key])
  }
  return hand
}
// [-PI, PI]
const wraPI = e => {
  if (e > Math.PI) {
    return e - 2 * Math.PI
  } else if (e < -Math.PI) {
    return e + 2 * Math.PI
  } else {
    return e
  }
}

const handleSave = {
  key: 'save',
  sensor: mkhs(() => {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'
    const blob = new window.Blob([JSON.stringify(hand, null, 4)], {type: 'application/json'})
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = 'hand.json'
    a.click()
    window.URL.revokeObjectURL(url)

    console.log(`download json`)
  })
}

const handleReset = {
  key: 'reset',
  sensor: mkhs(() => {
    hand.spin = 0
    hand.phi = 0
    hand.theta = 0
    hand.currentFinger.id = 0
    hand.currentFinger.editing = false
    hand.fingers.forEach(e => {
      e.angles.alpha = 0
      e.angles.beta = 0
      e.angles.gamma = 0
      e.angles.eta = 0
    })
    currentRender = 0
    currentFinger = 0
    console.log(`reset`)
  })
}

const handlers4pickFinger = [
  {
    key: 'in',
    sensor: mkhs(() => {
      currentRender = 1
      hand.currentFinger.id = currentFinger
      hand.currentFinger.editing = true
      console.log(`going to scene: B currentFinger: ${currentFinger}`)
    })
  },
  {
    key: 'out',
    sensor: mkhs(() => {
      currentRender = 2
      hand.currentFinger.id = 5
      hand.currentFinger.editing = true
      accSpin = hand.spin
      accPhi = hand.phi
      accTheta = hand.theta
      console.log(`going to scene: C`)
    })
  },
  {
    key: 'antiClockWise',
    sensor: mkhs(() => {
      lastFinger = currentFinger
      currentFinger++
      if (currentFinger === 5) {
        currentFinger = 0
      }
      hand.currentFinger.id = currentFinger
      console.log(`currentFinger: ${currentFinger}`)
    })
  },
  {
    key: 'clockWise',
    sensor: mkhs(() => {
      lastFinger = currentFinger
      if (currentFinger === 0) {
        currentFinger = 4
      } else {
        currentFinger--
      }
      hand.currentFinger.id = currentFinger
      console.log(`currentFinger: ${currentFinger}`)
    })
  },
  {
    key: 'imgInc',
    sensor: mkhs(() => {
      imgLstIdx = ++imgLstIdx % imgLst.length
      document.getElementById('display').setAttribute('src', imgLst[imgLstIdx])
      console.log(`imgList << 1`)
    })
  },
  {
    key: 'imgDec',
    sensor: mkhs(() => {
      imgLstIdx = --imgLstIdx < 0 ? imgLst.length - 1 : imgLstIdx
      document.getElementById('display').setAttribute('src', imgLst[imgLstIdx])
      console.log(`imgList >> 1`)
    })
  },
  handleSave,
  handleReset
]

const handlers4snailFinger = [
  {
    key: 'out',
    sensor: mkhs(() => {
      currentRender = 0
      hand.currentFinger.editing = false
      console.log(`alpha: ${hand.fingers[currentFinger].angles.alpha} beta: ${hand.fingers[currentFinger].angles.beta} gamma: ${hand.fingers[currentFinger].angles.gamma} eta: ${hand.fingers[currentFinger].angles.eta}`)
    })
  },
  {
    key: 'alpha',
    sensor: a => {
      hand.fingers[currentFinger].angles['alpha'] = a
    }
  },
  {
    key: 'beta',
    sensor: b => {
      hand.fingers[currentFinger].angles['beta'] = b
    }
  },
  {
    key: 'gamma',
    sensor: g => {
      hand.fingers[currentFinger].angles['gamma'] = g
    }
  },
  {
    key: 'eta',
    sensor: e => {
      hand.fingers[currentFinger].angles['eta'] = e
    }
  },
  handleSave,
  handleReset
]

const handlers4aimHand = [
  {
    key: 'theta',
    sensor: t => {
      hand.theta = wraPI(accTheta + t)
    }
  },
  {
    key: 'phi',
    sensor: p => {
      hand.phi = wraPI(accPhi + p)
    }
  },
  {
    key: 'spin',
    sensor: s => {
      hand.spin = accSpin + s
    }
  },
  {
    key: 'in',
    sensor: mkhs(() => {
      currentRender = 0
      hand.currentFinger.id = currentFinger
      hand.currentFinger.editing = false

      console.log(`going to scene: A spin: ${hand.spin} theta: ${hand.theta} phi: ${hand.phi}`)
    })
  },
  handleSave,
  handleReset
]

scenes.push(mkScene(handlers4pickFinger))
scenes.push(mkScene(handlers4snailFinger))
scenes.push(mkScene(handlers4aimHand))

export default function () {
  return scenes[currentRender]
}
