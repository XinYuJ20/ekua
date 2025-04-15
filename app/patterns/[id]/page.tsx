'use client'
import Script from "next/script";
import { useState, useEffect } from "react";
import { patterns } from "@/app/pattern_data";
import { use } from 'react';
import NotFoundPage from "@/app/not-found";
import BottomNav from "@/app/bottom-nav";
import { get } from "http";
import { useRouter } from 'next/navigation';

export default function ColorPage( { params }: { params: Promise<{ id: string }> } ) {
    const { id } = use(params); 
    console.log(params)
    const pattern = patterns.find(p => p.id == id);
    const router = useRouter();

    if(!pattern) {
         return <NotFoundPage/>
    }

    const patternUrl = pattern?.imageUrl
    //const testVector = "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/color-test1-05.svg";
    const [svgUrl, setSvgUrl] = useState(patternUrl);

    useEffect(() => {
        makeSVGcolor(svgUrl);
    }, [svgUrl]);

    // https://assets.codepen.io/5936329/Coloringbook1.svg
    // https://assets.codepen.io/40041/crest.svg
    // https://s3-us-west-2.amazoreact-router-domnaws.com/s.cdpn.io/40041/cheshire.svg
    return (
    <>
        <h1 className="text-2xl my-8 font-extrabold text-black tracking-wide uppercase text-center">COLOR YOUR PATTERN</h1>
            <div className="holder">

                <div id="imageonly"></div>

                <div className="held" id="ActivityDIV"></div>

                {/* <div className="held">
                    <a id="btnRandom" className="button">Randomize</a>

                    <a id="btnClear" className="button">Clear</a>

                    <a id="btnDownload" className="button">Upload</a>
                </div> */}
            </div>
            <BottomNav 
                leftButText="BACK"
                leftOnClick= {() => router.push("/patterns")} 
                leftClickable = {true}
                rightButText="NEXT"
                rightOnClick={() => router.push("/patterns/" + id + "/preview")}
                rightClickable={true}
                ></BottomNav>

            <Script>
                {`
                //console.clear();
                console.log('svgColor');

                // var colorHolder, swatchHolder;
                // var mainholder;

                // // const btnRandom = document.getElementById('btnRandom');
                // // const btnClear = document.getElementById('btnClear');
                // // const btnDownload = document.getElementById('btnDownload');
                // let svgObject, svgOutline, svgColor;
                // let swatchUp, swatchDown;
                // const fillSpeed = 0.15;
                // let chosenColor = '#D60032';
                // const colors = ['#D60032', '#FFE208', '#C20ADD', '#00D420', '#2EFFEF', '#FF6700', '#283CEA' ];
                // let closeOffset;
                
                // let selectedColor = null;

                if (!window._svgColorGlobals) {
                window._svgColorGlobals = {
                    mainHolder: null,
                    colorHolder: null,
                    swatchHolder: null,
                    svgObject: null,
                    svgOutline: null,
                    svgColor: null,
                    selectedColor: null,
                    chosenColor: '#D60032',
                    fillSpeed: 0.15,
                    colors: ['#D60032', '#FFE208', '#C20ADD', '#00D420', '#2EFFEF', '#FF6700', '#283CEA'],
                    closeOffset: null,
                    imgURL: null,
                    coloredURL: null
                };
                }
                var g = window._svgColorGlobals;

                function swatchClick(event) {
                    g.chosenColor = event.target.dataset.color;
                    console.log(g.chosenColor);

                    if (g.selectedColor) {
                        const existingBox = g.selectedColor.querySelector('.white-box');
                        if (existingBox) {
                            existingBox.remove();
                        }
                    }

                    // Set the new selected swatch
                    g.selectedColor = event.target;

                  
                    const whiteBox = document.createElement('div');
                    whiteBox.className = 'white-box';
                    g.selectedColor.appendChild(whiteBox);
                }


                function swatchMove(event) {
                    const moveTo = (event.type === 'mouseenter') ? swatchUp : swatchDown;
                    TweenMax.to('.swatchHolder', 0.5, moveTo);
                }

                function colorMe(event) {
                    TweenMax.to(event.target, g.fillSpeed, { fill: g.chosenColor });
                }

                // function colorRollover(event) {
                //     const rollover = (event.type === 'mouseenter') ? { scale: 1.2 } : { scale: 1 };
                //     TweenMax.to(event.target, 0.05, rollover);
                // }

               function download() {
                    const svg = document.querySelector("svg");
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

                            fetch(" https://570d-2620-8d-8000-1084-d257-6d31-3ae3-fcc8.ngrok-free.app/upload", {
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
                }


                function svgRandom() {
                    g.svgColor.forEach((element) => {
                        const randomNum = Math.floor(Math.random() * g.colors.length);
                        TweenMax.to(element, g.fillSpeed, { fill: g.colors[randomNum] });
                    });
                }

                function svgClear() {
                    g.svgColor.forEach((element) => {
                        TweenMax.to(element, g.fillSpeed, { fill: "#FFF" });
                    });
                }

                function makeSwatches() {
                    console.log('makeSwatches');
                    g.swatchHolder = document.createElement('ol');
                    g.swatchHolder.className = 'swatchHolder';
                    g.swatchHolder.style.position = 'sticky';
                    g.swatchHolder.style.bottom = '0px';
                    g.swatchHolder.style.right = '0px';
                    g.swatchHolder.style.listStyleType = 'none';
                    g.swatchHolder.style.textAlign = 'center';
                    g.swatchHolder.style.letterSpacing = '1px';
                    g.swatchHolder.style.fontFamily = 'Arial';
                    g.swatchHolder.style.display = 'flex';  // Changed to flexbox
                    g.swatchHolder.style.flexDirection = 'row';  // Makes it horizontal
                    g.swatchHolder.style.flexWrap = 'wrap';  // Allows wrapping if needed
                    g.swatchHolder.style.justifyContent = 'center'; // Centers the swatches
                    g.swatchHolder.style.alignItems = 'center';
                    g.swatchHolder.style.padding = '15px';
                    g.swatchHolder.style.width = '100vw';  // Adjust width dynamically
                    g.swatchHolder.style.maxWidth = '100%'; // Prevents overflow
                    g.swatchHolder.style.borderRadius = '20px';
                    g.swatchHolder.style.color = '#232323';
                    g.swatchHolder.style.color = '#232323';
                    g.swatchHolder.style.border = '0px';
                    document.querySelector('.holder').appendChild(g.swatchHolder);

                    
                    g.colorHolder = document.createElement('li');
                    g.colorHolder.className = 'colorHolder';
                    g.colorHolder.style.backgroundColor = '#FFFFFF';
                    g.colorHolder.style.width = '100%';
                    g.colorHolder.style.lineHeight = '100%';
                    g.colorHolder.style.padding = '10px 0px';
                    g.colorHolder.style.margin = '0px auto 15px auto';
                    g.colorHolder.style.cursor = 'pointer';
                    g.colorHolder.style.borderRadius = '20px';
                    g.swatchHolder.appendChild(g.colorHolder);

                    g.colors.forEach(color => {
                        const swatch = document.createElement('li');
                        swatch.style.backgroundColor = color;
                        swatch.dataset.color = color;
                        swatch.style.height = '50px';
                        swatch.style.width = '50px';
                        swatch.style.margin = '0px';
                        swatch.style.display = 'inline-block';
                        swatch.style.cursor = 'pointer';
                        swatch.style.borderRadius = '0px';
                        swatch.addEventListener('click', swatchClick);
                        // swatch.addEventListener('mouseenter', colorRollover);
                        // swatch.addEventListener('mouseleave', colorRollover);
                        g.swatchHolder.appendChild(swatch);
                    });

                    const swatchHeight = g.colorHolder.offsetHeight + g.colorHolder.offsetTop;
                    g.closeOffset = swatchHeight - g.swatchHolder.offsetHeight;

                    // swatchHolder.addEventListener('mouseenter', swatchMove);
                    // swatchHolder.addEventListener('mouseleave', swatchMove);
                    // swatchUp = { css: { bottom: '0px' } };
                    // swatchDown = { css: { bottom: g.closeOffset } };
                    
                }

                function makeSVGcolor(svgURL) {
                    //debugger;
                    console.log("makeSVGcolor called");
                    console.log(g.imgURL)
                    console.log(svgURL)
                    console.log(g)
                    if (g.imgURL != svgURL || g.imgURL == null || g.svgObject == null) {
                        g.imgURL = svgURL;
                        g.mainHolder = document.getElementById('ActivityDIV');
                        fetch(svgURL)
                            .then(response => {
                                console.log("Response received:", response);
                                return response.text();
                            })
                            .then(svgText => {
                                //debugger;
                                g.mainHolder.innerHTML = svgText;
                                g.svgObject = document.querySelector('svg');
                                const svg = document.querySelector('svg');
                                g.svgColor = Array.from(g.svgObject.querySelectorAll('g#Color > *'));
                                g.svgOutline = Array.from(g.svgObject.querySelectorAll('g:nth-child(1) > *'));
                                g.svgColor.forEach(el => el.addEventListener('click', colorMe));
                                if (g.swatchHolder == null) {
                                    makeSwatches();
                                }
                                else {
                                    document.querySelector('.holder').appendChild(g.swatchHolder);
                                }
                            }); 

                    }
                    else {
                        document.querySelector('.holder').appendChild(g.mainHolder);
                        document.querySelector('.holder').appendChild(g.swatchHolder);
                    }
                }

                //btnRandom.addEventListener('click', svgRandom);
                //btnClear.addEventListener('click', svgClear);
                // btnDownload.addEventListener('click', () => {
                //     download();
                // });

                `}
            </Script>
        </>
  );
}

