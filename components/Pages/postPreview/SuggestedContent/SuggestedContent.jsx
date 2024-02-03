import classes from "./SuggestedContent.module.scss";
//Components
import Image from "next/image";
import Link from "next/link";
import SuggestedCard from "../SuggestedCard/SuggestedCard";

const SuggestedContent = ({ suggestedPosts, suggestedPostsCategory }) => {
    const suggestedPostsList = suggestedPosts.map((post, index) => {
        return (
            <Link key={index} href={`/post/${post._id}`} passHref>
                <a>
                    <SuggestedCard post={post} />
                </a>
            </Link>
        );
    });

    return (
        <div className={classes.MayYouLike}>
            <h2 className={classes.MayYouLike_h2}>
                May you like{" "}
                <Image
                    src={"/Images/icons/Heart.svg"}
                    alt={"Heart Icon"}
                    height={23}
                    width={23}
                />
            </h2>
            <div className={classes.MayYouLike_Content}>
                {suggestedPostsList.length > 0 ? (
                    suggestedPostsList
                ) : (
                    <p>
                        No posts found in the category{" "}
                        <b>"{suggestedPostsCategory}"</b>
                    </p>
                )}
            </div>
        </div>
    );
};

export default SuggestedContent;
