import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from './helpers/autenticacao.js';
import { pegarBaseURL } from './utils/variaveis.js';
const postRegistroBusiness = JSON.parse(open('./fixtures/postRegistroBusiness.json'));

export const options = {

  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<50000'],
    http_req_failed: ['rate<0.01']
  },
  iterations: 50,
};

export default function() {

  const token = obterToken()

  const url = pegarBaseURL() + '/business/businesses';
  
  const bodyRegistroBusiness = { ...postRegistroBusiness};
  
  const payload = JSON.stringify(bodyRegistroBusiness);

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
