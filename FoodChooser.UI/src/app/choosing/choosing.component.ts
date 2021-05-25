import { Component, OnInit } from '@angular/core';
import { Filter } from "./choosing.model";


@Component({
  selector: 'app-choosing',
  templateUrl: './choosing.component.html',
  styleUrls: ['./choosing.component.scss']
})
export class ChoosingComponent implements OnInit {

  constructor() { }

  private foodFilter: Filter = new Filter();
  private temperature: string;
  private type: string;
  private supply: string;
  
  ngOnInit() {
  }

  private assignTemperature(temperature: string) {
    if(temperature === this.temperature) {
      this.temperature = undefined;
      this.foodFilter.temperature = undefined;
    } else {
      if(temperature !== "hot") {
        this.supply = undefined;
        this.foodFilter.supply = undefined;
      }
      this.temperature = temperature;
      this.foodFilter.temperature = temperature;
      console.log(this.temperature);
    }
    this.foodFilter.filterChangedEvent.next();
  }

  private assignType(type: string) {
    if(type === this.type) {
      type = undefined;
      this.type = undefined;
      this.foodFilter.type = undefined;
    } else {
      this.type = type;
      this.foodFilter.type = type;
      console.log(this.type);
    }
    this.foodFilter.filterChangedEvent.next();
  }

  private assignSupply(supply: string) {
    if(supply === this.supply) {
      this.supply = undefined;
      this.foodFilter.supply = undefined;
    } else {
      this.supply = supply;
      this.foodFilter.supply = supply;
      console.log(this.supply);
    }
    this.foodFilter.filterChangedEvent.next();
  }
}


