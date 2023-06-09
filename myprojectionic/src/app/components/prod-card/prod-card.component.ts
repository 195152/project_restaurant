import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prod-card',
  templateUrl: './prod-card.component.html',
  styleUrls: ['./prod-card.component.css'],
})
export class ProdCardComponent {
  @Input() produit: any;
  quantity = '1';
  onSelected(value: string): void {
    this.quantity = value;
  }
  addCommand(id: any): void {
    console.log(id);
    var user = localStorage.getItem('user');

    if (user) {
      var usertemp = JSON.parse(user).commands.append(id);
      localStorage.setItem('user', usertemp);
    }
  }
}
