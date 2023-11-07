import { readFileSync, writeFileSync } from "fs"
import { z } from "zod"
import slugify from "slugify"
const monsters = JSON.parse(
    readFileSync("./cache/monsters.json", { encoding: "utf-8" })
)
const images_data = JSON.parse(
    readFileSync("./src/api/monster_images.json", { encoding: "utf-8" })
)

const paths = images_data.tree.map(({ path }) => [
    path.split(".")[0],
    `https://github.com/Sturlen/open5e-api/blob/monster-images/static/img/monsters/${
        path.split(".")[0]
    }.png?raw=true`,
])

const image_map = new Map(paths)

const monsters_w_images = monsters.map((mon) => {
    const slug = slugify(mon.name, { lower: true, strict: true, trim: true })
    mon.img = image_map.get(slug)
    return mon
})
writeFileSync(`./src/api/monsters.json`, JSON.stringify(monsters_w_images), {
    encoding: "utf-8",
})
