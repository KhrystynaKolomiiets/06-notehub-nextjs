import ReactPaginate from "react-paginate";
import css from "@/components/Pagination/Pagination.module.css"
interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}
export default function Pagination({onChange,currentPage,totalPages}:PaginationProps) {
    return <ReactPaginate
              
              nextLabel=">"
              onPageChange={({selected})=>onChange(selected+1)}
              pageRangeDisplayed={5}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        activeClassName={css.active}
        containerClassName={css.pagination}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />;
}
