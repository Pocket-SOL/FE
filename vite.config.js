import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000/",
				changeOrigin: true,
			},
			"/oauth": {
				target: "https://testapi.openbanking.or.kr/oauth",
				changeOrigin: true, // 이 옵션을 추가하여 CORS 문제를 해결
				rewrite: (path) => path.replace(/^\/oauth/, ""),
				logLevel: "debug",
			},
			"/v2.0": {
				target: "https://testapi.openbanking.or.kr",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: [
			// 절대경로로 접근하기
			{ find: "~/images", replacement: "/src/assets/images" },
			{ find: "~/components", replacement: "/src/components" },
			{ find: "~/contexts", replacement: "/src/contexts" },
			{ find: "~/libs", replacement: "/src/libs" },
			{ find: "~/routers", replacement: "/src/routers" },
		],
	},
});
