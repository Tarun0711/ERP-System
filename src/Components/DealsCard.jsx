import React from "react";
import moment from 'moment';
function DealsCard({ Data }) {
  return (
    <div className="min-h-[155px] w-[272px] rounded-3xl overflow-hidden bg-white">
        <div
          className="flex justify-between flex-col "
        >
          <p
            className={`w-full h-10 py-2 px-4 text-md ${
              Data.currentStage === "Won"
                ? "bg-[#54FF8E]"
                : Data.currentStage === "Lost"
                ? "bg-[#FF766B]"
                : "bg-[#FFF27E]"
            }`}
          >
            {Data.currentStage}
          </p>
          <div className="px-2">
          <p className="text-sm">{Data.taskOwner}</p>
          <p className="text-sm">{Data.dealName}</p>
          <p className="text-sm">{Data.accountName}</p>
          <p className="text-sm">{Data.contactName}</p>
          <p className="text-sm">{Data.amount}</p>
          <p className="text-sm">{moment(Data.closingDate).format('MM/DD/YYYY')}</p>          </div>

        </div>
    </div>
  );
}

export default DealsCard;
