import { Component } from '@angular/core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent {

  ngOnInit() {
    //   const promesa = new Promise((resolve, reject) => {

    //     if (false) {
    //       resolve('HOLA MUNDO');
    //     } else {
    //       reject('Algo salio mal')
    //     }

    //   })

    //   promesa.then((mensaje) => {
    //     console.log(mensaje);
    //   })
    //     .catch(err => console.log('Erroe en mi promesa', err))

    //   console.log('Fin init');

    this.getUsuarios().then(usuario => {
      console.log(usuario);
    })


  }

  getUsuarios() {

    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then((res) => res.json())
        .then(body => resolve(body.data))

    });
    return promesa
  }
}
