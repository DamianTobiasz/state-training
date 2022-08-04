import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeProductPriceCommand } from './change-product-price.command';

export const CHANGE_PRODUCT_PRICE_COMMAND =
  new InjectionToken<ChangeProductPriceCommandPort>(
    'CHANGE_PRODUCT_PRICE_COMMAND'
  );

export interface ChangeProductPriceCommandPort {
  changeProductPrice(command: ChangeProductPriceCommand): Observable<void>;
}
