import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summoner, Matches } from '../models/summoner';
import { Match } from '../models/match-details';


@Injectable({
  providedIn: 'root'
})
export class RiotapiService {

  /**
   * Service for REST API of Riot games.
   * Every Method returns endpoint from Riot API based on different setup.
   * Riot API uses various routing values and query paramaters
   * to get the endpoints.
   *
   * You can find all the endpoint here: https://developer.riotgames.com/apis
   *
   * You need an API key to make the app works. You can get a
   * developement API key here: https://developer.riotgames.com/
   * Development API key lasts for 24 hours so you need to regenerate it every day.
   *
   * To get API endpoint you need CORS. You can test this app running chrome disabling
   * chrome web security or adding your own proxy to the urlHeader variable.
   * You can also add 'https://cors-anywhere.herokuapp.com/' to the urlHeader variable only for testing the app
   * without disabling web security on chrome but you'll have reduced rate limit and slower
   * http requests.
   */

  private apiKey = '';  // Paste your API key here

  // https://thawing-savannah-71764.herokuapp.com/ added for CORS before 'https://', you can remove it if you use
  // chrome without web security
  private urlHeader = 'https://thawing-savannah-71764.herokuapp.com/https://';
  private urlCore = '.api.riotgames.com/';
  private params = new HttpParams().set('api_key', this.apiKey);

  // Global variables used in the components
  summoner: Summoner;
  region: string;
  isLoading = false;
  isShown = true;

  constructor(private http: HttpClient) { }

  // Reinitialize a component. Needed for some component to avoid some problems when component is already initialized
  reInit(): void{
    this.isShown = false;
    setTimeout(() => {
      this.isShown = true;
    });
  }

  // return a JSON Observable containing ids and general info about a player
  getSummonerByName(name: string, region: string): Observable<Summoner>{
    const reqType = 'lol/summoner/v4/summoners/by-name/';
    const url = this.urlHeader + region + this.urlCore + reqType + name;
    return this.http.get<Summoner>(url, {params: this.params});
  }

  // return a JSON Observable containing player rank status
  getLeague(id, region): Observable<any>{
    const reqType = 'lol/league/v4/entries/by-summoner/';
    const url = this.urlHeader + region + this.urlCore + reqType + id;
    return this.http.get<any>(url, {params: this.params});
  }

  // return a JSON observable contaning match history with general info about matches
  getMatchList(accountId, region, start, end, queue): Observable<Matches>{
    const reqType = 'lol/match/v4/matchlists/by-account/';
    let params = this.params;
    params = params.append('endIndex', end);
    params = params.append('beginIndex', start);
    params = params.append('queue', queue);
    const url = this.urlHeader + region + this.urlCore + reqType + accountId;
    return this.http.get<Matches>(url, {params});
  }

  // return a JSON Observable containing detauiled info about a match
  getMatch(matchId, region): Observable<Match>{
    const reqType = 'lol/match/v4/matches/';
    const url = this.urlHeader + region + this.urlCore + reqType + matchId;
    return this.http.get<Match>(url, {params: this.params});
  }

}
