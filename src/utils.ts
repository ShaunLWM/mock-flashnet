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

	// Real Spark tokens for comprehensive testing
	const SNOWFLAKE =
		"btkn1f0wpf28xhs6sswxkthx9fzrv2x9476yk95wlucp4sfuqmxnu8zesv2gsws"; // Snowflake
	const FLASHSPARK =
		"btkn1daywtenlww42njymqzyegvcwuy3p9f26zknme0srxa7tagewvuys86h553"; // Flashspark
	const SPARKINU =
		"btkn1c4zw25t8lkr0d3as6xt75sdhrz08dpzw2p9c2ddhajgl4gzglevqj0gcqj"; // Sparkinu
	const XSPARK =
		"btkn1dywglzsxyaxx69u4dchyz9vnt4gpmp0w26f3n5st2rslusv4kv7szrrwzm"; // XSpark
	const EVER_VALUE_COIN =
		"btkn1k9s493793jtuxu22cx2ecqny9r4l06uy2e97tu267c9p2vhfyegq93gmy2"; // Ever Value Coin
	const BRUH =
		"btkn18tq8zfgtvnmg0wct0hvwzpkfs0scse8edef4ten39schhfhrksus7hlm8a"; // BRUH

	return [
		// ===== DIRECT POOLS FOR REAL SPARK TOKENS =====
		// Realistic prices: meme coins ~$0.02-0.08, BTC ~$110k, USDB = $1

		// Direct: Sparkinu ↔ XSpark (high liquidity popular pair)
		// Sparkinu ~$0.05, XSpark ~$0.04
		{
			lpPublicKey: "pool_sparkinu_xspark_direct",
			hostFeeBps: 20,
			lpFeeBps: 250,
			assetAAddress: SPARKINU,
			assetBAddress: XSPARK,
			assetAReserve: "10000000000000", // 100,000 SPARKINU ($5,000)
			assetBReserve: "12500000000000", // 125,000 XSPARK ($5,000) (rate: 1 SPARKINU = 1.25 XSPARK)
			currentPriceAInB: "1.25",
			tvlAssetB: "200000000000", // $8,000 TVL in USDB terms
			volume24hAssetB: "50000000000", // $2,000 daily volume
			priceChangePercent24h: "1.2",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Direct: Snowflake ↔ Ever Value Coin (medium liquidity)
		// Snowflake ~$0.08, Ever Value Coin ~$0.02
		{
			lpPublicKey: "pool_snowflake_evervalue_direct",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: SNOWFLAKE,
			assetBAddress: EVER_VALUE_COIN,
			assetAReserve: "6250000000000", // 62,500 SNOWFLAKE ($5,000)
			assetBReserve: "25000000000000", // 250,000 EVER_VALUE_COIN ($5,000) (rate: 1 SNOWFLAKE = 4 EVER_VALUE_COIN)
			currentPriceAInB: "4.0",
			tvlAssetB: "500000000000", // $10,000 TVL
			volume24hAssetB: "100000000000", // $2,000 daily volume
			priceChangePercent24h: "0.8",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Direct: Flashspark ↔ Sparkinu (medium liquidity)
		// Flashspark ~$0.06, Sparkinu ~$0.05
		{
			lpPublicKey: "pool_flashspark_sparkinu_direct",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: FLASHSPARK,
			assetBAddress: SPARKINU,
			assetAReserve: "8333000000000", // 83,330 FLASHSPARK ($5,000)
			assetBReserve: "10000000000000", // 100,000 SPARKINU ($5,000) (rate: 1 FLASHSPARK = 1.2 SPARKINU)
			currentPriceAInB: "1.2",
			tvlAssetB: "200000000000", // $10,000 TVL
			volume24hAssetB: "60000000000", // $3,000 daily volume
			priceChangePercent24h: "-0.3",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Direct: BRUH ↔ Snowflake (medium liquidity)
		// BRUH ~$0.01, Snowflake ~$0.08
		{
			lpPublicKey: "pool_bruh_snowflake_direct",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: BRUH,
			assetBAddress: SNOWFLAKE,
			assetAReserve: "50000000000000", // 500,000 BRUH ($5,000)
			assetBReserve: "6250000000000", // 62,500 SNOWFLAKE ($5,000) (rate: 1 BRUH = 0.125 SNOWFLAKE)
			currentPriceAInB: "0.125",
			tvlAssetB: "400000000000", // $32,000 TVL
			volume24hAssetB: "50000000000", // $4,000 daily volume
			priceChangePercent24h: "1.8",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Direct: BRUH ↔ Sparkinu (lower liquidity)
		// BRUH ~$0.01, Sparkinu ~$0.05
		{
			lpPublicKey: "pool_bruh_sparkinu_direct",
			hostFeeBps: 30,
			lpFeeBps: 350,
			assetAAddress: BRUH,
			assetBAddress: SPARKINU,
			assetAReserve: "30000000000000", // 300,000 BRUH ($3,000)
			assetBReserve: "6000000000000", // 60,000 SPARKINU ($3,000) (rate: 1 BRUH = 0.2 SPARKINU)
			currentPriceAInB: "0.2",
			tvlAssetB: "120000000000", // $6,000 TVL
			volume24hAssetB: "25000000000", // $1,250 daily volume
			priceChangePercent24h: "-0.8",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// ===== BTC INTERMEDIATE ROUTES FOR ALL SPARK TOKENS =====
		// BTC ~$110,000, meme coins ~$0.02-0.08

		// Snowflake ↔ BTC (primary route)
		// Snowflake ~$0.08, BTC ~$110,000 (1 SNOWFLAKE = 0.00000073 BTC)
		{
			lpPublicKey: "pool_snowflake_btc",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: SNOWFLAKE,
			assetBAddress: BTC_ASSET_PUBKEY,
			assetAReserve: "137500000000000", // 1,375,000 SNOWFLAKE ($110,000)
			assetBReserve: "100000000", // 1 BTC ($110,000) (rate: 1 SNOWFLAKE = 0.00000073 BTC)
			currentPriceAInB: "0.00000073",
			tvlAssetB: "100000000", // $220,000 TVL
			volume24hAssetB: "5000000", // $5,500 daily volume
			priceChangePercent24h: "1.5",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Flashspark ↔ BTC (high liquidity)
		// Flashspark ~$0.06, BTC ~$110,000 (1 FLASHSPARK = 0.00000055 BTC)
		{
			lpPublicKey: "pool_flashspark_btc",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: FLASHSPARK,
			assetBAddress: BTC_ASSET_PUBKEY,
			assetAReserve: "183300000000000", // 1,833,000 FLASHSPARK ($110,000)
			assetBReserve: "100000000", // 1 BTC ($110,000) (rate: 1 FLASHSPARK = 0.00000055 BTC)
			currentPriceAInB: "0.00000055",
			tvlAssetB: "100000000", // $220,000 TVL
			volume24hAssetB: "8000000", // $8,800 daily volume
			priceChangePercent24h: "0.9",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Sparkinu ↔ BTC (very high liquidity)
		// Sparkinu ~$0.05, BTC ~$110,000 (1 SPARKINU = 0.00000045 BTC)
		{
			lpPublicKey: "pool_sparkinu_btc",
			hostFeeBps: 20,
			lpFeeBps: 250,
			assetAAddress: SPARKINU,
			assetBAddress: BTC_ASSET_PUBKEY,
			assetAReserve: "220000000000000", // 2,200,000 SPARKINU ($110,000)
			assetBReserve: "100000000", // 1 BTC ($110,000) (rate: 1 SPARKINU = 0.00000045 BTC)
			currentPriceAInB: "0.00000045",
			tvlAssetB: "100000000", // $220,000 TVL
			volume24hAssetB: "10000000", // $11,000 daily volume
			priceChangePercent24h: "2.1",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// XSpark ↔ BTC (high liquidity)
		// XSpark ~$0.04, BTC ~$110,000 (1 XSPARK = 0.00000036 BTC)
		{
			lpPublicKey: "pool_xspark_btc",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: XSPARK,
			assetBAddress: BTC_ASSET_PUBKEY,
			assetAReserve: "275000000000000", // 2,750,000 XSPARK ($110,000)
			assetBReserve: "100000000", // 1 BTC ($110,000) (rate: 1 XSPARK = 0.00000036 BTC)
			currentPriceAInB: "0.00000036",
			tvlAssetB: "100000000", // $220,000 TVL
			volume24hAssetB: "7000000", // $7,700 daily volume
			priceChangePercent24h: "1.7",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Ever Value Coin ↔ BTC (medium liquidity)
		// Ever Value Coin ~$0.02, BTC ~$110,000 (1 EVER_VALUE_COIN = 0.00000018 BTC)
		{
			lpPublicKey: "pool_evervalue_btc",
			hostFeeBps: 30,
			lpFeeBps: 350,
			assetAAddress: EVER_VALUE_COIN,
			assetBAddress: BTC_ASSET_PUBKEY,
			assetAReserve: "550000000000000", // 5,500,000 EVER_VALUE_COIN ($110,000)
			assetBReserve: "100000000", // 1 BTC ($110,000) (rate: 1 EVER_VALUE_COIN = 0.00000018 BTC)
			currentPriceAInB: "0.00000018",
			tvlAssetB: "100000000", // $220,000 TVL
			volume24hAssetB: "3000000", // $3,300 daily volume
			priceChangePercent24h: "-0.5",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// BRUH ↔ BTC (high liquidity for routing)
		// BRUH ~$0.01, BTC ~$110,000 (1 BRUH = 0.000000091 BTC)
		{
			lpPublicKey: "pool_bruh_btc",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: BRUH,
			assetBAddress: BTC_ASSET_PUBKEY,
			assetAReserve: "1100000000000000", // 11,000,000 BRUH ($110,000)
			assetBReserve: "100000000", // 1 BTC ($110,000) (rate: 1 BRUH = 0.000000091 BTC)
			currentPriceAInB: "0.000000091",
			tvlAssetB: "100000000", // $220,000 TVL
			volume24hAssetB: "6000000", // $6,600 daily volume
			priceChangePercent24h: "1.3",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// ===== USDB INTERMEDIATE ROUTES =====
		// USDB = $1, meme coins ~$0.02-0.08

		// Snowflake ↔ USDB (alternative route)
		// Snowflake ~$0.08, USDB = $1 (1 SNOWFLAKE = 0.08 USDB)
		{
			lpPublicKey: "pool_snowflake_usdb",
			hostFeeBps: 30,
			lpFeeBps: 350,
			assetAAddress: SNOWFLAKE,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "125000000000000", // 1,250,000 SNOWFLAKE ($100,000)
			assetBReserve: "10000000000000", // 100,000 USDB ($100,000) (rate: 1 SNOWFLAKE = 0.08 USDB)
			currentPriceAInB: "0.08",
			tvlAssetB: "10000000000000", // $200,000 TVL
			volume24hAssetB: "500000000000", // $5,000 daily volume
			priceChangePercent24h: "0.3",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Flashspark ↔ USDB (good liquidity)
		// Flashspark ~$0.06, USDB = $1 (1 FLASHSPARK = 0.06 USDB)
		{
			lpPublicKey: "pool_flashspark_usdb",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: FLASHSPARK,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "166700000000000", // 1,667,000 FLASHSPARK ($100,000)
			assetBReserve: "10000000000000", // 100,000 USDB ($100,000) (rate: 1 FLASHSPARK = 0.06 USDB)
			currentPriceAInB: "0.06",
			tvlAssetB: "10000000000000", // $200,000 TVL
			volume24hAssetB: "600000000000", // $6,000 daily volume
			priceChangePercent24h: "1.1",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// XSpark ↔ USDB (alternative route)
		// XSpark ~$0.04, USDB = $1 (1 XSPARK = 0.04 USDB)
		{
			lpPublicKey: "pool_xspark_usdb",
			hostFeeBps: 30,
			lpFeeBps: 350,
			assetAAddress: XSPARK,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "250000000000000", // 2,500,000 XSPARK ($100,000)
			assetBReserve: "10000000000000", // 100,000 USDB ($100,000) (rate: 1 XSPARK = 0.04 USDB)
			currentPriceAInB: "0.04",
			tvlAssetB: "10000000000000", // $200,000 TVL
			volume24hAssetB: "400000000000", // $4,000 daily volume
			priceChangePercent24h: "-0.2",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Ever Value Coin ↔ USDB (lower liquidity)
		// Ever Value Coin ~$0.02, USDB = $1 (1 EVER_VALUE_COIN = 0.02 USDB)
		{
			lpPublicKey: "pool_evervalue_usdb",
			hostFeeBps: 35,
			lpFeeBps: 400,
			assetAAddress: EVER_VALUE_COIN,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "500000000000000", // 5,000,000 EVER_VALUE_COIN ($100,000)
			assetBReserve: "10000000000000", // 100,000 USDB ($100,000) (rate: 1 EVER_VALUE_COIN = 0.02 USDB)
			currentPriceAInB: "0.02",
			tvlAssetB: "10000000000000", // $200,000 TVL
			volume24hAssetB: "150000000000", // $1,500 daily volume
			priceChangePercent24h: "0.7",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// BRUH ↔ USDB (alternative route)
		// BRUH ~$0.01, USDB = $1 (1 BRUH = 0.01 USDB)
		{
			lpPublicKey: "pool_bruh_usdb",
			hostFeeBps: 30,
			lpFeeBps: 350,
			assetAAddress: BRUH,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "1000000000000000", // 10,000,000 BRUH ($100,000)
			assetBReserve: "10000000000000", // 100,000 USDB ($100,000) (rate: 1 BRUH = 0.01 USDB)
			currentPriceAInB: "0.01",
			tvlAssetB: "10000000000000", // $200,000 TVL
			volume24hAssetB: "200000000000", // $2,000 daily volume
			priceChangePercent24h: "-0.4",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// ===== BTC ↔ USDB BRIDGE POOLS (for 3-hop routes) =====

		// Primary BTC ↔ USDB bridge (high liquidity)
		{
			lpPublicKey: "bridge_btc_usdb_primary",
			hostFeeBps: 20,
			lpFeeBps: 250,
			assetAAddress: BTC_ASSET_PUBKEY,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "1000000000", // 10 BTC
			assetBReserve: "600000000000", // 6000 USDB (rate: 1 BTC = 600 USDB)
			currentPriceAInB: "600",
			tvlAssetB: "600000000000",
			volume24hAssetB: "50000000000",
			priceChangePercent24h: "0.1",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Alternative BTC ↔ USDB bridge (for arbitrage)
		{
			lpPublicKey: "bridge_btc_usdb_alt",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: BTC_ASSET_PUBKEY,
			assetBAddress: USDB_ADDRESS,
			assetAReserve: "500000000", // 5 BTC
			assetBReserve: "310000000000", // 3100 USDB (rate: 1 BTC = 620 USDB - slightly better)
			currentPriceAInB: "620",
			tvlAssetB: "310000000000",
			volume24hAssetB: "25000000000",
			priceChangePercent24h: "0.5",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// ===== MULTI-HOP ROUTING EXAMPLES =====
		//
		// This pool structure supports comprehensive multi-hop routing for all Spark token combinations.
		// The routing algorithm prioritizes BTC routes over USDB routes as specified in ENG-8047.
		//
		// DIRECT ROUTES (1-hop):
		// • Sparkinu ↔ XSpark (high liquidity, preferred when available)
		// • Snowflake ↔ Ever Value Coin (medium liquidity)
		// • Flashspark ↔ Sparkinu (medium liquidity)
		//
		// BTC INTERMEDIATE ROUTES (2-hop, preferred):
		// • Snowflake → XSpark: Snowflake → BTC → XSpark
		//   Uses: pool_snowflake_btc + pool_xspark_btc (reversed)
		// • Ever Value Coin → Sparkinu: Ever Value Coin → BTC → Sparkinu
		//   Uses: pool_evervalue_btc + pool_sparkinu_btc (reversed)
		// • Flashspark → XSpark: Flashspark → BTC → XSpark
		//   Uses: pool_flashspark_btc + pool_xspark_btc (reversed)
		//
		// USDB INTERMEDIATE ROUTES (2-hop, alternative):
		// • Snowflake → Flashspark: Snowflake → USDB → Flashspark
		//   Uses: pool_snowflake_usdb + pool_flashspark_usdb (reversed)
		// • XSpark → Ever Value Coin: XSpark → USDB → Ever Value Coin
		//   Uses: pool_xspark_usdb + pool_evervalue_usdb (reversed)
		//
		// LONG ROUTES VIA BTC → USDB BRIDGE (3-hop, when needed):
		// • Snowflake → Ever Value Coin: Snowflake → BTC → USDB → Ever Value Coin
		//   Uses: pool_snowflake_btc + bridge_btc_usdb_primary + pool_evervalue_usdb (reversed)
		// • Sparkinu → Flashspark: Sparkinu → BTC → USDB → Flashspark
		//   Uses: pool_sparkinu_btc + bridge_btc_usdb_primary + pool_flashspark_usdb (reversed)
		//
		// ROUTE SELECTION PRIORITY (as per ENG-8047):
		// 1. Direct route (if sufficient liquidity)
		// 2. BTC intermediate route (prioritized)
		// 3. USDB intermediate route (fallback)
		// 4. BTC → USDB bridge routes (for maximum coverage)
		//
		// ATOMIC EXECUTION:
		// All multi-hop routes are executed atomically - either all hops succeed or the entire swap reverts.
		// Slippage protection is applied across the entire route, with configurable maxRouteSlippageBps.

		// ===== EDGE CASES AND TESTING POOLS =====

		// Low liquidity Sparkinu ↔ Flashspark (for testing slippage)
		{
			lpPublicKey: "pool_sparkinu_flashspark_lowliq",
			hostFeeBps: 50,
			lpFeeBps: 500,
			assetAAddress: SPARKINU,
			assetBAddress: FLASHSPARK,
			assetAReserve: "5000000000", // 50 SPARKINU
			assetBReserve: "7500000000", // 75 FLASHSPARK (rate: 1 SPARKINU = 1.5 FLASHSPARK)
			currentPriceAInB: "1.5",
			tvlAssetB: "7500000000",
			volume24hAssetB: "500000000",
			priceChangePercent24h: "-3.2",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Zero liquidity pool (dead pool)
		{
			lpPublicKey: "dead_pool_xspark_evervalue",
			hostFeeBps: 25,
			lpFeeBps: 300,
			assetAAddress: XSPARK,
			assetBAddress: EVER_VALUE_COIN,
			assetAReserve: "0",
			assetBReserve: "0",
			currentPriceAInB: "0",
			tvlAssetB: "0",
			volume24hAssetB: "0",
			priceChangePercent24h: "0",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// High fee pool (expensive route)
		{
			lpPublicKey: "expensive_snowflake_flashspark",
			hostFeeBps: 200, // 2%
			lpFeeBps: 1000, // 1%
			assetAAddress: SNOWFLAKE,
			assetBAddress: FLASHSPARK,
			assetAReserve: "20000000000", // 200 SNOWFLAKE
			assetBReserve: "15000000000", // 150 FLASHSPARK (rate: 1 SNOWFLAKE = 0.75 FLASHSPARK)
			currentPriceAInB: "0.75",
			tvlAssetB: "15000000000",
			volume24hAssetB: "1000000000",
			priceChangePercent24h: "0.2",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Dust pool (minimal amounts for testing)
		{
			lpPublicKey: "dust_pool_minimal_spark",
			hostFeeBps: 100,
			lpFeeBps: 800,
			assetAAddress: XSPARK,
			assetBAddress: SNOWFLAKE,
			assetAReserve: "1000", // 0.00001 XSPARK
			assetBReserve: "800", // 0.000008 SNOWFLAKE
			currentPriceAInB: "0.8",
			tvlAssetB: "800",
			volume24hAssetB: "0",
			priceChangePercent24h: "-10.5",
			createdAt: "2024-01-01T00:00:00Z",
		},

		// Low liquidity BRUH ↔ XSpark (for testing slippage with BRUH)
		{
			lpPublicKey: "pool_bruh_xspark_lowliq",
			hostFeeBps: 60,
			lpFeeBps: 600,
			assetAAddress: BRUH,
			assetBAddress: XSPARK,
			assetAReserve: "8000000000", // 80 BRUH
			assetBReserve: "4000000000", // 40 XSPARK (rate: 1 BRUH = 0.5 XSPARK)
			currentPriceAInB: "0.5",
			tvlAssetB: "4000000000",
			volume24hAssetB: "200000000",
			priceChangePercent24h: "-4.5",
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
	const amountIn = parseFloat(request.amountIn);
	let currentAmount = amountIn;
	const hopBreakdown: Array<
		FlashnetRouteSwapSimulateResponse["hopBreakdown"][0]
	> = [];

	let totalLpFee = 0;
	let totalHostFee = 0;
	let totalPriceImpact = 0;

	// Simulate each hop with different slippage and fees
	for (let i = 0; i < request.hops.length; i++) {
		const hop = request.hops[i];
		const slippage = 0.003 + i * 0.001; // Increase slippage with each hop

		totalLpFee += 1;
		totalHostFee += 1;
		totalPriceImpact += 1;

		// Apply different rates based on hop (with realistic prices)
		let outputAmount: number;
		switch (hop.poolId) {
			// ===== DIRECT POOLS FOR REAL SPARK TOKENS =====
			case "pool_sparkinu_xspark_direct":
				outputAmount = currentAmount * 1.24; // SPARKINU to XSPARK (with slippage)
				break;
			case "pool_snowflake_evervalue_direct":
				outputAmount = currentAmount * 3.97; // SNOWFLAKE to EVER_VALUE_COIN
				break;
			case "pool_flashspark_sparkinu_direct":
				outputAmount = currentAmount * 1.19; // FLASHSPARK to SPARKINU
				break;
			case "pool_bruh_snowflake_direct":
				outputAmount = currentAmount * 0.124; // BRUH to SNOWFLAKE (with slippage)
				break;
			case "pool_bruh_sparkinu_direct":
				outputAmount = currentAmount * 0.199; // BRUH to SPARKINU (with slippage)
				break;

			// ===== BTC INTERMEDIATE ROUTES =====
			case "pool_snowflake_btc":
				outputAmount = currentAmount * 0.00000072; // SNOWFLAKE to BTC
				break;
			case "pool_flashspark_btc":
				outputAmount = currentAmount * 0.00000054; // FLASHSPARK to BTC
				break;
			case "pool_sparkinu_btc":
				outputAmount = currentAmount * 0.00000044; // SPARKINU to BTC
				break;
			case "pool_xspark_btc":
				outputAmount = currentAmount * 0.00000035; // XSPARK to BTC
				break;
			case "pool_evervalue_btc":
				outputAmount = currentAmount * 0.00000017; // EVER_VALUE_COIN to BTC
				break;
			case "pool_bruh_btc":
				outputAmount = currentAmount * 0.00000009; // BRUH to BTC (with slippage)
				break;

			// ===== USDB INTERMEDIATE ROUTES =====
			case "pool_snowflake_usdb":
				outputAmount = currentAmount * 0.079; // SNOWFLAKE to USDB
				break;
			case "pool_flashspark_usdb":
				outputAmount = currentAmount * 0.059; // FLASHSPARK to USDB
				break;
			case "pool_xspark_usdb":
				outputAmount = currentAmount * 0.039; // XSPARK to USDB
				break;
			case "pool_evervalue_usdb":
				outputAmount = currentAmount * 0.0199; // EVER_VALUE_COIN to USDB
				break;
			case "pool_bruh_usdb":
				outputAmount = currentAmount * 0.0099; // BRUH to USDB (with slippage)
				break;

			// ===== BTC ↔ USDB BRIDGE POOLS =====
			case "bridge_btc_usdb_primary":
				outputAmount = currentAmount * 109500; // BTC to USDB (primary)
				break;
			case "bridge_btc_usdb_alt":
				outputAmount = currentAmount * 110000; // BTC to USDB (alternative - better rate)
				break;

			// ===== EDGE CASES AND TESTING POOLS =====
			case "pool_sparkinu_flashspark_lowliq":
				outputAmount = currentAmount * 1.45; // SPARKINU to FLASHSPARK (low liquidity)
				break;
			case "expensive_snowflake_flashspark":
				outputAmount = currentAmount * 0.7; // SNOWFLAKE to FLASHSPARK (high fees)
				break;

			// Edge cases
			case "dead_pool_xspark_evervalue":
				outputAmount = 0; // No liquidity
				break;
			case "dust_pool_minimal_spark":
				outputAmount = currentAmount * 0.3; // Very high slippage
				break;
			case "pool_bruh_xspark_lowliq":
				outputAmount = currentAmount * 0.45; // BRUH to XSPARK (low liquidity, high slippage)
				break;

			// Reverse direction calculations (when pools are used backwards)
			// BTC to tokens
			case "pool_snowflake_btc_reverse":
				outputAmount = currentAmount * 1360000; // BTC to SNOWFLAKE (reverse)
				break;
			case "pool_flashspark_btc_reverse":
				outputAmount = currentAmount * 1820000; // BTC to FLASHSPARK (reverse)
				break;
			case "pool_sparkinu_btc_reverse":
				outputAmount = currentAmount * 2180000; // BTC to SPARKINU (reverse)
				break;
			case "pool_xspark_btc_reverse":
				outputAmount = currentAmount * 2720000; // BTC to XSPARK (reverse)
				break;
			case "pool_evervalue_btc_reverse":
				outputAmount = currentAmount * 5450000; // BTC to EVER_VALUE_COIN (reverse)
				break;
			case "pool_bruh_btc_reverse":
				outputAmount = currentAmount * 10900000; // BTC to BRUH (reverse)
				break;

			// USDB to tokens (reverse)
			case "pool_snowflake_usdb_reverse":
				outputAmount = currentAmount * 12.4; // USDB to SNOWFLAKE
				break;
			case "pool_flashspark_usdb_reverse":
				outputAmount = currentAmount * 16.5; // USDB to FLASHSPARK
				break;
			case "pool_xspark_usdb_reverse":
				outputAmount = currentAmount * 24.8; // USDB to XSPARK
				break;
			case "pool_evervalue_usdb_reverse":
				outputAmount = currentAmount * 49.5; // USDB to EVER_VALUE_COIN
				break;
			case "pool_bruh_usdb_reverse":
				outputAmount = currentAmount * 99.0; // USDB to BRUH (reverse)
				break;

			// USDB to BTC (reverse bridge)
			case "bridge_btc_usdb_primary_reverse":
				outputAmount = currentAmount * 0.0000091; // USDB to BTC (primary)
				break;
			case "bridge_btc_usdb_alt_reverse":
				outputAmount = currentAmount * 0.000009; // USDB to BTC (alternative)
				break;

			default:
				outputAmount = currentAmount * 0.95; // Default fallback with 5% slippage
		}

		hopBreakdown.push({
			amountIn: currentAmount.toString(),
			amountOut: outputAmount.toString(),
			poolId: hop.poolId,
			priceImpactPct: `${(slippage * 100).toString()}%`,
		});

		currentAmount = outputAmount;
	}

	return {
		executionPrice: (currentAmount / amountIn).toString(),
		hopBreakdown,
		outputAmount: currentAmount.toString(),
		totalHostFee: totalHostFee.toString(),
		totalLpFee: totalLpFee.toString(),
		totalPriceImpactPct: `${totalPriceImpact.toString()}%`,
		warningMessage:
			request.hops.length > 2
				? "High slippage due to multiple hops"
				: undefined,
	};
}
