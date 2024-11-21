import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": "http://localhost:3000", // 백엔드 서버 주소 (예시: Node.js 서버)
		},
	},
	resolve: {
		alias: [
			// 절대경로로 접근하기
			{ find: "~/images", replacement: "/src/assets/images" },
		],
	},
});
