import nc from "next-connect";

const handler = nc();
import axios from "axios";

handler.post(async (req, res) => {

    const {USER_NAME, TELE, EMAIL, COURSE, PRICE, LEVELS} = req.query;

    axios.post("http://185.217.125.44:1310/ords/goo/STUDENT/STUDENT", {}, {
        params: {
            USER_NAME: USER_NAME,
            TELE: TELE,
            EMAIL: EMAIL,
            COURSE: COURSE,
            PRICE: PRICE,
            LEVELS: LEVELS
        }
    })
        .then(function (response) {
            res.status(201).json(response.data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
});

export default handler;