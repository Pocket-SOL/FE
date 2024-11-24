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
			// 절대경로로 접근하기
			{ find: "~/images", replacement: "/src/assets/images" },
			{ find: "~/context", replacement: "/src/context" },
			{ find: "~/components", replacement: "/src/components" },
			{ find: "~/contexts", replacement: "/src/contexts" },
			{ find: "~/libs", replacement: "/src/libs" },
			{ find: "~/routers", replacement: "/src/routers" },
		],
	},
});
