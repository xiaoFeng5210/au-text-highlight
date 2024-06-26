import type { DeafultConfig } from './types';
import sectionRange from './core/sectionRange';
/**
 * 核心方法
 * @param config
 */
declare function textHighlight(config: DeafultConfig): {
    keyword: string;
    start: number;
    end: number;
}[];
export { textHighlight, sectionRange, };
