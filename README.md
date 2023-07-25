# Grafana Plugin: Map Panel

Visualize maps provided by an s3 datasource


## Requirements

- Depends on [grafanaplugin-s3-datasource](https://github.com/tailosinc/grafanaplugin-s3-datasource) -- please make sure you have that installed to the same parent directory if you want to develop this plugin!

## Getting Started

```
cd grafanaplugin-map-panel
npm i
npm run server
npm run dev
```

Then navigate to `localhost:3000` and configure your local Grafana instance as necessary.

## Push a version tag

To trigger the workflow we need to push a version tag to github. This can be achieved with the following steps:

1. Run `npm version <major|minor|patch>`
2. Run `git push origin main --follow-tags`
