import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
 
  title = 'httpGet Example';
  people!:Person[];
  person = new Person();
  
  constructor(private apiService:ApiService) {}
 
  ngOnInit() {
    this.refreshPeople()
  }
 
  //getPeopleWithSet
  refreshPeople() {
    this.apiService.getPeopleWithImmutable()
      .subscribe(data => {
        console.log(data)
        this.people=data;
      })      
 
  }

  refreshPeople2() {
    this.apiService.getPeople()
      .subscribe(data => {
        console.log(data)
        this.people=data;
      })      
 
  }
 
  addPerson() {
    this.apiService.addPerson(this.person)
      .subscribe(data => {
        console.log(data)
        this.refreshPeople();
      })      
  }

}
