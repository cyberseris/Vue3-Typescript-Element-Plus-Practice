import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface INavMenu {
    name:string;
    url:string;
}

export interface IHttp {
    request<T>(
        method:string, 
        url:string, 
        params?:Record<string, any>,
        config?:AxiosRequestConfig
    ):Promise<AxiosResponse<T>>
}

// 表格數據
export interface ITableData {
    name:string;
    count:number;
    state:boolean;
}