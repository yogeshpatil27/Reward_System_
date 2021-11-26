import axios from "axios";

export const axiosInstance =axios.create({
    baseURL:"https://rewardsystems.herokuapp.com/"
})