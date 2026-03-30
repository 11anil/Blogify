import { assets, footer_data } from "../assets/assets";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
    const { theme } = useTheme();

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-[var(--card-bg)] border-t border-[var(--border-color)] transition-all">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-[var(--border-color)] text-[var(--text-muted)]">
                <div>
                    <img src={theme === "light" ? assets.logo : assets.logo_light} alt="logo" className="w-32 sm:w-44" />
                    <p className="max-w-[410px] mt-6">This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>
                </div>

                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footer_data.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-[var(--text-color)] md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-primary transition-all">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-[var(--text-muted)] opacity-80">Copyright 2026 © Blogify AK - All Right Reserved.</p>
        </div>
    );
};

export default Footer;
