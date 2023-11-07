import slugify from "slugify"
import fs from "fs"
import { ZodType } from "zod"

export function toSlug(s: string) {
    return slugify(s, {
        lower: true,
        strict: true,
        trim: true,
    })
}

export function isSlug(s: string) {
    return s === toSlug(s)
}

export function readJsonFile<T>(filePath: string, schema: ZodType<T>): T {
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const parsedJson = JSON.parse(fileContent)
    const validatedData = schema.parse(parsedJson)
    return validatedData
}
