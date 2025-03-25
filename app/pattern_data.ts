export interface Pattern {
    id: string;
    name: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
}

export const patterns: Pattern[] = [{
    id: "0",
    name: "color-test1-055.svg (joy's test piece)",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/color-test1-05.svg",
    imageWidth: 200,
    imageHeight: 200
}, {
    id: "1",
    name: "not today cat test piece",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/Not_Today.svg",
    imageWidth: 200,
    imageHeight: 100
}, {
    id: "2",
    name: "fish test piece (svg kinda broken...)",
    imageUrl: "https://raw.githubusercontent.com/zouevelyn/ekua/refs/heads/main/app/color-test/Fish%20Test.svg",
    imageWidth: 200,
    imageHeight: 200
}]