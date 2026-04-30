# CONFIG RED LINE — DO NOT BREAK

## NEVER modify models.providers in /data/openclaw.json without ALL required fields.

Every provider entry MUST have:
```json
{
  "baseUrl": "https://...",       // REQUIRED string
  "apiKey": "...",                // your API key
  "models": [                     // REQUIRED array
    {
      "id": "model-name",
      "name": "Display Name",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
      "contextWindow": 131072,
      "maxTokens": 8192
    }
  ]
}
```

If you add ONLY an apiKey without baseUrl and models, the gateway CRASHES and the machine stops after 10 restarts. This has happened 3 times already.

## Current valid providers (do not touch unless adding ALL fields):
- google: baseUrl=https://generativelanguage.googleapis.com/v1beta, model=gemini-2.5-flash
- groq: baseUrl=https://api.groq.com/openai/v1, model=llama-4-scout-17b-16e-instruct
- openrouter: baseUrl=https://openrouter.ai/api/v1, model=deepseek/deepseek-r1:free



## FALLBACK CHAIN — DO NOT MODIFY

The fallback chain MUST keep all free providers BEFORE paid Claude:
Gemini -> Groq -> Mistral -> Cerebras -> OpenRouter -> Claude Sonnet

**NEVER remove free providers from the fallback chain.**
**NEVER put Claude Opus or Sonnet before free providers.**
**NEVER change agents.defaults.model.fallbacks to only have Anthropic models.**

Alex is paying per-token for Claude. Every time you skip a free provider, it costs money.
If a free provider rate-limits, the NEXT free provider handles it. Claude is LAST RESORT ONLY.
