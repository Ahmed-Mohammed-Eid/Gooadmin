import React, {useState} from 'react';
import styles from './Comment.module.scss';
import axios from "axios";
import Spinner from "../Spinner";

import {toast} from "react-toastify";

const FacebookComment = ({name, time, image, text, userId, commentUserId, commentId, refreshComments}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const [loading, setLoading] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditText(text);
    };

    const handleSave = async () => {
        //SET THE LOADING STATE
        setLoading(true)
        // SEND THE POST COMMENT
        await axios.put(`/api/post/EditComment`, {text: editText, userId, commentId})
            .then(res => {
                // Set Loading to false
                setLoading(false)
                // Save edited text
                setIsEditing(false);
            })
            .catch(err => {
                console.log(err)
                // Set Loading to false
                setLoading(false)
            })
    };

    const handleDelete = async () => {
        if (window.confirm(`This comment will be removed are you sure you want to continue?`)) {
            // SEND THE POST COMMENT
            await axios.delete(`/api/post/deleteComment`, {params: {userId, commentId}})
                .then(async res => {
                    await refreshComments();
                    toast.success(res.data.message)
                })
                .catch(err => {
                    console.log(err)
                    toast.error(res.data.message || res.data.response.message)
                })
        }
    };

    return (
        <div className={styles.comment}>
            <div className={styles.imageContainer}>
                <img src={image === 'local'? '/Images/Auth/User.png' : image} alt={name} className={styles.image}/>
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.time}>{
                        new Date(time).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })
                    }</div>
                </div>
                {isEditing ? (
                    <div className={styles.editContainer}>
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className={styles.editInput}
                        />
                        <div className={styles.Buttons}>
                            <button onClick={handleSave} className={styles.saveButton}>
                                Save {loading && <Spinner size={1} color={`#ffffff`}/>}
                            </button>
                            <button onClick={handleCancel} className={styles.cancelButton}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.text}>{editText}</div>
                )}
                <div className={styles.Actions}>
                    {userId === commentUserId && <button onClick={handleDelete} className={styles.deleteButton}>
                        delete
                    </button>}
                    {userId === commentUserId && <button onClick={handleEdit} className={styles.editButton}>
                        edit
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default FacebookComment;
