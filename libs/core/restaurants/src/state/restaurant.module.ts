import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRestaurant from './restaurant.reducer';
import { RestaurantEffects } from './restaurant.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRestaurant.RESTAURANT_FEATURE_KEY, fromRestaurant.restaurantReducer),
    EffectsModule.forFeature([RestaurantEffects]),
  ],
})
export class RestaurantModule {}
