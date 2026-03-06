export default function Navbar() {
	return (
		<header className="w-full border-b border-white/10 bg-[#1e1e1e]">
			<div className="mx-auto w-full max-w-3xl flex justify-center items-center gap-3 px-4 py-4">
				<a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
					<img src="/logo.png" alt="logo" className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover" />
					<span className="text-white font-semibold text-sm md:text-lg tracking-tight">
						bitorsic
					</span>
				</a>
			</div>
		</header>
	)
}
