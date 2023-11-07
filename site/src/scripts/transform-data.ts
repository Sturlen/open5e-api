import { readFileSync, readdirSync, writeFileSync } from "fs"
import path from "path"
import { MonsterSchema, type Monster } from "../api/monster"
import {
    DocumentSchema,
    type Document5e,
    DocumentEndpointSchema,
} from "../document"
import { readJsonFile } from "../api/common"
import { z } from "zod"

const data_path = "../data"
const cache_path = "./public"

const monsters: Monster[] = []

const source_dirs = readdirSync(data_path)
source_dirs.map((dirname: string) => {
    const dir = readdirSync(path.join(data_path, dirname))
    if (!dir.includes("document.json")) {
        return
    }

    const document = readJsonFile(
        path.join(data_path, dirname, "document.json"),
        DocumentEndpointSchema
    )[0]

    if (!document) {
        return
    }
    const document__license_url = document.license_url
    const document__slug = document.slug
    const document__title = document.title
    const document__url = document.url
    console.log("document", document__title)

    if (dir.includes("monsters.json")) {
        const mons = readJsonFile(
            path.join(data_path, dirname, "monsters.json"),
            z.array(z.object({}))
        ).map((mon) =>
            MonsterSchema.parse({
                ...mon,
                document__license_url,
                document__slug,
                document__title,
                document__url,
            })
        )
        monsters.push(...mons)
    }
})

writeFileSync(
    path.join(cache_path, "monsters.json"),
    JSON.stringify(monsters, null, 4)
)

const endpoints = [
    "monsters",
    "spells",
    "documents",
    "backgrounds",
    "planes",
    "sections",
    "feats",
    "conditions",
    "races",
    "classes",
    "magicitems",
    "weapons",
    "armor",
] as const

// const transformers = new Map([
//     [
//         "monsters",
//         (monsters) => {
//             const images_data = JSON.parse(
//                 readFileSync("./src/api/monster_images.json", {
//                     encoding: "utf-8",
//                 })
//             )

//             const paths = images_data.tree.map(({ path }) => [
//                 path.split(".")[0],
//                 `https://github.com/Sturlen/open5e-api/blob/monster-images/static/img/monsters/${
//                     path.split(".")[0]
//                 }.png?raw=true`,
//             ])

//             const image_map = new Map(paths)

//             const monsters_w_images = monsters.map((mon) => {
//                 const slug = slugify(mon.name, {
//                     lower: true,
//                     strict: true,
//                     trim: true,
//                 })
//                 mon.img = image_map.get(slug)
//                 return mon
//             })
//             return monsters_w_images
//         },
//     ],
// ])

// function identity(param) {
//     return param
// }

// endpoints.forEach((endpoint) => {
//     const input = JSON.parse(
//         readFileSync(`./cache/${endpoint}.json`, { encoding: "utf-8" })
//     )
//     const transformer_func = transformers.get(endpoint) ?? identity
//     const output = transformer_func(input)

//     writeFileSync(`./src/api/${endpoint}.json`, JSON.stringify(output), {
//         encoding: "utf-8",
//     })
// })
