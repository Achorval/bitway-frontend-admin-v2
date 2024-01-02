import React, { useState, useEffect, useCallback } from "react";

const defaultButton = props => <button {...props}>{props.children}</button>;

const Pagination = props => {
    const [visiblePages, setvisiblePages] = useState(null);
    const {
        PageButtonComponent = defaultButton,
        // changeMethodFlag,
        onPageChange,
        totalPages,
        currentPage,
        // resetMethodFlag
    } = props;

    const activePage = currentPage;

    const getVisiblePages = useCallback((page, total) => {
        if (total < 7) {
        return filterPages([1, 2, 3, 4, 5, 6], total);
        } else {
        if (page % 5 >= 0 && page > 4 && page + 2 < total) {
            return [1, page - 1, page, page + 1, total];
        } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
            return [1, total - 3, total - 2, total - 1, total];
        } else {
            return [1, 2, 3, 4, 5, total];
        }
        }
    }, []);

    useEffect(() => {
        setvisiblePages(getVisiblePages(null, totalPages));
    }, [getVisiblePages, totalPages]);

    const filterPages = (visiblePages, totalPages) => {
        return visiblePages.filter(page => page <= totalPages);
    };

    const changePage = page => {
        const activePage = props.page;

        if (page === activePage) {
            return;
        }
        const visiblePages = getVisiblePages(page, totalPages);

        setvisiblePages(filterPages(visiblePages, totalPages));
        onPageChange(page - 1);
    };

    return (
        <div className="Table__pagination">
            <div className="Table__prevPageWrapper">
                <PageButtonComponent
                    className="Table__pageButton"
                    onClick={() => {
                        if (activePage === 1) return;
                        changePage(activePage - 1);
                    }}
                    disabled={activePage === 1}
                >
                    {/* {props.previousText} */}
                    <i className="fa fa-angle-left"></i>
                </PageButtonComponent>
            </div>
            <div className="Table__visiblePagesWrapper">
                {visiblePages &&
                visiblePages.map((page, index, array) => {
                    return (
                        <PageButtonComponent
                            key={index}
                            className={
                            activePage === page
                                ? "Table__pageButton Table__pageButton--active"
                                : "Table__pageButton"
                            }
                            onClick={changePage.bind(null, page)}
                        >
                            {array[index - 1] + 2 < page ? `...${page}` : page}
                        </PageButtonComponent>
                    );
                })}
            </div>
            <div className="Table__nextPageWrapper">
                <PageButtonComponent
                    className="Table__pageButton"
                    onClick={() => {
                        if (activePage === totalPages) return;
                        changePage(activePage + 1);
                    }}
                    disabled={activePage === totalPages}
                >
                    {/* {props.nextText} */}
                    <i className="fa fa-angle-right"></i>
                </PageButtonComponent>
            </div>
        </div>
    );
};

export default Pagination;