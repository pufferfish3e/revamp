"use client";

import Dock, { DockItemData } from "@/blocks/Components/Dock/Dock";
import {
    FaHome,
    FaUser,
    FaProjectDiagram,
    FaEnvelope,
} from "react-icons/fa";

export default function MobileDock() {
    const items: DockItemData[] = [
        {
            icon: <FaHome className="w-6 h-6 text-white" />,
            label: "Home",
            onClick: () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            },
        },
        {
            icon: <FaUser className="w-6 h-6 text-white" />,
            label: "About",
            onClick: () => {
                const aboutSection = document.getElementById("about");
                aboutSection?.scrollIntoView({ behavior: "smooth" });
            },
        },
        {
            icon: <FaProjectDiagram className="w-6 h-6 text-white" />,
            label: "Projects",
            onClick: () => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
            },
        },
        {
            icon: <FaEnvelope className="w-6 h-6 text-white" />,
            label: "Contact",
            onClick: () => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
            },
        },
    ];

    return <Dock items={items} baseItemSize={48} />;
}
