import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectProductCommand } from './select-product.command';

export const SELECT_PRODUCT_COMMAND =
  new InjectionToken<SelectProductCommandPort>('SELECT_PRODUCT_COMMAND');

export interface SelectProductCommandPort {
  selectProduct(command: SelectProductCommand): Observable<void>;
}
