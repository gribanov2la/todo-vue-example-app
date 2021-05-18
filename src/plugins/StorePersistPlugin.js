export default class StorePersistPlugin {
  static install(Vue, { store }) {
    StorePersistPlugin.restoreState(store);
    StorePersistPlugin.subscribeStoreChanges(store);
  }

  static subscribeStoreChanges(store) {
    store.subscribe((mutation, state) => window.localStorage.setItem('appState', JSON.stringify(state)));
  }

  static restoreState(store) {
    const appState = JSON.parse(window.localStorage.getItem('appState'));

    if (appState) {
      store.replaceState(appState);
    }
  }
}
