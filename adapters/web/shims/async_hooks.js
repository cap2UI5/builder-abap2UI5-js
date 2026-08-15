/**
 * async_hooks shim for the browser bundle — the framework only needs
 * AsyncLocalStorage, and only to isolate the user-exit context per request
 * (z2ui5_cl_ui5_user_exit._als).
 *
 * A page is single-threaded and answers one roundtrip at a time, so a single
 * current-store slot is an exact stand-in: run( ) sets it for the duration of
 * the callback (including its awaits) and restores the previous one after,
 * which is the only nesting the framework produces.
 */
"use strict";

class AsyncLocalStorage {
  constructor() {
    this._store = undefined;
  }

  run(store, fn, ...args) {
    const previous = this._store;
    this._store = store;
    try {
      const out = fn(...args);
      // async callback: keep the store alive until it settles
      if (out && typeof out.then === "function") {
        return out.finally(() => {
          this._store = previous;
        });
      }
      this._store = previous;
      return out;
    } catch (e) {
      this._store = previous;
      throw e;
    }
  }

  getStore() {
    return this._store;
  }

  enterWith(store) {
    this._store = store;
  }

  exit(fn, ...args) {
    return this.run(undefined, fn, ...args);
  }
}

module.exports = { AsyncLocalStorage };
