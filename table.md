# FlashNet Multi-Hop Swap Routes

This document outlines the different multi-hop routing strategies available in the FlashNet AMM system.

## Route Priority Order

As per ENG-8047, routes are prioritized as follows:
1. **Direct route** (if sufficient liquidity)
2. **BTC intermediate route** (prioritized)
3. **USDB intermediate route** (fallback)
4. **BTC → USDB bridge routes** (for maximum coverage)

## Available Tokens

| Token | Address |
|-------|---------|
| BTC | `020202020202020202020202020202020202020202020202020202020202020202` |
| USDB | `btkn1xgrvjwey5ngcagvap2dzzvsy4uk8ua9x69k82dwvt5e7ef9drm9qztux87` |
| Snowflake | `btkn1f0wpf28xhs6sswxkthx9fzrv2x9476yk95wlucp4sfuqmxnu8zesv2gsws` |
| Flashspark | `btkn1daywtenlww42njymqzyegvcwuy3p9f26zknme0srxa7tagewvuys86h553` |
| Sparkinu | `btkn1c4zw25t8lkr0d3as6xt75sdhrz08dpzw2p9c2ddhajgl4gzglevqj0gcqj` |
| XSpark | `btkn1dywglzsxyaxx69u4dchyz9vnt4gpmp0w26f3n5st2rslusv4kv7szrrwzm` |
| Ever Value Coin | `btkn1k9s493793jtuxu22cx2ecqny9r4l06uy2e97tu267c9p2vhfyegq93gmy2` |
| BRUH | `btkn18tq8zfgtvnmg0wct0hvwzpkfs0scse8edef4ten39schhfhrksus7hlm8a` |

## 1. Direct Routes (1-hop)

| Route | From Token | To Token | Pool ID | Liquidity | TVL |
|-------|------------|----------|---------|-----------|-----|
| Sparkinu ↔ XSpark | Sparkinu | XSpark | `pool_sparkinu_xspark_direct` | High | 75B |
| Snowflake ↔ Ever Value Coin | Snowflake | Ever Value Coin | `pool_snowflake_evervalue_direct` | Medium | 100B |
| Flashspark ↔ Sparkinu | Flashspark | Sparkinu | `pool_flashspark_sparkinu_direct` | Medium | 60B |
| BRUH ↔ Snowflake | BRUH | Snowflake | `pool_bruh_snowflake_direct` | Medium | 60B |
| BRUH ↔ Sparkinu | BRUH | Sparkinu | `pool_bruh_sparkinu_direct` | Lower | 100B |

## 2. BTC Intermediate Routes (2-hop, preferred)

| Route | From Token | Via Token | To Token | Pool 1 | Pool 2 | Description |
|-------|------------|-----------|----------|--------|--------|-------------|
| Snowflake → XSpark | Snowflake | BTC | XSpark | `pool_snowflake_btc` | `pool_xspark_btc` (reversed) | High liquidity BTC route |
| Ever Value Coin → Sparkinu | Ever Value Coin | BTC | Sparkinu | `pool_evervalue_btc` | `pool_sparkinu_btc` (reversed) | Medium to high liquidity |
| Flashspark → XSpark | Flashspark | BTC | XSpark | `pool_flashspark_btc` | `pool_xspark_btc` (reversed) | High liquidity route |
| Snowflake → Sparkinu | Snowflake | BTC | Sparkinu | `pool_snowflake_btc` | `pool_sparkinu_btc` (reversed) | High liquidity route |
| Flashspark → Snowflake | Flashspark | BTC | Snowflake | `pool_flashspark_btc` | `pool_snowflake_btc` (reversed) | High liquidity route |
| XSpark → Ever Value Coin | XSpark | BTC | Ever Value Coin | `pool_xspark_btc` | `pool_evervalue_btc` (reversed) | High to medium liquidity |
| BRUH → Sparkinu | BRUH | BTC | Sparkinu | `pool_bruh_btc` | `pool_sparkinu_btc` (reversed) | High liquidity route |
| BRUH → XSpark | BRUH | BTC | XSpark | `pool_bruh_btc` | `pool_xspark_btc` (reversed) | High liquidity route |

## 3. USDB Intermediate Routes (2-hop, alternative)

| Route | From Token | Via Token | To Token | Pool 1 | Pool 2 | Description |
|-------|------------|-----------|----------|--------|--------|-------------|
| Snowflake → Flashspark | Snowflake | USDB | Flashspark | `pool_snowflake_usdb` | `pool_flashspark_usdb` (reversed) | Alternative to BTC route |
| XSpark → Ever Value Coin | XSpark | USDB | Ever Value Coin | `pool_xspark_usdb` | `pool_evervalue_usdb` (reversed) | Alternative route |
| Snowflake → XSpark | Snowflake | USDB | XSpark | `pool_snowflake_usdb` | `pool_xspark_usdb` (reversed) | Lower priority alternative |
| Flashspark → Ever Value Coin | Flashspark | USDB | Ever Value Coin | `pool_flashspark_usdb` | `pool_evervalue_usdb` (reversed) | Alternative route |
| BRUH → Snowflake | BRUH | USDB | Snowflake | `pool_bruh_usdb` | `pool_snowflake_usdb` (reversed) | Alternative route |
| BRUH → Flashspark | BRUH | USDB | Flashspark | `pool_bruh_usdb` | `pool_flashspark_usdb` (reversed) | Alternative route |

## 4. Long Routes via BTC → USDB Bridge (3-hop)

| Route | From Token | Via Tokens | To Token | Pool 1 | Bridge Pool | Pool 3 | Description |
|-------|------------|------------|----------|--------|-------------|--------|-------------|
| Snowflake → Ever Value Coin | Snowflake | BTC → USDB | Ever Value Coin | `pool_snowflake_btc` | `bridge_btc_usdb_primary` | `pool_evervalue_usdb` (reversed) | Maximum coverage route |
| Sparkinu → Flashspark | Sparkinu | BTC → USDB | Flashspark | `pool_sparkinu_btc` | `bridge_btc_usdb_primary` | `pool_flashspark_usdb` (reversed) | Complex routing |
| XSpark → Snowflake | XSpark | BTC → USDB | Snowflake | `pool_xspark_btc` | `bridge_btc_usdb_primary` | `pool_snowflake_usdb` (reversed) | Long route option |
| Ever Value Coin → Flashspark | Ever Value Coin | BTC → USDB | Flashspark | `pool_evervalue_btc` | `bridge_btc_usdb_primary` | `pool_flashspark_usdb` (reversed) | Maximum coverage |
| BRUH → Ever Value Coin | BRUH | BTC → USDB | Ever Value Coin | `pool_bruh_btc` | `bridge_btc_usdb_primary` | `pool_evervalue_usdb` (reversed) | Complex routing |

## Bridge Pools

| Pool ID | Asset A | Asset B | TVL | Description |
|---------|---------|---------|-----|-------------|
| `bridge_btc_usdb_primary` | BTC | USDB | 600B | Primary bridge (1 BTC = 600 USDB) |
| `bridge_btc_usdb_alt` | BTC | USDB | 310B | Alternative bridge (1 BTC = 620 USDB) |

## Route Selection Logic

The routing algorithm follows this priority:

1. **Check Direct Routes**: Look for 1-hop direct pools with sufficient liquidity
2. **Try BTC Routes**: Use BTC as intermediate token (2-hop)
3. **Fallback to USDB Routes**: Use USDB as intermediate token (2-hop)
4. **Bridge Routes**: Use BTC → USDB bridge for maximum coverage (3-hop)

## Atomic Execution

- All multi-hop routes are executed atomically
- Either all hops succeed or the entire swap reverts
- Slippage protection applied across the entire route
- Configurable `maxRouteSlippageBps` parameter

## Special Cases

| Pool Type | Pool ID | Description |
|-----------|---------|-------------|
| Low Liquidity | `pool_sparkinu_flashspark_lowliq` | For testing high slippage scenarios |
| Dead Pool | `dead_pool_xspark_evervalue` | Zero liquidity pool |
| High Fee Pool | `expensive_snowflake_flashspark` | 3% total fees for expensive routing |
| Dust Pool | `dust_pool_minimal_spark` | Minimal amounts for edge case testing |

## Example Multi-Hop Swap Requests

### 2-Hop BTC Route (Snowflake → BTC → Sparkinu)
```json
{
  "hops": [
    {
      "poolPubkey": "pool_snowflake_btc",
      "inputAsset": "btkn1f0wpf28xhs6sswxkthx9fzrv2x9476yk95wlucp4sfuqmxnu8zesv2gsws",
      "outputAsset": "020202020202020202020202020202020202020202020202020202020202020202",
      "lpFeeBps": 300,
      "hostFeeBps": 25
    },
    {
      "poolPubkey": "pool_sparkinu_btc_reverse",
      "inputAsset": "020202020202020202020202020202020202020202020202020202020202020202",
      "outputAsset": "btkn1c4zw25t8lkr0d3as6xt75sdhrz08dpzw2p9c2ddhajgl4gzglevqj0gcqj",
      "lpFeeBps": 250,
      "hostFeeBps": 20
    }
  ],
  "amountIn": "5000000000",
  "maxRouteSlippageBps": 1000
}
```

### 3-Hop Bridge Route (Sparkinu → BTC → USDB → Flashspark)
```json
{
  "hops": [
    {
      "poolPubkey": "pool_sparkinu_btc",
      "inputAsset": "btkn1c4zw25t8lkr0d3as6xt75sdhrz08dpzw2p9c2ddhajgl4gzglevqj0gcqj",
      "outputAsset": "020202020202020202020202020202020202020202020202020202020202020202",
      "lpFeeBps": 250,
      "hostFeeBps": 20
    },
    {
      "poolPubkey": "bridge_btc_usdb_primary",
      "inputAsset": "020202020202020202020202020202020202020202020202020202020202020202",
      "outputAsset": "btkn1xgrvjwey5ngcagvap2dzzvsy4uk8ua9x69k82dwvt5e7ef9drm9qztux87",
      "lpFeeBps": 250,
      "hostFeeBps": 20
    },
    {
      "poolPubkey": "pool_flashspark_usdb_reverse",
      "inputAsset": "btkn1xgrvjwey5ngcagvap2dzzvsy4uk8ua9x69k82dwvt5e7ef9drm9qztux87",
      "outputAsset": "btkn1daywtenlww42njymqzyegvcwuy3p9f26zknme0srxa7tagewvuys86h553",
      "lpFeeBps": 300,
      "hostFeeBps": 25
    }
  ],
  "amountIn": "1000000000",
  "maxRouteSlippageBps": 1500
}
