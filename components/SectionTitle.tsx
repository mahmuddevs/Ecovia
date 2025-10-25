interface SectionTitleProps {
  heading: string
  paragraph?: string
  textColor?: string
}

const SectionTitle = ({
  heading,
  paragraph,
  textColor = "black",
}: SectionTitleProps) => {
  return (
    <div className="text-center mb-16 space-y-4">
      <h2 className={`text-3xl md:text-4xl font-bold text-${textColor}`}>
        {heading}
      </h2>
      <p className={`!text-xl text-black`}>{paragraph}</p>
      <div className="w-24 h-1 bg-emerald-400 mx-auto"></div>
    </div>
  )
}
export default SectionTitle
