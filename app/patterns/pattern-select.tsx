'use client'
import {Pattern} from "../pattern_data";
import Image from 'next/image';
import Link from 'next/link';
import BottomNav from "../bottom-nav";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function PatternSelect({patterns}: {patterns: Pattern[]}) {
    const [imageId, setImageId] = useState("-1");
    const router = useRouter();

    return (
        <>
            <div className="grid grid-flow-row grid-cols-2 gap-6 mx-8 justify-self-center">
                {patterns.map(pattern => (
                    <button key={pattern.id} 
                            onClick={() => setImageId(pattern.id)}
                            className="justify-self-center">
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

            <div className='fixed bottom-0 w-full'>
            <BottomNav 
                leftButText="BACK"
                leftOnClick= {()=> {router.push("/")}} 
                leftClickable={true}
                rightButText="NEXT"
                rightOnClick={imageId == "-1" ? ()=> {router.push("#")} : () => {router.push("/patterns/" + imageId)}}
                rightClickable={imageId == "-1" ? false : true}
            ></BottomNav>
            </div>
        </>
    )
}