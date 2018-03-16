import VSHADER_SOURCE from './VSHADER_SOURCE.js'
import FSHADER_SOURCE from './FSHADER_SOURCE.js'
import vertexSequence from './vertexSequence.js'
import vertexCoordinates from './vertexCoordinates.js'
import hadChanged from './hadChanged.js'
import * as shiftTilt from './shiftTilt.js'
import * as aimSpin from './aimSpin.js'

/*
** ################
** # SETUP CANVAS #
** ################
*/
const canvas = document.getElementById('handgl')
const dpi = window.devicePixelRatio || 1
console.log(dpi)

window.onresize = () => {
  const side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
  canvas.width = side * dpi
  canvas.height = side * dpi
  canvas.style.width = side + 'px'
  canvas.style.height = side + 'px'
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.draw()
}

/*
** ###################
** # SETUP GL DRIVER #
** ###################
*/
const gl = canvas.getContext('webgl2')
window.gl = gl
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clearColor(0.95, 0.95, 1.0, 1.0)

gl.vs = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(gl.vs, VSHADER_SOURCE)
gl.compileShader(gl.vs)

gl.fs = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(gl.fs, FSHADER_SOURCE)
gl.compileShader(gl.fs)

gl.exe = gl.createProgram()
gl.attachShader(gl.exe, gl.vs)
gl.attachShader(gl.exe, gl.fs)
gl.linkProgram(gl.exe)

gl.enable(gl.CULL_FACE)
gl.enable(gl.DEPTH_TEST)

/*
** #############
** # SETUP ATT #
** #############
*/
gl.vao = gl.createVertexArray()
gl.bindVertexArray(gl.vao)

gl.vb = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, gl.vb)
gl.bufferData(gl.ARRAY_BUFFER, vertexSequence, gl.STATIC_DRAW)

gl.att = {}
gl.att.label = gl.getAttribLocation(gl.exe, 'label')
gl.enableVertexAttribArray(gl.att.label)

gl.vertexAttribPointer(gl.att.label, 1, gl.FLOAT, false, vertexSequence.BYTES_PER_ELEMENT, 0)

gl.useProgram(gl.exe)
gl.bindVertexArray(gl.vao)

/*
** #############
** # SETUP UNI #
** #############
*/
gl.uni = {}

gl.uni.vertexCoordinates = []
for (let i = 0; i < 8; i++) {
  gl.uni.vertexCoordinates[i] = gl.getUniformLocation(gl.exe, `vertexCoordinates[${i}]`)
  gl.uniform4f(gl.uni.vertexCoordinates[i],
    vertexCoordinates[4 * i + 0],
    vertexCoordinates[4 * i + 1],
    vertexCoordinates[4 * i + 2],
    vertexCoordinates[4 * i + 3])
}

gl.uni.aimSpin = gl.getUniformLocation(gl.exe, 'aimSpin')
const checkAimSpin = hadChanged({theta: Infinity, phi: Infinity, spin: Infinity})

gl.uni.shiftTilt = []
for (let i = 0; i < 15; i++) {
  gl.uni.shiftTilt[i] = gl.getUniformLocation(gl.exe, `shiftTilt[${i}]`)
}
const checkPads = []
checkPads.push(hadChanged({eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))
checkPads.push(hadChanged({eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))
checkPads.push(hadChanged({eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))
checkPads.push(hadChanged({eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))
checkPads.push(hadChanged({eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))

gl.draw = function gldraw () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 14, 15)
}

export default function (hand) {
  let needDraw = false
  if (checkAimSpin(hand)) {
    aimSpin.updater(hand)
    gl.uniformMatrix4fv(gl.uni.aimSpin, false, aimSpin.matrix)
    needDraw = true
  }
  for (let i = 0; i < 15; i++) {
    const angles = hand.fingers[Math.trunc(i / 3)].angles
    if (checkPads[i](angles)) {
      shiftTilt.updateres[i](angles)
      gl.uniformMatrix4fv(gl.uni.shiftTilt[i], false, shiftTilt.matrixes[i])
      needDraw = true
    }
  }
  if (needDraw) {
    gl.draw()
  }
}
