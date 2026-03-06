import { useMemo } from 'react'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/vs2015.css'
import stringify from '@aitodotai/json-stringify-pretty-compact'

hljs.registerLanguage('json', json)

interface JsonViewerProps {
	data: object
}

const URL_RE = /(https?:\/\/[^\s<]+?)(?=&quot;|'|<|\s|$)/g

function linkifyHighlighted(html: string): string {
	// Only replace URLs that appear inside hljs string spans to avoid touching keys or structure
	return html.replace(
		/(<span class="hljs-string">)(.*?)(<\/span>)/g,
		(_, open, content, close) => {
			const linked = content.replace(
				URL_RE,
				(url: string) =>
					`<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-70">${url}</a>`
			)
			return `${open}${linked}${close}`
		}
	)
}

export default function JsonViewer({ data }: JsonViewerProps) {
	const highlighted = useMemo(() => {
		const raw = hljs.highlight(
			stringify(data, { objectMargins: true }),
			{ language: 'json' }
		).value
		return linkifyHighlighted(raw)
	}, [data])

	return (
		<div className="rounded-lg border border-white/10 overflow-hidden flex flex-col flex-1 min-h-0">
			<pre className="overflow-auto flex-1 text-xs md:text-sm p-4">
				<code
					className="hljs language-json"
					dangerouslySetInnerHTML={{ __html: highlighted }}
				/>
			</pre>
		</div>
	)
}
