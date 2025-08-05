import clock from '../assets/clock.png'

function MyClockImage() {
    return (
        <div className="w-full max-h-70svh flex justify-center mb-3.5">
            <img src={clock} alt="시계" className="w-2/3" />
        </div>
    )
}

export default MyClockImage;