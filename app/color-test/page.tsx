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

            <Script
                src="colorscript.js"
                strategy="afterInteractive">
            </Script>
        </>
  );
}