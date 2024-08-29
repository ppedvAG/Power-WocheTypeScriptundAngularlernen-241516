import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
    name: 'relativeDate',
})
export class RelativeDatePipe implements PipeTransform {
    transform(value: Date): string | null {
        return DateTime.fromJSDate(value).toRelative();
    }
}
