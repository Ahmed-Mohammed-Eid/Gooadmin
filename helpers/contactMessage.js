import Message from "../Model/Message";

export async function createContactMessage(req, res) {

    const { name, email, message } = req.body;

    if(!name || !email || !message) {
        return res.status(400).json({ message: "Please fill all fields" });
    }


    try {
        Message.create(req.body);
        res.status(201).json({
            message: "Message has Sended!",
            data: req.body,
        });
    } catch (error) {
        
        const errorsObject = error.errors;
        const errorsArray = [];

        if (errorsObject) {
            for (const property in errorsObject) {
                errorsArray.push(errorsObject[property].message);
            }
        }

        res.status(500).json({ message: error.message, errorsArray });
    }
}
