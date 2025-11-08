import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from './helpers/autenticacao.js';
import { pegarBaseURL } from './utils/variaveis.js';
const postRegistroProduto = JSON.parse(open('./fixtures/postRegistroProduto.json'));

//Tipos de teste usando Stages: AVERAGE
export const options = {
     stages: [
        { duration: '30s', target: 50 },
        { duration: '60s', target: 50 },
        { duration: '30s', target: 0 }    
      ],

  //iterations: 1,
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<50000'],
    http_req_failed: ['rate<0.01']
  }
};

export default function() {

  const token = obterToken()

  const url = pegarBaseURL() + '/products';
  
  const bodyRegistroProduto = { ...postRegistroProduto};
  
  const payload = JSON.stringify(bodyRegistroProduto);

 const params = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        },
    };


  let res = http.post(url, payload, params);

  check(res, {
    "Status é 201": (res) => res.status === 201,

  });

  sleep(1);
}
