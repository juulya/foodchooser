import foodDb from "../assets/food-db.json";

export class Food {
  name: string;         // Название
  type: string;         // тип - мясо, рыба, вегетерианский, можно ещё что придумать
  temperature: string;  // температура - hot, cold, можно ещё что придумать
  //enegryValue: number;  // шкала жирности и калорийности от 1 до 100
  imgSrc: string;       // полная ссылка на картинку блюда, желательно искать картинку ~ 400x200 но сайт, в теории, адаптирует любую
  //description: string;  // Описание, небольшой текст о блюде, рецепт, хз
  //time: number;         // Время на готовку
  //difficulty: number;   // Сложность от 1 до 10
  supply: string;
  id: number;
}

export class FoodDb {
  data: Food[]

  // constructor() {
  //   this.data = foodDb;
  // }
}