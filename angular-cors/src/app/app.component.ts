import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class Peoples {
  id!: string;
  name!: string;
  IsRegistered!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-cors';
  baseURL: string = 'http://localhost:5091/peoples';
  //baseURL: string = 'http://192.168.0.31:5000/peoples';  
  peoples!: Peoples[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPeopleWithoutHeader().subscribe((people) => {
      this.peoples = people;
    });
    //this.getPeoplesWithErrorHandler()
  }

  getPeoples() {
    this.http.get(this.baseURL).subscribe((data) => {
      console.log(data);
    });
  }

  getPeopleWithoutHeader(): Observable<Peoples[]> {
    return this.http.get<Peoples[]>(this.baseURL);
  }

  getPeopleWithHeader(): Observable<Peoples[]> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    console.log(headers);
    return this.http.get<Peoples[]>(this.baseURL, {
      headers: headers,
    });
  }

  public getPeoplesWithErrorHandler() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    console.log(headers);
    console.log(this.baseURL);
    return this.http
      .get<Peoples[]>(this.baseURL, {
        headers: headers,
      })
      .subscribe(
        (response) => {
          //Next callback
          console.log('response received');
          console.log(response);
          this.peoples = response;
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
