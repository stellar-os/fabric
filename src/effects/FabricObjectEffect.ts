import { FabricObject } from "../shapes/Object/Object";

/**
 * 物体效果
 */
export class FabricObjectEffect {

    /**
     * 效果类型
     */
    declare genre: string;

    /**
     * 效果持续时间
     */
    declare duration: number;

    /**
     * 效果参数
     */
    declare params:JSON;

    /**
     * 应用效果
     * @param object
     */
    apply(object: FabricObject) {
        
    }

    /**
     * 
     * @returns 转化成json
     */
    toJSON(){
        return {
            genre: this.genre,
            duration: this.duration,
            params: this.params,
        }
    }
}