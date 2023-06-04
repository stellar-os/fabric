import { Canvas } from "../fabric";

/**
 * 分辨率和fps配置
 */
export class Resolution {

    /**
     * width
     * @type String
     * @default
     */
    declare width: number;

    /**
     * height
     * @type String
     * @default
     */
    declare height: number;

    /**
     * fps
     * @type String
     * @default
     */
    declare fps: number;
}

/**
 * Sketchpad绘图板, 代表了一个完整的视频。
 */
export class Sketchpad {
    /**
     * id
     * @type String
     * @default
     */
    declare id: string;

    /**
     * 标题
     */
    declare title: string;

    /**
     * 版本号
     */
    declare version: string;

    /**
     * 分辨率和fps配置
     */
    declare resolution: Resolution;

    /**
     * 
     */
    declare scenes: JSON[];

    /**
     * 为canvas加载数据
     */
    loadCanvas(canvas: Canvas, index: number) {
        canvas.loadFromJSON(this.scenes[index]);
    }
}