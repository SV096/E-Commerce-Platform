import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { ShoppingBag, Calendar, Check, X, Eye, ArrowLeft } from "lucide-react";

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [expandedOrder, setExpandedOrder] = useState(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get("/payments/orders");
				setOrders(response.data.orders);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	if (loading) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gray-900 pt-20 pb-12'>
			<div className='max-w-6xl mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='mb-8'
				>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors'
					>
						<ArrowLeft size={20} />
						<span>Back to Home</span>
					</Link>

					<div className='flex items-center gap-3 mb-6'>
						<ShoppingBag size={32} className='text-emerald-400' />
						<h1 className='text-4xl font-bold text-white'>Order History</h1>
					</div>
					<p className='text-gray-400 text-lg'>Track all your past purchases and orders</p>
				</motion.div>

				{orders.length === 0 ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='text-center py-16'
					>
						<ShoppingBag size={64} className='mx-auto text-gray-600 mb-4' />
						<p className='text-gray-400 text-xl'>No orders yet. Start shopping to see your orders here!</p>
						<Link
							to='/'
							className='inline-block mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors'
						>
							Continue Shopping
						</Link>
					</motion.div>
				) : (
					<div className='grid gap-6'>
						{orders.map((order, index) => (
							<motion.div
								key={order._id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
								className='bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-emerald-500 transition-all'
							>
								<div className='p-6'>
									{/* Order Header */}
									<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
										<div>
											<h3 className='text-xl font-bold text-white mb-2'>
												Order #{order._id.slice(-8).toUpperCase()}
											</h3>
											<div className='flex items-center gap-2 text-gray-400'>
												<Calendar size={16} />
												<span>{new Date(order.createdAt).toLocaleDateString()}</span>
											</div>
										</div>

										<div className='text-right'>
											<p className='text-3xl font-bold text-emerald-400'>
												₹{order.totalAmount?.toLocaleString("en-IN", {
													maximumFractionDigits: 2,
												})}
											</p>
											<div className='flex items-center gap-2 justify-end mt-2'>
												<Check size={16} className='text-green-400' />
												<span className='text-green-400 font-semibold'>Completed</span>
											</div>
										</div>
									</div>

									{/* Order Items Preview */}
									<div className='mb-4 pb-4 border-b border-gray-700'>
										<p className='text-gray-400 mb-3'>
											<span className='font-semibold text-white'>{order.products?.length || 0}</span> item
											{order.products?.length !== 1 ? "s" : ""}
										</p>
										<div className='space-y-2'>
											{order.products?.slice(0, 2).map((item, idx) => (
												<div key={idx} className='flex items-center justify-between text-sm'>
													<span className='text-gray-300'>{item.product?.name}</span>
													<span className='text-gray-400'>x{item.quantity}</span>
												</div>
											))}
											{order.products?.length > 2 && (
												<p className='text-emerald-400 text-sm'>
													+{order.products.length - 2} more item{order.products.length - 2 !== 1 ? "s" : ""}
												</p>
											)}
										</div>
									</div>

									{/* Expand Button */}
									<button
										onClick={() =>
											setExpandedOrder(expandedOrder === order._id ? null : order._id)
										}
										className='flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium'
									>
										<Eye size={16} />
										{expandedOrder === order._id ? "Hide Details" : "View Details"}
									</button>

									{/* Expanded Details */}
									{expandedOrder === order._id && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className='mt-6 pt-6 border-t border-gray-700'
										>
											<div className='space-y-4'>
												<div>
													<h4 className='text-lg font-semibold text-white mb-3'>
														Order Items ({order.products?.length || 0})
													</h4>
													<div className='space-y-3'>
														{order.products?.map((item, idx) => (
															<div key={idx} className='flex gap-4'>
																{item.product?.image && (
																	<img
																		src={item.product.image}
																		alt={item.product?.name}
																		className='w-16 h-16 rounded-lg object-cover'
																	/>
																)}
																<div className='flex-1'>
																	<p className='text-white font-medium'>{item.product?.name}</p>
																	<p className='text-gray-400 text-sm'>{item.product?.category}</p>
																	<div className='flex justify-between mt-2'>
																		<span className='text-emerald-400'>
																			₹{item.price?.toLocaleString("en-IN", {
																				maximumFractionDigits: 2,
																			})}
																		</span>
																		<span className='text-gray-400'>Qty: {item.quantity}</span>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>

												<div className='bg-gray-900 rounded-lg p-4'>
													{/* Calculate subtotal from products or use originalAmount */}
													{(() => {
														const subtotal =
															order.originalAmount ||
															order.products?.reduce(
																(sum, item) => sum + item.price * item.quantity,
																0
															) ||
															0;
														const total = order.totalAmount || 0;
														const calculatedDiscount = subtotal > total ? subtotal - total : 0;
														const discountPercent = subtotal > 0 ? ((calculatedDiscount / subtotal) * 100).toFixed(1) : 0;

														return (
															<>
																<div className='flex justify-between text-gray-300 mb-2'>
																	<span>Subtotal:</span>
																	<span>
																		₹
																		{subtotal.toLocaleString("en-IN", {
																			maximumFractionDigits: 2,
																		})}
																	</span>
																</div>

																{calculatedDiscount > 0 && (
																	<>
																		<div className='flex justify-between text-red-400 mb-2'>
																			<span>Discount ({discountPercent}%)</span>
																			<span>
																				-₹
																				{calculatedDiscount.toLocaleString("en-IN", {
																					maximumFractionDigits: 2,
																				})}
																			</span>
																		</div>
																		{order.couponCode && (
																			<div className='flex justify-between text-emerald-400 mb-2 text-sm'>
																				<span>Coupon Code:</span>
																				<span className='font-semibold'>{order.couponCode}</span>
																			</div>
																		)}
																	</>
																)}

																<div className='flex justify-between text-lg font-bold text-emerald-400 pt-2 border-t border-gray-700'>
																	<span>Total:</span>
																	<span>
																		₹
																		{total.toLocaleString("en-IN", {
																			maximumFractionDigits: 2,
																		})}
																	</span>
																</div>
															</>
														);
													})()}
												</div>

												<div className='text-sm text-gray-400'>
													<p>Order ID: {order._id}</p>
													<p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
												</div>
											</div>
										</motion.div>
									)}
								</div>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OrdersPage;
