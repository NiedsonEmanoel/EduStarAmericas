'''
Implementação de Solicitações em Python para a API de correção TRI em R.
Niedson Emanoel <contato@niedsonemanoel.com.br> - 22/01/2024
'''

from urllib.parse import urlencode
import requests
import json

from pydantic import validate_call


@validate_call
def link_tri_api_parser(a: list[float], b: list[float], c: list[float], re: list[int]) -> str:
    base_url = "http://r.api.enemaster.app.br/tri"
    try:
        params = {
            'a': ', '.join(map(str, a)),
            'b': ', '.join(map(str, b)),
            'c': ', '.join(map(str, c)),
            're': ', '.join(map(str, re))
        }
        
        encoded_params = urlencode(params, safe=', ')
        
        serialized_url = f"{base_url}?{encoded_params}"
        
        return serialized_url
    except Exception as inst:
        print(inst)

@validate_call
def tri_caller_api_R(a: list[float], b: list[float], c: list[float], re: list[int]) -> dict[str, int | dict]:
    """
    Recebe a lista de parâmetros(a, b e c) e a de respostas e corrige via RStudio

    - **a**: Lista dos parâmetros A dos itens
    - **b**: Lista dos parâmetros B dos itens
    - **c**: Lista dos parâmetros C dos itens
    - **re**: Matriz de resposta do candidato [0, 1 ... 1, 0]

    - **return (Fictício) **: {
            'nota' : 680.5,
            'nota_max' : 720,
            'nota_min' : 322
        }
    """
    try:
        url = link_tri_api_parser(a, b, c, re)
        # Fazer a solicitação HTTP
        response = requests.get(url)

        # Analisar a resposta JSON
        data = json.loads(response.text)

        finalProd = {
            'nota' : data['nota'][0],
            'nota_max' : data['nota_max'][0],
            'nota_min' : data['nota_min'][0]
        }

        return {
            'status': 1,
            'product': finalProd
        } 
    
    except:
        return {
            'status': 0,
            'product': {}
        } 

example = {
    'a' : [1.63948, 2.872, 1.56585, 3.92803],
    'b' : [3.22867, 0.87565, -0.12884, 1.08796],
    'c' : [0.14221, 0.15092, 0.20389, 0.09238],
    're' : [1,1,1,1]
}

tri_caller_api_R(**example)
