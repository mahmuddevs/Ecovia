"use client"
import CountUp from "react-countup"

const Achievements = () => {
    return (
        <div className="bg-stone-700/50 py-12">
            <div className="global-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <p className="text-tprimary !text-4xl font-bold">
                            <CountUp end={1000} />+
                        </p>
                        <p className="text-white text-xl">Trees Planted</p>
                    </div>
                    <div className="text-center">
                        <p className="text-tprimary !text-4xl font-bold">
                            <CountUp end={5000} />+
                        </p>
                        <p className="text-white text-xl">Volunteers Worldwide</p>
                    </div>
                    <div className="text-center">
                        <p className="text-tprimary !text-4xl font-bold">
                            <CountUp end={120} />+
                        </p>
                        <p className="text-white text-xl">Conservation Projects</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Achievements