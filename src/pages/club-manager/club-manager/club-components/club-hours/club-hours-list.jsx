import React, { useState, useEffect } from 'react';
import { SaveButton } from '../../../../shared-components/save-button';
import { SelectMenu } from '../../../../shared-components/select-menu'
import { WeekDays, DayHours, DemoWorkHours } from '../../club-helper'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ClubHoursList = () => {
  const [workDays, setWorkDays] = useState(WeekDays);
  const [workHours, setWorkHours] = useState([]);
  const [fromHour, setFromHour] = useState(DayHours());
  const [tillHour, setTillHour] = useState(DayHours());
  const handleSave = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  useEffect(() => {
    DemoWorkHours(setWorkHours)
  }, [])
  return (
    <div className="club-hr flex-column">
          {workHours.map((wrkHrs) => (
            <div className="form-fields flex-column">
              <p>{wrkHrs.days.join(", ")}</p>
              <div className="select-fields flex justify-between">
                <div>
                  <SelectMenu defaultValue={wrkHrs.hours.startHour} inputLabel="משעה" values={fromHour} setValue={setFromHour} />
                  <SelectMenu defaultValue={wrkHrs.hours.endHour} inputLabel="עד שעה" values={tillHour} setValue={setTillHour} />
                </div>
                <div className="club-hours-actions flex align-center">
                  <SaveButton onClick={handleSave} />
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}