import { defineCollection, z } from "astro:content";

const post = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			img: image(),
		}),
});

const authors = defineCollection({
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			img: image(),
		}),
});

export const collections = { post, authors };
