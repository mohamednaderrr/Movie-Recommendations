import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-black text-white  py-2">
            <div className="container px-md-1 px-4 text-md-start text-center">


                <div className="row Text">
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Audio Description</Link></li>
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Investor Relations</Link></li>
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Legal Notices</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Cookie Preferences</Link></li>
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Help Centre</Link></li>
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Jobs</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Corporate Information</Link></li>
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Terms of Use</Link></li>
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Gift Cards</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Media Centre</Link></li>
                            <li className="mb-2"><Link to="/contactus" className="text-white text-decoration-none">Contact Us</Link></li>
                            <li className="mb-2"><Link to="#" className="text-white text-decoration-none">Privacy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="row mt-4 d-flex flex-column-reverse justify-content-center align-items-center ">
                    <div className=" ">
                        <p className="text-white-50 text-center mt-2">© 1997-2025 ReelPath, Inc.</p>
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-4  pb-3">
                        <div className="col-auto ">
                            <FaFacebookF size={22} />
                        </div>
                        <div className="col-auto ">
                            <FaInstagram size={22} />
                        </div>
                        <div className="col-auto ">
                            <FaTwitter size={22} />
                        </div>
                        <div className="col-auto ">
                            <FaYoutube size={22} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
