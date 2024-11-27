import { useState } from "react";
import { BsFillCalendarHeartFill } from "react-icons/bs";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const DateSelection = ({ onChange }) => {
	const [date, setDate] = useState("");
	const [open, setOpen] = useState(false);

	const handleOpenCalander = () => {
		setOpen(true);
	};
	const handleChangeDate = (e) => {
		if (moment.isMoment(e) === true) {
			const currentDate = e.format("YYYY/MM/DD");
			setDate(currentDate); //moment 객체반환, format매서드 사용.
			onChange(currentDate); // 부모에게 날짜 전달
		} else {
			const currentDate = e.target.value;
			setDate(currentDate);
			onChange(currentDate); // 부모에게 날짜 전달
		}

		setOpen(false);
	};
	return (
		<div>
			<input
				style={{
					width: 220,
					height: 35,
					borderRadius: "5px",
					border: "none",
					backgroundColor: "#F6F6F6",
				}}
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
				<span>
					<button
						style={{ borderRadius: "5px" }}
						type="button"
						onClick={handleOpenCalander}
					>
						<BsFillCalendarHeartFill />
					</button>
				</span>
			)}
		</div>
	);
};

export default DateSelection;
