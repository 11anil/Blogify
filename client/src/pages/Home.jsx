import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen transition-all">
            <Navbar />
            <Header />
            <BlogList />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;
