import type { AstroIntegration } from "astro";

export interface SveltiaCMSOptions {
	adminRoute?: string;
	oauthDisabled?: boolean;
	oauthLoginRoute?: string;
	oauthCallbackRoute?: string;
}

const defaultOptions: SveltiaCMSOptions = {
	adminRoute: "/admin",
	oauthDisabled: false,
	oauthLoginRoute: "/oauth",
	oauthCallbackRoute: "/oauth/callback",
};

export default function sveltiaCMS(options: SveltiaCMSOptions): AstroIntegration {
	const { adminRoute, oauthDisabled, oauthLoginRoute, oauthCallbackRoute } = { ...defaultOptions, ...options };

	if (!adminRoute?.startsWith("/") || !oauthLoginRoute?.startsWith("/") || !oauthCallbackRoute?.startsWith("/")) {
		throw new Error('`adminRoute`, `oauthLoginRoute` and `oauthCallbackRoute` options must start with "/"');
	}

	return {
		name: "astro-sveltia-cms",
		hooks: {
			"astro:config:setup": async ({ injectRoute }) => {
				// mount SveltiaCMS admin dashboard
				injectRoute({
					pattern: adminRoute,
					entrypoint: "astro-sveltia-cms/src/admin.astro",
				});

				if (!oauthDisabled) {
					// OAuth backend - sign in route
					injectRoute({
						pattern: oauthLoginRoute,
						entrypoint: "astro-sveltia-cms/src/oauth/index.ts",
					});

					// OAuth backend - callback route
					injectRoute({
						pattern: oauthCallbackRoute,
						entrypoint: "astro-sveltia-cms/src/oauth/callback.ts",
					});
				}
			},
		},
	};
}
