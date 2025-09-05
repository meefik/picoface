# PICO Face Detector

A library for detecting faces using the [PICO](https://arxiv.org/abs/1305.4537)
algorithm with the face rotation invariant implementation.

## Usage

An example of using the basic functions of the library:

```js
// load cascade
fetch('./data/classifier.dat')
  .then(function(response) {
    if (!response.ok) throw Error(response.statusText || 'Request error');
    return response.arrayBuffer();
  })
  .then(function(cascade) {
    // create PICO detector with options
    return PICO(cascade, {
      shiftfactor: 0.1, // move the detection window by 10% of its size
      scalefactor: 1.1, // resize the detection window by 10% when moving to the higher scale
      initialsize: 0.1, // minimum size of a face (10% of image area)
      rotation: [0, 30, 330], // rotation angles in degrees
      threshold: 0.2, // overlap threshold
      memory: 3 // number of images in the memory
    });
  })
  .then(function(detect) {
    // image = ImageData
    return detect(image);
  })
  .then(function(dets) {
    // dets = [{ r: rows, c: cols, s: size, q: quality, a: angle }]
    console.log(dets);
  });
```

## Build and run

Build the library bundle in the directory `./dist/`:

```
npm install
npm run build
```

Start the demo webserver:

```
npm run dev
```

[![pico.js](https://img.youtube.com/vi/9WiGC08_ZFY/0.jpg)](https://www.youtube.com/watch?v=9WiGC08_ZFY)

## Related projects

- PICO: https://github.com/nenadmarkus/pico
- picojs: https://github.com/tehnokv/picojs
- tracking.js: https://github.com/eduardolundgren/tracking.js
