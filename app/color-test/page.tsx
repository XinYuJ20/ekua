'use client'
import Script from "next/script";
import { useState, useEffect} from "react";



export default function ColorPage({imgUrl}: {imgUrl: string}) {
    //const [svgUrl, setSvgUrl] = useState('https://assets.codepen.io/5936329/Coloringbook1.svg');
    
    //joy's test piece: 
    // https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/color-test1-05.svg
    //fish test piece: 
    // https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/Fish%20Test.svg
    // cat test piece: 
    // https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/Not_Today.svg
    const testVector = "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/color-test1-05.svg";
    const [svgUrl, setSvgUrl] = useState(testVector);

    useEffect(() => {
        makeSVGcolor(svgUrl);
    }, [svgUrl]);

    // https://assets.codepen.io/5936329/Coloringbook1.svg
    // https://assets.codepen.io/40041/crest.svg
    // https://s3-us-west-2.amazonaws.com/s.cdpn.io/40041/cheshire.svg
    return (
    <>
            <div className="holder">

                <div id="imageonly"></div>

                <div className="held" id="ActivityDIV"></div>

                <div className="held">
                    <a id="btnRandom" className="button">Randomize</a>

                    <a id="btnClear" className="button">Clear</a>

                    <a id="btnDownload" className="button">Upload</a>
                </div>
            </div>

            <Script>
                {`
                console.clear();
                console.log('svgColor');

                let mainHolder, colorHolder;
                const btnRandom = document.getElementById('btnRandom');
                const btnClear = document.getElementById('btnClear');
                const btnDownload = document.getElementById('btnDownload');
                let svgObject, svgOutline, svgColor;
                let swatchUp, swatchDown;
                const fillSpeed = 0.15;
                let chosenColor = '#FFFFFF';
                const colors = ['#D60032', '#FFE208', '#C20ADD', '#00D420', '#2EFFEF', '#FF6700', '#283CEA' ];
                let closeOffset;
                
                let selectedColor = null;

                function swatchClick(event) {
                    chosenColor = event.target.dataset.color;
                    console.log(chosenColor);

                    if (selectedColor) {
                        const existingBox = selectedColor.querySelector('.white-box');
                        if (existingBox) {
                            existingBox.remove();
                        }
                    }

                    // Set the new selected swatch
                    selectedColor = event.target;

                    // Create and append the white box to the selected color swatch
                    const whiteBox = document.createElement('div');
                    whiteBox.className = 'white-box';
                    selectedColor.appendChild(whiteBox);
                }


                function swatchMove(event) {
                    const moveTo = (event.type === 'mouseenter') ? swatchUp : swatchDown;
                    TweenMax.to('.swatchHolder', 0.5, moveTo);
                }

                function colorMe(event) {
                    TweenMax.to(event.target, fillSpeed, { fill: chosenColor });
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

                            fetch("http://localhost:5000/upload", {
                                method: "POST",
                                body: formData,
                            })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log("Uploaded:", data.file);
                                colorHolder.textContent = 'Uploaded Successfully!';

                                setTimeout(() => {
                                    colorHolder.textContent = ''; // Clear the text
                                }, 3000); // 3000 milliseconds (3 seconds)
                            })   
                            .catch((err) => console.error("Upload failed:", err));
                        }, "image/png");
                    };

                    img.src = url;
                }



                function svgRandom() {
                    svgColor.forEach((element) => {
                        const randomNum = Math.floor(Math.random() * colors.length);
                        TweenMax.to(element, fillSpeed, { fill: colors[randomNum] });
                    });
                }

                function svgClear() {
                    svgColor.forEach((element) => {
                        TweenMax.to(element, fillSpeed, { fill: "#FFF" });
                    });
                }

                function makeSwatches() {
                    console.log('makeSwatches');
                    const swatchHolder = document.createElement('ol');
                    swatchHolder.className = 'swatchHolder';
                    swatchHolder.style.position = 'fixed';
                    swatchHolder.style.bottom = '0px';
                    swatchHolder.style.right = '0px';
                    swatchHolder.style.listStyleType = 'none';
                    swatchHolder.style.textAlign = 'center';
                    swatchHolder.style.letterSpacing = '1px';
                    swatchHolder.style.fontFamily = 'Arial';
                    swatchHolder.style.display = 'flex';  // Changed to flexbox
                    swatchHolder.style.flexDirection = 'row';  // Makes it horizontal
                    swatchHolder.style.flexWrap = 'wrap';  // Allows wrapping if needed
                    swatchHolder.style.justifyContent = 'center'; // Centers the swatches
                    swatchHolder.style.alignItems = 'center';
                    swatchHolder.style.padding = '15px';
                    swatchHolder.style.width = '100vw';  // Adjust width dynamically
                    swatchHolder.style.maxWidth = '100%'; // Prevents overflow
                    swatchHolder.style.borderRadius = '20px';
                    swatchHolder.style.color = '#232323';
                    swatchHolder.style.color = '#232323';
                    swatchHolder.style.border = '0px';
                    document.querySelector('.holder').appendChild(swatchHolder);


                    colorHolder = document.createElement('li');
                    colorHolder.className = 'colorHolder';
                    colorHolder.style.backgroundColor = 'chosenColor';
                    colorHolder.style.width = '100%';
                    colorHolder.style.lineHeight = '100%';
                    colorHolder.style.padding = '10px 0px';
                    colorHolder.style.margin = '0px auto 15px auto';
                    colorHolder.style.cursor = 'pointer';
                    colorHolder.style.borderRadius = '20px';
                    swatchHolder.appendChild(colorHolder);

                    colors.forEach(color => {
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
                        swatchHolder.appendChild(swatch);
                    });

                    const swatchHeight = colorHolder.offsetHeight + colorHolder.offsetTop;
                    closeOffset = swatchHeight - swatchHolder.offsetHeight;

                    // swatchHolder.addEventListener('mouseenter', swatchMove);
                    // swatchHolder.addEventListener('mouseleave', swatchMove);
                    // swatchUp = { css: { bottom: '0px' } };
                    // swatchDown = { css: { bottom: closeOffset } };
                }

                function makeSVGcolor(svgURL) {
                    mainHolder = document.getElementById('ActivityDIV');
                    fetch(svgURL)
                        .then(response => response.text())
                        .then(svgText => {
                            mainHolder.innerHTML = svgText;
                            console.log("svgText:")
                            console.log(svgText);
                            svgObject = document.querySelector('svg');
                            svgColor = Array.from(svgObject.querySelectorAll('g#Color > *'));
                            svgOutline = Array.from(svgObject.querySelectorAll('g:nth-child(1) > *'));
                            svgColor.forEach(el => el.addEventListener('click', colorMe));
                            makeSwatches();
                        });
                }

                btnRandom.addEventListener('click', svgRandom);
                btnClear.addEventListener('click', svgClear);
                btnDownload.addEventListener('click', download);

                `}
            </Script>
        </>
  );
}