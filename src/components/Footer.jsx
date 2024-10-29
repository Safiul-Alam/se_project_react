import "../blocks/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__author">Devoloped by Mohammad Alam</p>
      <p className="footer__copyright">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
