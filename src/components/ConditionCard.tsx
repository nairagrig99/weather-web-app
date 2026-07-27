export default function ConditionCard({item, name, day}: { item: any, name: string, day: string }) {
    const className = "flex justify-between gap-2";

    return <div
        className="flex items-center justify-between p-6 bg-amber-50 rounded-2xl border border-amber-200 mt-2  shrink-0 w-[400px] max-w-full">
        <div>
            <span className="text-xs font-bold text-gray-500 uppercase">{day}</span>
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="text-2xl font-extrabold mt-2">
                {Math.round(item.temp)}°C
            </div>
        </div>

        <div className="text-right text-sm space-y-1">
            <p className={className}><strong>FEELS LIKE:</strong> <span>{Math.round(item.feelslike)}°C</span>
            </p>
            <p className={className}><strong>WIND SPEED:</strong> <span>{item.windspeed} km/h</span></p>
            <p className={className}><strong>RAIN CHANCE:</strong> <span>{item.precipprob}%</span></p>
            <p className={className}><strong>CONDITION:</strong> <span>{item.conditions}</span></p>
        </div>

    </div>

}