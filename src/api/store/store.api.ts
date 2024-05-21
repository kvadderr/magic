import { IGetTypesRes } from './types'
import apiInstance from '../instance/instance'

export const StoreApi = {

  async getTypes() {
   return apiInstance.get<IGetTypesRes[]>('/store/types')
  },

  async getProducts(id: number) {
    return apiInstance.get<Product[]>('/store/catalog/'+ id)
  }

}
