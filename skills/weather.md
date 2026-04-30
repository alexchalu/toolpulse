---
name: weather
description: Get current weather for any location
metadata:
  openclaw:
    requires: {}
---
When the user asks about weather, use the exec tool to run:

curl -s "wttr.in/{location}?format=3"

Replace {location} with the requested city/location (URL-encode spaces as +).

For detailed forecasts, use:

curl -s "wttr.in/{location}?format=v2"
