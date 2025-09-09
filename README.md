# PICO Face Detector

A small JavaScript library for detecting faces using the [PICO](https://arxiv.org/abs/1305.4537)
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
    // create face detector with options
    return PicoFace(cascade, {
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

All parameters of the library are set in the constructor, here is their description:

| Parameter   | Default      | Description                                                                           |
|-------------|--------------|---------------------------------------------------------------------------------------|
| shiftfactor | 0.1          | Sliding window movement step as a percentage (10%) of the image size                  |
| scalefactor | 1.1          | Sliding window resizing step as a percentage (10%) of image size                      |
| initialsize | 0.1          | Initial size of the sliding window as a percentage (10%) of the image size            |
| threshold   | 0.2          | Percentage (20%) of intersections of found candidates for grouping them into one area |
| rotation    | [0]          | Array of rotation angles to be searched (0 to 360 in 1 degree increments)             |
| memory      | 1            | Number of images (frames) in memory to improve detection quality                      |

The output is an array of areas where the algorithm assumes there are faces. Here is a description of this area:

| Feature     | Description                                                                          |
|-------------|--------------------------------------------------------------------------------------|
| c           | X-coordinate of the center of the found face area                                    |
| r           | Y-coordinate of the center of the found face area                                    |
| s           | Size of found area (width and height or diameter)                                    |
| q           | Detection quality (higher is better quality)                                         |
| a           | Rotation angle of the image (the most likely one listed in the rotation parameter)   |

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

[![Video](https://img.youtube.com/vi/u38oQQMu0WU/0.jpg)](https://www.youtube.com/watch?v=u38oQQMu0WU)

## Related projects

- PICO: https://github.com/nenadmarkus/pico
- picojs: https://github.com/tehnokv/picojs
- tracking.js: https://github.com/eduardolundgren/tracking.js
