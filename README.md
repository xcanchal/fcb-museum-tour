### Assets bundling (js, scss, css, imgs)
- webpack
  plugins:
    - extract-text-webpack-plugin (extracts css code in separate css file)
    - html-webpack-plugin (writes index.html and references bundles)

### Development bundles serving
- webpack-dev-server (includes express)

### Packages used for transpiling modern JS features + React into understandable JS
- babel
  - babel-core
  - babel-preset-env
  - babel-preset-react
  - babel-loader (js)
  - style-loader (css)
  - css-loader (css)
  - sass-loader (scss)
  - postcss-loader (post css)
  - postscss-loader (post-scss)
  - autoprefixer (post css)
  - node-sass (scss)
  - file-loader (img, fonts)
  - autoprefixer (css)
  - postcss (css)
  - postscss (scss)
  - raw-loader (for loading raw content from files)

### App architecture libraries
- react
- react-dom
- redux (managing state of the application)
- react-redux (connect react and redux)
- react-router-dom (new division of old react-router)
- redux-thunk (transforms actions into action functions)
- immutability-helper (modify state without mutating it)
- prop-types

### Animations
- gsap (animation lib)
- react-gsap-enhancer (react wrapper for gsap)
- react-mt-svg-lines (svg path drawing)

### Code quality
- eslint@^3.19.0 (not higher, due to peer dependencies issues w/jsx-a11y)
- eslint-plugin-import
- eslint-plugin-react 
- eslint-plugin-jsx-a11y
- eslint-config-airbnb

### Fonts
- material-design-iconic-font zmdi (hosted locally)

### Others
- ical.js (Mozilla's lib for parsing .ics calendar files)

### NEXT STEPS:
- webpack (plugins, chunks)
- eslint checking loader in webpack?
- hot module reloading


# ATTENTION: SCSS IS NOT BEING PARSED PROPERLY ?

