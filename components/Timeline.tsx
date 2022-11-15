
interface TimelineProps {
    startDay: string
    endDay: string
    showTime: boolean
    textColor: string
    barColor: string
    lineColor: string
}

interface Session {
    startTime: Date
    endTime: Date
    ongoing: boolean
}

interface SessionArray {
    [index: number]: Session
}

let demoArray: SessionArray
demoArray = [
    { "startTime": new Date("2022-11-16T09:13:20"), "endTime": new Date("2022-11-16T11:34:40"), "ongoing": false}
]

const getClosestWidth = (line: number) => {
    const widths = [100, 83, 80, 75, 66, 60, 50, 40, 33, 25, 20, 16, 0]
    const widthsStrings = ["full", "5/6", "4/5", "3/4", "2/3", "3/5", "1/2", "2/5", "1/3", "1/4", "1/5", "1/6", "0"]
    
    const index = widths.indexOf(widths.reduce((a, b) => {
        return Math.abs(b - line) < Math.abs(a - line) ? b : a;
    }))

    return widthsStrings[index]
}

const getSlotIndex = (dateTime: Date) => Math.ceil(dateTime.getHours() / 2.0)
const getLine = (dateTime: Date, slot: number) => {
    const slotStartHour: number = 2*slot - 1
    const minutes: number = 60*(dateTime.getHours() - slotStartHour) + dateTime.getMinutes()
    const line: number = minutes * 100 / 120

    return getClosestWidth(line)
}

export const Timeline = (props: TimelineProps) => {

    return (
        <table className={`auto timeline w-full text-${ props.textColor }`}>
            <tbody>
                <tr>
                    <td className="pr-2 md:pr-3 text-right">{props.startDay}</td>

                    <td className="slot">
                        <div className={`h-0.5 w-full bg-${ props.lineColor}`}>

                            <div className="w-full relative flex justify-end">
                                <div className="bg-indigo-700 w-1/5 h-6 z-1 absolute top-1/2 transform -translate-y-1/2 rounded-r-lg"></div>
                            </div>

                            <div className="w-full relative flex justify-start">
                                <div className="bg-indigo-700 w-1/5 h-6 z-1 absolute top-1/2 transform -translate-y-1/2 rounded-l-lg"></div>
                            </div>

                            <div className="w-full relative flex">
                                <div className="bg-indigo-700 w-full h-6 z-1 absolute top-1/2 transform -translate-y-1/2"></div>
                            </div>

                        </div>
                    </td>

                    <td className="pl-2 md:pl-3 text-left">{props.endDay}</td>
                </tr>

                {props.showTime &&
                    <tr>
                        <td className="pr-2 md:pr-3 text-right"></td>
                        
                        <td className="md:pr-2 md:pl-2 text-center">00</td>
                        <td className="md:pr-2 md:pl-2 text-center">02</td>
                        <td className="md:pr-2 md:pl-2 text-center">04</td>
                        <td className="md:pr-2 md:pl-2 text-center">06</td>
                        <td className="md:pr-2 md:pl-2 text-center">08</td>
                        <td className="md:pr-2 md:pl-2 text-center">10</td>
                        <td className="md:pr-2 md:pl-2 text-center">12</td>
                        <td className="md:pr-2 md:pl-2 text-center">14</td>
                        <td className="md:pr-2 md:pl-2 text-center">16</td>
                        <td className="md:pr-2 md:pl-2 text-center">18</td>
                        <td className="md:pr-2 md:pl-2 text-center">20</td>
                        <td className="md:pr-2 md:pl-2 text-center">22</td>
                        <td className="md:pr-2 md:pl-2 text-center">24</td>
                        
                        <td className="pl-2 md:pl-3 text-left"></td>
                    </tr>
                }
            </tbody>
        </table>
    )
}