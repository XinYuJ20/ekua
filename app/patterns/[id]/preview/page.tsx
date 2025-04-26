'use client'
import BottomNav from "@/app/bottom-nav";
import { patterns } from "@/app/pattern_data";
import { use, useEffect, useState } from 'react';
import { useRouter, redirect } from 'next/navigation'
import NextImage from "next/image";
import PreviewImage from "./previewImage";
export default function ColorPage( { params }: { params: Promise<{ id: string }> } ) {
    const router = useRouter();
    if(window._svgColorGlobals == undefined) {
        redirect("/");
    }


    const { id } = use(params); 
    console.log(params)
    const pattern = patterns.find(p => p.id == id);
    const { coloredURL } = window._svgColorGlobals;
    const [previewImage, setPreviewImage] = useState(coloredURL);

    
    


    useEffect(() => {    
        //merge image
        console.log("its running")
        const canvas = document.getElementById("previewImg");
        const ctx = canvas.getContext("2d");
        if(ctx == null) {
            console.log("ctx is null")
        }
         const img = new Image();
        img.src = coloredURL;

        console.log("imgsrc")
        console.log(img.src);
        img.onload = () => {
            //debugger;
            for(let r = 0; r < 4; r++) {
                let y = 0+r*150;
                for(let c = 0; c < 2; c++) {
                    let x=0+c*150;
                    ctx.drawImage(img, x, y, 150, 150);
                }
            }
        }
        setPreviewImage(canvas.toDataURL("image/png"))
    }, []);
    


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
                if(blob != null){
                    formData.append("image", blob, "coloringpage.png");

                    fetch("https://279d-2620-8d-8000-1084-911a-c640-8f8f-2f5.ngrok-free.app/upload", {
                        method: "POST",
                        body: formData,
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        window.location.href = "/confirmation";  
                    })   
                    .catch((err) => console.error("Upload failed:", err));
                }
                else{
                    console.log("blob is null :,)");
                }
            }, "image/png");
        };

        img.src = url;
    };
    
    return(
        <>
            <h1 className="text-2xl my-8 mx-8 font-extrabold text-black tracking-wide uppercase text-left">PREVIEW YOUR PATTERN</h1>

            <div className="grid grid-flow-row grid-cols-2 justify-self-center gap-0">
                {/* <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage>
                <PreviewImage imageUrl={window._svgColorGlobals.coloredURL}></PreviewImage> */}
                
            </div>


            <canvas id="previewImg" height="450" className="m-auto"></canvas>

            <div className='fixed bottom-0 w-full'>
            <BottomNav 
                leftButText="BACK"
                leftOnClick={() => router.push("/patterns/" + id)} 
                leftClickable={true}
                rightButText="SUBMIT"
                rightOnClick={download}
                rightClickable={true}
            ></BottomNav>
            </div>
        </>
    );
}
