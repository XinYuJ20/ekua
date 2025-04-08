import {Pattern} from "../pattern_data";
import Image from 'next/image';
import Link from 'next/link';

export default function PatternList({patterns}: {patterns: Pattern[]}) {
    return (
        <div className="grid grid-flow-row grid-cols-2">
            {patterns.map(pattern => (
                <Link key={pattern.id} href={"/patterns/" + pattern.id}>
                    <Image
                        src={pattern.imageUrl}
                        width={pattern.imageWidth}
                        height={pattern.imageHeight}
                        alt={pattern.name}
                        className="mb-8"
                    />
                </Link>
            ))}
        </div>
    )
}