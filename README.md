# Grafana Plugin: Map Panel

Visualize image files for indoor maps.

## Interface
We expect the datasource to provide a parseable JSON string of an object in the shape:

```
{
  layers: { cleaning: "<SOME_URL>"},
  mapBundle: "<SOME_URL>"
}
```

Note that this will be subject to change as we include new features (e.g. viewing multiple layers).

### Example Setup
You can use the [infinity datasource](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/?tab=installation) as . Simply put it in a top-level `plugins` folder then install through administration tools.

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
