const Newsletter = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 my-32 mx-6">
            <h1 className="md:text-4xl text-2xl font-semibold text-[var(--text-color)]">Never Miss a Blog!</h1>
            <p className="md:text-lg text-[var(--text-muted)] pb-8">Subscribe to get the latest blog, new tech, and exclusive news.</p>
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 bg-[var(--card-bg)] rounded-md border border-[var(--border-color)] overflow-hidden">
                <input className="h-full outline-none w-full px-3 bg-transparent text-[var(--text-color)]" type="text" placeholder="Enter your email id" required />
                <button type="submit" className="md:px-12 px-8 h-full text-background bg-primary hover:opacity-90 transition-all cursor-pointer font-medium border-none outline-none">
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default Newsletter;
