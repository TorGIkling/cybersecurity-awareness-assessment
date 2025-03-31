import './homePage.css'
import Header from "../components/header/header";
import HomeContent from "../components/home_content/homeContent";

function HomePage() {
    return (
      <div className="home-page">
          <Header />
          <HomeContent />
      </div>
    );
}
export default HomePage;