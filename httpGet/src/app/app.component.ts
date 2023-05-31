import { Component } from '@angular/core';

import { GitHubService } from './github.service';
import { repos } from './repos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'httpGet';

  userName: string = "minyang-chen"
  repos: repos[] | undefined;
 
  loading: boolean = false;
  errorMessage: string| undefined;

  constructor(private githubService: GitHubService) {
  }
  public getRepos() {
    this.loading = true;
    this.errorMessage = "";
    this.githubService.getReposHeaders(this.userName)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.repos = response; 
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
          this.loading = false; 
        })
  }

}
