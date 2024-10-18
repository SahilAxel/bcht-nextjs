import Image from "next/image";
import Link from "next/link";

export default async function Logo() {
  return (
    <div className="header_logo">
      <Link href="/" rel="home" title="Boston Children's Hospital Trust">
        <Image
          src={"/logo.webp"}
          alt="Boston Children's Hospital Trust"
          width={1260}
          height={144}
        />
      </Link>
    </div>
  )
}