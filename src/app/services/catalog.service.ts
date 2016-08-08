import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Source3FGL, Source2FHL, SourceSNRcat } from './source';
import { Catalog3FGL, Catalog2FHL, CatalogSNRcat } from './catalog';


@Injectable()
export class CatalogService {


  reformat(obj) {

    // This function takes input of JSON data as an Object of Objects, and
    // reformats it to an array of Objects.

    var arr = [];

    Object.keys(obj).forEach(k => {
      Object.keys(obj[k]).forEach(v => {
        // Short way:   (arr[v] = (arr[v] || { id: v }))[k] = obj[k][v];

        if (!arr[v]) {
          arr[v] = { id: v };
        }
        arr[v][k] = obj[k][v];

      });
    });

    console.log("arr: ", arr);
    return arr;
  }

  getCatalog3FGL() {
    return this.http.get('app/data/cat/cat_3fgl.json')
      .toPromise()
      .then(response => new Catalog3FGL( this.reformat(response.json()) ))
      .catch(this.handleError);
  }

  // getSource3FGL(id: number) {
  //   return this.getCatalog3FGL()
  //     .then(sources => sources.find(source => source.id === id));
  // }

  getCatalog2FHL() {
    return this.http.get('app/data/cat/cat_2fhl.json')
      .toPromise()
      .then(response => new Catalog2FHL( this.reformat(response.json()) ))
      .catch(this.handleError);
  }

  getCatalogSNRcat() {
    return this.http.get('app/data/cat/cat_snrcat.json')
      .toPromise()
      .then(response => new CatalogSNRcat( this.reformat(response.json()) ))
      .catch(this.handleError);
  }




  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {}

}