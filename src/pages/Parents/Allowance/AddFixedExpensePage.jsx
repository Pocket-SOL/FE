"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
	Field,
	Label,
	Switch,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";

import DataSelection from "../../Children/GroupPurchase/DataSelection";
import "./AddFixedExpensePage.css";
export default function AddFixedExpensePage() {
	const [agreed, setAgreed] = useState(false);

	return (
		<div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="block text-2xl  text-gray-900">
				고정 지출 정보를 등록하고
			</div>
			<div className="block text-2xl  text-gray-900">편하게 송금하세요</div>

			<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
				<div className="sm:col-span-2">
					<label
						htmlFor="받는 분"
						className="block text-sm/6 font-semibold text-gray-900 mt-12"
					>
						받는 분
					</label>
					<div className="mt-2.5">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>
				<div className="sm:col-span-2">
					<label
						htmlFor="계좌번호"
						className="block text-sm/6 font-semibold text-gray-900"
					>
						계좌번호
					</label>
					<div className="relative mt-2.5">
						<div className="absolute inset-y-0 left-0 flex items-center">
							<label htmlFor="country" className="sr-only">
								Country
							</label>
							<select
								id="country"
								name="country"
								className="h-full rounded-md border-0 bg-transparent bg-none text-xs  py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
							>
								<option>경남은행</option>
								<option>광주은행</option>
								<option>단위농협</option>
								<option>부산은행</option>
								<option>새마을금고</option>
								<option>산림조합</option>
								<option>신한은행</option>
								<option>신협</option>
								<option>씨티은행</option>
								<option>우리은행</option>
								<option>우체국예금보험</option>
								<option>저축은행중앙회</option>
								<option>전북은행</option>
								<option>제주은행</option>
								<option>카카오뱅크</option>
								<option>케이뱅크</option>
								<option>토스뱅크</option>
								<option>하나은행</option>
								<option>홍콩상하이은행</option>
								<option>IBK기업은행 </option>
								<option>KB국민은행 </option>
								<option>DGB대구은행</option>
								<option>KDB산업은행</option>
								<option>NH농협은행</option>
								<option>SC제일은행 </option>
								<option>Sh수협은행</option>
							</select>
							<ChevronDownIcon
								aria-hidden="true"
								className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
							/>
						</div>
						<input
							id="phone-number"
							name="phone-number"
							type="tel"
							autoComplete="tel"
							className="block w-full rounded-md border-0 px-3.5 py-2 pl-36 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
						/>
					</div>
				</div>
				<div className="sm:col-span-2">
					<label
						htmlFor="받는 분"
						className="block text-sm/6 font-semibold text-gray-900"
					>
						금액
					</label>
					<div className="mt-2.5">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>
				<div className="sm:col-span-2">
					<label
						htmlFor="받는 분"
						className="block text-sm/6 font-semibold text-gray-900"
					>
						자동 이체 날짜
					</label>
					<div className="mt-2.5">
						{/* <input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
						/> */}
						<DataSelection className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
					</div>
				</div>
			</div>

			<div className="mt-10">
				<button className="complete-button">완료</button>
			</div>
		</div>
	);
}
