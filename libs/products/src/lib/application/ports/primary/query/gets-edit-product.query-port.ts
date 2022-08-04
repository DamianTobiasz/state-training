import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { EditProductQuery } from './edit-product.query';

export const GETS_EDIT_PRODUCT_QUERY =
  new InjectionToken<GetsEditProductQueryPort>('GETS_EDIT_PRODUCT_QUERY');

export interface GetsEditProductQueryPort {
  getCurrentEditProductQuery(): Observable<EditProductQuery>;
}
