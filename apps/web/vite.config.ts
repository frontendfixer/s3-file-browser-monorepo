import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	plugins: [
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tanstackStart(),
		tanstackRouter({
			autoCodeSplitting: true,
		}),
		viteReact(),
		tailwindcss(),
	],

	resolve: {
		alias: {
			// Optional — explicit alias for convenience
			"@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
		},
		dedupe: ["react", "react-dom"], // prevent duplicate React instances
	},

	server: {
		fs: {
			allow: [
				path.resolve(__dirname, "../../"),
				path.resolve(__dirname, "../../packages/ui"),
			],
		},
	},

	// Optional: ensure correct base for TanStack’s router SSR
	ssr: {
		external: [],
	},
});

export default config;
