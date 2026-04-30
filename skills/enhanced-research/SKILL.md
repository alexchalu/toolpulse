---
name: enhanced-research
description: "Multi-source web research using all available search providers, scraping tools, and cross-referencing"
metadata:
  openclaw:
    emoji: "s"
---

# Enhanced Research Skill

Use all available search providers and scraping tools for comprehensive research.

## When to Use
- When Alex asks for research on any topic
- When a single search provider returns insufficient results
- When accuracy matters and cross-referencing is needed

## Research Process

### 1. Query Formulation
- Create 2-3 variations of the search query
- Include one keyword-focused query and one semantic/conceptual query

### 2. Multi-Source Search
Query at least 3 providers (in parallel when possible):

**Built-in (no API key needed):**
```bash
# Jina Search (free, search + full text extraction)
curl -s "https://s.jina.ai/?q=your+search+query"

# Jina Reader (convert any URL to markdown)
curl -s "https://r.jina.ai/https://some-url.com"
```

**Python APIs:**
```python
# DuckDuckGo (free, no API key)
from duckduckgo_search import DDGS
results = DDGS().text("query", max_results=10)

# Tavily (1K/mo free, RAG-optimized)
from tavily import TavilyClient
client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
results = client.search("query", search_depth="advanced")

# Exa (1K/mo free, semantic/neural search)
from exa_py import Exa
exa = Exa(api_key=os.environ.get("EXA_API_KEY"))
results = exa.search_and_contents("query", num_results=10)
```

**Built-in OpenClaw:**
- `web_search` — uses SearXNG (bundled) + Brave Search
- `web_fetch` — fetch and parse any URL

### 3. Deep Extraction
For important sources, get the full content:
```bash
# Jina Reader for clean markdown
curl -s "https://r.jina.ai/https://important-source.com"
```

Or use Crawl4AI for multiple pages:
```python
from crawl4ai import AsyncWebCrawler
async with AsyncWebCrawler() as crawler:
    result = await crawler.arun(url="https://target.com")
    print(result.markdown)
```

### 4. Cross-Reference
- Compare findings across 3+ sources
- Flag any conflicting information
- Prioritize primary sources over aggregators
- Note the date of each source (freshness matters)

### 5. Synthesize
- Combine findings into a structured summary
- Cite sources with URLs
- Rate confidence: High (3+ sources agree), Medium (2 sources), Low (single source)
- Flag any gaps that need further investigation

## Search Provider Quotas
| Provider | Monthly Quota | Remaining (approx) |
|----------|--------------|-------------------|
| SearXNG | Unlimited | - |
| Brave | 2,000 | Check via API dashboard |
| Tavily | 1,000 | Check via tavily.com dashboard |
| Exa | 1,000 | Check via dashboard.exa.ai |
| DuckDuckGo | Unlimited | (respect rate limits) |
| Jina | Unlimited | (basic) / 10M tokens (with key) |

Conserve quota by checking Jina and DuckDuckGo first (unlimited), then use Tavily/Exa/Brave for deeper results.
