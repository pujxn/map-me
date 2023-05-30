# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


A couple of things that were obstacles along the way: 

1. Leaflet has a known bug that throws a null pointer error without actually stopping the application use, sometimes when you zoom in/out: https://stackoverflow.com/questions/65981712/uncaught-typeerror-this-map-is-null-vue-js-3-leafletSeems that it loses the map reference. 

2. Leaflet default markers dont show in prod environments: https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-envTook a lot of troubleshooting, and I was able to address this. However, upon using the Leaflet search plugin, this still causes an issue, which I would have loved to fix with more time. 
