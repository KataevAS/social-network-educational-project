import React from 'react';
import User from './User';
import styles from './Users.module.css';
import ReactPaginate from 'react-paginate';
import Preloader from '../common/Preloader/Preloader';
import Button from '../common/Button';


const Users = (props) => {
    let countPage = Math.ceil((props.totalCount) / 12);

    return (
        <div>
            <ReactPaginate
                pageCount={countPage}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                previousLabel='Назад'
                nextLabel='Вперед'
                onPageChange={props.showPage}
                containerClassName={styles.paginateContainer}
                breakClassName={styles.paginateBreak}
                pageClassName={styles.paginatePage}
                activeClassName={styles.paginateActive}
                previousClassName={styles.paginatePrevious}
                nextClassName={styles.paginateNext}
                pageLinkClassName={styles.paginateLink}
                previousLinkClassName={styles.paginateLink}
                nextLinkClassName={styles.paginateLink} />

            <div className={styles.users}>
                {props.isFetching ? <Preloader className={styles.preloader} /> : props.users.map(u => <User user={u} key={u.id} />)}
            </div>

            {props.selectedUsersPage !== countPage &&
                <Button
                    onClick={() => props.showMoreUsers()}
                    addClassName={styles.button}
                    disabled={props.loading}>Показать еще</Button>
            }
        </div>
    );
}

export default Users;