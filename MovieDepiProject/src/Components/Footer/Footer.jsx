import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-white  py-2">
            <div className="container px-md-1 px-4">


                <div className="row Text">
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2"><a className="text-white text-decoration-none">Audio Description</a></li>
                            <li className="mb-2"><a className="text-white text-decoration-none">Investor Relations</a></li>
                            <li className="mb-2"><a className="text-white text-decoration-none">Legal Notices</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2"><a className="text-white text-decoration-none">Help Centre</a></li>
                            <li className="mb-2"><a className="text-white text-decoration-none">Cookie Preferences</a></li>
                            <li className="mb-2"><a className="text-white text-decoration-none">Jobs</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2"><a className="text-white text-decoration-none">Gift Cards</a></li>
                            <li className="mb-2"><a className="text-white text-decoration-none">Terms of Use</a></li>
                            <li className="mb-2"><a className="text-white text-decoration-none">Corporate Information</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2"><a className="text-white text-decoration-none">Media Centre</a></li>
                            <li className="mb-2"><a className="text-white text-decoration-none">Privacy</a></li>
                            <li className="mb-2"><a className="text-white text-decoration-none">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row mt-4 d-flex flex-column-reverse justify-content-center align-items-center ">
                    <div className=" ">
                        <p className="text-white-50 text-center mt-2">© 1997-2025 ReelPath, Inc.</p>
                    </div>

                    <div className="social-icons d-flex justify-content-center align-items-center gap-4 pb-3">
                        <div className="social-icon">
                            <FaFacebookF size={22} />
                        </div>
                        <div className="social-icon">
                            <FaInstagram size={22} />
                        </div>
                        <div className="social-icon">
                            <FaTwitter size={22} />
                        </div>
                        <div className="social-icon">
                            <FaYoutube size={22} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
