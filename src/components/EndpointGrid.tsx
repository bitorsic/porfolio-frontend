interface Endpoint {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
	path: string
}

const METHOD_TEXT_COLORS: Record<Endpoint['method'], string> = {
	GET:    'text-green-400',
	POST:   'text-blue-400',
	PUT:    'text-yellow-400',
	PATCH:  'text-orange-400',
	DELETE: 'text-red-400',
}

const endpoints: Endpoint[] = [
	{ method: 'GET', path: '/about' },
	{ method: 'GET', path: '/skills' },
	{ method: 'GET', path: '/projects' },
	{ method: 'GET', path: '/experience' },
]

interface EndpointGridProps {
	onSelect?: (endpoint: Endpoint) => void
}

export default function EndpointGrid({ onSelect }: EndpointGridProps) {
	return (
		<div className="flex flex-wrap justify-center gap-3">
			{endpoints.map((ep) => (
				<button
					key={ep.path}
					onClick={() => onSelect?.(ep)}
					className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-md border border-white/20 bg-transparent text-xs md:text-sm font-mono hover:bg-white/10 transition-colors cursor-pointer"
				>
					<span className={`font-semibold ${METHOD_TEXT_COLORS[ep.method]}`}>{ep.method}</span>
					<span className="text-white/70">{ep.path}</span>
				</button>
			))}
		</div>
	)
}
