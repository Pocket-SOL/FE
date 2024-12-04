import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../contexts/NotificationContext";
import { VscBell } from "react-icons/vsc";
import { VscBellDot } from "react-icons/vsc";
import logoIcon from "~/images/logoIcon.png";

export default function Header() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { hasNewNotification, setHasNewNotification } = useNotifications(); // NotificationContext 사용
	// const { hasNewNotification, setHasNewNotification } = useState(); // NotificationContext 사용
	const handleLogout = async () => {
		try {
			await axios.post(`/api/users/logout`);
		} catch (error) {
			console.error("로그아웃 중 오류 발생:", error);
		}
	};

	// 알림 클릭 시 동작
	const handleNotificationClick = () => {
		if (user.role === "parent") {
			navigate(`/parents/notification/${user.user_id}`);
		} else {
			navigate(`/children/notification/${user.user_id}`);
		}
		setHasNewNotification(false); // 클릭 후 알림 상태 초기화
	};
	return (
		<header className="bg-white">
			<nav
				aria-label="Global"
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
			>
				<div className="flex lg:flex-1">
					<a
						href="#"
						className="-m-1.5 p-1.5"
						onClick={(e) => {
							e.preventDefault();
							navigate(user?.role === "parent" ? "/parents" : "/children");
						}}
					>
						<span className="sr-only">Your Company</span>
						<img alt="Logo" src={logoIcon} className="h-8 w-auto" />
					</a>
				</div>
				<div className="flex lg:hidden items-center gap-3">
					{/* 알림 아이콘 */}
					{user ? (
						<div>
							{hasNewNotification ? (
								<VscBellDot
									className="text-red-500 text-2xl cursor-pointer"
									onClick={handleNotificationClick}
								/>
							) : (
								<VscBell
									className="text-red-500 text-2xl cursor-pointer"
									onClick={handleNotificationClick}
								/>
							)}
						</div>
					) : (
						""
					)}

					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon aria-hidden="true" className="h-6 w-6" />
					</button>
				</div>

				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<a
						href="/login"
						className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
						onClick={() => user && handleLogout()}
					>
						{user ? "Log out" : "Log in"}
					</a>
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className="lg:hidden"
			>
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
						</a>

						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="py-6">
								{user ? (
									<a
										href="/login"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
										onClick={handleLogout}
									>
										Log out
									</a>
								) : (
									<a
										href="/login"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
									>
										Log in
									</a>
								)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
}
