'use client'
import Image from 'next/image';

export default function PreviewImage({imageUrl} :{ imageUrl: string }) {
    return(
        <Image
            src={imageUrl}
            width={150}
            height={150}
            alt={"image Preview"}
            />
        )
}