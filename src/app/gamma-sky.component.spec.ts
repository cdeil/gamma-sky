import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { GammaSkyAppComponent } from '../app/gamma-sky.component';

beforeEachProviders(() => [GammaSkyAppComponent]);

describe('App: GammaSky', () => {
  it('should create the app',
      inject([GammaSkyAppComponent], (app: GammaSkyAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'gamma-sky works!\'',
      inject([GammaSkyAppComponent], (app: GammaSkyAppComponent) => {
    expect(app.title).toEqual('gamma-sky works!');
  }));
});
