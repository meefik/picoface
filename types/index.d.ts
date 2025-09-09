export interface PicoFaceOptions {
  shiftfactor?: number;
  scalefactor?: number;
  initialsize?: number;
  threshold?: number;
  memory?: number;
  rotation?: number[];
}

export interface PicoFaceDetection {
  r: number; // row
  c: number; // col
  s: number; // size
  q: number; // quality
  a: number; // angle (degrees)
}

/**
 * Creates a face detector function using the provided classification cascade and options.
 *
 * @param cascade - The classification cascade represented as an array of numbers.
 * @param options - Optional algorithm configuration.
 * @param options.shiftfactor - Moves the detection window by a percentage of its size (default: 0.1).
 * @param options.scalefactor - Resizes the detection window for multiscale processing (default: 1.1).
 * @param options.initialsize - Minimum size of a face as a percentage of the image area (default: 0.1).
 * @param options.threshold - Overlap threshold for detections (default: 0.2).
 * @param options.memory - Number of images to keep in memory for detection (default: 1).
 * @param options.rotation - Array of rotation angles in degrees to apply during detection (default: [0]).
 * @returns A detector function that takes an ImageData object and returns a Promise resolving to an array of PicoFaceDetection objects.
 *
 * @example
 * ```javascript
 * const detector = PicoFace(cascade, { rotation: [0, 30, 330] });
 * const detections = await detector(imageData);
 * ```
 */
export default function PicoFace(
  cascade: number[],
  options?: PicoFaceOptions
): (image: ImageData) => Promise<PicoFaceDetection[]>;
