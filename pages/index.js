import { useEffect, useState } from "react";
import classes from "../styles/Home.module.scss";
// Component Imports
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
// Custom Components
import ProjectCard from "../components/layout/ProjectCard/ProjectCard";
import ProjectCardSkeleton from "../components/layout/ProjectCard/ProjectCard_Skelton/ProjectCard_Skelton";
import BlogCard from "../components/layout/BlogCard/BlogCard";
import BlogCardSkeleton from "../components/layout/BlogCard/BlogCard_Skelton/BlogCard_Skelton";
import CourseCard from "../components/layout/CourseCard/CourseCard";
import CourseAdvertisment from "../components/layout/courseAdvertisment/courseAdvertisment";
// External Components
import FloatIcons from "../components/layout/FloatIcons/FloatIcons";
import Search from "../components/layout/GlobalSearch/GlobalSearch";

export default function Home() {
    // router
    const router = useRouter();
    // get the token
    const { token } = router.query;
    // set the token
    if (token) {
        // Set the token at cookie

        document.cookie = `token=${token}`;
        // Check if the token is set before redirecting
        if (document.cookie.includes("token")) {
            // reload the page
            router.push("/").then(() => router.reload());
        }
    }

    // State
    const [lastThreeProjects, setLastThreeProjects] = useState(null);
    const [lastThreePosts, setLastThreePosts] = useState(null);
    const [lastThreeCourses, setLastThreeCourses] = useState(null);

    useEffect(() => {
        // get the last three projects and posts from the database
        axios.get("/api/post/getLastThree").then((res) => {
            const { lastThreeProjects, lastThreePosts, lastThreeCourses } =
                res.data;
            // set the state
            setLastThreeProjects(lastThreeProjects);
            setLastThreePosts(lastThreePosts);
            setLastThreeCourses(lastThreeCourses);
            // console.log(res)
        });
    }, []);

    return (
        <>
            <Head>
                <title>
                    GooAdmin: Leading Provider of Software Development and
                    Education Services
                </title>
                <meta
                    name="description"
                    content="GooAdmin is a leading provider of software development and education services. We offer a wide range of services to meet the needs of our clients, including custom software development, training, and consulting. Our team of experienced professionals is dedicated to providing our clients with the highest quality services possible."
                />
                <meta
                    name="keywords"
                    content="software development, education services, gooadmin, hossam assadallah, sql, mysql, oracle, oracle apex, javascript"
                />
            </Head>
            <div className={"container"}>
                <CourseAdvertisment />
                {/* Header */}
                <header className={classes.Header}>
                    <FloatIcons />
                    <Search />
                    <section className={classes.Text}>
                        <p className={classes.Hi}>Hello!</p>
                        <h1 className={classes.Name}>
                            WE ARE <span className="highlighted">GOOADMIN</span>
                        </h1>
                        <p className={classes.Description}>
                            Your destination for software development and
                            educational services. We look forward to serving you
                            with professionalism and dedication.
                        </p>
                        <div className={classes.Buttons}>
                            <button
                                role={"button"}
                                aria-label={"Go to linkedin profile"}
                                onClick={() =>
                                    window.open(
                                        "https://www.linkedin.com/in/hossam-assadallah-50b90a230/",
                                        "_blank"
                                    )
                                }
                            >
                                <Image
                                    src={"/Images/icons/linkedin.svg"}
                                    width={40}
                                    height={40}
                                    alt={"linkedin"}
                                />
                                LinkedIn
                            </button>
                        </div>
                    </section>
                    <section className={classes.Image}>
                        <Image
                            src={"/Images/Home/programming.svg"}
                            width={450}
                            height={450}
                            alt={"programming"}
                        />
                    </section>
                </header>

                {/* Content */}
                <div className={classes.Content}>
                    {lastThreeProjects?.length > 0 && (
                        <section className={classes.Portfolio}>
                            <h2>
                                <Image
                                    src={"/Images/Home/ProjectsIcon.svg"}
                                    width={38}
                                    height={38}
                                    alt={"Projects"}
                                />{" "}
                                Portfolio{" "}
                                <Link href="/portfolio">
                                    <a>
                                        <Image
                                            src={"/Images/Home/ShowPage.svg"}
                                            width={24}
                                            height={24}
                                            alt={"Show  Portfolio Page"}
                                        />
                                    </a>
                                </Link>
                            </h2>
                            <div className={classes.Portfolio_Cards__Container}>
                                {lastThreeProjects
                                    ? lastThreeProjects.map(
                                          (ProjectData, index) => {
                                              return (
                                                  <ProjectCard
                                                      src={
                                                          ProjectData.mainImage
                                                              .url
                                                      }
                                                      name={
                                                          ProjectData.nameOfProject
                                                      }
                                                      description={
                                                          ProjectData.projectDescription
                                                      }
                                                      date={
                                                          ProjectData.createdAtInReal ||
                                                          ProjectData.createdOnServerAt
                                                      }
                                                      github={
                                                          ProjectData.githubLink
                                                      }
                                                      live={
                                                          ProjectData.livePreviewLink
                                                      }
                                                      projectId={
                                                          ProjectData._id
                                                      }
                                                      key={"PP" + index}
                                                  />
                                              );
                                          }
                                      )
                                    : [0, 0, 0].map((_, index) => (
                                          <ProjectCardSkeleton
                                              key={"PP" + index}
                                          />
                                      ))}
                            </div>
                        </section>
                    )}
                    <section className={classes.Blog}>
                        <h2>
                            <Image
                                src={"/Images/Home/BlogIcon.svg"}
                                width={38}
                                height={38}
                                alt={"Blog"}
                            />{" "}
                            Blog{" "}
                            <Link href="/blog">
                                <a>
                                    <Image
                                        src={"/Images/Home/ShowPage.svg"}
                                        width={24}
                                        height={24}
                                        alt={"Show Blog Page"}
                                    />
                                </a>
                            </Link>
                        </h2>
                        <div className={classes.Portfolio_Cards__Container}>
                            {lastThreePosts
                                ? lastThreePosts.map((postData) => {
                                      return (
                                          <Link
                                              key={postData._id}
                                              href={`/post/${postData._id}`}
                                          >
                                              <a
                                                  className={
                                                      classes.Reset_BlogCard
                                                  }
                                              >
                                                  <BlogCard
                                                      src={
                                                          postData.mainImage.url
                                                      }
                                                      title={postData.header}
                                                      categories={
                                                          postData.category
                                                      }
                                                  />
                                              </a>
                                          </Link>
                                      );
                                  })
                                : [0, 0, 0].map((_, index) => (
                                      <BlogCardSkeleton key={"PS" + index} />
                                  ))}
                        </div>
                    </section>
                    <section className={classes.Testimonials}>
                        <h2>
                            <Image
                                src={"/Images/Home/Courses.svg"}
                                width={36}
                                height={36}
                                alt={"Testimonials"}
                            />{" "}
                            Courses
                        </h2>
                        <div className={classes.Portfolio_Cards__Container}>
                            {lastThreeCourses
                                ? lastThreeCourses.map((course) => {
                                      return (
                                          <Link
                                              key={course._id}
                                              href={course.youtubeLink}
                                          >
                                              <a
                                                  target={"_blank"}
                                                  className={
                                                      classes.Reset_BlogCard
                                                  }
                                              >
                                                  <CourseCard
                                                      title={course.title}
                                                      description={
                                                          course.description
                                                      }
                                                      src={course.imageUrl}
                                                  />
                                              </a>
                                          </Link>
                                      );
                                  })
                                : [0, 0, 0].map((_, index) => (
                                      <BlogCardSkeleton key={"PS" + index} />
                                  ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
