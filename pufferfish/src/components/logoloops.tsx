import LogoLoop from "@/blocks/Animations/LogoLoop/LogoLoop";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiBootstrap,
    SiHtml5,
    SiCss3,
    SiCplusplus,
    SiPython,
    SiJavascript,
    SiGithub,
    SiSwift,
} from "react-icons/si";
export default function Logo() {
    const techLogos = [
        { node: <SiReact />, title: "React", href: "https://react.dev" },

        { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },

        {
            node: <SiTypescript />,
            title: "TypeScript",
            href: "https://www.typescriptlang.org",
        },

        {
            node: <SiTailwindcss />,
            title: "Tailwind CSS",
            href: "https://tailwindcss.com",
        },
        {
            node: <SiBootstrap />,
            title: "Bootstrap",
            href: "https://getbootstrap.com",
        },
        {
            node: <SiHtml5 />,
            title: "HTML5",
            href: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
        },
        {
            node: <SiCss3 />,
            title: "CSS3",
            href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        },
        {
            node: <SiCplusplus />,
            title: "C++",
            href: "https://en.cppreference.com/w/",
        },
        {
            node: <SiPython />,
            title: "Python",
            href: "https://www.python.org/",
        },
        {
            node: <SiJavascript />,
            title: "JavaScript",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
            node: <SiGithub />,
            title: "GitHub",
            href: "https://github.com/",
        },
        {
            node: <SiSwift />,
            title: "Swift",
            href: "https://developer.apple.com/swift/",
        },
    ];
    return (
        <div className="mt-10 h-fit w-225 flex gap-5 flex-col">
            <LogoLoop
                logos={techLogos}
                speed={60}
                direction="left"
                logoHeight={48}
                gap={40}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technology partners"
            />
            <LogoLoop
                logos={techLogos}
                speed={60}
                direction="right"
                logoHeight={48}
                gap={40}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technology partners"
            />
            <LogoLoop
                logos={techLogos}
                speed={60}
                direction="left"
                logoHeight={48}
                gap={40}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technology partners"
            />
            <LogoLoop
                logos={techLogos}
                speed={60}
                direction="right"
                logoHeight={48}
                gap={40}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technology partners"
            />
        </div>
    );
}
