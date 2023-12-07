import type { APIRoute } from "astro";
import { authUrl } from "./_config";

export const prerender = false;

export const GET: APIRoute = ({ redirect }) => {
	return redirect(authUrl);
};
