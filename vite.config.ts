/* eslint-env node */
import path from 'node:path';
import fs from 'node:fs';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const CERTS_DIR = path.resolve(process.cwd(), './.certificates');

export default defineConfig({
	root: path.resolve(__dirname, 'src'),
	server: {
		https: fs.existsSync(CERTS_DIR)
			? {
					// generate certificates using `mkcert localhost`
					key: fs.readFileSync(path.resolve(CERTS_DIR, 'localhost-key.pem')),
					cert: fs.readFileSync(path.resolve(CERTS_DIR, 'localhost.pem')),
			  }
			: false,
		host: '0.0.0.0',
		port: 3000,
		// proxy: {
		// 	'/.netlify/functions': {
		// 		target: PROXY_URL,
		// 		secure: false,
		// 		rewrite: (path) => path.replace(/^\/api/, ''),
		// 	},
		// },
	},
	build: {
		outDir: 'public',
	},
	plugins: [
		tsconfigPaths({
			root: process.cwd(),
		}),
	],
});
