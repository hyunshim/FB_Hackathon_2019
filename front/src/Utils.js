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

const get_all_quests = () => axios.get(`api/quests`);

const add_quest = (name, author, location, reward, description, imgurl, icon) => {
    let data = {
        name: name,
        author: author,
        location: location,
        reward: reward,
        description: description,
        imgurl: imgurl,
        icon: icon
    };
    return axios.post(`api/quests`, data).then(result => {
        console.log(result);
    });
}

const delete_quest = (_id) => axios.delete(`api/quests/${_id}`);


export {
    add_mark,
    get_all_marks,
    delete_mark,
    add_quest,
    get_all_quests,
    delete_quest,
}