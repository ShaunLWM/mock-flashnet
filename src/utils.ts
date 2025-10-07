import BigNumber from "bignumber.js";

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

// Token addresses
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
const BRUH = "btkn18tq8zfgtvnmg0wct0hvwzpkfs0scse8edef4ten39schhfhrksus7hlm8a";

// Token decimal places: Only BRUH and USDB have 6dp, rest have 8dp
const _TOKEN_DECIMALS: Record<string, number> = {
	[BTC_ASSET_PUBKEY]: 8,
	[USDB_ADDRESS]: 6,
	[SNOWFLAKE]: 8,
	[FLASHSPARK]: 8,
	[XSPARK]: 8,
	[BRUH]: 6,
};

export function generateMockPools(): Array<FlashnetAmmPool> {
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
			assetAReserve: "10000000000", // 100 BTC (100 * 10^8 = 10,000,000,000)
			assetBReserve: "10000000000000", // 10,000,000 USDB (10,000,000 * 10^6 = 10,000,000,000,000)
			currentPriceAInB: "100000",
			tvlAssetB: "20000000000000", // $20M TVL (20,000,000 * 10^6)
			volume24hAssetB: "500000000000", // $500k daily volume (500,000 * 10^6)
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
			assetAReserve: "500000000000000", // 5,000,000 SNOW (5,000,000 * 10^8 = 500,000,000,000,000)
			assetBReserve: "500000000", // 5 BTC (5 * 10^8 = 500,000,000)
			currentPriceAInB: "0.000001",
			tvlAssetB: "1000000000", // $1M TVL (10 BTC * 10^8)
			volume24hAssetB: "50000000", // $50k daily volume (0.5 BTC * 10^8)
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
			assetAReserve: "500000000000000", // 5,000,000 SNOW (5,000,000 * 10^8 = 500,000,000,000,000)
			assetBReserve: "500000000000", // 500,000 USDB (500,000 * 10^6 = 500,000,000,000)
			currentPriceAInB: "0.1",
			tvlAssetB: "1000000000000", // $1M TVL (1,000,000 * 10^6)
			volume24hAssetB: "50000000000", // $50k daily volume (50,000 * 10^6)
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
			assetAReserve: "1000000000000", // 1,000,000 BRUH (1,000,000 * 10^6 = 1,000,000,000,000)
			assetBReserve: "50000000", // 0.5 BTC (0.5 * 10^8 = 50,000,000)
			currentPriceAInB: "0.0000005",
			tvlAssetB: "100000000", // $100k TVL (1 BTC * 10^8)
			volume24hAssetB: "5000000", // $5k daily volume (0.05 BTC * 10^8)
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
			assetAReserve: "100000000000000", // 1,000,000 FLASHSPARK (1,000,000 * 10^8 = 100,000,000,000,000)
			assetBReserve: "30000000000", // 30,000 USDB (30,000 * 10^6 = 30,000,000,000)
			currentPriceAInB: "0.03",
			tvlAssetB: "60000000000", // $60k TVL (60,000 * 10^6)
			volume24hAssetB: "3000000000", // $3k daily volume (3,000 * 10^6)
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
			assetAReserve: "50000000000000", // 500,000 XSPARK (500,000 * 10^8 = 50,000,000,000,000)
			assetBReserve: "5000000000", // 5,000 USDB (5,000 * 10^6 = 5,000,000,000)
			currentPriceAInB: "0.01",
			tvlAssetB: "10000000000", // $10k TVL (10,000 * 10^6)
			volume24hAssetB: "500000000", // $500 daily volume (500 * 10^6)
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

	const initialAmountIn = new BigNumber(request.amountIn);
	let currentAmount = initialAmountIn;
	const hopBreakdown: Array<
		FlashnetRouteSwapSimulateResponse["hopBreakdown"][0]
	> = [];

	let totalLpFee = new BigNumber(0);
	let totalHostFee = new BigNumber(0);
	let totalPriceImpactPct = 0;

	// Process each hop
	for (let i = 0; i < request.hops.length; i++) {
		const hop = request.hops[i];
		const pool = poolMap.get(hop.poolId);

		if (!pool) {
			throw new Error(`Pool not found: ${hop.poolId}`);
		}

		// Parse reserves
		const reserveA = new BigNumber(pool.assetAReserve || "0");
		const reserveB = new BigNumber(pool.assetBReserve || "0");

		// Check for zero liquidity
		if (reserveA.isZero() || reserveB.isZero()) {
			hopBreakdown.push({
				amountIn: currentAmount.integerValue(BigNumber.ROUND_DOWN).toFixed(),
				amountOut: "0",
				poolId: hop.poolId,
				priceImpactPct: "100%",
			});
			currentAmount = new BigNumber(0);
			continue;
		}

		// Determine swap direction
		const swapAtoB = hop.assetInAddress === pool.assetAAddress;
		const reserveIn = swapAtoB ? reserveA : reserveB;
		const reserveOut = swapAtoB ? reserveB : reserveA;

		// Calculate fees (deducted from input)
		const totalFeeBps = new BigNumber(pool.hostFeeBps + pool.lpFeeBps);
		const feeAmount = currentAmount.times(totalFeeBps).div(10000);
		const hostFeeAmount = currentAmount
			.times(pool.hostFeeBps)
			.div(10000)
			.integerValue(BigNumber.ROUND_DOWN);
		const lpFeeAmount = currentAmount
			.times(pool.lpFeeBps)
			.div(10000)
			.integerValue(BigNumber.ROUND_DOWN);

		totalHostFee = totalHostFee.plus(hostFeeAmount);
		totalLpFee = totalLpFee.plus(lpFeeAmount);

		// Amount after fees goes into the AMM
		const amountInAfterFees = currentAmount.minus(feeAmount);

		// Constant product AMM formula: x * y = k
		// k = reserveIn * reserveOut
		// new_reserveIn = reserveIn + amountInAfterFees
		// new_reserveOut = k / new_reserveIn
		// amountOut = reserveOut - new_reserveOut
		const k = reserveIn.times(reserveOut);
		const newReserveIn = reserveIn.plus(amountInAfterFees);
		const newReserveOut = k.div(newReserveIn);
		const amountOut = reserveOut.minus(newReserveOut);

		// Calculate price impact
		// Spot price = reserveOut / reserveIn (how much out per 1 in)
		// Execution price = amountOut / currentAmount (includes fees)
		const spotPrice = reserveOut.div(reserveIn).toNumber();
		const executionPrice = amountOut.div(currentAmount).toNumber();
		const priceImpact = ((spotPrice - executionPrice) / spotPrice) * 100;

		totalPriceImpactPct += priceImpact;

		hopBreakdown.push({
			amountIn: currentAmount.integerValue(BigNumber.ROUND_DOWN).toFixed(),
			amountOut: amountOut.integerValue(BigNumber.ROUND_DOWN).toFixed(),
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
		executionPrice: currentAmount.div(initialAmountIn).toFixed(),
		hopBreakdown,
		outputAmount: currentAmount.integerValue(BigNumber.ROUND_DOWN).toFixed(),
		totalHostFee: totalHostFee.integerValue(BigNumber.ROUND_DOWN).toFixed(),
		totalLpFee: totalLpFee.integerValue(BigNumber.ROUND_DOWN).toFixed(),
		totalPriceImpactPct: `${totalPriceImpactPct.toFixed(2)}%`,
		warningMessage,
	};
}
