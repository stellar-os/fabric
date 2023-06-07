
/**
 * 时间线
 */
export class Timeline {

    /**
     * 开始时间
     */
    declare startTime: number;

    /**
     * 结束时间
     */
    declare endTime: number;

    constructor(startTime: number, endTime: number) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    /**
     * 返回持续时间
     * @returns 
     */
    duration() : number {
        return this.endTime - this.startTime;
    }
}