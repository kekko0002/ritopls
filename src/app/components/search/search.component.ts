import {  Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { RiotapiService } from '../../services/riotapi.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /**
   * Searchbar component. It's child of dashboard.
   * It works exactly as the home component.
   */

  constructor(public riot: RiotapiService,
              private router: Router,
              private dialog: MatDialog) { }

  name: string;
  region: string;

  getSummoner(): void{
    this.riot.getSummonerByName(this.name, this.region).pipe(take(1), ).subscribe(
      data => {
        this.riot.summoner = data;
        this.riot.region = this.region;
        console.log(data);
      },
      err => {
        console.error(err);
        this.dialog.open(DialogComponent, {
          data: err
      });
      },
      () => {
        this.router.navigate(['/dashboard', this.name]);
        this.riot.reInit();
      }

    );
  }

  ngOnInit(): void {
  }

}
