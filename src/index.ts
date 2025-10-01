import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import {
	type FlashnetAmmPool,
	type FlashnetRouteSwapSimulateRequest,
	generateMockPools,
	simulateMockRouteSwap,
} from "./utils.js";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/pools", (c) => {
	// Get query parameters
	const assetAAddress = c.req.query("assetAAddress");
	const assetBAddress = c.req.query("assetBAddress");
	const sort = c.req.query("sort");
	const limit = c.req.query("limit");

	// Get all pools from mock data
	let pools = generateMockPools();

	// Filter by assetAAddress if provided (checks both assetAAddress and assetBAddress)
	if (assetAAddress || assetBAddress) {
		pools = pools.filter(
			(pool: FlashnetAmmPool) =>
				pool.assetAAddress === assetAAddress ||
				pool.assetAAddress === assetBAddress ||
				pool.assetBAddress === assetAAddress ||
				pool.assetBAddress === assetBAddress,
		);
	}

	if (sort === "TVL_DESC") {
		pools.sort((a: FlashnetAmmPool, b: FlashnetAmmPool) => {
			const tvlA = parseFloat(a.tvlAssetB || "0");
			const tvlB = parseFloat(b.tvlAssetB || "0");
			return tvlB - tvlA;
		});
	}

	if (limit) {
		const limitNum = parseInt(limit, 10);
		if (!Number.isNaN(limitNum) && limitNum > 0) {
			pools = pools.slice(0, limitNum);
		}
	}

	return c.json({ pools });
});

app.post("/v1/route-swap/simulate", async (c) => {
	const request = await c.req.json<FlashnetRouteSwapSimulateRequest>();
	const response = simulateMockRouteSwap(request);
	return c.json(response);
});

serve(
	{
		fetch: app.fetch,
		port: 3091,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
