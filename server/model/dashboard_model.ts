import DashBoardItem from "../../common/types/DashBoardItem";
import axios, { AxiosPromise } from 'axios';
import * as request from 'request';

const reqresApi = axios.create({
    baseURL: 'https://reqres.in', // Url
    timeout: 5000 // timeout 5초
});

function statusCodeErrorHandler(statusCode, callback , data) {
    switch (statusCode) {
        case 200:
            callback(null, data);
            break;
        default:
            callback('error', data);
            break;
    }
}

export default class DashBoardItemList {
    
    getList(): DashBoardItem[] {
        let arr: DashBoardItem[] = [];
        arr.push({ title: "누적 검사수", count: "0" })
        arr.push({ title: "누적 검사완료", count: "0" })
        arr.push({ title: "누적 확진률 ", count: "0" })
        return arr;
    }

    getDataListMap(): Map<string, DashBoardItem[]> {
        let result: Map<string, DashBoardItem[]> = new Map<string, DashBoardItem[]>();
        let arr: DashBoardItem[] = [];
        arr.push({ title: "누적 검사수", count: "0" })
        arr.push({ title: "누적 검사완료", count: "0" })
        arr.push({ title: "누적 확진률 ", count: "0" })
        result.set("inspectionStatus", arr);

        arr = [];
        arr.push({ title: "확진환자", count: "0" })
        arr.push({ title: "완치", count: "0" })
        arr.push({ title: "치료중", count: "0" })
        arr.push({ title: "사망", count: "0" })
        result.set("inspectionStatus2", arr);

        return result;
    }

    getSampleAPICallResult(callback) : void {
        var value = {
            uri: '/api/users/2',
            method: 'GET',
            baseUrl: 'https://reqres.in',
            json: true
        }

        request(value, (error, res, data) => {
            statusCodeErrorHandler(res.statusCode, callback, data);
        });
    }

    getSampleAPICallResultByAsyncAwait(callback) : Promise<void> {
        const createUser = async (newUser: Object) => {
            try {
              const response = await reqresApi.get('/api/users/' + newUser);
              const user = response.data;
              callback(null, user);
            } catch (err) {
              if (err && err.response) {
                  console.log("error occurs!");
              }
              throw err;
            }
        };

        return createUser(1);
    }


}