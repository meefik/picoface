/**
 * Configuration options for the face detection algorithm.
 */
export interface PicoFaceOptions {
  /** Step size for moving the detection window, as a percentage of its current size (default: 0.1). */
  shiftfactor?: number;
  /** Factor by which to resize the detection window for multiscale processing (default: 1.1). */
  scalefactor?: number;
  /** Minimum face size as a percentage of the image dimensions (default: 0.1). */
  initialsize?: number;
  /** Overlap threshold used to suppress redundant detections (default: 0.2). */
  threshold?: number;
  /** Number of previous frames to keep in memory for tracking (default: 1). */
  memory?: number;
  /** Rotation angles in degrees to test during detection (default: [0]). */
  rotation?: number[];
}

/**
 * Represents a single face detection result.
 */
export interface PicoFaceDetection {
  /** Row coordinate of the detection center. */
  r: number;
  /** Column coordinate of the detection center. */
  c: number;
  /** Size of the detected face. */
  s: number;
  /** Confidence quality score of the detection. */
  q: number;
  /** Rotation angle in degrees at which the face was detected. */
  a: number;
}

/**
 * Creates a face detector function using the provided classification cascade and options.
 *
 * @param cascade The classification cascade represented as an array of numbers.
 * @param options Optional algorithm configuration.
 * @param options.shiftfactor Step size for moving the detection window, as a percentage of its current size (default: 0.1).
 * @param options.scalefactor Factor by which to resize the detection window for multiscale processing (default: 1.1).
 * @param options.initialsize Minimum size of a face as a percentage of the image area (default: 0.1).
 * @param options.threshold Overlap threshold for detections (default: 0.2).
 * @param options.memory Number of images to keep in memory for detection (default: 1).
 * @param options.rotation Array of rotation angles in degrees to apply during detection (default: [0]).
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
  options?: PicoFaceOptions,
): (image: ImageData) => Promise<PicoFaceDetection[]>;
