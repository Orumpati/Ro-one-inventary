import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICountry {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  
  countries!: any ;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    /*this.http.get('./assets/data/countries.json').subscribe(data=> {
      
      this.countries = data;
      
    });*/
    this.countries =[
      {
        "name": "India",
        "flag": "4/41/Flag_of_India.svg",
        "area": 3287263,
        "population": 1324171354
      },
      {
        "name": "France",
        "flag": "c/c3/Flag_of_France.svg",
        "area": 640679,
        "population": 64979548
      },
      {
        "name": "United States",
        "flag": "a/a4/Flag_of_the_United_States.svg",
        "area": 9629091,
        "population": 324459463
      },
      {
        "name": "Russia",
        "flag": "f/f3/Flag_of_Russia.svg",
        "area": 17075200,
        "population": 146989754
      },
      {
        "name": "Germany",
        "flag": "b/ba/Flag_of_Germany.svg",
        "area": 357114,
        "population": 82114224
      },
      {
        "name": "Canada",
        "flag": "c/cf/Flag_of_Canada.svg",
        "area": 9976140,
        "population": 36624199
      },
      {
        "name": "Vietnam",
        "flag": "2/21/Flag_of_Vietnam.svg",
        "area": 331212,
        "population": 95540800
      },
      {
        "name": "Mexico",
        "flag": "f/fc/Flag_of_Mexico.svg",
        "area": 1964375,
        "population": 129163276
      }

    ]
  }


}
