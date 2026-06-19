# PICO Face Detector

A JavaScript library for detecting faces using the [PICO](https://arxiv.org/abs/1305.4537)
algorithm with rotation-invariant detection.

[![DEMO](https://img.youtube.com/vi/u38oQQMu0WU/0.jpg)](https://www.youtube.com/watch?v=u38oQQMu0WU)

More details [here](https://meefik.dev/2018/08/27/picojs-face-detection/).

## Usage

An example of using the library's basic functions:

```js
// load cascade
fetch("./data/classifier.dat")
  .then(function (response) {
    if (!response.ok) throw Error(response.statusText || "Request error");
    return response.arrayBuffer();
  })
  .then(function (cascade) {
    // create face detector with options
    return PicoFace(cascade, {
      shiftfactor: 0.1, // sliding window step as a fraction of its current size
      scalefactor: 1.1, // resize the detection window by 10% at each scale level
      initialsize: 0.1, // minimum face size as a percentage (10%) of image dimensions
      rotation: [0, 30, 330], // rotation angles to test, in degrees
      threshold: 0.2, // overlap ratio for merging detected candidates
      memory: 3, // number of frames kept in memory to improve detection quality
    });
  })
  .then(function (detect) {
    // image = ImageData
    return detect(image);
  })
  .then(function (dets) {
    // dets = [{ r: rows, c: cols, s: size, q: quality, a: angle }]
    console.log(dets);
  });
```

All parameters of the library are set in the constructor. Here is their description:

| Parameter   | Default | Description                                                                           |
| ----------- | ------- | ------------------------------------------------------------------------------------- |
| shiftfactor | 0.1     | Sliding window step as a fraction (10%) of its current size                           |
| scalefactor | 1.1     | Scale factor for the sliding window (resizes by 10% per step)                         |
| initialsize | 0.1     | Initial sliding window size as a percentage (10%) of image dimensions                 |
| threshold   | 0.2     | Overlap ratio (20%) used to merge detected candidates into unified regions            |
| rotation    | [0]     | Array of rotation angles to test (0–360 degrees)                                     |
| memory      | 1       | Number of frames kept in memory to improve detection quality                          |

The output is an array of areas where the algorithm detects faces. Here is a description of each area:

| Feature | Description                                                                        |
| ------- | ---------------------------------------------------------------------------------- |
| c       | X-coordinate of the center of the detected face                                    |
| r       | Y-coordinate of the center of the detected face                                    |
| s       | Size of the detected area (width and height / diameter)                            |
| q       | Detection quality score (higher is better)                                         |
| a       | Rotation angle of the image (the most likely one from the `rotation` parameter)    |

## Build and run

Build the library bundle into the `./dist/` directory:

```
npm install
npm run build
```

Start the demo web server:

```
npm run dev
```

## Related projects

- PICO: https://github.com/nenadmarkus/pico
- picojs: https://github.com/tehnokv/picojs
- tracking.js: https://github.com/eduardolundgren/tracking.js
