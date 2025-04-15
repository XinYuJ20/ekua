import { MouseEventHandler } from 'react';

export default function BottomNav({leftButText, leftOnClick, leftClickable, rightButText, rightOnClick, rightClickable}: 
    {
        leftButText: string, 
        leftOnClick: MouseEventHandler, 
        leftClickable: boolean, 
        rightButText: string, 
        rightOnClick: MouseEventHandler, 
        rightClickable: boolean}) {

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white py-4 text-center text-lg font-bold">
            <button className="float-left ml-8" onClick={leftOnClick} disabled={!leftClickable}>
                {leftButText}
            </button>
            <button className="float-right mr-8" onClick={rightOnClick} disabled={!rightClickable}>
                {rightButText}
            </button>
        </div>
    )
}

// export default function BottomNav({leftButText, leftOnClick, rightButText, rightOnClick}: {leftButText: string, leftOnClick: Function, rightButText: string, rightOnClick: Function}) {
//     const rightLinkStyle = () => {
//         const styles = rightOnClick === "-1" ? "text-gray-400" : ""
//         return styles + " float-right mr-8"
//     }

//     return (
//         <div className="fixed bottom-0 left-0 w-full bg-black text-white py-4 text-center text-lg font-bold">
//             <Link className="float-left ml-8" href={leftOnClick}>
//                     <button>
//                         {leftButText}
//                     </button>
//             </Link>
//             <Link className={rightLinkStyle()} href={rightOnClick === "-1" ? "#" : rightOnClick}>
//                     <button className={rightOnClick === "-1" ? "cursor-default" : ""}>
//                         {rightButText}
//                     </button>
//             </Link>
//         </div>
//     )
// }