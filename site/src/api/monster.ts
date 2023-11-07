import slugify from "slugify"
import { z } from "zod"

const SpeedSchema = z.record(z.union([z.number(), z.boolean(), z.string()]))

export const RawMonsterSchema = z.object({
    slug: z.string().nullish(),
    name: z.string(),
    size: z.string(),
    type: z.string(),
    subtype: z.string().nullish(),
    group: z.string().nullish(),
    alignment: z.string(),
    ac: z.coerce.number().nullish(),
    armor_class: z.coerce.number().nullish(),
    armor_desc: z.string().nullish(),
    hit_points: z.coerce.number(),
    hit_dice: z.string(),
    speed: z.string().or(SpeedSchema),
    speed_json: SpeedSchema,
    strength: z.coerce.number(),
    dexterity: z.coerce.number(),
    constitution: z.coerce.number(),
    intelligence: z.coerce.number(),
    wisdom: z.coerce.number(),
    charisma: z.coerce.number(),
    strength_save: z.number().nullish(),
    dexterity_save: z.number().nullish(),
    constitution_save: z.number().nullish(),
    intelligence_save: z.number().nullish(),
    wisdom_save: z.number().nullish(),
    charisma_save: z.number().nullish(),
    perception: z.number().nullish(),
    skills: z.record(z.number()).nullish(),
    damage_vulnerabilities: z.string().nullish(),
    damage_resistances: z.string().nullish(),
    damage_immunities: z.string().nullish(),
    condition_immunities: z.string().nullish(),
    senses: z.string(),
    languages: z.string().nullish(),
    challenge_rating: z.coerce.string(),
    actions: z
        .string()
        .or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        )
        .default([]),
    reactions: z
        .string()
        .or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        )
        .nullish(),
    legendary_desc: z.string().nullish(),
    legendary_actions: z
        .string()
        .or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        )
        .nullish(),
    special_abilities: z
        .string()
        .or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        )
        .nullish(),
    spell_list: z.array(z.string()).nullish(),
    page_no: z.number().nullish(),

    img: z.string().optional(),
})

export const MonsterSchema = RawMonsterSchema.extend({
    document__license_url: z.string(),
    document__slug: z.string(),
    document__title: z.string(),
    document__url: z.string(),
}).transform((m) => {
    const {
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        name,
        slug,
        ac,
        armor_class,
        ...rest
    } = m
    return {
        ...rest,
        name,
        armor_class: armor_class || ac || 42,
        slug: slug || toSlug(name),
        stats: {
            str: strength,
            dex: dexterity,
            con: constitution,
            int: intelligence,
            wis: wisdom,
            chr: charisma,
        } as const,
    }
})

export type Stat = "str" | "dex" | "con" | "int" | "wis" | "chr"

export type Monster = z.infer<typeof MonsterSchema>
function toSlug(s: string) {
    return slugify(s, {
        lower: true,
        strict: true,
        trim: true,
    })
}
