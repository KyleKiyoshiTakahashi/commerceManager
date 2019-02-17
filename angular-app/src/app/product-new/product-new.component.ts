import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  newProduct: any;
  nameErrorMessage: any;
  priceErrorMessage: any;
  qtyErrorMessage: any;
  constructor( 
    private _router: Router,
    private _productService: ProductService) { }

  ngOnInit() {
    this.newProduct = { name: "", price: "", qty: ""}
  }
  onNewProductSubmit(){
    let obs= this._productService.addProduct(this.newProduct);
    obs.subscribe( data => {
      this.nameErrorMessage ="";
      this.priceErrorMessage ="";
      this.qtyErrorMessage = "";
      if(data['status']){
        console.log("SUCCESSS")
      }else {
        console.log("ERROR")
        console.log(data)
        if(data['err']['errors']['name']){
          this.nameErrorMessage = data['err']['errors']['name']['message'];
        }
        if(data['err']['errors']['price']){
          this.priceErrorMessage = data['err']['errors']['price']['message'];
        }
        if(data['err']['errors']['qty']){
          this.qtyErrorMessage = data['err']['errors']['qty']['message'];
        }
      }
      console.log("+++++ WE ADDED A NEW PRODUCT +++++", data)
    
    });
    this.newProduct = { name: "", price: "", qty: ""}
  }
  cancelCreate() {
    this.newProduct = { name: '', price: 0, qty: '' };
    this._router.navigate(['/']);
  }
}
