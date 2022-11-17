import { Prosto_One } from "@next/font/google"
import { timeStamp } from "console"
import { useTranslations } from "next-intl"

interface TimelineProps {
    currentTime: Date
    sessions: SessionArray
    showTime: boolean
    showCurrentTime: boolean
    textColor: string
    barColor: string
    curTimeColor: string
    lineColor: string
}

const pad = (num: number, size: number): string => ('000000000' + num).slice(-size)

const getClosestWidth = (line: number) => {
    const widths = [100, 91, 83, 80, 75, 66, 60, 50, 40, 33, 25, 20, 16, 8, 0]
    const widthsStrings = ["full", "11/12", "5/6", "4/5", "3/4", "2/3", "3/5", "1/2", "2/5", "1/3", "1/4", "1/5", "1/6", "1/12", "0"]

    const index = widths.indexOf(widths.reduce((a, b) => {
        return Math.abs(b - line) < Math.abs(a - line) ? b : a;
    }))

    return widthsStrings[index]
}

const getSlotIndex = (dateTime: Date) => Math.ceil(dateTime.getHours() / 2.0)
const getLine = (dateTime: Date, slot: number) => {
    const slotStartHour: number = 2 * slot - 1
    const minutes: number = 60 * (dateTime.getHours() - slotStartHour) + dateTime.getMinutes()
    
    return minutes * 100 / 120
}
const getStartLine = (line: number) => getClosestWidth(line)
const getEndLine = (line: number) => getClosestWidth(100 - line)

export const Timeline = (props: TimelineProps) => {
    const t = useTranslations("Timeline");
    const slotCurrentTime = getSlotIndex(props.currentTime)
    const lineCurrentTime = getStartLine(getLine(props.currentTime, slotCurrentTime))

    return (
        <table className={`table-fixed timeline w-full ${props.textColor} mb-4`}>
            <tbody>
                <tr>
                    <td className="pr-2 md:pr-3 text-right w-[40px]"><span>{t("d" + props.currentTime.getDay())}</span></td>

                    {
                        Array.from(Array(13).keys()).map((num: number) => {

                            return (
                                <td className="slot" key={props.currentTime.getDate() + "-s-" + num}>
                                    <div className={`h-0.5 w-full relative ${props.lineColor}`} key={props.currentTime.getDate() + "-b-" + num}>
                                        {
                                            props.sessions.map((item: Session) => {

                                                const slotIndexStart = (item.startTime.getDate() != props.currentTime.getDate()) ? 0 : getSlotIndex(item.startTime)
                                                const slotIndexEnd = (item.endTime.getDate() != props.currentTime.getDate()) ? 12 :getSlotIndex(item.endTime)

                                                if ((slotIndexEnd != num) && (slotIndexStart != num)) return null
                                                
                                                if ((slotIndexStart == num) && (slotIndexEnd != num)) {
                                                    // Calculate line start for the special case of a sleep over midnight
                                                    //tbd: algo not correct yet
                                                    let lineStart: string = "0"
                                                    let rounded = true
                                                    if (item.startTime.getDate() != props.currentTime.getDate()) {
                                                        if (item.startTime.getHours() < 23) {
                                                            lineStart = "0"
                                                            rounded = false
                                                        } else {
                                                            lineStart = getStartLine(item.startTime.getMinutes()*100/120)
                                                        }
                                                    } else lineStart = getStartLine(getLine(item.startTime, slotIndexStart))

                                                    const lineEnd = getEndLine(getLine(item.startTime, slotIndexStart))
                                                    return (
                                                        <div className="w-full absolute z-1 flex justify-start" key={item.index + "-is"}>
                                                            <div className={`w-${lineStart} top-1/2 transform -translate-y-1/2`} key={item.index + "-isba"}></div>
                                                            <div className={`${props.barColor} w-${lineEnd} h-[14px] md:h-[24px] top-1/2 transform -translate-y-1/2 ${rounded ? "rounded-l-lg" : ""}`} key={item.index + "-isbb"}></div>
                                                        </div>
                                                    )
                                                }

                                                if ((slotIndexEnd == num) && (slotIndexStart != num)) {
                                                    let lineEnd: string = "0"
                                                    let rounded = true
                                                    // Calculate line end for the special case of a sleep over midnight
                                                    if (item.endTime.getDate() != props.currentTime.getDate()) {
                                                        if (item.endTime.getHours() > 1) {
                                                            lineEnd = "0"
                                                            rounded = false
                                                        } else {
                                                            lineEnd = getStartLine(100 - (item.endTime.getMinutes()*100/120))
                                                        }
                                                    } else lineEnd = getEndLine(getLine(item.endTime, slotIndexEnd))

                                                    const lineStart = getStartLine(getLine(item.endTime, slotIndexEnd))
                                                    
                                                    return (
                                                        <div className="w-full absolute z-1 flex justify-end" key={item.index + "-ie"}>
                                                            <div className={`${props.barColor} w-${lineStart} h-[14px] md:h-[24px] top-1/2 transform -translate-y-1/2 rounded-r-lg`} key={item.index + "-iebb"}></div>
                                                            <div className={`w-${lineEnd} top-1/2 transform -translate-y-1/2`} key={item.index + "-ieba"}></div>
                                                        </div>
                                                    )
                                                }

                                                if ((slotIndexEnd == num) && (slotIndexStart == num)) {
                                                    const lineS = getLine(item.startTime, slotIndexStart)
                                                    const lineE = getLine(item.endTime, slotIndexEnd)
                                                    const lineStart = getStartLine(lineS)
                                                    const lineEnd = getStartLine(lineE)
                                                    const barLength = getStartLine(120 - lineS - lineE)
                                                    return (
                                                        <div className="w-full absolute z-1 flex justify-start" key={item.index + "-im"}>
                                                            <div className={`w-${lineStart} top-1/2 transform -translate-y-1/2`} key={item.index + "-imba"}></div>
                                                            <div className={`${props.barColor} w-${barLength} h-[14px] md:h-[24px] top-1/2 transform -translate-y-1/2 rounded-lg`} key={item.index + "-isbb"}></div>
                                                            <div className={`w-${lineEnd} top-1/2 transform -translate-y-1/2`} key={item.index + "-imbc"}></div>
                                                        </div>
                                                    )
                                                }
                                                
                                            })
                                        }

                                        { slotCurrentTime == num && props.showCurrentTime &&
                                            <div className="w-full absolute z-1 flex justify-start" key={props.currentTime.getDate() + "-tb"}>
                                                <div className={`w-${lineCurrentTime} top-1/2 transform -translate-y-1/2`} key={props.currentTime.getDate() + "-tbca"}></div>
                                                <div className={`${props.curTimeColor} w-[3px] md:w-[4px] h-[14px] md:h-[24px] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`} key={props.currentTime.getDate() + "-tbcb"}></div>
                                            </div>
                                        }
                                    </div>
                                </td>
                            )
                        })
                    }

                    <td className="pl-2 md:pl-3 text-left w-[40px]"><span>{t("d" + ((props.currentTime.getDay() +1) % 7))}</span></td>
                </tr>

                {props.showTime &&
                    <tr>
                        <td className="pr-2 md:pr-3 text-right"></td>
                        {
                            Array.from(Array(25).keys()).map((num: number) => (
                                (num % 2 == 0) && <td className="md:pr-2 md:pl-2 pt-2 md:pt-3 text-center" key={props.currentTime.getDate() + "-t-" + num}>{pad(num, 2)}</td>
                            ))
                        }
                        <td className="pl-2 md:pl-3 text-left"></td>
                    </tr>
                }
            </tbody>
        </table>
    )
}