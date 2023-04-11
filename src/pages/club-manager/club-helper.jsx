export const WeekDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
export const CourtNames = ["מגרש 1", "מגרש 2", "מגרש 3", "מגרש 4", "מגרש 5", "מגרש 6", "כחול מוזל", "אדום מוזל", "ירוק מוזל"]
export const TypeGames = ["טניס", "פאדל", "פיקלבול", "טניס חימר", "כדורסל", "כדורגל", "טניס קשה מקורה", "מגרש טניס מוזל", "טניס חופים", "דשא סינטטי"]
export const MemberTypes = ["כל החברים", "מנהל", "סטודנט\חייל", "מאמן", "מנויים"]
export const DayHours = () => {
    const hours = []
    for (let i = 0; i <= 24; i++) {
      if (i < 10) {
        hours.push("0" + i + ":00")
      } else {
        hours.push(i + ":00")
      }
    }
    return hours
}
export const DemoWorkHours = (setWorkHours) => {
    const hours1 = { days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "06:00", endHour: "24:00" } }
    const hours2 = { days: ["שישי"], hours: { startHour: "06:00", endHour: "23:00" } }
    const hours3 = { days: ["שבת"], hours: { startHour: "06:00", endHour: "23:00" } }
    setWorkHours([hours1, hours2, hours3])
}
export const DemoConstraintsData = [{ days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "06:00", endHour: "24:00" }, memberType: MemberTypes[0], price: 80 },
{ days: ["שישי", "שבת"], hours: { startHour: "06:00", endHour: "21:00" }, memberType: MemberTypes[0], price: 80 },
{ days: ["שישי", "שבת"], hours: { startHour: "21:00", endHour: "23:00" }, memberType: MemberTypes[1], price: 60 }]
export const EmptyConstraint = { days: [], hours: { startHour: "", endHour: "" }, memberType: "", price: "" }
export const DemoPunchCards = [{cardType: "בוקר אטרקטיבי", isMember: false, creditAmount: 11, eachCreditInMinutes:60, dueNumDays: 365, blockOnDate: 'ללא הגבלה', price: 550, showForSale: true, validFor: 'פתוח לכולם', additionalDetails:'כרטיסיית יום סופר משתלמת לשימוש בכל ימות השבוע פרט לשישישבת.בתוקף לשנה מיום הרכישה.מאמנים לא יורשו לעלות למגרש עם שימוש בכרטיסיה זו .', validDateTime: {days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "06:00", endHour: "24:00" }}},
{cardType: "סופר דיל 10 + 1", isMember: false, creditAmount: 11, eachCreditInMinutes:60, dueNumDays: 365, blockOnDate: 'ללא הגבלה', price: 700, showForSale: true, validFor: 'פתוח לכולם', additionalDetails:'כרטיסיית יום סופר משתלמת לשימוש בכל ימות השבוע פרט לשישישבת.בתוקף לשנה מיום הרכישה.מאמנים לא יורשו לעלות למגרש עם שימוש בכרטיסיה זו .', validDateTime: {days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"], hours: { startHour: "07:00", endHour: "24:00" }}}]