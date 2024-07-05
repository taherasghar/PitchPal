import Banner from "./components/Banner";
import Why from "./components/Why";
import LandingHost from "./components/LandingHost";
import Counter from "./components/counter";

function Home() {
  return (
    <>
      <section className="hero-section">
        <Banner />
      </section>
      <Why />
      <LandingHost />
      <Counter />
    </>
  );
}

export default Home;
