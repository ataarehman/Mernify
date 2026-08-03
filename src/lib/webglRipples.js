/**
 * WebGL water/liquid ripple engine — ported from mernify-web `ripple-2.js`
 * (jquery.ripples) without jQuery. Requires OES_texture_float support.
 */

function hasWebGLSupport() {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const ok =
      Boolean(gl) &&
      Boolean(gl.getExtension('OES_texture_float')) &&
      Boolean(gl.getExtension('OES_texture_float_linear'))
    return ok
  } catch {
    return false
  }
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`compile error: ${info}`)
  }
  return shader
}

function createProgram(gl, vertexSource, fragmentSource) {
  const program = { id: gl.createProgram(), locations: {}, uniforms: {} }
  gl.attachShader(program.id, compileShader(gl, gl.VERTEX_SHADER, vertexSource))
  gl.attachShader(program.id, compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource))
  gl.linkProgram(program.id)
  if (!gl.getProgramParameter(program.id, gl.LINK_STATUS)) {
    throw new Error(`link error: ${gl.getProgramInfoLog(program.id)}`)
  }

  gl.useProgram(program.id)
  gl.enableVertexAttribArray(0)

  const regex = /uniform (\w+) (\w+)/g
  const shaderCode = vertexSource + fragmentSource
  let match
  while ((match = regex.exec(shaderCode)) != null) {
    program.locations[match[2]] = gl.getUniformLocation(program.id, match[2])
  }

  return program
}

function bindTexture(gl, texture, unit = 0) {
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, texture)
}

const VERTEX = [
  'attribute vec2 vertex;',
  'varying vec2 coord;',
  'void main() {',
  '  coord = vertex * 0.5 + 0.5;',
  '  gl_Position = vec4(vertex, 0.0, 1.0);',
  '}',
].join('\n')

/**
 * @param {HTMLElement} el - Container that receives the canvas
 * @param {{
 *   imageUrl: string,
 *   resolution?: number,
 *   perturbance?: number,
 *   interactiveEl?: HTMLElement,
 *   onReady?: () => void,
 *   onError?: () => void,
 * }} options
 * @returns {{ destroy: () => void } | null}
 */
export function createWebGLRipples(el, options) {
  if (!el || !options?.imageUrl || !hasWebGLSupport()) return null

  const resolution = options.resolution ?? 400
  const perturbance = options.perturbance ?? 0.03
  const interactiveEl = options.interactiveEl || el
  const textureDelta = new Float32Array([1 / resolution, 1 / resolution])

  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;opacity:0;transition:opacity 0.45s ease;'
  el.appendChild(canvas)

  const gl =
    canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true }) ||
    canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: true })

  if (!gl) {
    canvas.remove()
    return null
  }

  gl.getExtension('OES_texture_float')
  gl.getExtension('OES_texture_float_linear')

  let backgroundTexture = null
  let backgroundWidth = 0
  let backgroundHeight = 0
  let rafId = 0
  let destroyed = false
  let running = true

  const textures = []
  const framebuffers = []

  for (let i = 0; i < 2; i += 1) {
    const texture = gl.createTexture()
    const framebuffer = gl.createFramebuffer()
    framebuffer.width = resolution
    framebuffer.height = resolution

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.FLOAT, null)

    const renderbuffer = gl.createRenderbuffer()
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer)
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, resolution, resolution)

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer)

    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      canvas.remove()
      return null
    }

    gl.bindTexture(gl.TEXTURE_2D, null)
    gl.bindRenderbuffer(gl.RENDERBUFFER, null)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    textures.push(texture)
    framebuffers.push(framebuffer)
  }

  const quad = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quad)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
    gl.STATIC_DRAW,
  )

  const dropProgram = createProgram(
    gl,
    VERTEX,
    [
      'precision highp float;',
      'const float PI = 3.141592653589793;',
      'uniform sampler2D texture;',
      'uniform vec2 center;',
      'uniform float radius;',
      'uniform float strength;',
      'varying vec2 coord;',
      'void main() {',
      '  vec4 info = texture2D(texture, coord);',
      '  float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);',
      '  drop = 0.5 - cos(drop * PI) * 0.5;',
      '  info.r += drop * strength;',
      '  gl_FragColor = info;',
      '}',
    ].join('\n'),
  )

  const updateProgram = []
  updateProgram[0] = createProgram(
    gl,
    VERTEX,
    [
      'precision highp float;',
      'uniform sampler2D texture;',
      'uniform vec2 delta;',
      'varying vec2 coord;',
      'void main() {',
      '  vec4 info = texture2D(texture, coord);',
      '  vec2 dx = vec2(delta.x, 0.0);',
      '  vec2 dy = vec2(0.0, delta.y);',
      '  float average = (',
      '    texture2D(texture, coord - dx).r +',
      '    texture2D(texture, coord - dy).r +',
      '    texture2D(texture, coord + dx).r +',
      '    texture2D(texture, coord + dy).r',
      '  ) * 0.25;',
      '  info.g += (average - info.r) * 2.0;',
      '  info.g *= 0.98;',
      '  info.r += info.g;',
      '  gl_FragColor = info;',
      '}',
    ].join('\n'),
  )
  gl.uniform2fv(updateProgram[0].locations.delta, textureDelta)

  updateProgram[1] = createProgram(
    gl,
    VERTEX,
    [
      'precision highp float;',
      'uniform sampler2D texture;',
      'uniform vec2 delta;',
      'varying vec2 coord;',
      'void main() {',
      '  vec4 info = texture2D(texture, coord);',
      '  vec3 dx = vec3(delta.x, texture2D(texture, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);',
      '  vec3 dy = vec3(0.0, texture2D(texture, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);',
      '  info.ba = normalize(cross(dy, dx)).xz;',
      '  gl_FragColor = info;',
      '}',
    ].join('\n'),
  )
  gl.uniform2fv(updateProgram[1].locations.delta, textureDelta)

  const renderProgram = createProgram(
    gl,
    [
      'precision highp float;',
      'attribute vec2 vertex;',
      'uniform vec2 topLeft;',
      'uniform vec2 bottomRight;',
      'uniform vec2 containerRatio;',
      'varying vec2 ripplesCoord;',
      'varying vec2 backgroundCoord;',
      'void main() {',
      '  backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);',
      '  backgroundCoord.y = 1.0 - backgroundCoord.y;',
      '  ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;',
      '  gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);',
      '}',
    ].join('\n'),
    [
      'precision highp float;',
      'uniform sampler2D samplerBackground;',
      'uniform sampler2D samplerRipples;',
      'uniform float perturbance;',
      'varying vec2 ripplesCoord;',
      'varying vec2 backgroundCoord;',
      'void main() {',
      '  vec2 offset = -texture2D(samplerRipples, ripplesCoord).ba;',
      '  float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);',
      '  gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;',
      '}',
    ].join('\n'),
  )
  gl.uniform1f(renderProgram.locations.perturbance, perturbance)
  renderProgram.uniforms.topLeft = new Float32Array([0, 0])
  renderProgram.uniforms.bottomRight = new Float32Array([1, 1])
  renderProgram.uniforms.containerRatio = new Float32Array([1, 1])

  function drawQuad() {
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
  }

  function resize() {
    const width = el.clientWidth || 1
    const height = el.clientHeight || 1
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
  }

  function computeTextureBoundaries() {
    const winWidth = el.clientWidth || 1
    const winHeight = el.clientHeight || 1
    const scale = Math.max(winWidth / backgroundWidth, winHeight / backgroundHeight)
    const backgroundW = backgroundWidth * scale
    const backgroundH = backgroundHeight * scale
    const backgroundX = (winWidth - backgroundW) / 2
    const backgroundY = (winHeight - backgroundH) / 2

    renderProgram.uniforms.topLeft = new Float32Array([
      -backgroundX / backgroundW,
      -backgroundY / backgroundH,
    ])
    renderProgram.uniforms.bottomRight = new Float32Array([
      renderProgram.uniforms.topLeft[0] + winWidth / backgroundW,
      renderProgram.uniforms.topLeft[1] + winHeight / backgroundH,
    ])

    const maxSide = Math.max(canvas.width, canvas.height)
    renderProgram.uniforms.containerRatio = new Float32Array([
      canvas.width / maxSide,
      canvas.height / maxSide,
    ])
  }

  function dropAt(offsetX, offsetY, radius, strength) {
    if (!backgroundTexture || destroyed) return

    const elWidth = el.clientWidth || 1
    const elHeight = el.clientHeight || 1
    const longestSide = Math.max(elWidth, elHeight)
    const dropPosition = new Float32Array([
      (2 * offsetX - elWidth) / longestSide,
      (elHeight - 2 * offsetY) / longestSide,
    ])

    gl.viewport(0, 0, resolution, resolution)
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[0])
    bindTexture(gl, textures[1])
    gl.useProgram(dropProgram.id)
    gl.uniform2fv(dropProgram.locations.center, dropPosition)
    gl.uniform1f(dropProgram.locations.radius, radius)
    gl.uniform1f(dropProgram.locations.strength, strength)
    drawQuad()

    const fb = framebuffers[0]
    framebuffers[0] = framebuffers[1]
    framebuffers[1] = fb
    const tex = textures[0]
    textures[0] = textures[1]
    textures[1] = tex

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  function updateTextures() {
    computeTextureBoundaries()
    gl.viewport(0, 0, resolution, resolution)
    for (let i = 0; i < 2; i += 1) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[i])
      bindTexture(gl, textures[1 - i])
      gl.useProgram(updateProgram[i].id)
      drawQuad()
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  function render() {
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(renderProgram.id)
    bindTexture(gl, backgroundTexture, 0)
    bindTexture(gl, textures[0], 1)
    gl.uniform2fv(renderProgram.locations.topLeft, renderProgram.uniforms.topLeft)
    gl.uniform2fv(renderProgram.locations.bottomRight, renderProgram.uniforms.bottomRight)
    gl.uniform2fv(renderProgram.locations.containerRatio, renderProgram.uniforms.containerRatio)
    gl.uniform1i(renderProgram.locations.samplerBackground, 0)
    gl.uniform1i(renderProgram.locations.samplerRipples, 1)
    drawQuad()
  }

  function step() {
    if (destroyed) return
    if (running && backgroundTexture) {
      resize()
      updateTextures()
      render()
      rafId = requestAnimationFrame(step)
    } else {
      rafId = 0
    }
  }

  /** Paint one frame even when the RAF loop is paused (critical for first reveal). */
  function paintOnce() {
    if (destroyed || !backgroundTexture) return false
    resize()
    if ((el.clientWidth || 0) < 2 || (el.clientHeight || 0) < 2) return false
    updateTextures()
    render()
    canvas.style.opacity = '1'
    return true
  }

  let visibleInViewport = true
  let readyNotified = false

  function notifyReady() {
    if (readyNotified || destroyed) return
    readyNotified = true
    options.onReady?.()
  }

  function applyRunning(next) {
    if (destroyed) return
    const shouldRun = Boolean(next) && document.visibilityState !== 'hidden'
    if (shouldRun === running) {
      if (shouldRun && backgroundTexture && !rafId) {
        rafId = requestAnimationFrame(step)
      }
      return
    }
    running = shouldRun
    if (running && !rafId) {
      rafId = requestAnimationFrame(step)
    }
  }

  function pointerToLocal(clientX, clientY) {
    const rect = el.getBoundingClientRect()
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  function onPointerMove(event) {
    if (destroyed || !running || event.pointerType === 'touch') return
    const { x, y } = pointerToLocal(event.clientX, event.clientY)
    if (x < 0 || y < 0 || x > el.clientWidth || y > el.clientHeight) return
    dropAt(x, y, 0.03, 0.01)
  }

  function onPointerDown(event) {
    if (destroyed || !running || event.pointerType === 'touch') return
    const { x, y } = pointerToLocal(event.clientX, event.clientY)
    if (x < 0 || y < 0 || x > el.clientWidth || y > el.clientHeight) return
    dropAt(x, y, 0.09, 0.14)
  }

  function onVisibility() {
    if (document.visibilityState === 'hidden') {
      applyRunning(false)
    } else if (visibleInViewport) {
      applyRunning(true)
    }
  }

  const image = new Image()
  image.decoding = 'async'
  image.onload = () => {
    if (destroyed) return
    backgroundWidth = image.width
    backgroundHeight = image.height
    const powerOfTwo = (x) => (x & (x - 1)) === 0
    const wrapping =
      powerOfTwo(image.width) && powerOfTwo(image.height) ? gl.REPEAT : gl.CLAMP_TO_EDGE

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapping)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapping)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    backgroundTexture = texture

    // Always paint once before announcing ready — never reveal an empty canvas.
    const painted = paintOnce()
    if (!painted) {
      // Layout may still be settling (entrance curtain / fonts). Retry briefly.
      let attempts = 0
      const retry = () => {
        if (destroyed || readyNotified) return
        attempts += 1
        if (paintOnce() || attempts >= 20) {
          notifyReady()
          if (running && !rafId) rafId = requestAnimationFrame(step)
          return
        }
        requestAnimationFrame(retry)
      }
      requestAnimationFrame(retry)
    } else {
      notifyReady()
    }

    if (running && !rafId) {
      rafId = requestAnimationFrame(step)
    }
  }
  image.onerror = () => {
    if (destroyed) return
    options.onError?.()
    // Tear down quietly so the static <img> fallback remains visible.
    destroyed = true
    running = false
    cancelAnimationFrame(rafId)
    interactiveEl.removeEventListener('pointermove', onPointerMove)
    interactiveEl.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVisibility)
    canvas.remove()
  }
  image.src = options.imageUrl

  interactiveEl.addEventListener('pointermove', onPointerMove, { passive: true })
  interactiveEl.addEventListener('pointerdown', onPointerDown, { passive: true })
  window.addEventListener('resize', resize, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  rafId = requestAnimationFrame(step)

  return {
    setRunning(next) {
      visibleInViewport = Boolean(next)
      applyRunning(next)
    },
    resize,
    paintOnce,
    destroy() {
      if (destroyed) return
      destroyed = true
      running = false
      cancelAnimationFrame(rafId)
      rafId = 0
      interactiveEl.removeEventListener('pointermove', onPointerMove)
      interactiveEl.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.remove()
      const ext = gl.getExtension('WEBGL_lose_context')
      ext?.loseContext()
    },
  }
}

export function canUseWebGLRipples() {
  return hasWebGLSupport()
}
