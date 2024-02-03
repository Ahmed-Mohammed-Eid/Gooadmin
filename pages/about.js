import classes from '../styles/about.module.scss';
import Image from "next/image";
import Head from "next/head";
//Imports
import SocialMediaIcon from "../components/Pages/about/SocialMediaIcon";

const about = () => {
    return (
        <>
            <Head>
                <title>About GooAdmin</title>
                <meta name="description" content="Learn more about GooAdmin, a leading provider of software development and education services."/>
                <meta name="keywords" content="about, gooadmin, software development, education services"/>
            </Head>
            <div className={"container"}>
                <div className={classes.ContentContainer}>
                    <div className={classes.Grid}>
                        <div className={classes.Grid_Left}>
                            {/*IMAGE*/}
                            <section className={classes.ImagePart}>
                                <span></span>
                                <span></span>
                                <div className={classes.ImagePart_C1}>
                                    <div className={classes.ImagePart_C2}>
                                        <Image src={'/Images/Avatar.jpeg'} alt={"Hossam Asadullah Image"} width={360}
                                               height={360} objectFit={"cover"}
                                               objectPosition={"top"}/>
                                    </div>
                                </div>
                            </section>
                            {/*INFO PART*/}
                            <section className={classes.InfoPart}>
                                <div className={classes.InfoPart_Text}>
                                    <h1>Hossam ASSADALLAH</h1>
                                    <p>Software Developer</p>
                                    <p>Web Developer</p>
                                </div>
                                <div className={classes.InfoPart_Social}>
                                    <SocialMediaIcon
                                        accountLink={"https://www.facebook.com/profile.php?id=100076252754626"}
                                        icon={'/Images/icons/About_Fb.svg'}
                                        iconAlt={"Facebook account link"}/>
                                    <SocialMediaIcon accountLink={"https://twitter.com/Hossam_Asadalla"}
                                                     icon={'/Images/icons/About_Tw.svg'}
                                                     iconAlt={"Twitter account link"}/>
                                    <SocialMediaIcon accountLink={"https://wa.me/201270358999"}
                                                     icon={'/Images/icons/About_Wp.svg'}
                                                     iconAlt={"Whatsapp account link"}/>
                                    <SocialMediaIcon accountLink={"https://t.me/hossamassadallall"}
                                                     icon={'/Images/icons/About_Tg.svg'}
                                                     iconAlt={"Telegram account link"}/>
                                    <SocialMediaIcon accountLink={"https://github.com/GooAdmin"}
                                                     icon={'/Images/icons/About_Gh.svg'}
                                                     iconAlt={"Github account link"}/>
                                </div>
                                <div className={classes.InfoPart_CV}>
                                    <button>
                                    </button>
                                </div>
                            </section>
                        </div>
                        <div className={classes.Grid_Right}>
                            <h2>About <span className={"highlighted"}>Me</span></h2>
                            <p>I DESIGN AND CODE BEAUTIFUL THINGS, AND I LOVE WHAT I DO.</p>
                            {/*PERSONAL INFO*/}
                            <section className={classes.PersonalInfo}>
                                <div className={classes.PersonalInfo_Item}>
                                    <p className={classes.Description}>
                                        Greetings, I'm Hossam, the Manager Developer at GooAdmin. With experience in
                                        software development and a passion for nurturing talent, I provide top-notch
                                        services to our clients. I guide my team towards delivering innovative solutions
                                        and promoting education within the company. I am committed to providing
                                        exceptional service and results
                                    </p>
                                </div>
                                <div className={classes.PersonalInfo_Item}>
                                    <div className={classes.PersonalInfo_Item__Container}>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Birthday</h3>
                                            <p>April 04, 1983</p>
                                        </div>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Phone</h3>
                                            <p>+201270358999</p>
                                        </div>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Address</h3>
                                            <p>Egypt, Hurghada</p>
                                        </div>
                                    </div>
                                    <div className={classes.PersonalInfo_Item__Container}>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Company</h3>
                                            <p>GOOADMIN</p>
                                        </div>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Languages</h3>
                                            <p>Arabic (Native)</p>
                                            <p>English</p>
                                        </div>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Nationality</h3>
                                            <p>Egyptian</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*How Do I Work*/}
                            <section className={classes.HowDoIWork}>
                                <h2>How Do I <span className={"highlighted"}>Work?</span></h2>
                                <div className={classes.HowDoIWork_Container}>
                                    <div className={classes.HowDoIWork_Container__Item}>
                                        <span>1</span>
                                        <h3>Think</h3>
                                    </div>
                                    <div className={classes.HowDoIWork_Container__Item}>
                                        <span>2</span>
                                        <h3>Sketch</h3>
                                    </div>
                                    <div className={classes.HowDoIWork_Container__Item}>
                                        <span>3</span>
                                        <h3>Design</h3>
                                    </div>
                                    <div className={classes.HowDoIWork_Container__Item}>
                                        <span>4</span>
                                        <h3>Code</h3>
                                    </div>
                                </div>
                            </section>
                            {/*My Skills*/}
                            <section className={classes.MySkills}>
                                <h2>My <span className={"highlighted"}>Skills</span></h2>
                                <div className={classes.MySkills_Container}>
                                    <p className={classes.MySkills_Container__Item}>
                                        HTML
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        CSS
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        JavaScript
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        React
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Next.js
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        NodeJS
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Python
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Oracle
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Oracle Apex
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Android Applications
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        IOS Applications
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default about;
