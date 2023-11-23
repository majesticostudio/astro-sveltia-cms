import sveltiaCms from "../dist/astro-sveltia-cms";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://astro-sveltia-cms.vercel.app",
	integrations: [sveltiaCms()],
	output: "server",
});
