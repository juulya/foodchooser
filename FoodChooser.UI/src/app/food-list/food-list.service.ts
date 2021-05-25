import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class FoodListService {
    constructor(private http: HttpClient) { }

    private baseUrl = "http://api.local.foodchooser.net/recipe/";

    getRecipies() {
        return this.http.get(this.baseUrl + "getall");
    }

    filterRecipies(filter: any) {
        return this.http.post(this.baseUrl + "filter", filter);
    }

    saveRecipe(recipe: any) {
        return this.http.post(this.baseUrl + "save", recipe);
    }

    updateRecipe(recipe: any) {
        return this.http.put(this.baseUrl + "update", recipe);
    }

    deleteRecipe(recipe: any) {
        return this.http.delete(this.baseUrl + "delete?id=" + recipe.id);
    }
}