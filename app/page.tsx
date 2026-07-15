import Hero from "./components/Hero"
import Gallery from "./components/Gallery"
import Navbar from "./components/nav/Navbar"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import ProgressBar from "./components/ProgressBars"
import Acordeon from "./components/AcordeonPage"
import FinalCTA from "./components/FinalCta"
import YapasFinal from "./components/Premios"
import CTAButtons from "./components/CtaButtons"
import ImpactoSocial from "./components/Impacto"


export default function HomeView() {

    return (
        <>
            <div >
                <Navbar />
                <div id="hero"><Hero /></div>
                <div><ProgressBar /></div>
                <div id="premios">
                    <YapasFinal />
                    <CTAButtons />
                </div>
                <div id="caracteristicas"><Features /></div>
                <div id="galleria"><Gallery /></div>
                <div id="howitworks"><HowItWorks /></div>
                <div id="impacto"><ImpactoSocial /> </div>
                <section id="faq" className="py-20 ">
                    <div className="px-6 lg:px-20 ">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Preguntas Frecuentes
                        </h2>

                        <div className="container mx-auto px-6 max-w-5xl">
                            <Acordeon />
                        </div>
                    </div>
                </section>
                <div><FinalCTA /></div>

            </div>
        </>

    )
}
