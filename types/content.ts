import { z } from 'zod'

export const titleSchema = z.object({
  label: z.string().optional(),
  main: z.string(),
  subtitle: z.string().optional()
})

export const faqSchema = z.object({
  title: z.string(),
  description: z.string()
})

export type TitleT = z.infer<typeof titleSchema>
export type FaqT = z.infer<typeof faqSchema>
