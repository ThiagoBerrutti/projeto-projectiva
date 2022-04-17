import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cpfFormat'
})
export class CpfFormatPipe implements PipeTransform
{
    transform(value: string | number): string
    {
        if (value === null)
        {
            return "";
        }

        let newValue = value + "";

        // newValue = newValue.substring(0, 3) +
        //     (newValue.length < 3 ? "" : "." + newValue.substring(3, 6) +
        //         (newValue.length < 6 ? "" : "." + newValue.substring(6, 9) +
        //             (newValue.length < 9 ? "" : "-" + newValue.substring(9))
        //         )
        //     );
        // let newValue = value + "";

        // newValue = newValue
        //     //.padStart(11, '')                  // item 1
        //     //.substring(0, 11)                   // item 2
        //     .replace(/[^0-9]/, '')              // item 3
        //     .replace(                           // item 4
        //         /(\d{3})(\d{3})(\d{3})(\d{2})/,
        //         '$1.$2.$3-$4');
        newValue = newValue
            .replace(/[^\d]/g, '')
            .slice(0, 11)

            .replace(/((\d{3}(?!\.)(?=\d)))/, '$1.')
            .replace(/((\d{3}(?!\.)(?=\d)))/, '$1.')
            .replace(/((\d{3}(?!\.)(?=\d)))/, '$1-')


        return newValue;


    }

}
