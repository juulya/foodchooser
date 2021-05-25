import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "stringTrim"})
export class StringTrimPipe implements PipeTransform {
    transform(value: string): string {
        return value.length > 100 ? value.substr(0, 98) + "..." : value;
    }
}