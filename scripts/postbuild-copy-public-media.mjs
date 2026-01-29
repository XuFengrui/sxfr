import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const publicDir = path.join(root, "public")
const outDir = path.join(root, "out")

function copyIfExists(relPath) {
  const src = path.join(publicDir, relPath)
  const dest = path.join(outDir, relPath)
  if (!fs.existsSync(src)) return
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  // eslint-disable-next-line no-console
  console.log(`[postbuild] Copied ${relPath} -> out/`)
}

// Media files that are easy to forget / large.
copyIfExists("surprise-video.mp4")
copyIfExists("video-poster.jpg")
copyIfExists("draw-sound.mp3")

