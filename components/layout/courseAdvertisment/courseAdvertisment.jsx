import classes from './courseAdvertisment.module.scss';
import {useRouter} from "next/router";

function CourseAdvertisment(){

    const router = useRouter();


    return(
        <div className={classes.course_advertisment}>
            <p onClick={() => {
                router.push('/subscribe');
            }}>&larr; احجز كورسك الان &rarr;</p>
        </div>
    )
}

export default CourseAdvertisment;