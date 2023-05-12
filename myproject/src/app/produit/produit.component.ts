
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';


// interface Produit {
 
//   nom: string;
//   prix: number;
  
// }

// @Component({
//   selector: 'app-produit',
//   templateUrl: './produit.component.html',
//   styleUrls: ['./produit.component.css']
// })
// export class ProduitComponent implements OnInit {

//   produits: Produit[] = [];

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     this.http.get<Produit[]>('http://localhost:3008/produits').subscribe(
//       (response) => {
//         this.produits = response;
//       },
//       (error) => {
//         console.error('An error occurred while fetching the products:', error);
//       }
//     );
//   }

//   add(): void {
//     this.router.navigate(['/addproduit']);
//   }
  

// }




import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Produit {
  idproduit: number;
  nom: string;
  prix: number;
}

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: Produit[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.http.get<Produit[]>('http://localhost:3008/produits').subscribe(
      (response) => {
        this.produits = response;
      },
      (error) => {
        console.error('An error occurred while fetching the products:', error);
      }
    );
  }

  add(): void {
    this.router.navigate(['/addproduit']);
  }

  delete(idproduit: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:3008/produit/${idproduit}`).subscribe(() => {
        this.loadProduits();
      });
    }
  }
  

}

