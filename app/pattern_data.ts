export interface Pattern {
    id: string;
    name: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
}


const imgHW = 155;

export const patterns: Pattern[] = [{
    id: "0",
    name: "color-test1-055.svg (joy's test piece)",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/color-test1-05.svg",
    imageWidth: imgHW,
    imageHeight: imgHW
}, {
    id: "1",
    name: "not today cat test piece",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/Not_Today.svg",
    imageWidth: imgHW,
    imageHeight: imgHW
}, {
    id: "2",
    name: "fish test piece (svg kinda broken...)",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/Fish%20Test.svg",
    imageWidth: imgHW,
    imageHeight: imgHW
}, {
    id: "3",
    name: "color-test1-055.svg (joy's test piece) duplicate",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/color-test1-05.svg",
    imageWidth: imgHW,
    imageHeight: imgHW
}, {
    id: "4",
    name: "not today cat test piece duplicate",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/Not_Today.svg",
    imageWidth: imgHW,
    imageHeight: imgHW
}, {
    id: "5",
    name: "fish test piece (svg kinda broken...) duplicate",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/Fish%20Test.svg",
    imageWidth: imgHW,
    imageHeight: imgHW
}]