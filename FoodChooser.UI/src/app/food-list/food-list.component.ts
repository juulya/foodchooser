import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FoodDb, Food } from "../global";
import { Filter } from "../choosing/choosing.model";
import { 
  faClock, 
  faDrumstickBite, 
  faLeaf, 
  faFish, 
  faThermometerFull, 
  faThermometerHalf, 
  faThermometerEmpty,
  faPlus,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { _ } from "underscore";
import { FoodListService } from "./food-list.service";

declare var jQuery:any;

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
  providers: [FoodListService]
})
export class FoodListComponent implements OnInit, OnChanges {
  
  constructor(private foodDb: FoodDb, private service: FoodListService) { }

  @Input() filter: Filter;

  private foodList = this.foodDb.data;

  

  private faClock = faClock;
  private icons: any = {
    clock: faClock,
    meat: faDrumstickBite,
    leaf: faLeaf,
    fish: faFish,
    hot: faThermometerFull,
    medium: faThermometerHalf,
    cold: faThermometerEmpty,
    plus: faPlus,
    search: faSearch
  }

  private modal: Modal = {
    iconTemperature: this.icons.hot,
    iconType: this.icons.meat,
    imgSrc: null,
    temperature: null,
    title: null,
    type: null,
    recipe: null,
    id: null,
    supply: null
  }

  private newRecipe: any = {
    id: undefined,
    name: undefined,
    type: undefined,
    temperature: undefined,
    supply: undefined,
    imgSrc: undefined,
  }

  private searchBar: string;
  private timeOut: any;
  private timeOutDuration: number = 500;

  ngOnInit() {

    this.service.getRecipies().subscribe((data: any) => {
      console.log("request complete", data);
      this.foodList = data;

      if(this.filter === undefined) {
        this.filter = new Filter();
      }

      // if(this.filter !== undefined) {
      this.filter.filterChangedEvent.subscribe(() => {
        console.log("filterChanged", this.filter);

        

        var filterObject:any = {};
        if(this.filter.type != undefined) {
          filterObject['type'] = this.filter.type;
        }
        if(this.filter.temperature != undefined) {
          filterObject['temperature'] = this.filter.temperature
        }
        if(this.filter.supply != undefined) {
          filterObject['supply'] = this.filter.supply;
        }
        if(this.filter.name != undefined) {
          filterObject['name'] = this.filter.name;
        }

        this.service.filterRecipies(filterObject).subscribe((data: any) => {
          this.foodList = data;
        })
        // if(filterObject.type || filterObject.temperature || filterObject.supply) {
        //   this.foodList = _.where(this.foodDb.data, filterObject);
        // } else {
        //   this.foodList = this.foodDb.data;
        // }
      });
      // }
    })

    //console.log(this.foodDb);
    
    
  }



  ngOnChanges() {
    console.log("filter", this.filter);
  }

  private modalInit(food: Food) {
    var iconType = food.type === "meat" ? this.icons.meat : food.type === "vegetarian" ? this.icons.leaf : this.icons.fish;
    var iconTemperature = food.temperature === "hot" ? this.icons.hot : food.temperature === "medium" ? this.icons.medium : this.icons.cold;
    this.modal = {
      id: food.id,
      title: food.name,
      imgSrc: food.imgSrc,
      //description: food.description,
      //difficulty: food.difficulty,
      //energyValue: food.enegryValue,
      temperature: food.temperature,
      //time: food.time,
      type: food.type,
      iconType: iconType,
      iconTemperature: iconTemperature,
      recipe: food,
      supply: food.supply
    }
  }

  private chooseRandom() {
    var randomFood = this.foodList[Math.floor(Math.random() * this.foodList.length)];
    this.modalInit(randomFood);
    jQuery("#foodModal").modal('show');
  }

  private searchForRecipe() {
    window.open("https://google.com/search?q=" + this.modal.title + "+рецепт", "_blank");
  }

  

  private recipeSearchBarChanged() {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.filter.name = this.searchBar;

      this.filter.filterChangedEvent.next();
      //do something

    }, this.timeOutDuration);
  }

  private saveRecipe() {
    console.log(this.newRecipe);

    if(this.newRecipe.id != undefined && this.newRecipe.id > 0) {
      this.service.updateRecipe(this.newRecipe).subscribe(() => {
        this.closeAddNewRecipeModal();
        jQuery("#foodModal").modal('hide');
        this.filter.filterChangedEvent.next();
      });
    } else {
      this.service.saveRecipe(this.newRecipe).subscribe(() => {
        this.closeAddNewRecipeModal();
  
        this.filter.filterChangedEvent.next();
      })  
    }
  }

  private closeAddNewRecipeModal() {
    this.newRecipe = {
      id: undefined,
      name: undefined,
      type: undefined,
      temperature: undefined,
      supply: undefined,
      imgSrc: undefined
    }
    jQuery("#addFoodModal").modal('hide');

  }

  private editRecipe(recipe: Modal) {

    var foodToEdit: Food = {
      id: recipe.id,
      imgSrc: recipe.imgSrc,
      name: recipe.title,
      supply: recipe.supply,
      temperature: recipe.temperature,
      type: recipe.type
    }
    this.newRecipe = foodToEdit;
  }

  private deleteRecipe() {
    console.log("yes");

    this.service.deleteRecipe(this.modal.recipe).subscribe(() => {
      this.modal = {
        iconTemperature: this.icons.hot,
        iconType: this.icons.meat,
        imgSrc: null,
        temperature: null,
        title: null,
        type: null,
        recipe: null,
        id: null,
        supply: null
      }

      this.hideDeleteConfirmation();
      jQuery("#foodModal").modal('hide');

      this.filter.filterChangedEvent.next();
    })
  }

  private showDeleteConfirmation() {
    jQuery("#foodModal").addClass("food-modal");
    jQuery("#foodModal").addClass("modal-blur");
    
  }

  private hideDeleteConfirmation() {
    jQuery("#foodModal").removeClass("food-modal");
    jQuery("#foodModal").removeClass("modal-blur");
  }

}

class Modal {
  id: number;
  title: string;
  imgSrc: string;
  //description: string;
  type: string;
  temperature: string;
  //energyValue: number;
  //time: number;
  //difficulty: number;
  supply: string;
  iconType: any;
  iconTemperature: any;
  recipe: Food
}
