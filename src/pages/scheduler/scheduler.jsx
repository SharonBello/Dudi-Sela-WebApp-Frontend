import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridEditSingleSelectCell,
  useGridApiContext,
} from '@mui/x-data-grid';

const instructorOptions = ["", "x", "y", "z"]
// TODO replace with days of weeks as columns and hours as rows
// insert instructorNames as values for all cells

const rows = [
  {
    id: 1,
    hour: "6:00",
    description: "",
    value: "",
    type: "",
    account: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 2,
    hour: "7:00",
    description: "",
    value: "",
    type: "",
    account: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 3,
    hour: "8:00",
    description: "",
    value: "",
    type: "",
    account: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 4,
    hour: "9:00",
    description: "",
    value: "",
    type: "",
    account: "",
    thursday: "",
    friday: "",
    saturday: ""
  }
];

const CustomTypeEditComponent = (props) => {
  const apiRef = useGridApiContext();

  const handleValueChange = async () => {
    await apiRef.current.setEditCellValue({
      id: props.id,
      field: 'account',
      value: '',
    });
  };

  return <GridEditSingleSelectCell onValueChange={handleValueChange} {...props} />;
};

CustomTypeEditComponent.propTypes = {
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export const Scheduler = () => {
  const columns = [
    {
      field: 'hour',
      headerName: 'Hour',
      type: 'string',
      width: 160,
      editable: false
    },
    {
      field: 'description',
      headerName: 'Sunday',
      type: 'singleSelect',
      valueOptions: instructorOptions,
      width: 120,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
    },
    {
      field: 'value',
      headerName: 'Monday',
      type: 'singleSelect',
      valueOptions: instructorOptions,
      width: 120,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
    },
    {
      field: 'type',
      headerName: 'Tuesday',
      type: 'singleSelect',
      valueOptions: instructorOptions,
      width: 120,
      editable: true,
      renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
    },
    {
      field: 'account',
      headerName: 'Wednesday',
      type: 'singleSelect',
      valueOptions: instructorOptions,
      width: 140,
      editable: true,
    },
    {
      field: 'thursday',
      headerName: 'Thursday',
      type: 'singleSelect',
      valueOptions: instructorOptions,
      width: 140,
      editable: true,
    },
    {
      field: 'friday',
      headerName: 'Friday',
      type: 'singleSelect',
      valueOptions: instructorOptions,
      width: 140,
      editable: true,
    },
    {
      field: 'saturday',
      headerName: 'Saturday',
      type: 'singleSelect',
      valueOptions: instructorOptions,
      width: 140,
      editable: true,
    }
  ];

  return (
    <Box className="scheduler" sx={{ width: '100%', height: 300 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}