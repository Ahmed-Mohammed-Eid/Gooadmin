import {useState, useEffect} from "react";
//Style
import classes from "../../styles/createPost.module.scss";
//Component
import PostImage from "../../components/Pages/createPost/postImage/PostImage";
import CategoriesMultiSelect from "../../components/Pages/createPost/CategoriesMultiSelect/CategoriesMultiSelect";
import EditorPageToComponent from "../../components/Editor/EditorPageToComponent";
//Notifications
import {toast} from "react-toastify";
//redux
import {useDispatch, useSelector} from "react-redux";
import {onPostElementChange, ClearError} from "../../redux/slices/createPostSlice";
// HELPERS
import {verifyToken} from '../../helpers/Authentication_helpers';

function createPost({ID}) {
    //Initialize the Redux
    const dispatch = useDispatch();
    const {PendingMessage, SuccessMessage, ErrorMessage} = useSelector(state => state.createPost)

    //Main Image State
    const [mainImage, setMainImage] = useState(null);

    //Get the main Image and set in the state
    const mainImageHandler = (mainImage) => {
        setMainImage(mainImage)
    }

    // Effect For Showing Notifications
    useEffect(() => {
        if (PendingMessage) {
            toast.info(PendingMessage);
            dispatch(ClearError())
        }
        if (SuccessMessage) {
            toast.success(SuccessMessage);
            dispatch(ClearError())
        }
        if (ErrorMessage) {
            toast.error(ErrorMessage);
            dispatch(ClearError())
        }
    }, [PendingMessage, SuccessMessage, ErrorMessage])

    return <div className={"container"}>
        <div className={classes.PageContainer}>
            <div className={classes.CreatePost}>
                <h1>Create Post</h1>
                <section className={classes.Left}>
                    <PostImage text={"Post Image"} getMainImage={(postImage) => mainImageHandler(postImage)}/>
                    <input
                        onChange={(e) => dispatch(onPostElementChange({
                            title: 'heading',
                            value: e.target.value
                        }))}
                        type={'text'}
                        name={'heading'}
                        className={classes.Left_Heading}
                        placeholder={'Heading'}/>
                    <CategoriesMultiSelect/>
                    <div className={classes.Left_Publish}>
                        <input
                            onChange={(e) => dispatch(onPostElementChange({
                                title: 'checked',
                                value: e.target.checked
                            }))}
                            type={"checkbox"}
                            name={"isPublished"}
                            id={"isPublished"}
                            defaultChecked/>
                        <label htmlFor={"isPublished"}>Publish</label>
                    </div>
                </section>
                <section className={classes.Right}>
                    <EditorPageToComponent ID={ID} mainImage={mainImage}/>
                </section>
            </div>

        </div>
    </div>;
}

export default createPost;

export const getServerSideProps = async ({req}) => {
    // Authentication check
    const {user} = verifyToken(req);
    // GET THE USER ID
    if (!user || !user._id){
        return {
            redirect: {
                destination: "/authentication/login",
                permanent: false,
            },
        };
    }
    // Pass the ID to the Page
    return {
        props: {
            ID: user._id
        },
    };
};