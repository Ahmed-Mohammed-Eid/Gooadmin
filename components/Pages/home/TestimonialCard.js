//Style Imports
import classes from "./TestimonialCard.module.scss";

//Components Imports
import Image from "next/image";

const TestimonialCard = ({src, name, content}) => {
    return (
        <div className={classes.Testimonial_Card}>
            <div className={classes.Testimonial_Card__Image}>
                <Image src={src} width={65} height={65} alt={name}/>
            </div>
            <div className={classes.Testimonial_Card__Content}>
                <h3>{name}</h3>
                <p>{content}</p>
            </div>
        </div>
    );
}

export default TestimonialCard;