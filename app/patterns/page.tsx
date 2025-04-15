'use client'
import {patterns} from "../pattern_data";
import PatternSelect from "./pattern-select";

export default function PatternPage() {
    return (
        <>
            <h1 className="text-2xl my-8 mx-8 font-extrabold text-black tracking-wide uppercase text-left">SELECT YOUR PATTERN</h1>

            {/* load the pattern list onto page */}
            <PatternSelect  patterns={patterns} />
        </>
    );
}