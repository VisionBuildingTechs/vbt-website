"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow } from "./icons";

const items = [
  ["La tecnología", "/tecnologia"],
  ["Aplicaciones", "/aplicaciones"],
  ["Viviendas", "/viviendas"],
  ["Recursos", "/recursos"],
  ["Red VBT", "/red"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Vision Building Technologies, inicio"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-vbt-transparent.png"
            width={78}
            height={70}
            priority
            alt="Vision Building Technologies"
          />
          <span aria-hidden="true">
            TECNOLOGÍA
            <br />
            QUE CONSTRUYE.
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Cerrar" : "Menú"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Principal"
        >
          {items.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path.startsWith(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="nav-contact"
            href="/contacto"
            onClick={() => setOpen(false)}
          >
            Hablemos <Arrow diagonal />
          </Link>
        </nav>
      </div>
    </header>
  );
}
