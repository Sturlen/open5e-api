import { z } from "zod"

const SpeedSchema = z.record(z.union([z.number(), z.boolean(), z.string()]))

export const MonsterSchema = z
    .object({
        slug: z.string(),
        name: z.string(),
        size: z.string(),
        type: z.string(),
        subtype: z.string().nullish(),
        group: z.string().nullish(),
        alignment: z.string(),
        armor_class: z.number(),
        armor_desc: z.string().nullish(),
        hit_points: z.number(),
        hit_dice: z.string(),
        speed: SpeedSchema,
        strength: z.number(),
        dexterity: z.number(),
        constitution: z.number(),
        intelligence: z.number(),
        wisdom: z.number(),
        charisma: z.number(),
        strength_save: z.number().nullish(),
        dexterity_save: z.number().nullish(),
        constitution_save: z.number().nullish(),
        intelligence_save: z.number().nullish(),
        wisdom_save: z.number().nullish(),
        charisma_save: z.number().nullish(),
        perception: z.number().nullish(),
        skills: z.record(z.number()),
        damage_vulnerabilities: z.string().nullish(),
        damage_resistances: z.string().nullish(),
        damage_immunities: z.string().nullish(),
        condition_immunities: z.string().nullish(),
        senses: z.string(),
        languages: z.string().nullish(),
        challenge_rating: z.string(),
        cr: z.number(),
        actions: z.string().or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        ),
        reactions: z.string().or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        ),
        legendary_desc: z.string(),
        legendary_actions: z.string().or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        ),
        special_abilities: z.string().or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        ),
        spell_list: z.array(z.string()),
        page_no: z.number().nullish(),
        document__license_url: z.string(),
        document__slug: z.string(),
        document__title: z.string(),
        document__url: z.string(),

        img: z.string().optional(),
    })
    .transform((m) => {
        const {
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            ...rest
        } = m
        return {
            ...rest,
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
