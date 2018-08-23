import http from 'http';

let _health = () => {
	let repsonse = {
		"healthSummary": {
			"healthOk": true,
			"dependencies": [
				{
					"dependencyDescription": "Servicio para consultar daños de productos",
					"healthOk": true,
					"dependencyResponseTime": 552,
					"availableInformation": "http://soaosbp:8011/CablevisionOracleFMW/ConsultarDanioProducto"
				},
				{
					"dependencyDescription": "Servicio para consultar la unidad operativa de un equipo",
					"healthOk": true,
					"dependencyResponseTime": 269,
					"availableInformation": " http://soaosbp:8011/CablevisionOracleFMW/ConsultarUnidadOperativa"
				}
			],
			"failureRate": 0
		}
	}
}

export default _health;