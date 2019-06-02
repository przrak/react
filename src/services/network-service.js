/**
 * Класс для работы с сетью, в нашем случае для загрузки данных
 */
export default class NetworkService {

    _apiBase = 'http://localhost:3000/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw Error(`Could not fetch ${url} received ${res.status}`)
        }

        return await res.json();
    }

    async getAllEmployee() {
        const res = await this.getResource(`/employee/employees.json`);
        // return res.results;
        return res;
    }
}