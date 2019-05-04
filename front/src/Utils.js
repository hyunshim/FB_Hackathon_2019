import axios from 'axios';
axios.defaults.baseURL = process.env.baseURL || "http://localhost:3000/"
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


const get_user = (_id) => axios.get(`api/users/${_id}`);
const get_all_users = () => axios.get(`api/users`);
const create_user = (name, ph, address) => {
    let data = {
        name: name,
        ph: ph,
        address: address,
        experience: 0,
        quests: []
    };
    return axios.post(`api/users`, data).then(result => {
        console.log(result);
    });
}
const delete_user = (_id) => axios.delete(`api/users/${_id}`);

const get_all_quests = () => axios.get(`api/quests`);
const delete_quest = (_id) => axios.delete(`api/quests/${_id}`);



export {
    add_mark,
    get_all_marks,
    delete_mark,

    create_user,
    get_all_users,
    get_user,
    delete_user,

    get_all_quests,
    delete_quest,
}