import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'timeStampToDate'})
export class TimeStampToDate implements PipeTransform {
  transform(value: number): string {
        var date = new Date(value);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        var day = date.getDate();
        
        return `${day}/${month}/${year}`;
    }
  }