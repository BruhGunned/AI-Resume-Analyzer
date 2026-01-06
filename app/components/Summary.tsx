import React from 'react';
import ScoreGauge from '~/components/ScoreGauge';
import ScoreBadge from '~/components/ScoreBadge';
const Category =({title,score}: {title: string,score: number}) => {
  const textColor = score >= 70 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500";

  return (
    <div className={"resume-summary"}>
      <div className={"category"}>
        <div>
          <p>{title}</p>
        </div>
        <div className={"flex items-center gap-2"}>
          <p className={"text-2xl"}>
            <span className={textColor}>{score}</span>/100
          </p>
          <ScoreBadge score={score} />
        </div>
      </div>
    </div>
  )
}
const Summary = ({feedback} : {feedback : Feedback}) => {
  return (
    <div className={"bg-white rounded-2xl shadow-md w-full"}>
      <div className={"flex flex-row items-center p-4 gap-8"}>
        <ScoreGauge score={feedback.overallScore} />
        <div className={"flex flex-col gap-2"}>
          <div className={"flex items-center gap-3"}>
            <h2 className={"text-2xl font-bold "}> Your Resume Score </h2>
            <ScoreBadge score={feedback.overallScore} />
          </div>
          <p className={"text-sm text-gray-500"}> This Score is calculated based upon the factors given below </p>
        </div>
      </div>

      <Category title={"Tone and Style"} score={feedback.toneAndStyle.score} />
      <Category title={"Content"} score={feedback.content.score} />
      <Category title={"Structure"} score={feedback.structure.score} />
      <Category title={"Skills"} score={feedback.skills.score} />

    </div>
  )
}
export default Summary