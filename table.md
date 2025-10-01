# FlashNet Multi-Hop Swap Routes

This document outlines the simplified pool structure and routing strategies for the FlashNet AMM mock server.

## Pool Structure Overview

The system uses **6 pools** designed to create natural routing scenarios with varying liquidity and fees:

1. **BTC/USDB Bridge** - Core infrastructure pool
2. **SNOW/BTC** - High liquidity popular meme coin
3. **SNOW/USDB** - Alternative route for SNOW
4. **BRUH/BTC** - Low liquidity, BTC-only meme coin
5. **FLASHSPARK/USDB** - Low liquidity, USDB-only meme coin
6. **XSPARK/USDB** - Dead coin with terrible fees

## Available Tokens

| Token | Price (USD) | Address |
|-------|-------------|---------|
| BTC | $100,000 | `020202020202020202020202020202020202020202020202020202020202020202` |
| USDB | $1.00 | `btkn1xgrvjwey5ngcagvap2dzzvsy4uk8ua9x69k82dwvt5e7ef9drm9qztux87` |
| SNOW (Snowflake) | $0.10 | `btkn1f0wpf28xhs6sswxkthx9fzrv2x9476yk95wlucp4sfuqmxnu8zesv2gsws` |
| BRUH | $0.05 | `btkn18tq8zfgtvnmg0wct0hvwzpkfs0scse8edef4ten39schhfhrksus7hlm8a` |
| FLASHSPARK | $0.03 | `btkn1daywtenlww42njymqzyegvcwuy3p9f26zknme0srxa7tagewvuys86h553` |
| XSPARK | $0.01 | `btkn1dywglzsxyaxx69u4dchyz9vnt4gpmp0w26f3n5st2rslusv4kv7szrrwzm` |

## Pool Details

| Pool ID | Asset A | Asset B | Liquidity per Side | TVL | Total Fees | Description |
|---------|---------|---------|-------------------|-----|------------|-------------|
| `bridge_btc_usdb` | BTC | USDB | 100 BTC / 10M USDB | $20M | 0.15% | Ultra-low fees, near 1:1 swaps |
| `pool_snow_btc` | SNOW | BTC | $500k / $500k | $1M | 2.7% | High liquidity, popular pair |
| `pool_snow_usdb` | SNOW | USDB | $500k / $500k | $1M | 2.7% | Alternative SNOW route |
| `pool_bruh_btc` | BRUH | BTC | $50k / $50k | $100k | 5.5% | Low liquidity, BTC-only |
| `pool_flashspark_usdb` | FLASHSPARK | USDB | $30k / $30k | $60k | 5.5% | Low liquidity, USDB-only |
| `pool_xspark_usdb` | XSPARK | USDB | $5k / $5k | $10k | 12% | Dead coin, very high fees |

## Routing Scenarios

### 1. Direct Routes (1-hop) ✅ Efficient

| Route | Pool | Expected Output | Slippage |
|-------|------|----------------|----------|
| BTC ↔ USDB | `bridge_btc_usdb` | ~99% (1:1 ratio) | ~1.14% |
| SNOW ↔ BTC | `pool_snow_btc` | Good | ~18% for large swaps |
| SNOW ↔ USDB | `pool_snow_usdb` | Good | ~18% for large swaps |
| BRUH ↔ BTC | `pool_bruh_btc` | Low liquidity | High slippage |
| FLASHSPARK ↔ USDB | `pool_flashspark_usdb` | Low liquidity | High slippage |

### 2. Two-Hop Routes (2-hop) ⚠️ Medium Efficiency

| Route | Hops | Description |
|-------|------|-------------|
| SNOW → BRUH | SNOW → BTC → BRUH | Popular to low-liquidity coin |
| SNOW → FLASHSPARK | SNOW → USDB → FLASHSPARK | Alternative routing |
| BRUH → SNOW | BRUH → BTC → SNOW | Low to high liquidity |
| FLASHSPARK → SNOW | FLASHSPARK → USDB → SNOW | USDB-routed swap |

**Example: SNOW → BRUH**
- 1M SNOW ($100k) input
- Gets ~81.34% price impact
- Returns ~606k BRUH tokens

### 3. Three-Hop Routes (3-hop) ❌ Worst Case

| Route | Hops | Expected Output | Price Impact |
|-------|------|----------------|--------------|
| **BRUH → FLASHSPARK** | BRUH → BTC → USDB → FLASHSPARK | **~43% of expected** | **~98%** |
| FLASHSPARK → BRUH | FLASHSPARK → USDB → BTC → BRUH | ~43% of expected | ~98% |
| BRUH → XSPARK | BRUH → BTC → USDB → XSPARK | Terrible | Near 100% |

**Example: BRUH → FLASHSPARK (Worst Case)**
- 1M BRUH ($50k) input
- Goes through 3 pools with increasing fees
- Gets 98.18% price impact
- Returns only ~432k FLASHSPARK (expected ~1.67M)
- **This is intentionally the worst possible route**

## Route Selection Rules

Since each token only pairs with specific assets, routing is deterministic:

1. **BRUH** can only go through **BTC** first
2. **FLASHSPARK** can only go through **USDB** first
3. **XSPARK** can only go through **USDB** first
4. **SNOW** can choose either **BTC** or **USDB** (both available)
5. **BTC ↔ USDB** swaps are direct and efficient

## AMM Calculation Details

All swaps use **constant product formula** (x·y=k):

```
For swap A → B:
1. Deduct fees: amountAfterFees = amountIn × (1 - feeBps/10000)
2. Calculate k: k = reserveA × reserveB
3. New reserveA: newReserveA = reserveA + amountAfterFees
4. New reserveB: newReserveB = k / newReserveA
5. Output: amountOut = reserveB - newReserveB
6. Price impact: ((spotPrice - executionPrice) / spotPrice) × 100
```

## Example Swap Requests

### 1. Direct BTC → USDB (Best Case)
```json
{
  "hops": [
    {
      "assetInAddress": "020202020202020202020202020202020202020202020202020202020202020202",
      "assetOutAddress": "btkn1xgrvjwey5ngcagvap2dzzvsy4uk8ua9x69k82dwvt5e7ef9drm9qztux87",
      "poolId": "bridge_btc_usdb"
    }
  ],
  "amountIn": "100000000",
  "maxRouteSlippageBps": "100"
}
```
**Result**: 1 BTC → ~98,862 USDB (~99% efficiency)

### 2. Two-Hop SNOW → BRUH
```json
{
  "hops": [
    {
      "assetInAddress": "btkn1f0wpf28xhs6sswxkthx9fzrv2x9476yk95wlucp4sfuqmxnu8zesv2gsws",
      "assetOutAddress": "020202020202020202020202020202020202020202020202020202020202020202",
      "poolId": "pool_snow_btc"
    },
    {
      "assetInAddress": "020202020202020202020202020202020202020202020202020202020202020202",
      "assetOutAddress": "btkn18tq8zfgtvnmg0wct0hvwzpkfs0scse8edef4ten39schhfhrksus7hlm8a",
      "poolId": "pool_bruh_btc"
    }
  ],
  "amountIn": "100000000000000",
  "maxRouteSlippageBps": "1000"
}
```
**Result**: 1M SNOW → ~606k BRUH (~81% price impact)

### 3. Three-Hop BRUH → FLASHSPARK (Worst Case)
```json
{
  "hops": [
    {
      "assetInAddress": "btkn18tq8zfgtvnmg0wct0hvwzpkfs0scse8edef4ten39schhfhrksus7hlm8a",
      "assetOutAddress": "020202020202020202020202020202020202020202020202020202020202020202",
      "poolId": "pool_bruh_btc"
    },
    {
      "assetInAddress": "020202020202020202020202020202020202020202020202020202020202020202",
      "assetOutAddress": "btkn1xgrvjwey5ngcagvap2dzzvsy4uk8ua9x69k82dwvt5e7ef9drm9qztux87",
      "poolId": "bridge_btc_usdb"
    },
    {
      "assetInAddress": "btkn1xgrvjwey5ngcagvap2dzzvsy4uk8ua9x69k82dwvt5e7ef9drm9qztux87",
      "assetOutAddress": "btkn1daywtenlww42njymqzyegvcwuy3p9f26zknme0srxa7tagewvuys86h553",
      "poolId": "pool_flashspark_usdb"
    }
  ],
  "amountIn": "100000000000000",
  "maxRouteSlippageBps": "2000"
}
```
**Result**: 1M BRUH → ~432k FLASHSPARK (~98% price impact, only 43% output)

## Key Insights

- **BTC/USDB bridge** enables cross-ecosystem routing
- **High liquidity** (SNOW pools) = low slippage
- **Low liquidity** (BRUH, FLASHSPARK) = high slippage
- **Multi-hop routes** compound fees and slippage
- **BRUH → FLASHSPARK** demonstrates worst-case scenario intentionally
