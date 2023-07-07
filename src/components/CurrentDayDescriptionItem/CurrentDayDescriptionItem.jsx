import React from 'react';
import Proptypes from 'prop-types';

const CurrentDayDescriptionItem = ({name, value, unit}) => (
    <div className="d-flex justify-content-between">
        <p className="mb-0 font-weight-bolder text-uppercase">{name}</p>
        <p className="mb-0">
            {value} {unit}
        </p>
    </div>
);

CurrentDayDescriptionItem.propTypes = {
    name: Proptypes.string.isRequired,
    value: Proptypes.number.isRequired,
    unit: Proptypes.string.isRequired,
};

export default CurrentDayDescriptionItem;
