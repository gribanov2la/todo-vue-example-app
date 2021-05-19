# todo-vue-example-app

Demo: https://gribanov2la.github.io/todo-vue-example-app/

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Нюансы реализации
В качестве ui фреймворка был рандомно взят element-ui.

Декомпозиция на компоненты AppTodoHeader и AppTodoTaskRow весьма спорная, и в реальной ситуации зависела бы от множества реальных факторов.

Подъем состояния так-же спорный, не всегда требуется всё состояние хранить в хранилище (или вообще не использовать хранилище).
