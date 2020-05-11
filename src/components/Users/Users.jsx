import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import User from './User';
import styles from './Users.module.css';
import Preloader from '../common/Preloader/Preloader';
import Button from '../common/Button';
import { getUsers, getMoreUsers, setSelectedUsersPage } from '../../redux/reducers/users-reducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';


const Users = () => {
    //--------------------------------------Initial data------
    const dispatch = useDispatch();
    const {
        users,
        totalCount,
        isFetching,
        selectedUsersPage,
        loading
    } = useSelector(state => {
        const u = state.users
        return {
            users: u.pageUsers,
            totalCount: u.totalCount,
            isFetching: u.isFetching,
            selectedUsersPage: u.selectedUsersPage,
            loading: u.loading
        }
    });

    //--------------------------------------------------------

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    //----------------------------------Local function--------
    const showPage = (e) => {
        dispatch(getUsers(e.selected + 1));
        dispatch(setSelectedUsersPage(e.selected + 1))
    };

    const showMoreUsers = () => {
        dispatch(getMoreUsers(selectedUsersPage + 1))
        dispatch(setSelectedUsersPage(selectedUsersPage + 1));
    };
    //--------------------------------------------------------

    const pageCount = Math.ceil((totalCount) / 6);
    return (
        <>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                previousLabel='Назад'
                nextLabel='Вперед'
                onPageChange={showPage}
                containerClassName={styles.paginateContainer}
                breakClassName={styles.paginateBreak}
                pageClassName={styles.paginatePage}
                activeClassName={styles.paginateActive}
                previousClassName={styles.paginatePrevious}
                nextClassName={styles.paginateNext}
                pageLinkClassName={styles.paginateLink}
                previousLinkClassName={styles.paginateLink}
                nextLinkClassName={styles.paginateLink}
            />

            <div className={styles.users}>
                {isFetching
                    ? <Preloader className={styles.preloader} />
                    : users
                        .map(u => <User
                            user={u}
                            key={u.id}
                        />)}
            </div>

            {selectedUsersPage !== pageCount &&
                <Button
                    onClick={showMoreUsers}
                    addClassName={styles.button}
                    disabled={loading}
                >
                    Показать еще
                </Button>
            }
        </>
    );
}

export default withAuthRedirect(Users);