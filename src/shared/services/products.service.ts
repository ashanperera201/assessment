import { AxiosResponse } from 'axios';
import axiosInstance from './base-axios.service';


export const fetchProductCategories = (): Promise<AxiosResponse<any, any>> => {
    const url: string = 'products/categories';
    return axiosInstance.get(url);
}

export const fetchProducts = (category: string): Promise<AxiosResponse<any, any>> => {
    const url: string = `products/category/${category}`;
    return axiosInstance.get(url);
}
