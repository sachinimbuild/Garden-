/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "b59a2202bfc305363d11f0d78a944021"
  }, {
    "url": "pwa-512x512.png",
    "revision": "966f343c62c1472c13811cc88fd1976f"
  }, {
    "url": "pwa-192x192.png",
    "revision": "758485622f2a494c6ee1d17901e447b4"
  }, {
    "url": "index.html",
    "revision": "d7b1869a09e5612921bd7ea5616ab255"
  }, {
    "url": "icon.svg",
    "revision": "759e80f4489fd27707dbc6d648b3b8fc"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a0ae9ccf687f1fed08193c7f6b6e4ae9"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/index-B9XodD7p.css",
    "revision": null
  }, {
    "url": "assets/index-23Vc2Gf2.js",
    "revision": null
  }, {
    "url": "assets/aistudio/PXL_20260812_035915166_67ab3821.jpeg",
    "revision": null
  }, {
    "url": "assets/aistudio/PXL_20260810_073501619_fa963178.jpeg",
    "revision": null
  }, {
    "url": "assets/aistudio/PXL_20251024_071233604_b15b896b.jpg",
    "revision": null
  }, {
    "url": "assets/aistudio/IMG_5069_60ac371c.JPG",
    "revision": null
  }, {
    "url": "assets/aistudio/IMG_5057_8cf1d4cc.JPG",
    "revision": null
  }, {
    "url": "assets/aistudio/IMG_4545_a0932633.JPG",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a0ae9ccf687f1fed08193c7f6b6e4ae9"
  }, {
    "url": "icon.svg",
    "revision": "759e80f4489fd27707dbc6d648b3b8fc"
  }, {
    "url": "pwa-192x192.png",
    "revision": "758485622f2a494c6ee1d17901e447b4"
  }, {
    "url": "pwa-512x512.png",
    "revision": "966f343c62c1472c13811cc88fd1976f"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "b59a2202bfc305363d11f0d78a944021"
  }, {
    "url": "manifest.webmanifest",
    "revision": "bcfc939e5c9cc5a78afe89dfd494d446"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
