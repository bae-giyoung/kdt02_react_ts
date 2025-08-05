// [단축키] rfc + Ctrl + Tab
import MyClockImage from "./MyClockImage";
import MyClockTime from "./MyClockTime";

function MyClock() {
    return (
        <div className="flex-auto h-full flex flex-col items-center justify-center">
            <MyClockImage />
            <MyClockTime />
        </div>
    )
}

export default MyClock;