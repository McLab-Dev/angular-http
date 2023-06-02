import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-cors';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCandy();
  }
  getCandy() {
    this.http.get('http://localhost:5000/candy').subscribe((data) => {
      console.log(data);
    });
  }
}
