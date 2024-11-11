'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from "./header.module.css";

export default function Header() {
    const pathname = usePathname()

    return (
        <header className={styles.header}>
            <h1>Logo</h1>
            <nav>
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
                    Home
                </Link>
            </nav>
        </header>
    ) 
}