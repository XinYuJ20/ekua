import Link from 'next/link';

export default function BottomNav({leftButText, leftLink, rightButText, rightLink}: {leftButText: string, leftLink: string, rightButText: string, rightLink: string}) {
    const rightLinkStyle = () => {
        const styles = rightLink === "-1" ? "text-gray-400" : ""
        return styles + " float-right mr-8"
    }

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white py-4 text-center text-lg font-bold">
            <Link className="float-left ml-8" href={leftLink}>
                    <button>
                        {leftButText}
                    </button>
            </Link>
            <Link className={rightLinkStyle()} href={rightLink === "-1" ? "#" : rightLink}>
                    <button className={rightLink === "-1" ? "cursor-default" : ""}>
                        {rightButText}
                    </button>
            </Link>
        </div>
    )
}