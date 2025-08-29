import InfiniteMenu from "@/blocks/Components/InfiniteMenu/InfiniteMenu";

export default function Projects() {
    const items = [
        {
            image: "/images/buildingblocs.jpeg",

            link: "https://github.com/pufferfish3e/b25_hackathon",

            title: "Percepta",

            description: "This is pretty cool, right?",
        },

        {
            image: "/images/pptx.jpeg",

            link: "https://github.com/joelscoville/pptx-generator",

            title: "Powerpoint Generator",

            description: "This is pretty cool, right?",
        },

        {
            image: "/images/practiceme.png",

            link: "https://github.com/pufferfish3e/practiceme",

            title: "PracticeMe Automation",

            description: "This is pretty cool, right?",
        },

        {
            image: "/images/wsj.png",

            link: "https://github.com/pufferfish3e/williamwebsite",

            title: "Portfolio Website",

            description: "This is pretty cool, right?",
        },
    ];

    return (
        <div className="relative w-screen h-screen">
            <InfiniteMenu items={items} />
        </div>
    );
}