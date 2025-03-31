import './homePage.css'
import Header from "../components/header/header";
import HomeContent from "../components/home_content/homeContent";

function HomePage() {
    return (
      <div className="home-page">
          <div className="home-page-header">
              <Header />
          </div>
          <div className="home-page-content">
              <HomeContent />
          </div>
      </div>
    );
}
export default HomePage;