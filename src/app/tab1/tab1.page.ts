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
console.log(JSON.parse(localStorage.getItem('onlyproducts') || '{}'))
    this.cartService.loadCart();
    this.upcdata = this.cartService.getItems();
  console.log(this.ordertype)
  this.getallitems()
  this.getall()
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
     /* var first = result.filtereddata.find((obj: any) => {
        return obj
      });

      var id=first._id
      let index:number =-1
       this.itemsCart = JSON.parse(localStorage.getItem('array') || '{}')
      for(let i=0;i<this.itemsCart.length;i++){
        if(id === this.itemsCart[i]._id){
          this.itemsCart[i].productQuantity =first.productQuantity
          index =i;
          break;
        }

      }
      if(index == -1){
        this.itemsCart.push(first);
        localStorage.setItem('array',JSON.stringify(this.itemsCart))
      }else{
        localStorage.setItem('array',JSON.stringify(this.itemsCart))
      }*/
      
        const isdata = localStorage.getItem('array')
      if(isdata == null){
        const newarray =[]

        var first = result.filtereddata.find((obj: any) => {
          return obj
        });

        this.itemdetails.push(first)
        newarray.push(first)
        console.log(newarray)
        localStorage.setItem("array",JSON.stringify(newarray))
      }else{
        const olddata = JSON.parse(isdata)
        var firsts = result.filtereddata.find((obj: any) => {
          return obj
        });
        
      var id=firsts._id
      let index:number =-1
       //this.itemsCart = JSON.parse(localStorage.getItem('array') || '{}')
      for(let i=0;i<olddata.length;i++){
        if(id === olddata[i]._id){
          olddata[i].productQuantity += 1
          index =i;
          break;
        }
      }
      for(let i=0;i<this.itemdetails.length;i++){
        if(id === this.itemdetails[i]._id){
          this.itemdetails[i].productQuantity += 1
          index =i;
          break;
        }
      }
      if(index == -1){
       
        olddata.push(firsts)
        this.itemdetails.push(firsts)
        localStorage.setItem('array',JSON.stringify(olddata))
      }else{
        localStorage.setItem('array',JSON.stringify(olddata))
      }
       /* this.itemdetails.push(firsts)
        console.log(this.itemdetails)
        olddata.push(firsts)
        localStorage.setItem("array",JSON.stringify(olddata))*/
      }

}
localStorage.setItem("onlyproducts",JSON.stringify(this.itemdetails))
this.getall()
 
      }).catch( error =>console.log(error));
   
 }

  getall(){
    const isData = JSON.parse(localStorage.getItem("array") || '{}')
    console.log(isData)
    if(isData !== null){
      
      this.itemsCart =isData
      
    }
 
           //grand  total for all product in itemcart
           this.grandsum=0;
           this.itemsCart.map((a:any)=>{
            console.log(a.price)
            this.grandsum += a.price * a.productQuantity
    
           })
    
         //grand discountPrice total for all product in itemcart
           this.granddiscountprice=0;
           this.itemsCart.map((a:any)=>{
            this.granddiscountprice += a.discountPrice * a.productQuantity
            
           })
    
    
           
    //grand tax total for all product in itemcart
    this.grandtax=0;
    this.itemsCart.map((a:any)=>{
     this.grandtax += a.tax * a.productQuantity
     
    })


   // adding tax to subtotal amount and remove discount price
       var partial =this.grandsum + this.grandtax
      
       this.OrderTotal = partial - this.granddiscountprice
         return this.grandsum
  }




/*alladdedproduct(){
 if(localStorage.getItem('addproducts') != null){

  var addedproducts = JSON.parse(localStorage.getItem('addproducts') || '{}');
  this.alladdedproducts = addedproducts;
  console.log(this.alladdedproducts)

}else{
alert('not added')
}
}*/


removeDocument(item:any){
  const isData = JSON.parse(localStorage.getItem("array") || '{}')


for(let i=0;i<this.itemsCart.length;i++){
  var match=this.itemsCart[i]
}


if(item.id === match.id){

  let index =this.itemsCart.findIndex((element: { _id: any; }) => element._id == item._id)
console.log(index)
 this.itemsCart.splice(index, 1)

 this.grandsum=0;
 this.itemsCart.map((a:any)=>{
  this.grandsum += a.price

 })
 

   //grand discountPrice total for all product in itemcart
   this.granddiscountprice=0;
   this.itemsCart.map((a:any)=>{
    this.granddiscountprice += a.discountPrice * a.productQuantity
    
   })

     
//grand tax total for all product in itemcart
this.grandtax=0;
this.itemsCart.map((a:any)=>{
this.grandtax += a.tax

})


// adding tax to subtotal amount and remove discount price
 var partial =this.grandsum + this.grandtax

 this.OrderTotal = partial - this.granddiscountprice


  localStorage.setItem("array",JSON.stringify(this.itemsCart))
  return this.grandsum

}else{
  console.log('Something went wrong')
}

}



 deleteitem(){
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

    //grand  total for all product in itemcart
    this.grandsum=0;
    this.itemsCart.map((a:any)=>{
     console.log(a.price)
     this.grandsum += a.price * a.productQuantity

    })

    
         //grand discountPrice total for all product in itemcart
         this.granddiscountprice=0;
         this.itemsCart.map((a:any)=>{
          this.granddiscountprice += a.discountPrice * a.productQuantity
          
         })
  
  
         
  //grand tax total for all product in itemcart
  this.grandtax=0;
  this.itemsCart.map((a:any)=>{
   this.grandtax += a.tax * a.productQuantity
   
  })


 // adding tax to subtotal amount and remove discount price
     var partial =this.grandsum + this.grandtax
    
     this.OrderTotal = partial - this.granddiscountprice

     localStorage.setItem('array',JSON.stringify(this.itemsCart))
       return this.grandsum
  //this.totalsum()

 }
 plus(inc:any){
  if(inc.productQuantity!=20){
    inc.productQuantity += 1;
    }
      //grand  total for all product in itemcart
      this.grandsum=0;
      this.itemsCart.map((a:any)=>{
       console.log(a.price)
       this.grandsum += a.price * a.productQuantity
       localStorage.setItem('array',JSON.stringify(this.itemsCart))
      })

         //grand discountPrice total for all product in itemcart
         this.granddiscountprice=0;
         this.itemsCart.map((a:any)=>{
          this.granddiscountprice += a.discountPrice * a.productQuantity
          
         })
  
  
         
  //grand tax total for all product in itemcart
  this.grandtax=0;
  this.itemsCart.map((a:any)=>{
   this.grandtax += a.tax * a.productQuantity
   
  })


 // adding tax to subtotal amount and remove discount price
     var partial =this.grandsum + this.grandtax
    
     this.OrderTotal = partial - this.granddiscountprice
       return this.grandsum
    //this.totalsum()
 }


 confirmorder(){
  const onlyproducts=JSON.parse(localStorage.getItem('onlyproducts') || '{}')
  
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
OrderItems:[]=onlyproducts

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

  localStorage.removeItem('array');
  localStorage.removeItem('onlyproducts');
 }

}
