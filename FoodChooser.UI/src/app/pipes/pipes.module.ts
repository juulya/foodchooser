import { NgModule } from "@angular/core";
import { StringTrimPipe } from "./string-trim/string-trim.pipe"

@NgModule({
    declarations: [
        StringTrimPipe
    ],
    exports: [
        StringTrimPipe
    ],
    providers: [],
    bootstrap: []
})
export class PipesModule {}