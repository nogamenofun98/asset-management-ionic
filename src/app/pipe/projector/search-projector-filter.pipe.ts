import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchProjectorFilter'
})
export class SearchProjectorFilterPipe implements PipeTransform {

    transform(value: any, searchText: string): any {
        if (!value || !searchText) {
            return value;
        }
        return value.filter(item => {
            if (item.projector_label.toLocaleUpperCase().includes(searchText.toLocaleUpperCase())) {
                return true;
            }
            if (item.model.toLocaleUpperCase().includes(searchText.toLocaleUpperCase())) {
                return true;
            }
            if (item.serial_number.toLocaleUpperCase().includes(searchText.toLocaleUpperCase())) {
                return true;
            }
            return false;
        });

    }

}
