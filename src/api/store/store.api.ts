import {IGetTypesRes} from './types'
import apiInstance from '../instance/instance'

export const StoreApi = {
    async getTypes() {
        return apiInstance.get<IGetTypesRes[]>('/store/types')
    },
    // id: number
    async getProducts() {
        // return apiInstance.get<Product[]>('/store/catalog/'+ id)
        return apiInstance.get<Product[]>('/store/catalog/' + 1)
    }
}
