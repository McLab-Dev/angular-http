import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Repos {
  id!: string;
  name!: string;
  html_url!: string;
  description!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  userName: string = 'minyang-chen';
  baseURL: string = 'https://api.github.com/';
  repos!: Repos[];

  //Inject HttpClient
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRepos();
  }

  public getRepos() {
    console.log(this.baseURL + 'users/' + this.userName + '/repos')
    return this.http
      .get<Repos[]>(this.baseURL + 'users/' + this.userName + '/repos')
      .subscribe(
        (response) => {
          //Next callback
          console.log('response received');
          console.log(response);
          this.repos = response;
        },
        (error) => {
          //Error callback
          console.error('Request failed with error');
          alert(error);
        },
        () => {
          //Complete callback
          console.log('Request completed');
        }
      );
  }
}
