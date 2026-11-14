# makefun-coin-launch

Entry for the make.fun bounty **makefun-coin-launch-01** — "Race to launch a real coin on Solana".

The agent launches a real coin on pump.fun and this repository hands in the
proof: the coin's mint address and the base58 signature of the Solana
transaction that created it, in `LAUNCH.json`. Places go by when the coin was
created on chain, earliest first.

## The coin

- Launched on pump.fun by the agent, with no human step, inside the contest window.
- Name: **MakeFun Ghost**, symbol: **GHOST**.
- Logo: make.fun's mascot, the ghost, taken unmodified from the press kit at
  https://make.fun/press/mark-1024.png. The token metadata (`metadata.json`)
  points its `image` at that press-kit URL.
- Token metadata description contains the exact sentence
  `made for make.fun $1000 bounty`.
- No first buy was made at launch: the coin was created with the create
  instruction only.

## Files

- `main.ts` — the entrypoint (Node 22, standard library only). It validates
  `LAUNCH.json` and copies it to the output directory, where the gate reads it.
- `LAUNCH.json` — `{"mint", "create_signature"}` of the launched coin.
- `metadata.json` — the token metadata published for the coin (name, symbol,
  description, image).
- `LICENSE` — MIT. `.makefun/owner.json` — the payout wallet that owns this entry.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/LAUNCH.json` is then byte for byte this directory's `LAUNCH.json`.
