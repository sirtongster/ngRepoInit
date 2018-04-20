export interface OpenInfo{
	IDTRANSACCION	: string,
	TIMESPAN			: string,
	TIPOOPERACION	: string,
	IMPORTE				: string,
	CUOTAS				: string,
	LINEAPRODUCTO	: string,
	EQUIPO				: string,
	CUPONORIGINAL	: string,
	FECHAORIGINAL	: string,
	TIPOT					: string,
	ID_CLIENTE		: string
}

export interface WSRequest{
	Track1y2 					: string,
	CodSeguridad 			: string,
	CodServicio 			: string,
	Version 					: string,
	Servicio 					: string,
	LineaProducto			: string,
	Comercio 					: string,
	Terminal 					: string,
	Equipo 						: string,
	Moneda 						: string,
	Importe 					: string,
	PlanPago 					: string,
	Cuotas 						: string,
	Ingreso 					: string,
	TipoOperacion 		: string,
	Anulacion 				: string,
	NCuponOriginal 		: string,
	FechaOriginal 		: string,
	NroFactura 				: string,
	NroTarjeta 				: string,
	FechaVencimiento 	: string,
	FechaCompra 			: string,
	HoraCompra 				: string,
	NroCupon 					: string,
	CodRespuesta 			: string,
	Respuesta 				: string,
	NroAutorizacion 	: string,
	NroTrace 					: string,
	TipoAutorizacion 	: string,
	NombreTarjeta 		: string,
	Operador 					: string,
	Titular 					: string,
	Retrieval 				: string,
	NroCuenta 				: string,
	TipoDocumento 		: string,
	Documento 				: string,
	FechaPosdatada 		: string,
	TipoCuenta 				: string,
	Reservado 				: string,
	Codigotarjeta 		: string,
	LongAuxiliar 			: string,
	Auxiliar 					: string,
	IdentificacionCliente : string,
	PinWorkingKey 		: string,
	ImporteAdicional 	: string,
	RespValDatosTit 	: string,
	NombrePlanPago 		: string,
	Lote 							: string,
	TelDireccion 			: string,
	DatoAdicional59 	: string,
	token 						: string,
	WKeyEncriptacion 	: string,
	Bloque 						: string,
	IDCLIENTE2 				: string,
	DatosAdicionales 	: string,
	Empresa 					: string,
	PosMkEncriptacion : string,
	EMVFallback 			: string,
	BitMapAdicional 	: string,
	MACREAL 					: string,
	IDTerminal 				: string,
	Filler 						: string
}

export interface WSResponse{
	Payment: string,
	ProductLine: string,
	Commerce: string,
	Terminal: string,
	Machine: number,
	CurrencyType: string,
	Amount: string,
	NumberOfInstalments: number,
	EntryType: number,
	OperationType: string,
	Cancellation: string,
	OriginalVoucher: string,
	OriginalDate: string,
	CreditCardNumber: string,
	CreditCardExpirationDate: string,
	PurchaseDate: string,
	PurchaseTime: string,
	VoucherNumber: string,
	ResponseCode: string,
	Response: string,
	AuthorizationNumber: string,
	AuthorizationType: string,
	CreditCardName: string,
	Operator: string,
	AccountNumber: string,
	CreditCardCode: string,
	ClientID: string
	TransactionID: string,
	Receipt: string
}