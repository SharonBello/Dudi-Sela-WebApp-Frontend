import * as React from 'react';
import { CustomCheckbox } from '../shared-components/check-box';

export const FacilityServices = ({facilityServices, setFacilityServices}) => {


    const handleOnChange = (e, key) => {
        const mServices = JSON.parse(JSON.stringify(facilityServices));
        mServices[key] = e.target.checked;
        setFacilityServices(mServices)
    }
    return (
        <CustomCheckbox label="קפיטריה" value={facilityServices.cafiteria} setValue={(e) => handleOnChange(e, "cafiteria")} />

    )

}