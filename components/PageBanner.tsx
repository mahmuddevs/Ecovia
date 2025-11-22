import { StaticImageData } from "next/image"

interface PageBannerProps {
    image: StaticImageData,
    heading: string,
    paragraph?: string
}

const PageBanner = ({ image, heading, paragraph }: PageBannerProps) => {
    return (
        <section
            style={{
                backgroundImage: `url(${image.src})`,
            }}
            className="bg-black/30 bg-blend-overlay text-white h-[60vh] px-4 text-center bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
        >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">{heading}</h1>
            <p className="text-xl! text-shadow-lg">{paragraph}</p>
        </section>
    )
}
export default PageBanner