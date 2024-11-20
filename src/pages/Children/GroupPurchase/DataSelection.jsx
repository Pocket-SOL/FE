import { useState } from "react";
import { BsFillCalendarHeartFill } from "react-icons/bs";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const DateSelection = () => {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenCalander = () => {
    setOpen(true);
  };
  const handleChangeDate = (e) => {
    if (moment.isMoment(e) === true) {
      const currentDate = e.format("YYYY/MM/DD");
      setDate(currentDate); //moment 객체반환, format매서드 사용.
      console.log(currentDate);
    } else {
      const currentDate = e.target.value;
      setDate(currentDate);
      console.log(currentDate);
    }

    setOpen(false);
  };
  return (
    <div>
      <input
      style={{borderRadius: '5px'}}
        type="text"
        value={date}
        placeholder="날짜 선택 or 입력"
        onChange={handleChangeDate}
      />
      {open ? (
        <Datetime
          input={false}
          onChange={handleChangeDate}
          timeFormat={false}
          value={date}
        />
      ) : (
        <button style={{borderRadius: '5px'}}type="button" onClick={handleOpenCalander}>
          <BsFillCalendarHeartFill />
        </button>
      )}
    </div>
  );
};

export default DateSelection;
