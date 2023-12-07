<div align="center">
	<h1 align="center">astro-sveltia-cms</h1>
	<p align="center">Astro integration for the <a href="https://sveltia.dev" target="_blank">Sveltia CMS</a> with custom OAuth backend</p>
  <br/>
</div>


<p align="center">
  <a href="https://npmjs.com/package/astro-sveltia-cms">
    <img src="https://img.shields.io/npm/v/astro-sveltia-cms" alt="astro-sveltia-cms" />
  </a>
  <a href="https://npmjs.com/package/astro-sveltia-cms">
    <img src="https://img.shields.io/npm/dt/astro-sveltia-cms" alt="npm download count">
  </a>
</p>

For an astro sveltia example you can look at [astro-starter](https://github.com/zankhq/astro-starter)

This repo does the same thing of https://github.com/dorukgezici/astro-decap-cms-oauth but it use Sveltia instead of Decap CMS.

This integration automatically mounts the Sveltia CMS admin dashboard to `/admin` and custom OAuth authentication backend routes to `/oauth`, `/oauth/callback` using GitHub as the provider.

_This way, you aren't vendor-locked to `Netlify` and your app can be deployed anywhere that supports SSR._

## Installation

```bash
npx astro add astro-sveltia-cms
```

## Manual Installation

```bash
npm install astro-sveltia-cms
```

Add the integration and set output to `server` in your `astro.config.mjs` file:

```js
import { defineConfig } from "astro/config";
import { sveltiaCMS } from "astro-sveltia-cms";

export default defineConfig({
    ...,
    integrations: [sveltiaCMS()],
    output: "server",
});
```

## Usage

1. Make sure Astro is in SSR mode (`output: "server"` set in `astro.config.mjs`)

2. Put your `config.yml` file in `public/admin/config.yml` 

```yml
backend:
  name: github
  branch: main # change this to your branch
  repo: majesticostudio/astro-sveltia-cms # change this to your repo
  site_domain: astro-sveltia-cms.vercel.app # change this to your domain
  base_url: https://astro-sveltia-cms.vercel.app # change this to your prod URL
  auth_endpoint: oauth # the oauth route provided by the integration
```

3. Set up GitHub OAuth app

On GitHub, go to Settings > Developer Settings > OAuth apps > New OAuth app. Or use this [direct link](https://github.com/settings/applications/new).

**Homepage URL**: This must be the prod URL of your application.

**Authorization callback URL**: This must be the prod URL of your application followed by `/oauth/callback`.

4. Set env variables

```bash
OAUTH_GITHUB_CLIENT_ID=
OAUTH_GITHUB_CLIENT_SECRET=
```

## Configuration Options

```js
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
```

To disable injecting OAuth routes, set `oauthDisabled` to `true` in `astro.config.mjs`.

```js
import { defineConfig } from "astro/config";
import { sveltiaCMS } from "astro-sveltia-cms";

export default defineConfig({
    ...,
    integrations: [sveltiaCms({ oauthDisabled: true })],
    output: "server",
});
```
