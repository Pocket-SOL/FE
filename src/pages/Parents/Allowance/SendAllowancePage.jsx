import { useState } from "react";
import "./SendAllowancePage.css";
import Layout from "../../../layouts/Layout";

export default function SendAllowancePage() {
  const [amount, setAmount] = useState("");
  //숫자 3자리마다 콤마추가하기
  const localeAmount = Number(amount).toLocaleString("ko-KR");
  const maxLength = 10;
  return (
    <Layout>
      <div className="Container">
        <div>하민지에게 용돈보내기</div>
        <h1>얼마를 보낼래요?</h1>
        <h3>{localeAmount}원</h3>
        <p>출금 가능 잔액{}원</p>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "←"].map((num) => (
            <button
              key={num}
              onClick={() => {
                if (num === "←") {
                  setAmount(amount.slice(0, -1));
                } else if (amount.length < maxLength) {
                  setAmount(amount + num); //10미만일때만 숫자늘어나도록
                }
              }}
            >
              {num}
            </button>
          ))}
        </div>
        <button className="complete-button">완료</button>
      </div>
    </Layout>
  );
}
