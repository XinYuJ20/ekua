import {Pattern} from "../pattern_data";
import Image from 'next/image';
import Link from 'next/link';

export default function PatternList({patterns}: {patterns: Pattern[]}) {
    return (
        <div>
            {patterns.map(pattern => (
                <Link key={pattern.id} href="/color-test">
                    <Image
                        src={pattern.imageUrl}
                        width={pattern.imageWidth}
                        height={pattern.imageHeight}
                        alt={pattern.name}
                    />
                </Link>
            ))}
        </div>
    )
}