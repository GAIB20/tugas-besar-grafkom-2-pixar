import { CameraType } from "../Types/camera-types";
import { Camera } from "./camera";

export class PerspectiveCamera extends Camera {
    fov: number;
    zoom: number;
    near: number;
    far: number;
    focus: number;
    aspect: number;

	constructor(fov = 60, aspect = 1, near = 0.1, far = 2000) {
		super();
		this.fov = fov;
		this.near = near;
		this.far = far;
		this.focus = 10;
		this.aspect = aspect;
        this.zoom = 0.0005;

		this.computeProjectionMatrix();

	}

    computeProjectionMatrix() {
		const near = this.near;
		let top = near * Math.tan((Math.PI / 180) * 0.5 * this.fov ) / this.zoom;
		let height = 2 * top;
		let width = this.aspect * height;
		let left = - 0.5 * width;

		this._projectionMatrix.perspective(left, left + width, top, top - height, near, this.far);
      }

    override getCameraType() {
        return CameraType.PERSPECTIVE;
    }
}

