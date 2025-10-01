export type FlashnetAmmPool = {
	lpPublicKey: string;
	hostName?: string;
	hostFeeBps: number;
	lpFeeBps: number;
	assetAAddress: string;
	assetBAddress: string;
	assetAReserve?: string;
	assetBReserve?: string;
	currentPriceAInB?: string;
	tvlAssetB?: string;
	volume24hAssetB?: string | null;
	priceChangePercent24h?: string | null;
	curveType?: string;
	initialReserveA?: string;
	bondingProgressPercent?: string;
	createdAt: string;
};

export function generateMockPools(): Array<FlashnetAmmPool> {
	const BTC_ASSET_PUBKEY =
		"020202020202020202020202020202020202020202020202020202020202020202";
	const USDB_ADDRESS =
		"btkn1xgrvjwey5ngcagvap2dzzvsy4uk8ua9x69k82dwvt5e7ef9drm9qztux87";
	const SNOWFLAKE =
		"btkn1f0wpf28xhs6sswxkthx9fzrv2x9476yk95wlucp4sfuqmxnu8zesv2gsws";
	const FLASHSPARK =
		"btkn1daywtenlww42njymqzyegvcwuy3p9f26zknme0srxa7tagewvuys86h553";
	const XSPARK =
		"btkn1dywglzsxyaxx69u4dchyz9vnt4gpmp0w26f3n5st2rslusv4kv7szrrwzm";
	const BRUH =
		"btkn18tq8zfgtvnmg0wct0hvwzpkfs0scse8edef4ten39schhfhrksus7hlm8a";

	return [
		// 1. BTC/USDB - Core bridge pool with very high liquidity
		// 1 BTC = $100,000, 1 USDB = $1, so 1 BTC = 100,000 USDB
		// Ultra-low fees for stable bridge (0.15% total)
		{
			lpPublicKey: "bridge_btc_usdb",
			hostFeeBps: 5, // 0.05%
			lpFeeBps: 10, // 0.10%
			assetAAddress: BTC_ASSET_PUBKEY,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "10000000000", // 100 BTC ($10M)
			assetBReserve: "1000000000000000", // 10,000,000 USDB ($10M)
			currentPriceAInB: "100000",
			tvlAssetB: "1000000000000000", // $20M TVL
			volume24hAssetB: "50000000000000", // $500k daily volume
			priceChangePercent24h: "0.1",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// 2. SNOW/BTC - High liquidity popular meme coin
		// SNOW = $0.10, BTC = $100,000, so 1 BTC = 1,000,000 SNOW
		// Good fees for popular pair (2.7% total)
		{
			lpPublicKey: "pool_snow_btc",
			hostFeeBps: 20, // 0.20%
			lpFeeBps: 250, // 2.50%
			assetAAddress: SNOWFLAKE,
			assetBAddress: BTC_ASSET_PUBKEY,
			assetAReserve: "500000000000000", // 5,000,000 SNOW ($500k)
			assetBReserve: "500000000", // 5 BTC ($500k)
			currentPriceAInB: "0.000001",
			tvlAssetB: "500000000", // $1M TVL
			volume24hAssetB: "50000000", // $50k daily volume
			priceChangePercent24h: "1.5",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// 3. SNOW/USDB - High liquidity alternative route
		// SNOW = $0.10, USDB = $1, so 1 USDB = 10 SNOW
		// Good fees for popular pair (2.7% total)
		{
			lpPublicKey: "pool_snow_usdb",
			hostFeeBps: 20, // 0.20%
			lpFeeBps: 250, // 2.50%
			assetAAddress: SNOWFLAKE,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "500000000000000", // 5,000,000 SNOW ($500k)
			assetBReserve: "50000000000000", // 500,000 USDB ($500k)
			currentPriceAInB: "0.1",
			tvlAssetB: "50000000000000", // $1M TVL
			volume24hAssetB: "5000000000000", // $50k daily volume
			priceChangePercent24h: "1.2",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// 4. BRUH/BTC - Low liquidity meme coin, ONLY paired with BTC
		// BRUH = $0.05, BTC = $100,000, so 1 BTC = 2,000,000 BRUH
		// Higher fees for low liquidity (5.5% total)
		{
			lpPublicKey: "pool_bruh_btc",
			hostFeeBps: 50, // 0.50%
			lpFeeBps: 500, // 5.00%
			assetAAddress: BRUH,
			assetBAddress: BTC_ASSET_PUBKEY,
			assetAReserve: "100000000000000", // 1,000,000 BRUH ($50k)
			assetBReserve: "50000000", // 0.5 BTC ($50k)
			currentPriceAInB: "0.0000005",
			tvlAssetB: "50000000", // $100k TVL
			volume24hAssetB: "5000000", // $5k daily volume
			priceChangePercent24h: "-2.3",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// 5. FLASHSPARK/USDB - Low liquidity, ONLY paired with USDB
		// FLASHSPARK = $0.03, USDB = $1, so 1 USDB = 33.33 FLASHSPARK
		// Higher fees for low liquidity (5.5% total)
		{
			lpPublicKey: "pool_flashspark_usdb",
			hostFeeBps: 50, // 0.50%
			lpFeeBps: 500, // 5.00%
			assetAAddress: FLASHSPARK,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "100000000000000", // 1,000,000 FLASHSPARK ($30k)
			assetBReserve: "3000000000000", // 30,000 USDB ($30k)
			currentPriceAInB: "0.03",
			tvlAssetB: "3000000000000", // $60k TVL
			volume24hAssetB: "300000000000", // $3k daily volume
			priceChangePercent24h: "0.8",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// 6. XSPARK/USDB - Dead/unpopular coin, very low liquidity, very high fees
		// XSPARK = $0.01, USDB = $1, so 1 USDB = 100 XSPARK
		// Very high fees for dead coin (12% total)
		{
			lpPublicKey: "pool_xspark_usdb",
			hostFeeBps: 200, // 2.00%
			lpFeeBps: 1000, // 10.00%
			assetAAddress: XSPARK,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "50000000000000", // 500,000 XSPARK ($5k)
			assetBReserve: "500000000000", // 5,000 USDB ($5k)
			currentPriceAInB: "0.01",
			tvlAssetB: "500000000000", // $10k TVL
			volume24hAssetB: "50000000000", // $500 daily volume
			priceChangePercent24h: "-5.7",
			createdAt: "2024-01-01T00:00:00Z",
		},
	];
}

export type FlashnetRouteSwapSimulateRequest = {
	hops: Array<{
		assetInAddress: string;
		assetOutAddress: string;
		poolId: string;
	}>;
	amountIn: string;
	maxRouteSlippageBps: string;
};

export type FlashnetRouteSwapSimulateResponse = {
	executionPrice: string;
	hopBreakdown: Array<{
		amountIn: string;
		amountOut: string;
		poolId: string;
		priceImpactPct: string;
	}>;
	outputAmount: string;
	totalHostFee: string;
	totalLpFee: string;
	totalPriceImpactPct: string;
	warningMessage?: string;
};

export function simulateMockRouteSwap(
	request: FlashnetRouteSwapSimulateRequest,
): FlashnetRouteSwapSimulateResponse {
	// Create pool lookup map
	const pools = generateMockPools();
	const poolMap = new Map<string, FlashnetAmmPool>();
	for (const pool of pools) {
		poolMap.set(pool.lpPublicKey, pool);
	}

	const initialAmountIn = parseFloat(request.amountIn);
	let currentAmount = initialAmountIn;
	const hopBreakdown: Array<
		FlashnetRouteSwapSimulateResponse["hopBreakdown"][0]
	> = [];

	let totalLpFee = 0;
	let totalHostFee = 0;
	let totalPriceImpactPct = 0;

	// Process each hop
	for (let i = 0; i < request.hops.length; i++) {
		const hop = request.hops[i];
		const pool = poolMap.get(hop.poolId);

		if (!pool) {
			throw new Error(`Pool not found: ${hop.poolId}`);
		}

		// Parse reserves
		const reserveA = parseFloat(pool.assetAReserve || "0");
		const reserveB = parseFloat(pool.assetBReserve || "0");

		// Check for zero liquidity
		if (reserveA === 0 || reserveB === 0) {
			hopBreakdown.push({
				amountIn: currentAmount.toString(),
				amountOut: "0",
				poolId: hop.poolId,
				priceImpactPct: "100%",
			});
			currentAmount = 0;
			continue;
		}

		// Determine swap direction
		const swapAtoB = hop.assetInAddress === pool.assetAAddress;
		const reserveIn = swapAtoB ? reserveA : reserveB;
		const reserveOut = swapAtoB ? reserveB : reserveA;

		// Calculate fees (deducted from input)
		const totalFeeBps = pool.hostFeeBps + pool.lpFeeBps;
		const feeAmount = (currentAmount * totalFeeBps) / 10000;
		const hostFeeAmount = (currentAmount * pool.hostFeeBps) / 10000;
		const lpFeeAmount = (currentAmount * pool.lpFeeBps) / 10000;

		totalHostFee += hostFeeAmount;
		totalLpFee += lpFeeAmount;

		// Amount after fees goes into the AMM
		const amountInAfterFees = currentAmount - feeAmount;

		// Constant product AMM formula: x * y = k
		// k = reserveIn * reserveOut
		// new_reserveIn = reserveIn + amountInAfterFees
		// new_reserveOut = k / new_reserveIn
		// amountOut = reserveOut - new_reserveOut
		const k = reserveIn * reserveOut;
		const newReserveIn = reserveIn + amountInAfterFees;
		const newReserveOut = k / newReserveIn;
		const amountOut = reserveOut - newReserveOut;

		// Calculate price impact
		// Spot price = reserveOut / reserveIn (how much out per 1 in)
		// Execution price = amountOut / currentAmount (includes fees)
		const spotPrice = reserveOut / reserveIn;
		const executionPrice = amountOut / currentAmount;
		const priceImpact = ((spotPrice - executionPrice) / spotPrice) * 100;

		totalPriceImpactPct += priceImpact;

		hopBreakdown.push({
			amountIn: currentAmount.toString(),
			amountOut: amountOut.toString(),
			poolId: hop.poolId,
			priceImpactPct: `${priceImpact.toFixed(2)}%`,
		});

		// Output becomes input for next hop
		currentAmount = amountOut;
	}

	// Generate warnings
	let warningMessage: string | undefined;
	if (totalPriceImpactPct > 5) {
		warningMessage = `High price impact: ${totalPriceImpactPct.toFixed(2)}%`;
	} else if (request.hops.length > 2) {
		warningMessage = "Multi-hop route may have higher slippage";
	}

	return {
		executionPrice: (currentAmount / initialAmountIn).toString(),
		hopBreakdown,
		outputAmount: currentAmount.toString(),
		totalHostFee: totalHostFee.toFixed(8),
		totalLpFee: totalLpFee.toFixed(8),
		totalPriceImpactPct: `${totalPriceImpactPct.toFixed(2)}%`,
		warningMessage,
	};
}
