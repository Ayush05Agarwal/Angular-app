import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-test',
  template: `
  <h2>
   <div [ngClass]="sclasses">
  <h2>{{greetUser()}}</h2>
  </div>
  </h2>
  <button (click)="onClick()">GREET</button>
  
  <input #ip type="text">
  <button (click)="butt(ip.value)">GREET</button>
  {{greeting}}
  
  <input [(ngModel)]="name" type="text">
  {{name}}

  <div>
  <div *ngIf="displayname ; then tb ; else eb"></div>
  <ng-template #tb>
  <h2>name is {{displayname}}</h2>
  </ng-template>
  <ng-template #eb>
  <h2>name is {{displayname}}</h2>
  </ng-template>
  </div>
  
  <div ngSwitch="{{name}}">
  <div *ngSwitchCase="'red'">YOU PICKED RED COLOR</div>
  <div *ngSwitchCase="'blue'">YOU PICKED BLUE COLOR</div>
  <div *ngSwitchCase="'orange'">YOU PICKED ORANGE COLOR</div>
  <div *ngSwitchDefault>PICK A VALID COLOUR</div>
  </div>

  <div *ngFor="let car of cars;odd as o">
  <h2>{{o}} {{car}}</h2>
  </div>

  <div>
  <h2>{{pD}}</h2>
  </div>

  <button (click)="fireevent()">SEND EVENT</button>
  <div>
  <h2>{{t | lowercase}}</h2>
  </div>

  <div>
  <h2>{{date | date:'shortDate'}}</h2>
  </div>
  <div>
  <h2>{{date | date:'shortTime'}}</h2>
  </div>

  `,
  styles: [`
  .text-success{
    color:red;
  }
  .text-danger{
    color:blue;
  }
  .text-safe{
    font-style:italic;
  }

  `]
})
export class TestComponent implements OnInit {
  public name="";
  @Input('parentData') public pD ;
  displayname="false";
  public t="IT IS IN UPPERCASE";
  public successclass="text-success";
  @Output() public childEvent=new EventEmitter();
  public greeting="";
  public date=new Date();

  public cars=["a","b","c","d"];
  public sclasses={
    "text-success": true,
    "text-danger":false,
    "text-safe": true
  };
  fireevent(){
    this.childEvent.emit("HEY CODE FOSTER");
  }
  greetUser(){
    return "hello "+ this.name;
  }
  onClick(){
    this.greeting="welcome to shah";
  }
  constructor() { }
  butt(value)
  {
    console.log(value);
  }
  ngOnInit() {
  console.log(this.date);
  }

}
