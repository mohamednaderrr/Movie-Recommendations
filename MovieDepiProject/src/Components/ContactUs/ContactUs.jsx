import React from 'react';
import { ToastContainer, toast } from 'react-toastify';


const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted");
        toast('Form submitted');
    };



    return (
        <>
            <ToastContainer draggable />
            <section className="mb-4 pb-5 d-flex flex-column text-white overflow-hidden">
                <h1 className=" fw-bold text-center mb-4 text-danger text-uppercase">Contact us</h1>
                <p className="text-center  px-2 text-white-50">
                    Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                    a matter of hours to help you.
                </p>

                <div className="row ">
                    <div className="py-2 px-5 mb-5">
                        <form id="contact-form" onSubmit={handleSubmit}>

                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <div className="md-form mb-0">
                                        <label htmlFor="name" className='text-danger fw-bold'>Your name</label>
                                        <input type="text" id="name" name="name" className="form-control" required />
                                    </div>
                                </div>

                                <div className="col-md-6 mt-3">
                                    <div className="md-form mb-0">
                                        <label htmlFor="email" className='text-danger fw-bold'>Your email</label>
                                        <input type="email" id="email" name="email" className="form-control" required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    <div className="md-form mb-0">
                                        <label htmlFor="subject" className='text-danger fw-bold'>Subject</label>
                                        <input type="text" id="subject" name="subject" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    <div className="md-form">
                                        <label htmlFor="message" className='text-danger fw-bold'>Your message</label>
                                        <textarea id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center text-md-left mt-5 mb-5">
                                <button type="submit" className="btn btn-outline-light px-4 py-2">Send</button>
                            </div>

                        </form>
                    </div>

                </div>
            </section>
        </>
    );
};

export default ContactUs;
