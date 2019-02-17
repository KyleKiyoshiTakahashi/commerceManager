import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any;
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProductsFromService();
  }
  getProductsFromService(){
    let obs = this._productService.getProducts();
    obs.subscribe( data => {
      console.log("++++++WE GOT OUR PRODUCTS FROM THE DB!+++++", data)
      this.products = data
    })
  }
}
