'use client'
import {Pattern} from "../pattern_data";
import Image from 'next/image';
import Link from 'next/link';
import BottomNav from "../bottom-nav";
import { useState } from "react";

export default function PatternSelect({patterns}: {patterns: Pattern[]}) {
    const [imageId, setImageId] = useState("-1");

    return (
        <>
            <div className="grid grid-flow-row grid-cols-2 gap-6 mx-6 justify-self-center">
                {patterns.map(pattern => (
                    <button key={pattern.id} 
                            onClick={() => setImageId(pattern.id)}>
                        <Image
                            src={pattern.imageUrl}
                            width={pattern.imageWidth}
                            height={pattern.imageHeight}
                            alt={pattern.name}
                            className={pattern.id === imageId ? "border-4 border-black" : "border border-gray-500"}
                        />
                    </button>
                ))}
            </div>
        
            <BottomNav 
                leftButText="BACK"
                leftLink="/" 
                rightButText="NEXT"
                rightLink={imageId == "-1" ? "-1" : "/patterns/" + imageId}
            ></BottomNav>
        </>
    )
}