import "../blocks/Footer.css"

function Footer() {
    return (
        <footer className="footer">
             <div className="footer__text-container">
            <p className="footer__author">Mohammad Alam</p>
            <p className="footer__copyright">{new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;