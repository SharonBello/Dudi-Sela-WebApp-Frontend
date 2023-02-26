import { GridEditSingleSelectCell, useGridApiContext } from '@mui/x-data-grid';


export const CustomTypeEditComponent = (props) => {
  const apiRef = useGridApiContext();

  const handleValueChange = async () => {
    await apiRef.current.setEditCellValue({
      id: props.id,
      field: 'wednesday',
      monday: '',
    });
  };
  return <GridEditSingleSelectCell onValueChange={handleValueChange} {...props} />;
};

const _valueOptions = ["", "x", "y", "z"]

export const columns = [
  {
    field: 'hour',
    headerName: 'שעה',
    type: 'string',
    width: 160,
    editable: false
  },
  {
    field: 'sunday',
    headerName: 'ראשון',
    type: 'singleSelect',
    valueOptions: _valueOptions,
    width: 120,
    editable: true,
    renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
  },
  {
    field: 'monday',
    headerName: 'שני',
    type: 'singleSelect',
    valueOptions: _valueOptions,
    width: 120,
    editable: true,
    renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
  },
  {
    field: 'tuesday',
    headerName: 'שלישי',
    type: 'singleSelect',
    valueOptions: _valueOptions,
    width: 120,
    editable: true,
    renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
  },
  {
    field: 'wednesday',
    headerName: 'רביעי',
    type: 'singleSelect',
    valueOptions: _valueOptions,
    width: 140,
    editable: true,
  },
  {
    field: 'thursday',
    headerName: 'חמישי',
    type: 'singleSelect',
    valueOptions: _valueOptions,
    width: 140,
    editable: true,
  },
  {
    field: 'friday',
    headerName: 'שישי',
    type: 'singleSelect',
    valueOptions: _valueOptions,
    width: 140,
    editable: true,
  },
  {
    field: 'saturday',
    headerName: 'שבת',
    type: 'singleSelect',
    valueOptions: _valueOptions,
    width: 140,
    editable: true,
  }
];

export const rows = [
  {
    id: 1,
    hour: "6:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 2,
    hour: "7:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 3,
    hour: "8:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 4,
    hour: "9:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 5,
    hour: "10:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 6,
    hour: "11:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 7,
    hour: "12:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 8,
    hour: "13:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 9,
    hour: "14:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 10,
    hour: "15:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 11,
    hour: "16:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 12,
    hour: "17:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 13,
    hour: "18:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 14,
    hour: "19:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 15,
    hour: "20:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 16,
    hour: "21:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 17,
    hour: "22:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },
  {
    id: 18,
    hour: "23:00",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: ""
  },

];