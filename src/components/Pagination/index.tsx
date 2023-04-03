import React from "react";
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css'

function Pagination({currentPage , onChangePage}:{currentPage:number, onChangePage:() => void}){

    return(
        <ReactPaginate
        className={styles.root}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(event)=>onChangePage(event.selected+1)}
          pageRangeDisplayed={10}
          pageCount={10}
          previousLabel="<"
          forcePage={currentPage-1}
          renderOnZeroPageCount={null}
        />
    )
}

export default Pagination