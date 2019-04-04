import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchQcConfigFilter'
})
export class SearchQcConfigFilterPipe implements PipeTransform {

    transform(value: any, searchText: string): any {
        if (!value || !searchText) {
            return value;
        }
        return value.filter(item => {
            if (item.config_name.toLocaleUpperCase().includes(searchText.toLocaleUpperCase())) {
                return true;
            }
            return false;
        });

    }

}
