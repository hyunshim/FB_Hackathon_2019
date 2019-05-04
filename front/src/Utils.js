import axios from 'axios';
axios.defaults.baseURL = process.env.baseURL || "http://localhost:3333/"
axios.interceptors.response.use((response) => response.data);

const get_all_marks = () => axios.get(`api/marks`);
const add_mark = (title, score, average) => {
    let data = {
        title: title,
        score: score,
        average: average
    };
    return axios.post(`api/marks`, data).then(result => {
        console.log(result);
    });
}
const delete_mark = (_id) => axios.delete(`api/marks/${_id}`);

export {
    add_mark,
    get_all_marks,
    delete_mark,
}