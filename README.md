# HammerUi

This is the control plane UI for hammer. You will need to compile it specifically for your environment due to the
api URI being built in to the package. These commands are enough.

```
npm i
npm run build-prod
```

This will build the application. The configuration used for production is `./src/environments/environment.prod.ts`
