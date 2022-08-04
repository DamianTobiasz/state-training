import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateProductCommand } from './update-product.command';

export const UPDATE_PRODUCT_COMMAND =
  new InjectionToken<UpdateProductCommandPort>('UPDATE_PRODUCT_COMMAND');

export interface UpdateProductCommandPort {
  updateProduct(command: UpdateProductCommand): Observable<void>;
}
