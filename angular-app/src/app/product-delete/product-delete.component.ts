import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  prodID: any;
  product: any;
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("this is the paramsID", params['id'])
      this.prodID = params['id']
      let obs = this._productService.editProductById(this.prodID);
      obs.subscribe(
        (data) => {
          if(data['status']){
            console.log("+++++ WE FOUND the product to update +++++", data)
            this.product = data['results']
          } 
      });
      (err)=>{ console.log(err); } 
    });
  };
  deleteProduct(id){
    let obs = this._productService.deleteProductById(this.prodID);
    obs.subscribe( data => {
      console.log(" DELETED A PRODUCT ")
      
    })
    this._router.navigate(['/'])
  }
  cancelCreate() {
    this._router.navigate(['/']);
  }
}
