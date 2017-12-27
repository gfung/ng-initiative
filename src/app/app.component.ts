import { Component } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Initiative Tracker';
  id=0;
  name: string;
  init: number;
  hp: number;
  notes: string;
  hpChange= [];
  public list: object[] = [];

  heal(person, index):void{
    person.hp += this.hpChange[index]
  }

  damage(person,index):void{
    person.hp -= this.hpChange[index]
  }

  add(): void {
    this.list.push({
      name:this.name, 
      init:this.init, 
      id:this.id,
      hp:this.hp,
      notes:this.notes
    });
    this.id++;
    this.hpChange.push(0)
  }
  next():void{
    let temp = this.list[0]
    this.list.splice(0,1)
    this.list.push(temp) 
  }
  sort():void {
    if (this.list.length > 1){
      this.list.sort((a,b)=>{
        if(a['init'] > b['init']){return -1}
        if(a['init'] < b['init']){return 1}
        return 0
      })
    }
  }
  remove(data):void{
    let arrLength = this.list.length
    for (let i = 0;i < arrLength;i++){
      if(this.list[i]['id'] === data){
        this.list.splice(i,1)
        break;
      }
    }
  }
}
