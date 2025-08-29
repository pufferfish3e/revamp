import FlowingMenu from "@/blocks/Components/FlowingMenu/FlowingMenu";

export default function Contact() {
    const items = [
        {
            link: "tel:+6587681400",
            text: "Phone",
        },

        {
            link: "mailto:kandyofthejoeys@gmail.com",
            text: "Email",
        },

        {
            link: "https://github.com/pufferfish3e",
            text: "Github",
        },

        {
            link: "https://www.linkedin.com/in/mambuwu/",
            text: "Linkedin",
        },
    ];

    return (
        <FlowingMenu items={items} />
    )
}