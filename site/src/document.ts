import { z } from "zod"
import { toSlug } from "./api/common"

export const DocumentSchema = z
    .object({
        title: z.string(),
        slug: z.string().nullish(),
        desc: z.string(),
        license: z.string(),
        author: z.string(),
        organization: z.string(),
        version: z.string(),
        copyright: z.string(),
        url: z.string(),
        license_url: z.string().nullish(),
    })
    .transform((data) => ({ ...data, slug: data.slug || toSlug(data.title) }))
    .transform((data) => ({
        ...data,
        license_url: data.license_url || data.url,
    }))

export type Document5e = z.infer<typeof DocumentSchema>

export const DocumentEndpointSchema = z.array(DocumentSchema)
