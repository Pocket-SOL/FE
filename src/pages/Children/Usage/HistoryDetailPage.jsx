import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHistoryDetail } from "../../../libs/apis/histories";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
export default function HistoryDetailPage() {
	const [history, setHistory] = useState();
	const [loading, setLoading] = useState(true);
	const [photo, setPhoto] = useState(false);
	const [historyId, setHistoryId] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const historyData = await fetchHistoryDetail(id);
				setHistoryId(id);
				//사진 불러오는 api
				setHistory(historyData);
				if (historyData.photo) {
					setPhoto(true);
					console.log(historyData.photo);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear().toString().slice(-2);
		const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
		const day = date.getDate();
		return `${year}.${month}.${day}`;
	};

	if (loading) return <p>Loading...</p>;
	return (
		<main className="flex overflow-hidden flex-col pb-96 mx-auto w-full text-lg text-black bg-white rounded-2xl max-w-[480px]">
			<section className="flex flex-col items-start px-2.5 mt-7 w-full">
				<button className="text-gray-600">
					<ChevronLeftIcon className="h-5 w-6" onClick={() => navigate(-1)} />
				</button>
				<article className="flex gap-10 self-center mt-4 w-full max-w-[318px]">
					<div className="flex flex-col flex-1 self-start mt-1.5">
						<h1 className="ml-1 text-black text-2xl">
							{history.account_holder}
						</h1>

						<p className="mt-4 ml-1 text-black text-2xl font-bold">
							{history.transaction_type === "출금" ? "- " : "+ "}
							{~~history.amount} <span className="text-xl">원</span>
						</p>
					</div>
					{photo ? (
						<>
							<img
								className="flex shrink-0 w-36 h-36 rounded-xl bg-zinc-100"
								src={history.photo}
								alt="History Photo"
								onClick={() =>
									navigate(
										`/children/usage-history/photo?historyId=${historyId}`,
									)
								}
							/>
						</>
					) : (
						<div
							className="flex shrink-0 w-36 h-36 rounded-xl bg-zinc-100"
							onClick={() =>
								navigate(`/children/usage-history/photo?historyId=${historyId}`)
							}
						/>
					)}
				</article>
				<div className="flex gap-4 mt-16 ml-5">
					{!photo ? (
						<>
							<p
								className="basis-auto text-black text-lg"
								onClick={() =>
									navigate(
										`/children/usage-history/photo?historyId=${historyId}`,
									)
								}
							>
								사진을 남겨보세요
							</p>
							<button>
								<ChevronRightIcon
									className="h-4 w-4"
									onClick={() =>
										navigate(
											`/children/usage-history/photo?historyId=${historyId}`,
										)
									}
								/>
							</button>
						</>
					) : (
						""
					)}
				</div>

				<hr className="shrink-0 self-stretch mt-8 border-2 border-gray-200 border-solid h-[3px]" />
				<section className="flex flex-col self-center mt-2 w-full max-w-[299px]">
					<PaymentDetail
						label="결제일시"
						value={
							formatDate(history.date).toString() +
							" " +
							history.time.toString().slice(0, 5)
						}
						className={"mt-9"}
					/>
					<PaymentDetail
						label="사용처"
						value={history.account_holder}
						className={"mt-5"}
					/>
				</section>
			</section>
		</main>
	);
}

export function PaymentDetail({ label, value, className }) {
	return (
		<div
			className={`flex gap-10 justify-between items-center w-full ${className}`}
		>
			<p className="self-stretch my-auto whitespace-nowrap text-lg">{label}</p>
			<p className="self-stretch my-auto text-right text-base">{value}</p>
		</div>
	);
}
