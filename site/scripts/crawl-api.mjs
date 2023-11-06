import dotenv from "dotenv"
import { writeFile } from "fs/promises"
dotenv.config()

const endpoints = [
    "manifest",
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
]

async function crawler(url, outputList) {
    const response = await (await fetch(url)).json()

    const results = response.results
    outputList.push(...results)
    const next_url = response.next

    console.log("items:", outputList.length)

    next_url && (await crawler(next_url, outputList))
}

console.time("total")

for (const endpoint of endpoints) {
    console.group(endpoint)
    const endpoint_url = `${process.env.OPEN5E_API}/${endpoint}/`
    const results = []
    console.time("fetch")
    await crawler(endpoint_url, results)
    console.timeEnd("fetch")
    console.time("write")
    await writeFile(
        "./cache/" + endpoint + ".json",
        JSON.stringify(results, null, 4),
        {
            encoding: "utf-8",
        }
    )
    console.timeEnd("write")
    console.log("fetched ", results.length, endpoint)
    console.groupEnd()
}

console.timeEnd("total")
