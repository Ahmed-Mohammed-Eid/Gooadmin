import Image from "next/image";
import classes from "./CircleImageAnimation.module.scss";

function CircleImageAnimation(props) {
    return (
        <div className={classes.circleImageContainer}>
            <Image
                src="/Images/Courses/html.png"
                alt="Image 1"
                width={350}
                height={350}
            />
            <Image
                src="/Images/Courses/css.png"
                alt="Image 2"
                width={350}
                height={350}
            />
            <Image
                src="/Images/Courses/js.png"
                alt="Image 3"
                width={330}
                height={330}
            />

            <Image
                src="/Images/Courses/oracle-apex.svg"
                alt="Image 4"
                width={350}
                height={350}
            />
        </div>
    );
}

export default CircleImageAnimation;
