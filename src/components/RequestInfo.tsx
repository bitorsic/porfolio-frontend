interface RequestInfoProps {
	method: string
	endpoint: string
	status: number | null
	responseTime: number | null  // ms
	payloadSize: number | null   // bytes
}

const METHOD_TEXT_COLORS: Record<string, string> = {
	GET:    'text-green-400',
	POST:   'text-blue-400',
	PUT:    'text-yellow-400',
	PATCH:  'text-orange-400',
	DELETE: 'text-red-400',
}

function statusColor(status: number | null): string {
	if (status === null) return 'text-white/30'
	if (status < 300) return 'text-green-400'
	if (status < 400) return 'text-yellow-400'
	return 'text-red-400'
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`
	return `${(bytes / 1024).toFixed(1)} KB`
}

export default function RequestInfo({ method, endpoint, status, responseTime, payloadSize }: RequestInfoProps) {
	const methodColor = METHOD_TEXT_COLORS[method] ?? 'text-white/60'

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-[10px] md:text-xs font-mono">
			{/* Row 1: Method + endpoint */}
			<div className="flex items-center justify-center sm:justify-start gap-2">
				<span className={`font-semibold ${methodColor}`}>
					{method}
				</span>
				<span className="text-white/70">{endpoint}</span>
			</div>

			{/* Row 2 on mobile / rest of row on desktop */}
			<div className="flex items-center justify-between sm:justify-normal sm:gap-4">
				{/* Status */}
				<div className="flex items-center gap-1.5">
					<span className="text-white/30">status</span>
					<span className={`font-semibold ${statusColor(status)}`}>
						{status ?? '—'}
					</span>
				</div>

				<div className="h-3 w-px bg-white/10" />

				{/* Response time */}
				<div className="flex items-center gap-1.5">
					<span className="text-white/30">time</span>
					<span className="text-white/70">
						{responseTime !== null ? `${responseTime} ms` : '—'}
					</span>
				</div>

				<div className="h-3 w-px bg-white/10" />

				{/* Payload size */}
				<div className="flex items-center gap-1.5">
					<span className="text-white/30">size</span>
					<span className="text-white/70">
						{payloadSize !== null ? formatBytes(payloadSize) : '—'}
					</span>
				</div>
			</div>
		</div>
	)
}
