import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { rows, columns, CustomTypeEditComponent } from '../../data/scheduleData.js';

// const instructorOptions = ["", "x", "y", "z"]

// const CustomTypeEditComponent = (props) => {
//   const apiRef = useGridApiContext();

//   const handleValueChange = async () => {
//     await apiRef.current.setEditCellValue({
//       id: props.id,
//       field: 'wednesday',
//       monday: '',
//     });
//   };

//   return <GridEditSingleSelectCell onValueChange={handleValueChange} {...props} />;
// };

CustomTypeEditComponent.propTypes = {
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export const ScheduleManager = () => {


  return (
    <Box className="schedule" sx={{ width: '100%', height: 300 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter={true}
      />
    </Box>
  );
}