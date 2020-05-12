## API Crawler Mercado Livre

Instalar
```
npm install
```

Iniciar
```
npm run start

O sistema irá iniciar na url http://127.0.0.1:3001.
```

Rotas
```

POST : http://127.0.0.1:3000/pesquisar
	|_ Pesquisar produtos no mercado livre
    |_ Exemplo dados entrada:
    |   {
	|       "search": "bike",
	|       "limit": "10"
    |   }
	|
	|_ Exemplo retorno:
	|	[{
	|		"name": "Bicicleta Xks Aro 29 Alumínio Freio A Disco 21v Kit Shimano",
	|		"link": "https://produto.mercadolivre.com.br/MLB-1164618416-bicicleta-xks-aro-29-aluminio-freio-a-disco-21v-kit-shimano-_JM#position=5&type=item&tracking_id=df77ca51-1b2e-4b5c-829f-d2e0dd0f2617",
	|		"price": 989,
	|		"store": "Alfameq",
	|		"state": null
	|	}]
```
