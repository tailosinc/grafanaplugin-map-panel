# Grafana Plugin: Map Panel

Visualize maps provided by an s3 datasource

## Overview / Introduction

Panel that visualizes an indoor map (collection of layers of spatial data using the same frame of reference).

Consider including screenshots:

- in [plugin.json](https://grafana.com/docs/grafana/latest/developers/plugins/metadata/#info) include them as relative links.
- in the README ensure they are absolute URLs.

## Requirements

- Depends on `grafanaplugin-s3-datasource`.

## Getting Started

```
cd grafanaplugin-map-panel
npm i
npm run server
npm run dev
```

Then navigate to `localhost:3000` and configure your local Grafana instance as necessary.
