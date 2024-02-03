import React, {useState} from 'react';
import styles from './CommentInput.module.scss';
import axios from "axios";
import Spinner from "../Spinner";

const CommentInput = ({userId, postId, userName, userImage, addComment}) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //SET THE LOADING STATE
        setLoading(true)
        // SEND THE POST COMMENT
        await axios.post(`/api/post/addComment`, {text, userId, postId, userName, userImage})
            .then(res => {
                setLoading(false)
                //GET THE UPDATED COMMENTS FROM THE SERVER AND RESET THE STATE
                addComment();
                // Reset the textarea
                setText('')
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    };

    return (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="text">Comment:</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                Submit {loading && <Spinner color={`#f50`} size={1} /> }
            </button>
        </form>
    );
};

export default CommentInput;
