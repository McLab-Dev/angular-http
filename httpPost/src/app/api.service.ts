import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './person';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseURL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    console.log('getPeople ' + this.baseURL + 'people');
    return this.http.get<Person[]>(this.baseURL + 'people');
  }

  addPerson1(person: Person): Observable<any> {
    //const headers = { 'content-type': 'application/json'}
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    console.log(headers);

    const body = JSON.stringify(person);
    console.log(body);
    return this.http.post(this.baseURL + 'people', body, { headers: headers });
  }

  //Adding headers
  getPeopleWithHeaders(): Observable<Person[]> {
    const headers = { 'content-type': 'application/json' };
    console.log(headers);
    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  //Set method
  getPeopleWithSet(): Observable<Person[]> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    console.log(headers);
    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  //This wont work
  getPeopleWithImmutable(): Observable<Person[]> {
    console.log('getPeopleWithImmutable: ');
    const headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    console.log(headers);
    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  getPeopleWithImmutable1(): Observable<Person[]> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');

    console.log(headers);
    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  getPeopleAppend(): Observable<Person[]> {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append(
      'content-type',
      'application/x-www-form-urlencoded'
    );
    headers = headers.append('customer-header', 'custom');
    console.log(headers);
    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  getPeopleHas(): Observable<Person[]> {
    let headers = new HttpHeaders();
    //headers=headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*');
    if (!headers.has('content-type')) {
      headers = headers.append('content-type', 'application/json');
    }

    console.log(headers);
    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  getPeopleGet(): Observable<Person[]> {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const h = headers.get('content-type');
    if (h == null) {
      console.log('content type header not present');
    } else {
      console.log(h);
    }

    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  getPeopleGetAll(): Observable<Person[]> {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .append('content-type', 'application/x-www-form-urlencoded');

    const h = headers.getAll('content-type');
    console.log(h);

    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  getPeopleKeys(): Observable<Person[]> {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .append('content-type', 'application/x-www-form-urlencoded');

    const h = headers.keys();
    console.log(h);

    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  getPeopleDelete(): Observable<Person[]> {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .append('content-type', 'application/x-www-form-urlencoded');

    headers = headers.delete('content-type', 'application/json');

    //headers=headers.delete("content-type")

    console.log(headers);

    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  getPeopleFromObject(): Observable<Person[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    });

    console.log(headers);

    return this.http.get<Person[]>(this.baseURL + 'people', {
      headers: headers,
    });
  }

  addPerson(person: Person): Observable<Person> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(person);
    console.log(body);
    return this.http.post<Person>(this.baseURL + 'people', body, {
      headers: headers,
    });
  }
}
