import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(setFilter, visibilityFilter) {
  return <Form.Control
    onChange={e => setFilter(e.target.value)}
    value={visibilityFilter}
    placeholder="Search Movies"
    className="visiblity-filter"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
  visibilityFilter: PropTypes.string
}