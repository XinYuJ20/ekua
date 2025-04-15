'use client'
import BottomNav from "@/app/bottom-nav";
import { patterns } from "@/app/pattern_data";
import { use, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation'
import PreviewImage from "./previewImage";
export default function ColorPage( { params }: { params: Promise<{ id: string }> } ) {
    const { id } = use(params); 
    console.log(params)
    const pattern = patterns.find(p => p.id == id);
    const router = useRouter();
    
    if(window._svgColorGlobals == undefined) {
        redirect("/");
    }
    const g = window._svgColorGlobals;
    const svg = window._svgColorGlobals.svgObject;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    window._svgColorGlobals.coloredURL = URL.createObjectURL(svgBlob);
    
    const download = () => {
                    const g = window._svgColorGlobals;
                    const svg = window._svgColorGlobals.svgObject;
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const img = new Image();
                    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
                    const url = URL.createObjectURL(svgBlob);

                    img.onload = function () {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        URL.revokeObjectURL(url);

                        canvas.toBlob((blob) => {
                            const formData = new FormData();
                            formData.append("image", blob, "coloringpage.png");

                            fetch(" https://e2f5-2620-8d-8000-1074-c858-d39f-580d-ad3a.ngrok-free.app/upload", {
                                method: "POST",
                                body: formData,
                            })
                            .then((res) => res.json())
                            .then((data) => {
                                window.location.href = "/confirmation";  
                            })   
                            .catch((err) => console.error("Upload failed:", err));
                        }, "image/png");
                    };

                    img.src = url;
                };
    
    return(
        <>
            <h1 className="text-2xl my-8 font-extrabold text-black tracking-wide uppercase text-center">PREVIEW YOUR PATTERN</h1>

            <div className="grid grid-flow-row grid-cols-2 justify-self-center">
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
            </div>

            <BottomNav 
                leftButText="BACK"
                leftOnClick={() => router.push("/patterns/" + id)} 
                leftClickable={true}
                rightButText="SUBMIT"
                rightOnClick={download}
                rightClickable={true}
            ></BottomNav>
        </>
    );
}
