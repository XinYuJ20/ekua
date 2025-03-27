import {patterns, Pattern} from "../pattern_data";
import PatternList from "./pattern-list";

export default function PatternSelect() {
    return (
        <>
            <h1 className="text-black">Select a Pattern...</h1>

            {/* load the pattern list onto page */}
            <PatternList patterns={patterns} />
        </>
    );
}