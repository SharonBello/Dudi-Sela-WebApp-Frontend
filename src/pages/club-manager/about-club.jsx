import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import CustomDivider from '../shared-components/custom-divider';
import { TextBox } from '../shared-components/text-box';
import { SaveButton } from '../shared-components/save-button';
import { FacilityServices } from './facility-services';
import UploadButton from '../shared-components/upload-button';

export const AboutClub = ({}) => {

  const [clubName, setClubName] = useState("האקדמיה של דודי סלע");
  const [clubMail, setClubMail] = useState("dudiselaacademy@gmail.com");
  const [clubNameEng, setClubNameEng] = useState("Dudi Sela Tennis Academy");
  const [city, setCity] = useState("תל אביב");
  const [address, setAddress] = useState("אוניברסיטת תל אביב שער 9");
  const [cityInEng, setCityInEng] = useState("Tel-Aviv");
  const [phone, setPhone] = useState("");
  const [instegram, setInstegram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [moreDetails, setMoreDetails] = useState('מרכז הטניס באוניברסיטת תל אביב ממוקם בלב העיר .ומנוהל על ידי דודי סלע ויואב בן צבי מאמן נבחרת ישראל.במתקן 9 מגרשי טניס ותאורת LED ,אקדמיה מתקדמת לטניס , חוגי טניס ,מלתחות , חניה  ועוד.לכל בעיה יש לפנות ליואב מנהל המועדון בטלפון 052-3782815שימו לב מגרשי הטניס אדום, כחול,ירוק קצרים מהסטנדרט מהקו האחורי ועד הגדר .');
  const [moreDetailsInEng, setMoreDetailsInEng] = useState("The tennis center at Tel Aviv University is located in the heart of the city. And is managed by Dudi Sela and Yoav Ben Zvi, the coach of the Israel national team. The facility has 9 tennis courts and LED lighting, an advanced academy for tennis, tennis clubs, changing rooms, parking and more. For any problem, please contact the club manager, Yoav, at 052-3782815 Notice the red, blue, and green tennis courts are shorter than standard from the back line to the fence.");
  const [facilityServices, setFacilityServices] = useState({cafeteria: true, coldWater: true, disabledPeople: false, ledLight: true, parking: true, store: false, shower: true, stringing: true, practiceWall: true});

  const handleSave = (e) => {
    e.stopPropagation()
    e.preventDefault()
    // if (validateForm() === true) {
    //   setIsLoading(true)
    //   addReservation()
    // } else {
    //   setMessageAlert(validateForm())
    //   setShowMessageAlert(true)
    // }
  }

  return (
    <Box className="club-box">
        <Container className="club-content">
            <Box className="club-header">
            <Typography id="club-title" variant="h6" component="h2">מידע על המועדון</Typography>
            </Box>
            <CustomDivider />

            <TextBox label="מייל" value={clubMail} setValue={setClubMail} />
            <TextBox label="שם המועדון" value={clubName} setValue={setClubName} />
            <TextBox label="שם המועדון באנגלית" value={clubNameEng} setValue={setClubNameEng} />
            <TextBox label="עיר" value={city} setValue={setCity} />
            <TextBox label="כתובת" value={address} setValue={setAddress} />
            <TextBox label="שם העיר באנגלית" value={cityInEng} setValue={setCityInEng} />
            <TextBox label="כתובת באנגלית" value={clubName} setValue={setClubName} />
            <TextBox label="טלפון" value={phone} setValue={setPhone} />

            <FacilityServices facilityServices={facilityServices} setFacilityServices={setFacilityServices} />
            <TextBox label="פייסבוק" value={facebook} setValue={setFacebook} />
            <TextBox label="אינסטגרם" value={instegram} setValue={setInstegram} />
            <TextBox label="מידע נוסף" value={moreDetails} setValue={setMoreDetails} />
            <TextBox label="מידע נוסף באנגלית" value={moreDetailsInEng} setValue={setMoreDetailsInEng} />

            <UploadButton />
            <SaveButton onClick={handleSave}/>
        </Container>
    </Box>
  )
}