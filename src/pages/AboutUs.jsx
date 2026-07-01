import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function AboutUs() {

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full min-h-screen bg-gray-100">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl font-bold mb-6">
                        About Us
                    </h1>

                    <div className="bg-white shadow rounded-lg p-8">

                        <h2 className="text-2xl font-bold mb-4 text-black">
                            Rental Management System
                        </h2>

                        <p className="text-black mb-4 leading-relaxed">
                            Rental Management System waa nidaam loogu talagalay
                            in lagu maaraysto guryaha kirada ah, kirooyinka
                            (tenants), qolalka/apartment-ka, iyo lacag bixinta
                            (payments) si fudud oo waxtar leh.
                        </p>

                        <p className="text-black mb-4 leading-relaxed">
                            Ujeedada nidaamkan waa in la fududeeyo maareynta
                            macluumaadka kiraystayaasha, la kordhiyo saxsanaanta
                            xisaabaadka, iyo in la joogto lacagaha la bixiyay
                            iyo kuwa weli sugaya.
                        </p>

                        <h3 className="text-xl font-bold mb-2 text-black">
                            Astaamaha Nidaamka
                        </h3>

                        <ul className="list-disc list-inside text-black space-y-1 mb-4">
                            <li>Maareynta Tenants (Kiraystayaasha)</li>
                            <li>Maareynta Payments (Lacag bixinta)</li>
                            <li>Maareynta Apartments (Qolalka)</li>
                            <li>Nidaam Login oo Admin ah</li>
                        </ul>

                       <p className="text-black leading-relaxed mb-4">
    Haddii aad qabto su'aalo ama caawimo aad u
    baahan tahay, fadlan nala soo xiriir.
</p>

<div className="space-y-3">

    <div className="flex items-center gap-3 text-black">
        <FaPhoneAlt className="text-blue-700" />
        <span>0614494745</span>
    </div>

    <div className="flex items-center gap-3 text-black">
        <FaEnvelope className="text-blue-700" />
        <span>cabdallahhussein673@gmail.com</span>
    </div>

    <div className="flex items-center gap-3 text-black">
        <FaMapMarkerAlt className="text-blue-700" />
        <span>Shibis - Nasiib Buundo, Mogadishu</span>
    </div>

</div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AboutUs;