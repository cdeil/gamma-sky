import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass } from '@angular/common';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap';
import { SELECT_DIRECTIVES } from 'ng2-select';

import { CatalogService } from '../../services/catalog.service';
import { Catalog3FGL } from '../../services/catalog';
import { CatDetailService } from '../../services/cat-detail.service';

@Component({
  moduleId: module.id,
  selector: 'cat-search',
  templateUrl: 'cat-search.component.html',
  styleUrls: ['cat-search.component.css'],
  providers: [CatalogService, CatDetailService],
  directives: [SELECT_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, BUTTON_DIRECTIVES]
})
export class CatSearchComponent implements OnInit {


  private catalog: Catalog3FGL;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.catalog = catalog;

        for(var i = 0; i < this.catalog.data.length; i++) {
          this.items.push({
            text: this.catalog.data[i].data.Source_Name,
            id: this.catalog.data[i].data.id
          });
        }

      })
      .catch(error => this.error = error);
  }

  // To understand the code below, see ng2-select docs at:
  // http://valor-software.com/ng2-select/

  public items:Array<any> = [];

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);

    // this.catDetailService.setSelectedId(value.id);

    this.router.navigate(['/cat/3fgl', value.id])
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);

    this.router.navigate(['/cat']);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  constructor(
    private catalogService: CatalogService,
    private catDetailService: CatDetailService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCatalog();


    // this.items = this.catalog.data
  }

}
