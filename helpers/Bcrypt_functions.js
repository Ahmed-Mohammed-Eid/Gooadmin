import bcrypt from "bcryptjs";


async function HashMyPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    } catch (error) {
        console.log(error);
    }
}


async function CompareMyPasswordWithTheHashedPassword(password, hash) {
    try {
        const isMatch = await bcrypt.compare(password, hash);

        return isMatch;
    } catch (error) {
        console.log(error);
    }
}

export { HashMyPassword, CompareMyPasswordWithTheHashedPassword };