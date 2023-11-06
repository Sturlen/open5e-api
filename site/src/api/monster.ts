import { z } from "zod"

const SpeedSchema = z.record(z.union([z.number(), z.boolean(), z.string()]))

export const MonsterSchema = z
    .object({
        slug: z.string().nullish(),
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
        speed: z.string(),
        speed_json: SpeedSchema,
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
        skills: z.record(z.number()).nullish(),
        damage_vulnerabilities: z.string().nullish(),
        damage_resistances: z.string().nullish(),
        damage_immunities: z.string().nullish(),
        condition_immunities: z.string().nullish(),
        senses: z.string(),
        languages: z.string().nullish(),
        challenge_rating: z.string(),
        actions: z.string().or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        ).default([]),
        reactions: z.string().or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        ).nullish(),
        legendary_desc: z.string().nullish(),
        legendary_actions: z.string().or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        ).nullish(),
        special_abilities: z.string().or(
            z.array(
                z.object({
                    name: z.string(),
                    desc: z.string(),
                    damage_dice: z.string().nullish(),
                    attack_bonues: z.string().nullish(),
                })
            )
        ).nullish(),
        spell_list: z.array(z.string()).nullish(),
        page_no: z.number().nullish(),

        img: z.string().optional(),
        document__license_url: z.string().default(""),
        document__slug: z.string().default(""),
        document__title: z.string().default(""),
        document__url: z.string().default(""),
    })
    .transform((m) => {
        const {
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            name,
            slug,
            ...rest
        } = m
        return {
            ...rest,
            name,
            slug: slug || name.toLowerCase().replaceAll(" ", "-"),
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
