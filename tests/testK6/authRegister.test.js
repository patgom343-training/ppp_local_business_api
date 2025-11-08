  import http from 'k6/http';
  import { sleep, check } from 'k6';
  import { pegarBaseURL } from './utils/variaveis.js';
  const { gerarUsuario } = require('./helpers/usuariosRandom.js');

//Tipos de teste usando Stages: Breakpoint
export const options = {
    stages: [
      { duration: '250s', target: 1000 },
    ],

      //iterations: 1,
      thresholds: {
        http_req_duration: ['p(90)<3000', 'max<50000'],
        http_req_failed: ['rate<0.01']
      }
    };
  

  export default function() {

    const novoUsuario = gerarUsuario();

    const url = pegarBaseURL() + '/auth/register';

    const payload = JSON.stringify(novoUsuario);

      const params = {
          headers: {
          'Content-Type': 'application/json',
          },
      };


    let res = http.post(url, payload, params);
    
    //console.log(JSON.stringify(res.json(), null, 2));
    check(res, {
      "Status é 201": (res) => res.status === 201,
    });

    sleep(1);
  }
