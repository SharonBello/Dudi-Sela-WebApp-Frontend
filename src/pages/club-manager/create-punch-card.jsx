import { useState, useEffect } from 'react';

export const CreatePunchCard = () => {
    return (
        <></>
    )
}


// <Modal
//         open={openEditEvent}
//         onClose={closeEditEvent}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         className="modal-overlay">
//         <Box className="modal-box">
//           <Container className="modal-content">
//             <Box className="modal-header">
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 הזמנה חדשה
//               </Typography>
//             </Box>

//             <Box className="modal-body">
//               <EventType scheduleType={scheduleType} setScheduleType={setScheduleType} shouldJoinClass={shouldJoinClass} setShouldJoinClass={setShouldJoinClass} />
//               <EventTime theme={theme} cacheRtl={cacheRtl} startHour={startHour} endHour={endHour} setStartHour={setStartHour} setEndHour={setEndHour} date={date} setDate={setDate} />
//               <EventFrequency theme={theme} cacheRtl={cacheRtl} frequency={frequency} setFrequency={setFrequency} />
//               <Box className="court-details flex-column">
//                 <Typography className="modal-body-text">
//                   מגרשים
//                 </Typography>
//                 <div className="flex align-center" style={{ gap: "0.5rem" }}>
//                   <SelectCourt theme={theme} cacheRtl={cacheRtl} courtNumbers={courtNumbers} setCourtNumbers={setCourtNumbers} />
//                   <CourtPrice price={price} setPrice={setPrice} paidStatus={paidStatus} setPaidStatus={setPaidStatus}/>
//                 </div>
//               </Box>
//               <Box className="flex-row">
//                   <EventDescription description={description} setDescription={setDescription} />
//                   <EventTitle title={title} setTitle={setTitle}/>
//               </Box>
//               <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
//               <div className="flex align-center" style={{ gap: "0.5rem", padding: "unset" }}>
//                 <InstructorsList instructorIndices={instructorIndices} setInstructorIndices={setInstructorIndices} />
//                 <ParticipantsList participantIndices={participantIndices} setPartipantIndices={setPartipantIndices} />
//               </div>
//               <Divider variant="middle" style={{ margin: "4.5vh 5vw" }} />
//               <div className='flex align-center justify-between save-cancel-btn-container'>
//                 <button onClick={handleSave} className='save-btn'>
//                   שמירה
//                 </button>
//                 <button className='cancel-btn'>
//                   ביטול
//                 </button>
//               </div>
//             </Box>
//           </Container>
//         </Box>
//       </Modal>