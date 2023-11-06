import { z } from "zod"
export const GameObject = z.object({
    slug: z.string(),
    name: z.string(),
    desc: z.string(),

    document__slug: z.string(),
    document__title: z.string(),
    document__license_url: z.string(),
    document__url: z.string(),
})

export const Class5eSchema = GameObject.extend({
    hit_dice: z.string(),
    hp_at_1st_level: z.string(),
    hp_at_higher_levels: z.string(),
    prof_armor: z.string(),
    prof_weapons: z.string(),
    prof_tools: z.string(),
    prof_saving_throws: z.string(),
    prof_skills: z.string(),
    equipment: z.string(),
    table: z.string(),
    spellcasting_ability: z.string(),
    subtypes_name: z.string(),
    archetypes: z.array(GameObject),
})

export type Class5e = z.infer<typeof Class5eSchema>
