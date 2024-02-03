import {useState, useEffect} from "react";
import classes from "../../styles/PreviewPost.module.scss";
//COMPONENTS
import Head from "next/head";
import Image from "next/image";
import SuggestedContent from "../../components/Pages/postPreview/SuggestedContent/SuggestedContent";
import CommentInput from "../../components/layout/Comments_Part/CommentInput";
import Comment from "../../components/layout/Comments_Part/Comment";
//HELPERS
import axios from "axios";
import {getAllPostsIdsForThePostPreview} from "../../helpers/getTheResult";
import getPostById from "../../helpers/getPostById";
import parseMyJson from "../../helpers/EditorJs-Parser";

const PostPreview = ({post, postId, isAuthenticated, user}) => {
    // State
    const [suggestedPosts, setSuggestedPosts] = useState([]);
    const [postComments, setPostComments] = useState([]);

    // The fully converted post
    const ParsedPost = JSON.parse(post);

    // The post content
    const postResult = parseMyJson(ParsedPost.postData);
    //

    // Date Formatting
    const postDate = new Date(ParsedPost.createdOnServerAt).toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
        }
    );

    // Get Suggested Posts Category random
    const category = ParsedPost.category[Math.floor(Math.random() * ParsedPost.category.length)];

    // Suggested Posts
    useEffect(() => {

        axios.get(`/api/post/getSuggestedPosts`, {
            params: {
                postId: postId,
                category: category
            }
        })
            .then((res) => {
                const {posts} = res.data;
                setSuggestedPosts(posts);
            });

    }, [postId]);

    // Post Comments
    useEffect(() => {

        axios.get(`/api/post/getThePostComments`, {
            params: {
                postId: postId
            }
        })
            .then((res) => {
                setPostComments(res.data.posts)
            })
            .catch(err => {
                console.log(err)
            })

    }, [postId]);

    const addCommentHandler = async () => {
        // Get the comments from the Server
        await axios.get(`/api/post/getThePostComments`, {
            params: {
                postId: postId
            }
        })
            .then((res) => {
                setPostComments(res.data.posts)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <Head>
                <title>{ParsedPost.header}</title>
                <meta name="description" content={`Read ${ParsedPost.header} on GooAdmin.`}/>
                <meta name="keywords"
                      content={`${ParsedPost.header}, gooadmin, software development, education services, ${ParsedPost?.category.join(', ')}`}/>
                <link rel="canonical" href={`https://gooadmin.com/post/${postId}`}></link>

                {/* Set explicit Open Graph image */}
                <meta property="og:image" content="/programming.png" />
                <meta property="og:image:secure_url" content="/programming.png" />
            </Head>
            <div className={"container"}>
                <div className={classes.ContentContainer}>
                    <div className={classes.Left}>
                        <div className={classes.Top}>
                            <div className={classes.MainImage}>
                                <Image
                                    src={ParsedPost.mainImage.url}
                                    alt={ParsedPost.header}
                                    width={1100}
                                    height={400}
                                    objectFit={"cover"}
                                />
                            </div>
                            <div className={classes.Content}>
                                <div className={classes.HeaderAndDate}>
                                    <h1>{ParsedPost.header}</h1>
                                    <div className={classes.Author}>
                                        <div className={classes.AuthorImage}>
                                            <Image src={ParsedPost?.Author?.AuthorImage?.url || `/Images/Home/programming.svg`}
                                                   alt={ParsedPost?.Author?.AuthorName} width={50}
                                                   height={50} objectFit={"cover"}/>
                                        </div>
                                        <div className={classes.AuthorName}>
                                            <h2>{ParsedPost?.Author?.AuthorName || "GooAdmin Team"}</h2>
                                            <p>
                                                <Image
                                                    src={"/Images/icons/Calender.svg"}
                                                    alt={"Creating Date"}
                                                    width={14}
                                                    height={14}
                                                />
                                                {postDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.Categories}>
                                    {ParsedPost.category.map(
                                        (category, index) => {
                                            return (
                                                <span key={"ck" + index}>
                                                    {category}
                                                </span>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={classes.Bottom}>{postResult}</div>
                    </div>
                    {/*Right*/}
                    <div className={classes.Right}>
                        {suggestedPosts && <SuggestedContent
                            suggestedPostsCategory={category}
                            suggestedPosts={suggestedPosts}
                        />}
                    </div>
                </div>
                {isAuthenticated && user._id &&
                    <CommentInput userId={user._id} postId={postId} userName={`${user.firstName} ${user.lastName}`}
                                  addComment={addCommentHandler} userImage={user.userImage.url}/>
                }
                <section className={classes.Comments_Section}>
                    <h2>Comments</h2>
                    {postComments && postComments.map((comment) => {
                        return (
                            <Comment text={comment.content}
                                     name={comment.userName}
                                     time={comment.createdOnServerAt}
                                     image={comment.userImage}
                                     userId={user?._id}
                                     commentUserId={comment.userId}
                                     commentId={comment._id}
                                     key={comment._id}
                                     refreshComments={addCommentHandler}
                            />
                        )
                    })}
                </section>
            </div>
        </>
    );
};

export default PostPreview;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (ctx) => {
    const thePostId = ctx.params.postId;
    const post = await getPostById(thePostId);

    if (!post) {
        return {
            redirect: {
                destination: "/blog",
                permanent: false,
            },
        };
    }

    return {
        props: {
            post: JSON.stringify(post),
            postId: thePostId,
        },
        revalidate: 180,
    }
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async () => {
    const paths = await getAllPostsIdsForThePostPreview();

    return {
        paths: paths,
        fallback: "blocking"
    }
}