# onegai website Information

## 1. STRUKTUR WEB

- config
  - config.js <i style="color:orange">core website</i>
  - path.js <i style="color:aqua">configure \_\_dirname</i>
  - express-svelte <i style="color:green">custom view engine: svelte for express</i>
  - ctrl-cli.js <i style="color:pink">generator controller</i>
  - model-cli.js <i style="color:pink">generator model</i>
  - router-cli.js <i style="color:pink">generator router</i>
- Controllers
  - baseController.js <i style="color:aqua">base class for controller</i>
  - ... [list of controller]
- Models
  - index.js <i style="color:aqua">Model Adapter</i>
  - BaseModel.js <i style="color:aqua">base class for models</i>
  - index@association.js <i style="color:orange">describe relation between models</i>
  - index@list.js <i style="color:aqua">listing models</i>
  - ... [list of models]
- public <i style="color:salmon">static file served by express</i>
- Routers
  - index.js <i style="color:aqua">grouping routers</i>
  - BaseRouter.js <i style="color:aqua">a base class for router</i>
  - ... [list of router]
- Views <i style="color:orange">files svelte</i>
- .env
- index.js <i style="color:aqua">web server // start point</i>
- db.sqlite <i style="color:aqua">database</i>
