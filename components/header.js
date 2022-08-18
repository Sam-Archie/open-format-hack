import Link from "next/link";

const navigation = [{ name: "Create", href: "/create" }];

export default function Header() {
  return (
    <header className="bg-transparent border-b border-cyan-400">
      <nav className="max-w-7xl px-8 sm:px-8 lg:px-16" aria-label="Top">
        <div className="py-6 flex items-center justify-between ">
          <div className="flex items-center">
            <Link href="/">
              <a className="cursor-pointer">
                <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt=""
                />
              </a>
            </Link>
            <div className="ml-10 space-x-8">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
