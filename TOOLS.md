# Rando — Tools & Capabilities Reference

## System Tools (Available on Fly VM)

### Core Utilities
- **Python 3**: `/usr/bin/python3` — scripting, data processing, web scraping
- **Git**: version control, clone repos, manage code
- **GitHub CLI** (`gh`): manage repos, issues, PRs, releases (config at `/data/gh-config`)
- **Chromium**: headless browser via Playwright (baked in at `/home/node/.cache/ms-playwright`)
- **ffmpeg**: audio/video processing
- **imagemagick**: image manipulation
- **sqlite3**: lightweight database
- **jq**: JSON processing
- **curl/wget**: HTTP requests

### Search & Text Tools (2026 Upgrade)
- **ripgrep** (`rg`): ultra-fast regex search, 10-100x faster than grep
- **fd**: intuitive file finder, respects .gitignore
- **bat**: cat with syntax highlighting + line numbers
- **fzf**: fuzzy finder for files, history, anything
- **pandoc**: universal document converter (40+ formats: markdown, html, docx, pdf, latex)
- **tesseract-ocr**: image-to-text OCR (130+ languages)
- **yt-dlp**: video/audio downloader (YouTube + 1000s of sites)

## Python Libraries

### Search APIs
- **duckduckgo-search**: `from duckduckgo_search import DDGS` — free, no API key needed
- **tavily-python**: `from tavily import TavilyClient` — 1K searches/mo free (needs TAVILY_API_KEY)
- **exa-py**: `from exa_py import Exa` — 1K semantic searches/mo (needs EXA_API_KEY)

### Web Scraping
- **crawl4ai**: LLM-optimized crawler, outputs clean markdown. `from crawl4ai import AsyncWebCrawler`
- **browser-use**: AI-native browser automation. `from browser_use import Agent`

### Document Processing
- **docling**: PDF/DOCX/PPTX/XLSX/HTML/images → structured text. `from docling.document_converter import DocumentConverter`

### Knowledge & Memory
- **kuzu**: embedded graph database (like SQLite for graphs). `import kuzu`

### Self-Improvement
- **dspy**: prompt optimization framework. `import dspy`

## OpenClaw Built-in Tools
- **config.apply / config.patch**: modify your own config and restart
- **config.schema.lookup**: query config schema for valid options
- **update.run**: check for and install OpenClaw updates
- **web_search**: SearXNG (bundled, no quota) + Brave Search (2k/mo)
- **web_fetch**: fetch and parse web pages
- **browser**: full Chromium browser automation

## MCP Servers (Configured)
- **Composio**: 850+ app connectors (Gmail, Slack, Notion, GitHub, etc.) — 20K calls/mo free
- **Fetch**: simple web content fetching + HTML→markdown
- **mcp-image**: image generation via Gemini (uses existing API key, zero cost)
- **Docling MCP**: document processing server
- **Semgrep**: code security scanning (free <10 contributors)
- **Exa MCP**: neural/semantic search
- **Tavily MCP**: RAG-optimized search
- **GitHub MCP**: structured GitHub tools (supplements `gh` CLI)
- **Alpha Vantage**: financial/stock data (500 free queries/day)

## Free Search Strategy

| Provider | Quota | Best For | How to Use |
|----------|-------|----------|-----------|
| SearXNG | Unlimited (bundled) | General search | Built-in web_search |
| Brave | 2K/mo | General search | Built-in web_search |
| Tavily | 1K/mo | Agent/RAG search | Python: `TavilyClient` or MCP |
| Exa | 1K/mo | Semantic/neural | Python: `Exa` or MCP |
| DuckDuckGo | Unlimited | Fallback | Python: `DDGS()` |
| Jina Reader | Unlimited | URL→markdown | `curl https://r.jina.ai/URL` |
| Jina Search | Unlimited | Search+extract | `curl https://s.jina.ai/?q=query` |
| Perplexity | 100/day | Synthesized answers | MCP (if configured) |

**Total: ~5,000+ free searches/month across all providers**

## Cloud Sandboxes (Remote Code Execution)
- **E2B**: 100 sandbox hours/mo free — `pip install e2b-code-interpreter` (needs E2B_API_KEY)
- **Daytona**: $200 free credits — persistent sandboxes with snapshots (needs DAYTONA_API_KEY)
- **Modal**: $30/mo free credits — serverless GPU compute (needs MODAL_TOKEN_ID)

## Workspace Locations
- **Config**: `/data/openclaw.json`
- **Workspace**: `/data/workspace/`
- **Memory**: `/data/workspace/memory/`
- **Reflections**: `/data/workspace/memory/reflections/`
- **Skills**: `/data/workspace/skills/`
- **Scripts**: `/data/workspace/scripts/`
- **Optimized prompts**: `/data/workspace/optimized-prompts/`
- **GitHub config**: `/data/gh-config/`

## Quick Reference

### Jina Reader (zero install, free)
```bash
# Convert any URL to clean markdown
curl -s "https://r.jina.ai/https://example.com"

# Search + extract full text
curl -s "https://s.jina.ai/?q=your+search+query"
```

### DuckDuckGo Search (Python, free, no key)
```python
from duckduckgo_search import DDGS
results = DDGS().text("your query", max_results=10)
```

### Crawl4AI (Python, free, LLM-optimized)
```python
from crawl4ai import AsyncWebCrawler
async with AsyncWebCrawler() as crawler:
    result = await crawler.arun(url="https://example.com")
    print(result.markdown)
```

### Docling (Python, free, all document formats)
```python
from docling.document_converter import DocumentConverter
converter = DocumentConverter()
result = converter.convert("document.pdf")
print(result.document.export_to_markdown())
```

### Kuzu (Python, embedded graph DB)
```python
import kuzu
db = kuzu.Database("/data/workspace/knowledge-graph")
conn = kuzu.Connection(db)
conn.execute("CREATE NODE TABLE Entity(name STRING, type STRING, PRIMARY KEY(name))")
```

### Checking system health
```bash
curl -s http://127.0.0.1:3000/healthz
openclaw doctor
```
