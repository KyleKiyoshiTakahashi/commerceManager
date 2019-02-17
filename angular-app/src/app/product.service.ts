import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) {

   }
  getProducts(){
    return this._http.get('/api/products')
  }
  addProduct(product){
     return this._http.post('/api/products', product)
  }
  editProductById(id){
    return this._http.get('/products/'+id+"/edit")
  }
  editProduct(id, data){
    return this._http.put('/api/products/'+id, data);
  }
  deleteProductById(id){
    return this._http.delete('/api/delete/'+id)
  }
}

