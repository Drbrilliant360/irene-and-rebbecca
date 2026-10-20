import { useEffect, useRef } from 'react'

/**
 * Three.js hero decoration: the seven coloured dots of the school logo drift gently
 * with smaller white "stars", joined by faint lines when they come close — a living
 * version of the logo's constellation. Loaded on demand (its own chunk, with three.js),
 * only on capable devices (see useRichDecoration), paused when off-screen or the tab is hidden.
 */

const LOGO_COLOURS = ['#F5D21E', '#1F7A45', '#EE7A22', '#BFE0C2', '#D4106A', '#D7262E', '#1A8BD8']
const COLOURED = 14
const STARS = 34
const LINK_DISTANCE = 4.4

export default function HeroConstellation({ onReady }: { onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let disposed = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (disposed) return

      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
      } catch {
        return // No WebGL: the CSS shapes stay as the decoration.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
      camera.position.z = 18
      const group = new THREE.Group()
      scene.add(group)

      // Nodes: logo-coloured dots and small white stars, all on the right (away from the headline).
      const sphere = new THREE.SphereGeometry(1, 20, 20)
      const materials: InstanceType<typeof THREE.MeshBasicMaterial>[] = []
      const nodes: { mesh: InstanceType<typeof THREE.Mesh>; base: InstanceType<typeof THREE.Vector3>; phase: number; speed: number; amp: number }[] = []
      const rand = (min: number, max: number) => min + Math.random() * (max - min)

      for (let i = 0; i < COLOURED + STARS; i++) {
        const coloured = i < COLOURED
        const material = new THREE.MeshBasicMaterial({
          color: coloured ? LOGO_COLOURS[i % LOGO_COLOURS.length] : '#ffffff',
          transparent: true,
          opacity: coloured ? 0.95 : 0.55,
        })
        materials.push(material)
        const mesh = new THREE.Mesh(sphere, material)
        const size = coloured ? rand(0.28, 0.48) : rand(0.05, 0.12)
        mesh.scale.setScalar(size)
        // x > ~1 keeps everything clear of the left-aligned headline and buttons.
        const base = new THREE.Vector3(coloured ? rand(5, 15) : rand(2.5, 17), rand(-8, 8), rand(-6, 3))
        mesh.position.copy(base)
        group.add(mesh)
        nodes.push({ mesh, base, phase: rand(0, Math.PI * 2), speed: rand(0.15, 0.35), amp: coloured ? rand(0.4, 0.9) : rand(0.2, 0.5) })
      }

      // Lines between nearby nodes, rebuilt each frame into a fixed-size buffer.
      const maxSegments = (nodes.length * (nodes.length - 1)) / 2
      const linePositions = new Float32Array(maxSegments * 6)
      const lineGeometry = new THREE.BufferGeometry()
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage))
      const lineMaterial = new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.16 })
      group.add(new THREE.LineSegments(lineGeometry, lineMaterial))

      // Gentle parallax towards the pointer.
      const pointer = { x: 0, y: 0 }
      const onPointer = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1
      }
      window.addEventListener('pointermove', onPointer, { passive: true })

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = canvas.parentElement ?? canvas
        renderer.setSize(w, h, false)
        camera.aspect = w / Math.max(h, 1)
        camera.updateProjectionMatrix()
      }
      const ro = new ResizeObserver(resize)
      ro.observe(canvas.parentElement ?? canvas)
      resize()

      let frame = 0
      let running = false
      const clock = new THREE.Clock()
      const tick = () => {
        const t = clock.getElapsedTime()
        for (const n of nodes) {
          n.mesh.position.set(
            n.base.x + Math.sin(t * n.speed + n.phase) * n.amp,
            n.base.y + Math.cos(t * n.speed * 0.8 + n.phase) * n.amp,
            n.base.z,
          )
        }
        let k = 0
        for (let a = 0; a < nodes.length; a++) {
          for (let b = a + 1; b < nodes.length; b++) {
            const pa = nodes[a].mesh.position
            const pb = nodes[b].mesh.position
            if (pa.distanceTo(pb) < LINK_DISTANCE) {
              linePositions.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], k)
              k += 6
            }
          }
        }
        lineGeometry.setDrawRange(0, k / 3)
        lineGeometry.attributes.position.needsUpdate = true

        group.rotation.y += (pointer.x * 0.12 - group.rotation.y) * 0.04
        group.rotation.x += (pointer.y * 0.08 - group.rotation.x) * 0.04
        renderer.render(scene, camera)
        frame = requestAnimationFrame(tick)
      }
      const start = () => {
        if (running || document.hidden) return
        running = true
        clock.start()
        frame = requestAnimationFrame(tick)
      }
      const stop = () => {
        running = false
        cancelAnimationFrame(frame)
      }

      let visible = true
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      })
      io.observe(canvas)
      const onVisibility = () => (document.hidden || !visible ? stop() : start())
      document.addEventListener('visibilitychange', onVisibility)

      start()
      onReady?.()

      cleanup = () => {
        stop()
        io.disconnect()
        ro.disconnect()
        window.removeEventListener('pointermove', onPointer)
        document.removeEventListener('visibilitychange', onVisibility)
        sphere.dispose()
        lineGeometry.dispose()
        lineMaterial.dispose()
        materials.forEach((m) => m.dispose())
        renderer.dispose()
      }
    }).catch(() => {
      // Chunk failed to load (e.g. connection dropped): keep the CSS fallback decoration.
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [onReady])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
