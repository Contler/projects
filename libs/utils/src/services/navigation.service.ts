import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private stackNavigation: { [key: string]: string } = {};

  constructor() {}

  setNavigation(key: string, value: string) {
    this.stackNavigation[key] = value;
  }

  getNavigation(key: string) {
    const value = this.stackNavigation[key];
    delete this.stackNavigation[key];
    return value;
  }
}
