import React from 'react';
import PropTypes from 'prop-types';

const ReusableTable = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full mt-2  overflow-y-scroll">
        <thead className='border-y-2 border-gray-600'>
          <tr className=" text-[14px] font-bold">
            {columns.map((column) => (
              <th key={column.accessor} className="text-left">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=' font-thin md:text-md text-sm overflow-y-scroll'>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={ rowIndex % 2 === 0 ? 'bg-white md:border-0 border' : 'bg-gray-100'}>
              {columns.map((column) => (
                <td key={column.accessor} className="md:border-0 border">
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

export default ReusableTable;
