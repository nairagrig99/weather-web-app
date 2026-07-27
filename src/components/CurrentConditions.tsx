import ConditionCard from "./ConditionCard.tsx";

export default function CurrentConditions({location}: { location: any }) {
    if (!location || !location.days) return null;

    const currentHour = new Date().getHours();
    const today = location.days[1].hours[currentHour];

    const yesterday = location.days[0].hours;
    const tomorrow = location.days[2].hours;


    return <div>

        {/*today */}
        <ConditionCard item={today}
                       day="Today"
                       name={location.name}
        ></ConditionCard>

        {/* yesterday */}
        <div className="flex w-[700px] overflow-hidden overflow-x-auto gap-5 pt-5">
            {yesterday.map((day) => <ConditionCard key={day.datetimeEpoch}
                                                   item={day}
                                                   day="Yesterday"
                                                   name={location.name}></ConditionCard>)}
        </div>

        {/*tomorrow*/}
        <div className="flex w-[700px] overflow-hidden overflow-x-auto gap-5 pt-5">
            {tomorrow.map((day) => <ConditionCard key={day.datetimeEpoch}
                                                  item={day}
                                                  day="Tomorrow"
                                                  name={location.name}></ConditionCard>)}
        </div>

    </div>


}