import axios, {AxiosRequestConfig} from 'axios'

const instance = axios.create({
    baseURL: 'https://test-job.pixli.app/',
    headers: {"Content-Type": "multipart/form-data"}
})

// api
export const appAPI = {
    sendForm(data: FormData) {
        return instance.post<AxiosResponse<any>>('send.php', data);
    }
}

// types
interface AxiosResponse<T = never> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig<T>;
    request?: any;
}