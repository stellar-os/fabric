import { Canvas } from "../fabric";
import { classRegistry } from './ClassRegistry';
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

    /**
     * 
     * @returns 转化成JSON对象
     */
    toJSON() {
        return {
            width: this.width,
            height: this.height,
            fps: this.fps
        };
    }
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

    constructor(json: string) {
        console.log("constructor json:" + json);
        const serialized = typeof json === 'string' ? JSON.parse(json) : json;

        Object.assign(this, serialized);
    }

    /**
     * 为scene加载数据
     */
    loadScene(canvas: Canvas, index: number) {
        canvas.loadFromJSON(this.scenes[index]);
    }

    /**
     * 把scene保存到指定位置
     * 
     * @param canvas 
     * @param index 
     */
    saveScene(canvas: Canvas, index: number) {
        this.scenes[index] = canvas.toJSON();
    }

    /**
     * 追加一个场景
     */
    addScene(canvas: Canvas, index:number){
        this.scenes.splice(index, 0, canvas.toJSON());
    }

    /**
     * 删除一个场景
     * @param index 
     */
    removeScene(index: number) {
        this.scenes.splice(index, 1);
    }

    /**
     * 转化成一个JSON对象
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            version: this.version,
            resolution: this.resolution,
            scenes: this.scenes
        };
    }
}

export function newSketchpad(json: string) {
    return new Sketchpad(json);
};