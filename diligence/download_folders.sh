#!/bin/bash
set -e

BASE="https://criterion.sync4share.com"
COOKIES="y-glad-brid=e39f3ad9-f5a1-4579-bdc5-75e45d02d32d; y-glad-ops=DenbcxRIE4EBibRL8hAi0KJlUug7uBjaenS0C3uT97uo6jgSxocERGk21OZex9r5vJ4Xx2BH2e5wgFK5li0Sojx/g8qp6Cxs/NnLNY26PUM=; mytheme=blue; y-glad-state=z3Q+0AFmkMkbHbBFJUFrW1f3U2155b+vJUhUFzB3ydOYHkzoCj92/HFwC9bQIUglGwYmPokoDaqNS2Rq8/MaSTDdxbcrR/4P49qa7/dBZnTelhun2UGB31MOVjvgVafbi4A7xes66SP56hptSDNZR8h/HFSJidy2QcBkc7nE6/6d+oJVL6z0zP+UVqzQS2svTBp6fnWU+jAgrF5GmSX5KIPJOt1sIFjkBU/S5QBh1bpLd5ZXci1qUxCsSaXB1fDlCt1XhLlyfA6a5Mm6wPlfslKk2dlKrq2ddnmz1IhMTsxRq1czMc8kB4FWaSD8qaWKrcXSHTnl3banFTBr1cgYt+4bidtsIcofNpl6Ie7FChV9+st7AofLQwNWHynFol878QSFDV7d1YojAnlhkps0aYp365r7MEbu7PDWpchyh5aWSoIOp2h6CdfI+noHxxD3oiTubNJX0ZdL+3xez7nbvw==; y-glad-iid=NptvapD73clceEbS2mWyQVJJqFEvOegA8Fs5zKja6WQHFQVm62C7baxs5RFVrkcwetPbDeDr1ihI8xUrZVOxEwEYbIoXaGxN4k4BQApyfd43Vym6Dbwio+vXJp82KwKy2qZwUmCMOiueUocSPiv2+zjK2pW9eqVvpfdq+/NH8gM=; ASP.NET_SessionID=; x-glad-pagecount=4; y-glad-ssid=FNt2t4LQoR/OVUl5O5Y1sPqVe9ceh0xdPN7Kk1WyCvTm8n9SWIUseS6zbkbanp9SUHNfgLc0rbOA41UCcVnR20v2j86ECpRW++brqbwB8iMWMOM7112BgZNqwQi7teX5Zloy0WheICj7me0O9YDtzrz2SXZNnndwiWqDJW33lxc=; y-glad-token=rs3/2tJ9u2i0MbFwPnLJkKKwr3+6K4CN5tImJF/w2MxbMczowYwETjQZxyUUL25mOqmoj17AwrIMnWbJ1e2ZK7cXPDVdBXhmZPnTQ/wkW1mCOiF8aV3v06WGgEogviARwLoq/u5ZjjXaRvcSn95frxg3OuQIBv6w4G/Jt+jU8L5ri6teDYKea4II66Jivhd7NOH1MsJysusYT3LlcOrFGbFrGv0mstFtzdV5qg437WbIFkQZiCQleGn3z0/0GqcwBuQHQr7ylCnZGz0NmpDjw8aVpM8fF+o4WwjO659AH0qdQ3pNXFP17bWUcDqfmH2wnO6PLTp1mEebQuMoXPkmj+qhv7wXt/pbO3XuMt63w8p7koxsL2Ot+IbWh5qcz4Ngx7JdPU/QHQpJxhix08kSUPMchP+3fGHovI6zdHj+C2ym4+Zo526K7FAoDHKUXX7An50wExOCi9NgVnvUWjp0s7S4rT+h49+cKbcd48HLtVHe2HklncBH+ohzSgLdk2boKLHwljYqAWnanwjMLlUiW3ysGM6SRP2rfOo63OmnUsNBeenzzqaB9TkKVXkB5pQlo73Mi+KVC6U9Dge/w1WfvOgiZ+jNrj3ew2FCj/Vh96vLQMM+dBYyQOvFzlYDEusn9HpsGIDGNtgVNvq3GXswrBA7IT71bsB96EpFMtmZifz5heF9bj4pb1XUCK5jJWGWjps71PxZefNR2/gm6Af5nElpSdxzknkhSDpsBYqLPzJAx6MKvoHYH71T8D3YZFUh2eoilMZkKnttcsugm7W0Pg=="
REF="https://criterion.sync4share.com/portal/RawWebAppPage.aspx/fid/14950231684914088241_9606989567688911289"

OUTDIR="/data/workspace/diligence/downloads"
mkdir -p "$OUTDIR"

# Function to encode URI like gEncodeUri
encode_path() {
  python3 -c "
import urllib.parse
p = '''$1'''
encoded = urllib.parse.quote(p, safe='/')
encoded = encoded.replace('&', '%26').replace('#', '|').replace('+', ':').replace(\"'\", '%27')
print(encoded)
"
}

# Download a folder as ZIP
download_folder() {
  local folder_path="$1"
  local output_name="$2"
  local encoded=$(encode_path "$folder_path")
  local url="${BASE}/storage/zip.dn?f=${encoded}"
  echo "Downloading: $output_name from $url"
  curl -sL -o "${OUTDIR}/${output_name}" \
    -H "Cookie: ${COOKIES}" \
    -H "Referer: ${REF}" \
    -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36" \
    "$url"
  local size=$(stat -f%z "${OUTDIR}/${output_name}" 2>/dev/null || stat -c%s "${OUTDIR}/${output_name}" 2>/dev/null || echo "0")
  echo "  -> ${output_name}: ${size} bytes"
}

# 251 Monroe Ave folders
echo "=== 251 Monroe Avenue, Kenilworth, NJ ==="
download_folder "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Leases" "251_Leases.zip"
download_folder "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Phase I ESA" "251_PhaseI_ESA.zip"
download_folder "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Property Condition Report" "251_Property_Condition.zip"
download_folder "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Site Plan Approval" "251_Site_Plan.zip"
download_folder "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Survey" "251_Survey.zip"
download_folder "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Title Report" "251_Title_Report.zip"
download_folder "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Zoning Report" "251_Zoning_Report.zip"

echo ""
echo "=== Checking file sizes ==="
ls -la "${OUTDIR}/"
