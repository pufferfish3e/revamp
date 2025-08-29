import InfiniteMenu from "@/blocks/Components/InfiniteMenu/InfiniteMenu";

export default function Projects() {
    const items = [
        {
            image: "/images/buildingblocs.jpeg",

            link: "https://github.com/pufferfish3e/b25_hackathon",

            title: "Percepta",

            description: "A lightweight, portable camera with inbuilt machine learning offering aid for the visually impaired.",
        },

        {
            image: "/images/pptx.jpeg",

            link: "https://github.com/joelscoville/pptx-generator",

            title: "Powerpoint Generator",

            description: "A python application that generates customized powerpoint slides spontaneously.",
        },

        {
            image: "/images/practiceme.png",

            link: "https://github.com/pufferfish3e/practiceme",

            title: "PracticeMe Automation",

            description: "A fun automation tool written with selenium to rack up points from programming exercises.",
        },

        {
            image: "/images/wsj.png",

            link: "https://github.com/pufferfish3e/williamwebsite",

            title: "Portfolio Website",

            description: "A portfolio website for my uncle, a Web Designer.",
        },
    ];

    return (
        <div className="relative w-screen h-[80vh] md:h-screen">
            <InfiniteMenu items={items} />
        </div>
    );
}