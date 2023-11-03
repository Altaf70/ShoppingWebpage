import { Component, OnInit } from '@angular/core';
import { Products } from './ProductsInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public cartitemscount:number = 0;
  public categories:string[] = [];
  public products:Products[] = [];
  public cartitems:Products[] = [];
  public cartitemVisible:boolean = false;
  public total:number = 0;

  public LoadCategories():void{
    fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data =>{
      data.unshift("all");
      this.categories = data;
    })
  }

  public GetProduct(url:string):void{
    fetch(url)
    .then(res => res.json())
    .then(data =>{
      this.products = data;
    })
  }

  public GetItemsCount():void{
    this.cartitemscount = this.cartitems.length;
  }

  ngOnInit():void{
    this.LoadCategories();
    this.GetProduct('https://fakestoreapi.com/products');
    this.GetItemsCount();
  }

  public GetCategories(name:string):void{
    if(name == 'all'){
      fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data=>{
        this.products = data;
      })
    }
    else if(name == 'mens'){
      fetch(`https://fakestoreapi.com/products/category/men's clothing`)
      .then(res => res.json())
      .then(data =>{
        this.products = data;
      })
    }
    else if(name == 'womens'){
      fetch(`https://fakestoreapi.com/products/category/women's clothing`)
      .then(res => res.json())
      .then(data =>{
        this.products = data;
      })
    }
    else{
      fetch(`https://fakestoreapi.com/products/category/${name}`)
      .then(res => res.json())
      .then(data =>{
        this.products = data;
      })
    }
  }
  addCart(id:number):void{
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data =>{
      this.cartitems.push(data);
      this.GetItemsCount();
      this.total += data.price;
    });
  };

  showCart():void{
    this.cartitemVisible =(this.cartitemVisible == false?true:false);
    this.GetItemsCount();
  }

  delCart(i:number,p:number):void{
    this.cartitems.splice(i,1);
    this.GetItemsCount();
    this.total=this.total- p;
  }
};