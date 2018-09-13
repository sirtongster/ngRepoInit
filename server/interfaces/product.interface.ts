export interface IProductItem{
	total?: number,
	items: (IItemsEntity)[]
}

export interface IItemsEntity{
	id?: number,
	author?: string,
	status?: string,
	description?: string
}