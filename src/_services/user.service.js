import { authHeader, handleResponse } from '../_helpers/index.js'

export const userService = {
    getAllUsers,
    getAssesmentById,
    getReportById
};

function getAllUsers() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`/src/_services/users/total-users.json`, requestOptions).then(handleResponse);
}

function getAssesmentById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`/src/_services/users/${id}/assessments.json`, requestOptions).then(handleResponse);
}

function getReportById(uid,assesmentid) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`/src/_services/users/${uid}/${assesmentid}/report.json`, requestOptions).then(handleResponse);
}