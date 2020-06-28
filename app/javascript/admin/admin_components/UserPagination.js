import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const UserPagination = ({ allUserCount, pageNum, setPageNum }) => {
  const numPages = Math.ceil(allUserCount / 10);
  const items = [];
  for (let number = 0; number < numPages; number += 1) {
    items.push(
      <Pagination.Item key={number} active={number === pageNum} onClick={() => setPageNum(number)}>
        {number}
      </Pagination.Item>
    );
  }
  if (allUserCount > 10) {
    return (
      <div>
        <Pagination>{items}</Pagination>
      </div>
    );
  } else {
    return null;
  }
};

UserPagination.propTypes = {
  allUserCount: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  setPageNum: PropTypes.func.isRequired,
};

export default UserPagination;
