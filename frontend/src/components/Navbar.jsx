import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Home, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-emerald-400 items-center space-x-3 flex group'>
						<div className='relative w-10 h-10'>
							<div className='absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg transform group-hover:scale-110 transition-transform duration-300 opacity-75 group-hover:opacity-100'></div>
							<svg className='w-10 h-10 relative' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path d='M10 8h20v4H10z' fill='#0f172a' />
								<path d='M8 12h24c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V14c0-1.1.9-2 2-2z' fill='#10b981' />
								<path d='M14 16v8m12 0v-8' stroke='#0f172a' strokeWidth='2' strokeLinecap='round' />
								<circle cx='20' cy='18' r='2' fill='#0f172a' />
							</svg>
						</div>
						<span>E-Commerce</span>
					</Link>

					<nav className='flex flex-wrap items-center gap-6'>
						<Link
							to={"/"}
							className='group relative flex items-center gap-2 text-gray-300 font-medium transition-all duration-300 hover:text-emerald-400 px-3 py-2'
						>
							<Home size={20} className='transition-transform duration-300 group-hover:scale-110' />
							<span>Home</span>
							<span className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-300 group-hover:w-full'></span>
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='group relative flex items-center gap-2 text-gray-300 font-medium transition-all duration-300 hover:text-emerald-400 px-3 py-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg hover:from-emerald-900 hover:to-emerald-800 border border-gray-700 hover:border-emerald-500 shadow-md hover:shadow-emerald-500/20'
							>
								<ShoppingCart size={20} className='transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12' />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -right-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 rounded-full px-2.5 py-0.5 text-xs font-bold scale-100 group-hover:scale-110 transition-transform duration-300 shadow-lg'
									>
										{cart.length}
									</span>
								)}
								<span className='absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300'></span>
							</Link>
						)}
						{user && (
							<Link
								to={"/orders"}
								className='group relative flex items-center gap-2 text-gray-300 font-medium transition-all duration-300 hover:text-emerald-400 px-3 py-2'
							>
								<Package size={20} className='transition-transform duration-300 group-hover:scale-110' />
								<span className='hidden sm:inline'>Orders</span>
								<span className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-300 group-hover:w-full'></span>
							</Link>
						)}
						{isAdmin && (
							<Link
								className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
