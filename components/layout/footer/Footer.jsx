import classes from './Footer.module.scss';
import Image from "next/image";
import Link from "next/link";

const Footer = ({isSocialActive, isLogoActive}) => {
    return (
        <footer className={classes.Footer}>
            {isLogoActive && (<div className={classes.Footer_Logo}>
                <h3>AMB</h3>
            </div>)}
            {isSocialActive && (<div className={classes.Footer_Social}>
                <div>
                    <Link href={'/repo'}>
                        <a>
                            <Image src={'/Images/icons/github.svg'} alt="github" layout={'fill'}/>
                        </a>
                    </Link>
                </div>
                <div>
                    <Link href={'/repo'}>
                        <a>
                            <Image src={'/Images/icons/fb.svg'} alt="facebook" layout={'fill'}/>
                        </a>
                    </Link>
                </div>
                <div>
                    <Link href={'/repo'}>
                        <a>
                            <Image src={'/Images/icons/twitter.svg'} alt="twitter" layout={'fill'}/>
                        </a>
                    </Link>
                </div>
            </div>)}
            <div style={{margin: (!isLogoActive && !isSocialActive) && 'auto'}} className={classes.Footer_Rights}>
                <p>Copyright © 2022</p>
            </div>
        </footer>
    )
}

export default Footer;