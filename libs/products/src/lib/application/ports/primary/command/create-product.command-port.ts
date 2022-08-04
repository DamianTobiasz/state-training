import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductCommand } from './create-product.command';

export const CREATE_PRODUCT_COMMAND =
  new InjectionToken<CreateProductCommandPort>('CREATE_PRODUCT_COMMAND');

export interface CreateProductCommandPort {
  createProduct(command: CreateProductCommand): Observable<void>;
}
