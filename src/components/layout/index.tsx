import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import './styles.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Nav />
      <div className="container main">
        <main>{children}</main>
        <Aside />
      </div>
      <Footer />
    </>
  );
}
