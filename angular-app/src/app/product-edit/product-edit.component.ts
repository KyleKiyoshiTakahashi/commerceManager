import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  nameErrorMessage: any;
  priceErrorMessage: any;
  qtyErrorMessage: any;
  product;
  prodID: any;
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
  }
  editProductSubmit() {
    this._productService.editProduct(this.prodID, this.product).subscribe(
      (response) => {
      this.nameErrorMessage ="";
      this.priceErrorMessage ="";
      this.qtyErrorMessage = "";
      if(response['status']){
        console.log("SUCCESSS")
        this._router.navigate(['/'])
      }else {
        console.log("ERROR")
        console.log(response)
        if(response['err']['errors']['name']){
          this.nameErrorMessage = response['err']['errors']['name']['message'];
        }
        if(response['err']['errors']['price']){
          this.priceErrorMessage = response['err']['errors']['price']['message'];
        }
        if(response['err']['errors']['qty']){
          this.qtyErrorMessage = response['err']['errors']['qty']['message'];
        }
      }
      }
    )
    
  }
  cancelCreate() {

    this.product = { name: '', price: 0, image: '' };

    this._router.navigate(['/']);
  }
}
