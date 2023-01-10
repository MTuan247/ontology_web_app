import axios from 'axios'
import { showErrorToast, showToast } from '../../js/base/toast'

/**
 * Hàm load dữ liệu từ api
 * @param {function} callback 
 */
export function getData(callback = function(){}) {
    axios.get(`http://cukcuk.manhnv.net/v1/Employees`)
    .then((response) => {
        callback(response)
    }).catch(() => {
        showErrorToast()
    })
}

/**
 * Hàm load dữ liệu từ api
 * @param {url} api 
 * @param {function} callback 
 */
export function loadData(api, callback = function() {}) {
    axios.get(api)
    .then((response) => {
        callback(response)
    }).catch(() => {
        showErrorToast()
    })
}

/**
 * Hàm lấy dữ liệu theo id
 * @param {string} id 
 * @param {function} callback 
 */
export function getDataById(id, callback=function(){}) {
    axios.get('http://cukcuk.manhnv.net/v1/Employees/' + id )
    .then((response) => {
        let res = response.data
        callback(res)
    }).catch((error) => {
        console.log(error)
        showErrorToast()
    })
}

/**
 * Hàm lấy dữ liệu đã filtered
 * @param {int} pageSize 
 * @param {int} pageNumber 
 * @param {strin} entityFilter 
 * @param {stringg} departmentId 
 * @param {string} positionId 
 * @param {callback} callback 
 */
export function getDataFilterd(pageSize, pageNumber, entityFilter, departmentId, positionId, callback= function(){}) {
    let empl = entityFilter
    if(!empl) empl = `MF`
    axios.get(`http://cukcuk.manhnv.net/v1/Employees/` + `employeeFilter?pageSize=${ pageSize }&pageNumber=${ pageNumber }&employeeFilter=${empl}&departmentId=${departmentId}&positionId=${positionId}`)
    .then((response) => {
        callback(response)
    }).catch(() => {
        showErrorToast()
    })
}

/**
 * Hàm thêm dữ liệu
 * @param {json} data 
 * @param {function} callback 
 */
export function addData(data, callback = function(){}) {
    axios.post('http://cukcuk.manhnv.net/v1/Employees/', data)
    .then((response) => {
        callback(response)
        showToast('success', 'Thêm dữ liệu thành công!')
    }).catch((error) => {
        console.log(error)
        showErrorToast()
    })
}

/**
 * Hàm update dữ liệu
 * @param {object} data 
 * @param {string} id 
 * @param {function} callback 
 */
export function updateData(data, id, callback = function(){}) {
    axios.put('http://cukcuk.manhnv.net/v1/Employees/' + id, data)
    .then((response) => {
        callback(response)
        showToast('success', 'Sửa đổi dữ liệu thành công!')
    }).catch((error) => {
        console.log(error)
        showErrorToast()
    })
}

/**
 * Hàm xóa dữ liệu
 * @param {string} id 
 * @param {function} callback 
 * @param {boolean} show 
 */
export function deleteData(id, callback = function(){}, show) {
    axios.delete('http://cukcuk.manhnv.net/v1/Employees/' + id)
    .then((response) => {
        callback(response)
        showToast('success', 'Xóa dữ liệu thành công!', show)
    }).catch(() => {
        showErrorToast()
    })
}

/**
 * Hàm xóa nhiều
 * @param {array} ids 
 * @param {function} callback 
 */
export async function deleteMultiple(ids, callback= function(){}){
    let requests = []
    await ids.map(id => {
        requests.push(deleteData(id, function(){}, false ))
    })
    axios.all(requests)
    .then((response) => {
        callback(response)
        showToast('success', 'Xóa các bản ghi thành công!')
    })
}

/**
 * Hàm lấy new EmployeeCode
 * @returns new Code
 */
export async function getNewCode() {
    let res;
    await axios.get('http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode')
    .then((response) => {
        res = response.data
    }).catch(() => {
        showErrorToast()
    })
    return res
}