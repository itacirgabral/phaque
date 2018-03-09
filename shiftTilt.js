const matrixes = []
const scl = 400

// thumb
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  100 / scl, -250 / scl, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  (100 + 250 / 3) / scl, (-250 + 250 / 3) / scl, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  (100 + 500 / 3) / scl, (-250 + 500 / 3) / scl, 0.0, 1.0
]))

// index
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  100 / scl, 0.0, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  100 / scl, (350 / 3) / scl, 0.0, 1
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  100 / scl, (700 / 3) / scl, 0.0, 1.0
]))

// middle
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, (350 / 3) / scl, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, (700 / 3) / scl, 0.0, 1.0
]))

// ring
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  -100 / scl, 0.0, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  -100 / scl, (350 / 3) / scl, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  -100 / scl, (700 / 3) / scl, 0.0, 1.0
]))

// pinky
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  -200 / scl, 0.0, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  -200 / scl, (350 / 3) / scl, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  -200 / scl, (700 / 3) / scl, 0.0, 1.0
]))

const updateres = []
for (let i = 0; i < 15; i++) {
  updateres.push(({alpha, beta, gamma, eta}) => {})
}

export {matrixes, updateres}