import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from './product.dto';

export const GETS_ALL_PRODUCT_DTO = new InjectionToken<GetsAllProductDtoPort>(
  'GETS_ALL_PRODUCT_DTO'
);

export interface GetsAllProductDtoPort {
  getAll(): Observable<ProductDTO[]>;
}

// function twoSum(nums: number[], target: number): number[] {
//   let result = [];
//   nums.forEach((num) => num + nums.find((number)=>num + number === target || )   === return target ?  )
// };
