import classes from "./SuggestedCard.module.scss";
import Image from "next/image";

const SuggestedCard = ({post}) => {
  return(
      <div className={classes.MayYouLike_Card}>
          <div className={classes.MayYouLike_Card_Image}>
              <Image src={post.mainImage.url} alt={post.header} width={300} height={200}
                     objectFit={"cover"}/>
              <div className={classes.MayYouLike_Card_Overlay}>
                  <h3>{post.header}</h3>
                  <p><Image src={"/Images/icons/CalenderForMayYouLike.svg"} width={18} height={16}
                            alt={"Created Date"}/> {new Date(post.createdOnServerAt).toLocaleDateString("en-us",{year: "numeric", month: "long", day:"numeric"})}</p>
              </div>
          </div>
      </div>
  )
}

export default SuggestedCard;