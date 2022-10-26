# gulpSassEjsBootstrap
npm install
gulp

The overrides in package.json make gulp clean for npm audit
Thank you PixemWeb
https://www.youtube.com/watch?v=d5vfi-l4KWQ

Passing ejs a require function allows use of require in ejs e.g.
<%= _=reqire('lodash') %>
Thanks to dc7290, I got the idea from their webpack template-ejs-loader
(though I haven't sanitised the argument to require)
https://github.com/dc7290/template-ejs-loader/blob/main/src/index.ts
