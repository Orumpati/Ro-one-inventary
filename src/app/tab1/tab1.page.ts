import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CartService } from "../cart.service";
//import { CurrencyPipe } from "@angular/common";
interface ICountry {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    // @ViewChildren('myitems') subTotalItems: QueryList<ElementRef>;
    @ViewChildren("subTotalWrap") subTotalItems!: QueryList<ElementRef>;
    @ViewChildren("subTotalWrap_existing") subTotalItems_existing!: QueryList<
      ElementRef
    >;
  alladdedproducts=[]
  upcdata:any;
  allupcdata:any;
upcnumber:any
storedproducts:any
getdata:any =[];
grandsum:any
discountprice:any;
tax:any;
OrderTotal:Number | undefined
granddiscountprice:any
grandtax:any
iterate:any
OrderTime:any
currenttime:any
ordertype: any;
itemdetails:any=[]
  constructor(private http: HttpClient,private datepipe:DatePipe,public cartService: CartService,) {
     this.OrderTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.currenttime =this.datepipe.transform((new Date), ' h:mm:ss');
    console.log(this.OrderTime);
    console.log(this.currenttime)
   }
  ngOnInit() {

    this.cartService.loadCart();
    this.upcdata = this.cartService.getItems();
  console.log(this.ordertype)
  this.getallitems()
//this.alladdedproduct()

  }
  //get all items 
  getallitems(){
  fetch('http://localhost:9000/ProductRoutes/AllProducts', {
    method: 'GET',
    headers:{
         'Content-Type':'application/json',
        
    }
}).then(res => res.json()).then(result => 
  {

        this.allupcdata=result.product;
      
        console.log(this.allupcdata);

}
 ).catch(
    error =>console.log(error)
     
);
 }

 //this global array will store the products get from the localstorage
 itemsCart:any = [];
 localarray:any=[]
 items:any=[]
  //get products  by upc number
  getitembyupc(){
    
  fetch('http://localhost:9000/ProductRoutes/search/'+this.upcnumber, {
    method: 'GET',
    headers:{
         'Content-Type':'application/json',
        
    }
}).then(res => res.json()).then(result => 
  
  {
    console.log(result)

    if(result.filtereddata == ''){
      alert('no product available ')
    }else{

        this.upcdata=result.filtereddata;
        this.itemdetails.push(this.upcdata)
        console.log(this.upcdata);
     
        var first = this.upcdata.find((obj: any) => {
          return obj
        });


         this.localarray.push(first)
        localStorage.setItem('array',JSON.stringify(this.localarray))
       var all = JSON.parse(localStorage.getItem('array') || '{}')
       console.log(all)

       //for loop to get the  arrays in localstorage
       for(var i = 0;i<all.length;i++) { 
        var single=all[i]
         this.discountprice =all[i].discountPrice
        this.tax = all[i].tax
        console.log(single)
     }

     //storing get array from the single and store it in itemsCart
       this.itemsCart.push(single)
       console.log(this.itemsCart)

       //grand  total for all product in itemcart
       this.grandsum=0;
       this.itemsCart.map((a:any)=>{
        this.grandsum += a.price
        console.log(this.grandsum)
       })

//grand discountPrice total for all product in itemcart
       this.granddiscountprice=0;
       this.itemsCart.map((a:any)=>{
        this.granddiscountprice += a.discountPrice
        console.log(this.granddiscountprice)
       })


       
//grand tax total for all product in itemcart
this.grandtax=0;
this.itemsCart.map((a:any)=>{
 this.grandtax += a.tax
 console.log(this.grandtax)
})


//adding tax to subtotal amount and remove discount price
       var partial =this.grandsum + this.grandtax
       console.log(partial)
       this.OrderTotal = partial - this.discountprice
         
   
       return this.grandsum
}
   /*     const sum = this.itemsCart.map((item: { price: Number; }) => {
        item.price === 
      })
       .reduce((sum, current) => sum + current.total, 0); */
       /*for(var i = 0;i<this.itemsCart.length;i++) { 
        this.getdata=this.itemsCart[i]
        console.log(this.getdata)
     }*/
       
                /*if(cartnull == null){
          //let storedproducts:any=[];
          
          this.itemsCart.push(this.upcdata)
          console.log(this.itemsCart)
          localStorage.setItem('addproducts',JSON.stringify(this.itemsCart))
        }else{
        
          var id = result._id;
          let index:number = -1;
          
          this.itemsCart = JSON.parse(localStorage.getItem('addproducts') || '{}');
       
    for(let i=0; i<this.itemsCart.length; i++){
    if(parseInt(id) === parseInt(this.itemsCart[i]._id))
    {
   /*this.itemsCart[i].productQuantity = result.productQuantity; index = i;
              break;*/
              /*alert("alreay added")
            }
          }
          if(index == -1){
    this.itemsCart.push(this.upcdata);
            localStorage.setItem
    ('addproducts', JSON.stringify
    (this.itemsCart));
          }
          else{
            localStorage.setItem
    ('addproducts', JSON.stringify
    (this.itemsCart));
          }
        }*/
      
        


      }).catch(
    error =>console.log(error)
     
);
   
 }

 get total() {
  return this.upcdata.reduce(
    (sum:any, x:any) => ({
      productQuantity: 1,
      price: sum.price + x.productQuantity * x.price
    }),
    { productQuantity: 1, price: 0 }
  ).price;
}


/*changeSubtotal(item:any, index:any) {
  const qty = item.productQuantity;
  const amt = item.price;
  const subTotal = amt * qty;
 const subTotal_converted = this.currencyPipe.transform(subTotal, "USD");

  this.subTotalItems.toArray()[
    index
  ].nativeElement.innerHTML = subTotal_converted;
  this.cartService.saveCart();
}*/



  //----- remove specific item
  removeFromCart(item:any) {
    this.cartService.removeItem(item);
    this.upcdata = this.cartService.getItems();
  }

  //----- clear cart item
  clearCart(items:any) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.upcdata = [...this.cartService.getItems()];
  }

  //----- add item to cart
  addToCart(item:any) {
   /* if (!this.cartService.itemInCart(this.upcdata)) {
      this.upcdata.productQuantity = 1;
      this.cartService.addToCart(this.upcdata); //add items in cart
      this.upcdata = [...this.cartService.getItems()];
    }*/
  }
 /*totalsum(){
  this.grandsum=0;
  this.itemsCart.map((a:any)=>{
   this.grandsum += a.price
   console.log(this.grandsum)
  })
  return this.grandsum
 }*/
alladdedproduct(){
 if(localStorage.getItem('addproducts') != null){

  var addedproducts = JSON.parse(localStorage.getItem('addproducts') || '{}');
  this.alladdedproducts = addedproducts;
  console.log(this.alladdedproducts)

}else{
alert('not added')
}
}


removeDocument(){
  console.log('ghj')
  for(let i=0; i<this.itemsCart;i++){
    var full =this.itemsCart[i]
    var docid =this.itemsCart[i]._id
    console.log(full)
  }

  this.itemsCart.forEach( (item: any, index: any) => {
    if(item._id === docid) this.itemsCart.splice(index,1);
  });
}
 deleteitem(){

  for(let i=0; i<this.itemsCart;i++){
    var full =this.itemsCart[i]
    var docid =this.itemsCart[i]._id
    console.log(full)
  }

  fetch('http://localhost:9000/ProductRoutes/upcproduct/'+this.upcnumber, {
    method: 'DELETE',
    headers:{
         'Content-Type':'application/json',
        
    }
}).then(res => res.json()).then(result => 
  {
    this.getallitems()
  
        console.log(result);
       
      

}
 ).catch(
    error =>console.log(error)
     
);
 }

 minus(data:any){
  if(data.productQuantity!=1){
  data.productQuantity -= 1;
  }
  //this.totalsum()

 }
 plus(inc:any){
  if(inc.productQuantity!=20){
    inc.productQuantity += 1;
    }
    //this.totalsum()
 }


 confirmorder(){

  
 var  data ={
  OrderId:'',
OrderTime:this.OrderTime,
OrderType:'',
StoreNo:'',
EmployeeId:'',
PaymentType:'',
CustomerName:'',
CustomerId:'',
OrderTotal:this.OrderTotal,
TotalItems:this.itemsCart.length,
OrderStatus:'',
StoreAddress:'',
StorePhoneNumber:'',
OrderItems:[]=this.itemdetails 

  }
  console.log(data)
  fetch('http://localhost:9000/order/postorder',{
    method: 'POST',
    headers:{
         'Content-Type':'application/json',
        
    },
    body:JSON.stringify(data),
}).then(res => res.json()).then(result => 
  
  {
    console.log(result)
  })
 }

}
