'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from "./header.module.css";

export default function Header() {
    const pathname = usePathname()

    return (
        <header className={styles.header}>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="spotify_logo_white"  width={100} height={100}/>
            {/* <nav>
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
                    Home
                </Link>
            </nav> */}
        </header>
    ) 
}