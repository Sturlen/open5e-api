import { z } from "zod"
import { isSlug } from "./api/common"

export const DocumentSchema = z.object({
    title: z.string(),
    slug: z.string().refine(isSlug, "slug must be a slug"),
    desc: z.string(),
    license: z.string(),
    author: z.string(),
    organization: z.string(),
    version: z.string(),
    copyright: z.string(),
    url: z.string(),
    license_url: z.string(),
})

export type Document5e = z.infer<typeof DocumentSchema>

export const DocumentEndpointSchema = z.array(DocumentSchema)
