import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice',
  imports: [FormsModule],
  templateUrl: './practice.html',
  styleUrl: './practice.css',
})
export class Practice {

  imgURL:string = "https://www.carscoops.com/wp-content/uploads/2020/05/bugatti-chiron-pur-sport-0-1.jpg";
  isActive:boolean=true;
  mail:string='';
  signal2 = signal<number>(1);
  number:WritableSignal<number> = signal<number>(0);
  multiple= computed(()=>this.number()*2);

  constructor(){
    effect(()=>{
      this.number()
      console.log("this Effect is Executed on the render & change in signal 1");
    });

    effect(()=>{
      this.signal2();
      console.log("this Effect is Executed on the render & change in signal 2");
    });
  }

  updateSignal(){
    this.number.update(prev=>prev+1);
  }
  handleInput(event:Event){
    this.mail = (event.target as HTMLInputElement).value;
  }

  incrementSignal2(){
    this.signal2.update(prev => prev+prev);
  }
  
  handleNormVarIncre(){};
  clickHandler(event:Event):void{
    console.log("click event occurred there");
    console.log(event);
  }
  ngOnInit(){
    console.log("This component is rendered");
  }
  ngOnDestroy(){
    console.log("Practice component have Destroyed automatically");
  }
}
