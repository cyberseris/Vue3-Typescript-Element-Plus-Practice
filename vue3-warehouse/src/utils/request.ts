//二次封裝
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { IHttp } from './models'

//路徑設定
axios.defaults.baseURL = import.meta.env.VITE_AWS_CLOUDFRONT_URL

//request 攔截器
axios.interceptors.request.use((config:AxiosRequestConfig | any) => config)

//response 攔截器
axios.interceptors.response.use(
    //成功
    (res:AxiosResponse | any) => res,
    //失敗
    (err:any)=>Promise.reject(err)
);

/*
* 第一個 <T>：泛型宣告（留一個型別變數給自己用）
* 第二個 T（在 Promise 裡）：實際指定回傳內容的型別
* 它們是配對用的，但功能不同，一個宣告、一個用到
*/

/* 使用方式
* 路徑參數自動帶入
* http.request('delete', '/api/item/:id', { id: 123 });
* axios 實際會呼叫 DELETE /api/item/123
* 其他參數自動當 query string
*
* http.request('get', '/api/item/:id/detail', { id: 123, type: 'x' });
* axios 實際會呼叫 GET /api/item/123/detail?type=x
*/

function formatUrl(url:string, params:Record<string, any> = {}):string {
    return url.replace(/:([a-zA-Z0-9_]+)/g, (match:string, key:string) => {
        if(params[key] !== undefined){
            return encodeURIComponent(params[key])
        }
        //若沒傳參數，保持原樣
        return match
    })
}

//http 請求封裝
const http:IHttp = {
    async request<T = any>(
        method: string, 
        url: string, 
        params: Record<string, any> = {},
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>>{
        method = method.toLowerCase() 
        
        // 處理路徑參數  
        const formattedUrl = formatUrl(url, params)

        // 找出路徑參數
        const pathKeys = (url.match(/:([a-zA-Z0-9_])/g) || []).map(k => k.slice(1))

        const restParams: Record<string, any> = {...params}
        pathKeys.forEach(key => delete restParams[key])

        if(method == 'get' || method == 'delete'){
            return axios({
                method,
                url: formattedUrl,
                params: restParams,
                ...config
            })
        }else{
            return axios({
                method,
                url: formattedUrl,
                data: restParams,
                ...config
            })
        }
    }
}

export default http