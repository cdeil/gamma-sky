import { Component, OnInit } from '@angular/core';
import { SwitchViewComponent } from '../switch-view/switch-view.component';
import { CatSearchComponent } from './cat-search/cat-search.component';

@Component({
  moduleId: module.id,
  selector: 'cat-view',
  templateUrl: 'cat-view.component.html',
  styleUrls: ['cat-view.component.css'],
  directives: [SwitchViewComponent, CatSearchComponent]
})
export class CatViewComponent implements OnInit {

  private notCurrentView;

  constructor() { }

  ngOnInit() {
    console.log('CatViewComponent ngOnInit()');
    this.notCurrentView = "map";
  }

}
