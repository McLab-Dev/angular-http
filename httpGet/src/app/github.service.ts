import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { repos } from './repos';

@Injectable()
export class GitHubService {
  baseURL: string = 'https://api.github.com/';

  constructor(private http: HttpClient) {}

  getRepos(userName: string): Observable<any> {
    return this.http.get(this.baseURL + 'users/' + userName + '/repos');
  }

  getReposRawResponse(userName: string): Observable<any> {
    return this.http.get(this.baseURL + 'users/' + userName + '/repos', {
      observe: 'events',
      reportProgress: true,
    });
  }

  getReposTypedResponse(userName: string): Observable<repos[]> {
    return this.http.get<repos[]>(
      this.baseURL + 'users/' + userName + '/repos'
    );
  }

  getReposCatchError(userName: string): Observable<repos[]> {
    return this.http
      .get<repos[]>(this.baseURL + 'usersY/' + userName + '/repos')
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  getReposMap(userName: string): Observable<repos[]> {
    return this.http
      .get<repos[]>(this.baseURL + 'users/' + userName + '/repos')
      .pipe(
        map((data) => {
          //You can perform some transformation here
          return data;
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        })
      );
  }
  getReposUrlParameter(userName: string): Observable<repos[]> {
    return this.http
      .get<repos[]>(
        this.baseURL + 'users/' + userName + '/repos?sort=description&page=2'
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        })
      );
  }

  //HTTP Headers
  getReposHeaders(userName: string): Observable<repos[]> {
    const params = new HttpParams().set('sort', 'description').set('page', '2');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<repos[]>(this.baseURL + 'users/' + userName + '/repos', {
        params: params,
        headers: headers,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        })
      );
  }

  //With Credentials
  getReposWithCookies(userName: string): Observable<repos[]> {
    const params = new HttpParams().set('sort', 'description').set('page', '2');

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .get<repos[]>(this.baseURL + 'users/' + userName + '/repos', {
        params: params,
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        })
      );
  }
}
