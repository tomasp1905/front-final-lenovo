import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'estado',
    pure: false
})
export class ProyectoEstadoPipe implements PipeTransform {
    transform(items: any[]): any {
        console.log(items);
        return items.filter(item => item.estado == true);
    }
}