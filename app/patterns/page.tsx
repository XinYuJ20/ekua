import {patterns, Pattern} from "../pattern_data";
import PatternList from "./pattern-list";

export default function PatternSelect() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 mb-5">
            <h1 className="text-4xl font-bold mb-8 text-black justify-self-center">Select a Pattern...</h1>

            {/* load the pattern list onto page */}
            <PatternList  patterns={patterns} />
        </div>
    );
}