import { Subject } from 'rxjs';

export class Filter {
    temperature: string;
    type: string;
    supply: string;
    name: string;
  
    filterChangedEvent: Subject<void> = new Subject()
    constructor() {
      this.temperature = undefined;
      this.supply = undefined;
      this.type = undefined;
      this.name = undefined;
    }
  }