import ChromaGrid from "@/blocks/Components/ChromaGrid/ChromaGrid";

export default function Hackathons() {
    const items = [
        {
            image: "/images/sieberr.jpeg",

            title: "Sieberrsec CTF",

            subtitle: "Capture-The-Flag",

            handle: "July 2025",

            borderColor: "#7DDA58",

            gradient: "linear-gradient(180deg, #7DDA58, #000000)",

            url: "https://sieberr.live/",
        },

        {
            image: "/images/lagncrash.jpeg",

            title: "Lag N Crash 5.0",

            subtitle: "Capture-The-Flag",

            handle: "July 2025",

            borderColor: "#10B981",

            gradient: "linear-gradient(180deg, #10B981, #000000)",

            url: "https://lagncra.sh/",
        },

        {
            image: "/images/buildingblocs.jpeg",

            title: "BuildingBlocs (June 2025)",

            subtitle: "Hackathon",

            handle: "June 2025",

            borderColor: "#FF7F7F",

            gradient: "linear-gradient(180deg, #FF7F7F, #000000)",

            url: "https://buildingblocs.sg/",
        },

        {
            image: "/images/polyfintech.png",

            title: "Polyfintech",

            subtitle: "Hackathon",

            handle: "June 2025",

            borderColor: "#98F5F9",

            gradient: "linear-gradient(180deg, #98F5F9, #000000)",

            url: "https://polyfintech100hackathon.sg/",
        },
    ];

    return (
        <div className="relative h-inherit w-screen">
            <ChromaGrid
                items={items}
                radius={300}
                damping={0.45}
                fadeOut={0.8}
                ease="power3.out"
            />
        </div>
    );
}