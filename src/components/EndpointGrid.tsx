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

interface EndpointGridProps {
	basePath: string
	endpoints: Endpoint[]
	selectedPath: string | null
	onSelect?: (fullPath: string, method: Endpoint['method']) => void
}

export default function EndpointGrid({ basePath, endpoints, selectedPath, onSelect }: EndpointGridProps) {
	return (
		<div className="flex flex-wrap justify-center gap-3">
			{endpoints.map((ep) => {
				const fullPath = basePath + ep.path
				const isSelected = selectedPath === fullPath
				return (
					<button
						key={ep.path}
						onClick={() => onSelect?.(fullPath, ep.method)}
						className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-md border text-xs md:text-sm font-mono transition-colors cursor-pointer ${
							isSelected
								? 'border-white/40 bg-white/15'
								: 'border-white/20 bg-transparent hover:bg-white/10'
						}`}
					>
						<span className={`font-semibold ${METHOD_TEXT_COLORS[ep.method]}`}>{ep.method}</span>
						<span className="text-white/70">{ep.path}</span>
					</button>
				)
			})}
		</div>
	)
}
