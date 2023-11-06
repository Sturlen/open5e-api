import { useCallback, useMemo, useState } from "react"
import algoliasearch from "algoliasearch/lite"

import type { Monster } from "../api/monster"

const algoliaClient = algoliasearch(
    import.meta.env.PUBLIC_ALGOLIA_APP_ID,
    import.meta.env.PUBLIC_ALGOLIA_SEARCH_KEY,
    {}
)
const searchClient = {
    ...algoliaClient,
    search(requests) {
        if (requests.every(({ params }) => !params.query)) {
            return Promise.resolve({
                results: requests.map(() => ({
                    hits: [],
                    nbHits: 0,
                    nbPages: 0,
                    page: 0,
                    processingTimeMS: 0,
                    hitsPerPage: 0,
                    exhaustiveNbHits: false,
                    query: "",
                    params: "",
                })),
            })
        }

        return algoliaClient.search(requests)
    },
}

const imgTag = (img: boolean) => (img ? "🖼️" : "")

const MonsterIndex = searchClient.initIndex("monsters")

type AppProps = {
    initialResults: Monster[]
}

export default function Search({ initialResults }: AppProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Monster[]>(initialResults)

    const refresh = useMemo(
        () => async (value: string) => {
            setQuery(value)
            if (value === "") {
                setResults(initialResults)
            } else {
                const response = await MonsterIndex.search<Monster>(value)
                setResults(response.hits)
            }
        },
        []
    )

    return (
        <div className="search">
            <input
                value={query}
                onChange={(event) => refresh(event.target.value)}
                placeholder="Search"
            />
            <div className="logo-box">
                <span>Search powered by </span>
                <img
                    className="algolia-logo"
                    src="./Algolia-logo-blue.svg"
                    alt="Algolia logo"
                />
            </div>

            <ol>
                {results.map((hit) => (
                    <li key={hit.slug} className="card">
                        <span className="title">
                            <a href={`/monsters/${hit.slug}`}>
                                <strong>{hit.name}</strong>
                            </a>

                            <span className="source">{hit.document__slug}</span>
                        </span>
                        <p>
                            {"CR " +
                                hit.challenge_rating +
                                " " +
                                hit.size +
                                " " +
                                hit.type +
                                " " +
                                imgTag(!!hit.img)}
                        </p>
                    </li>
                ))}
            </ol>
            {results.length === 0 && (
                <p>Critical Failure: Nothing was found.</p>
            )}
        </div>
    )
}
