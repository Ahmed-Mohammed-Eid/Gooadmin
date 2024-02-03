//IMPORTS
import Image from "next/image";
import {useRouter} from "next/router";
//STYLE
import classes from './Pagination.module.scss';


const Pagination = ({start, end, itemsNumber, itemsPerPage, onPaginate}) => {

    const numberOfPages = Math.ceil(itemsNumber / itemsPerPage);
    const router = useRouter();
    const theCurrentPage = router.query.page ? parseInt(router.query.page) : 1;


    return (
        <section className={classes.Pagination}>
            <div className={classes.Pagination_Container}>
                {/* Start Button [first page]*/}
                {start &&
                    <button value={'first'} onClick={(event) => onPaginate(event)}><Image
                        src={`/Images/icons/LeftDouble.svg`} width={29} height={24}
                        alt={"The first Page"}/>
                    </button>}
                {/* Previous page button*/}
                <button value={'previous'} onClick={(event) => onPaginate(event)}><Image
                    src={`/Images/icons/LeftSingle.svg`} width={29} height={24}
                    alt={"The prev Page"}/>
                </button>
                {/* Page Number Buttons*/}
                {
                    Array.from({length: numberOfPages}, (_, i) => i + 1).map((page, index) => {
                        if (page === theCurrentPage || page === theCurrentPage - 1 || page === theCurrentPage + 1) {
                            return <button className={theCurrentPage === page ? classes.Active : ''}
                                           onClick={(event) => onPaginate(event)} key={index}
                                           value={page}>{page}</button>
                        }
                    })
                }
                {/* Next page button*/}
                <button value={'next'} onClick={(event) => onPaginate(event)}><Image
                    src={`/Images/icons/RightSingle.svg`} width={29} height={24}
                    alt={"The next Page"}/>
                </button>
                {/* End Button [last page]*/}
                {end &&
                    <button value={'last'} onClick={(event) => onPaginate(event)}><Image
                        src={`/Images/icons/RightDouble.svg`} width={29} height={24}
                        alt={"The last Page"}/>
                    </button>}
            </div>
        </section>
    )
}

export default Pagination;