import {useState} from "react";

export type LocationSearchProps = {
    inputChange: (search: string) => void
}
export default function LocationSearch({inputChange}: LocationSearchProps) {
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        if (!search.trim()) return;
        inputChange(search)
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="search"
                placeholder="Enter location..."
                className="w-full rounded-2xl border border-solid border-black py-3.5 pl-4 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button
                onClick={handleSearch}
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80 active:scale-95"
            >
                Search
            </button>
        </div>
    );
}