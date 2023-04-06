import { Component } from '@angular/core';
import { Observable, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {


  constructor() {

    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(valor => console.log('Subs', valor),
    //   (error) => console.log('error:', error),
    //   () => console.log('Obs terminado'))

    this.retornaIntervalo()
      .subscribe((res) => {
        console.log(res);
      })
  }

  retornaIntervalo() {
    const intervalo$ = interval(1000).pipe(
      take(4),
      map(res => {
        return res + 1
      })
    )

    return intervalo$
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {


      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego a 2')
        }
      }, 1000)
    });

    return obs$
  }
}
