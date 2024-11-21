import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000/",
			},
		},
	},
	resolve: {
		alias: [
			// 절대경로로접근하기
			{ find: "~/components", replacement: "/src/components" },
			{ find: "~/libs", replacement: "/src/libs" },
			{ find: "~/routers", replacement: "/src/routers" },
			{ find: "~/routes", replacement: "/src/routes" },
		],
	},
});
