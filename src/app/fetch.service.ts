import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }


  fetchPokemon() {
    const randomNum1 = Math.floor(Math.random() * 251);
    const randomNum2 = Math.floor(Math.random() * 251);
    const pokemon1 = this.http.get(`https://pokeapi.co/api/v2/pokemon/${randomNum1}/`);
    const pokemon2 = this.http.get(`https://pokeapi.co/api/v2/pokemon/${randomNum2}/`);

    return pokemon1.pipe(mergeMap((poke1) => {
      return pokemon2.pipe(map((poke2) => {
        return [poke1, poke2];
      }));
    }));
  }
}
