import {patterns, Pattern} from "../pattern_data";
import PatternList from "./pattern-list";

export default function PatternSelect() {
    return (
        <>
            <h1 className="text-2xl my-8 font-extrabold text-black tracking-wide uppercase text-center">SELECT YOUR PATTERN</h1>

            {/* load the pattern list onto page */}
            <PatternList  patterns={patterns} />
        </>
    );
}