import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService
  ) 
  {
    this.bcService.set('@ProductDetails', '');
  }
  
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')!)
      .subscribe({
        next: product => {
          this.product = product,
          this.bcService.set('@productDetails', product.name)
        },
        error: error => console.log(error), 
      });
  }
}
