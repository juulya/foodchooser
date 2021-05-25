import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { $ } from 'protractor';
import { Food } from "../global";
// import { EventEmitter } from 'events';


@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss']
})
export class FoodCardComponent implements OnInit {

  constructor() { }

  @Input() food: Food;
  @Output() viewFood = new EventEmitter<Food>();

  ngOnInit() {
  }

  private viewFoodDetails() {
    this.viewFood.emit(this.food);
  }




}
