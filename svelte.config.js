import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			plugins: [
				{
					name: 'safe-modules-inspector',
					configureServer(vite) {
						vite.middlewares.use((req, res, next) => {
							if (req.url === '/safe-modules-inspector') {
								res.end(
									JSON.stringify(
										Array.from(vite.moduleGraph.safeModulesPath),
										null,
										'  '
									)
								);
							} else {
								next();
							}
						});
					}
				}
			]
		}
	}
};

export default config;
