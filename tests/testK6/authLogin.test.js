import http from 'k6/http';
import { sleep, check } from 'k6';
import { pegarBaseURL } from './utils/variaveis.js'
const postLogin = JSON.parse(open('./fixtures/postLogin.json'))

//Tipos de teste usando Stages: SHORT
export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '5s', target: 0 }
  ],
  //iterations: 1,
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<50000'],
    http_req_failed: ['rate<0.01']
  }
};

    export default function () {
    const url = pegarBaseURL() + '/auth/login';

    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Status é 200': (r) => r.status === 200,
        //valida que o token que está no json (consultamos en Swagger) é string 
        'Token é string': (r) => typeof(r.json().token) == 'string'
    })

    sleep(1);

    }