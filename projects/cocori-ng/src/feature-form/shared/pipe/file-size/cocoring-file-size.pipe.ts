import { Pipe, PipeTransform } from '@angular/core';

/** https://gist.github.com/JonCatmull/ecdf9441aaa37336d9ae2c7f9cb7289a */

type unit = 'octets' | 'Ko' | 'Mo' | 'Go' | 'To' | 'Po';
type unitPrecisionMap = {
    [u in unit]: number;
};

const defaultPrecisionMap: unitPrecisionMap = {
    octets: 0,
    Ko: 0,
    Mo: 1,
    Go: 1,
    To: 2,
    Po: 2
};

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that can be a number or a map for each unit.
 * Usage:
 *   bytes | fileSize:precision
 * @example
 * // returns 1 KB
 * {{ 1500 | fileSize }}
 * @example
 * // returns 2.1 GB
 * {{ 2100000000 | fileSize }}
 * @example
 * // returns 1.46 KB
 * {{ 1500 | fileSize:2 }}
 */
@Pipe({ name: 'fileSize' })
export class CocoringFileSizePipe implements PipeTransform {
    private readonly units: unit[] = ['octets', 'Ko', 'Mo', 'Go', 'To', 'Po'];

    transform(bytes: number = 0, precision: number | unitPrecisionMap = defaultPrecisionMap): string {
        if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

        let unitIndex = 0;

        while (bytes >= 1024) {
            bytes /= 1024;
            unitIndex++;
        }

        const unit = this.units[unitIndex];

        if (typeof precision === 'number') {
            return `${bytes.toFixed(+precision)} ${unit}`;
        }
        return `${bytes.toFixed(precision[unit])} ${unit}`;
    }
}