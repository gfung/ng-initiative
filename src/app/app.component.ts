import {Component} from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
  title = 'Angular.io D20 Initiative Tracker';
  id = 0;
  name: string;
  init: number;
  hp: number;
  notes: string;
  hpChange = [0];
  acChange = [0];
  maxhp: number;
  ac: number;
  pPerc: number;
  public list: object[] = [];
  data = new MatTableDataSource(this.list);
  addTo(person, index, stat): void {
    person[stat] += this[stat + 'Change'][index];
    this[stat + 'Change'][index] = 0
  }
  minusTo(person, index, stat): void {
    person[stat] -= this[stat + 'Change'][index];
    this[stat][index] = 0
  }
  add(): void {
    let tempUser = {
      name: this.name,
      init: this.init,
      id: this.list.length + 1,
      hp: this.hp,
      maxhp: this.maxhp,
      notes: this.notes,
      ac: this.ac,
      perc: this.pPerc,
    };
    this.acChange.push(0)
    this.hpChange.push(0);
    this.list.push(tempUser)
    let current = this.list[0];
    this.sort()
    // get the index of who was current
    let remember;
    for (let i = 0; i < this.list.length; i++) {
      if (current['id'] === this.list[i]['id']) {
        remember = i
      }
    }
    for (let i = 0; i < remember; i++) {
      this.next()
    }
    this.data = new MatTableDataSource(this.list);
    this.name = '';
    this.init = 0;
    this.hp = 0;
    this.notes = '';
    document.getElementById('name').focus();
  }
  next(): void {
    let temp = this.list[0];
    this.list.splice(0, 1);
    this.list.push(temp);
    this.data = new MatTableDataSource(this.list)
  }
  sort(): void {
    if (this.list.length > 1) {
      this
        .list
        .sort((a, b) => {
          if (a['init'] > b['init']) {
            return -1
          }
          if (a['init'] < b['init']) {
            return 1
          }
          return 0
        })
      for (let i = 0; i < this.list.length; i++) {
        this.list[i]['id'] = i + 1
      }
    }
    this.data = new MatTableDataSource(this.list)
  }

  confirmDelete(id): void {
    document.getElementById('remove'+id).classList.remove('confirm');
    document.getElementById('cancel'+id).classList.remove('confirm');
    document.getElementById('confirm'+id).classList.add('confirm');
  }

  hide(): void {
    document.getElementById('remove').classList.add('confirm');
    document.getElementById('cancel').classList.add('confirm');
    document.getElementById('confirmbutton').classList.remove('confirm');
  }

  remove(data): void {
    const arrLength = this.list.length;
    let theOne;
    for (let i = 0; i < arrLength; i++) {
      if (this.list[i]['id'] === data) {
        theOne = i
      }
    };
    this.list.splice(theOne, 1);
    for (let i = 0; i < this.list.length; i++) {
      this.list[i]['id'] = i + 1
    };
    this.data = new MatTableDataSource(this.list);
  }
}
