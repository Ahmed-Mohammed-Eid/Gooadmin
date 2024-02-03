import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import NextNProgress from "nextjs-progressbar";

// Redux Store Imports
import {wrapper} from "../redux/Store";
//Notification System
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Check Auth Hook
import useAuth from "../hooks/useAuth";

function MyApp({Component, pageProps}) {
    // Check Authentication Status
    const [user, isAuthenticated] = useAuth();
    const pagePropsWithUserInfo = {
        ...pageProps,
        user,
        isAuthenticated,
    };

    return (
        <Layout user={user} isAuthenticated={isAuthenticated}>
            <NextNProgress color="#9747FF"/>
            <Component {...pagePropsWithUserInfo} />
            <ToastContainer
                position="bottom-right"
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Layout>
    );
}

export const getServerSideProps = async ({req, res}) => {

    // Check if the request is for "www.gooadmin.com"
    const host = req.headers.host || "";
    const isWWW = host.startsWith("www.");

    console.log(host);
    console.log(isWWW);
    // If the request is for "www.gooadmin.com", redirect to "gooadmin.com"
    if (isWWW) {
        res.setHeader("Location", `https://gooadmin.com${req.url}`);
        res.statusCode = 301;
        res.end();
    }

    // Return an empty props object
    return {props: {}};
};

export default wrapper.withRedux(MyApp);
