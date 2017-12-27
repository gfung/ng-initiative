import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular.io Initiative Tracker';
  id=0;
  name: string;
  init: number;
  hp: number;
  notes: string;
  hpChange= [0];
  public list: object[] = [];
  data = new MatTableDataSource(this.list)

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
      id:this.list.length+1,
      hp:this.hp,
      notes:this.notes
    });
    this.hpChange.push(0)
    this.data = new MatTableDataSource(this.list)
  }
  next():void{
    let temp = this.list[0]
    this.list.splice(0,1)
    this.list.push(temp)
    this.data = new MatTableDataSource(this.list)
  }
  sort():void {
    if (this.list.length > 1){
      this.list.sort((a,b)=>{
        if(a['init'] > b['init']){return -1}
        if(a['init'] < b['init']){return 1}
        return 0
      })
      for (let i = 0;i < this.list.length;i++){
        this.list[i]['id'] = i+1
      }
    }
    this.data = new MatTableDataSource(this.list)
  }
  remove(data):void{
    let arrLength = this.list.length
    let theOne;
    for (let i = 0;i < arrLength;i++){
      if(this.list[i]['id'] === data){
        theOne=i
      }
    }
    this.list.splice(theOne,1);
    for (let i = 0;i < this.list.length;i++){
      this.list[i]['id'] = i+1
    }
    this.data = new MatTableDataSource(this.list)
  }
}
