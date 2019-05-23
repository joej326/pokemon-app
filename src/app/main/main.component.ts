import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('movePokemon', [
      // ...
      state('enter', style({
        opacity: 1,
        left: '0vw'
      })),
      state('exit', style({
        opacity: 0,
        left: '50vw'
      })),
      transition('enter => exit', [
        animate('5s')
      ]),
      transition('exit => enter', [
        animate('5s')
      ]),
    ]),
  ],
})
export class MainComponent implements OnInit {

  sprites = [];
  names = [];
  abilities = [];
  fetchedAbilities = {};
  animate = false;


  constructor(private fetchService: FetchService) { }

  ngOnInit() {
    this.fetchService.fetchPokemon().subscribe(
      (data: any) => {
        data.map((dataSet, i) => {
          this.sprites.push(dataSet.sprites.front_default);
          this.names.push(dataSet.forms[0].name);
          this.abilities.push(dataSet.moves);
          console.log('abilities');
          console.log(this.abilities);
          console.log(data);

          // setTimeout(() => {
          this.fetchRandomAbility(i);
          this.animate = true;

          // }, 1500);
        },
      );
        console.log(data);
        console.log(name);
      },
      () => {},
      () => {
        this.animate = true;
      }
    );
  }

  fetchRandomAbility(i) {
    const randomAbilityIndex = Math.floor(Math.random() * this.abilities[i].length);
    this.fetchedAbilities[i] = this.abilities[i][randomAbilityIndex].move.name;
  }

}
