import React from "react";
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css'

function Pagination({currentPage , onChangePage}){

    return(
        <ReactPaginate
        className={styles.root}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(event)=>onChangePage(event.selected+10)}
          pageRangeDisplayed={10}
          pageCount={10}
          previousLabel="<"
          forcePage={currentPage-10}
          renderOnZeroPageCount={null}
        />
    )
}

export default Pagination