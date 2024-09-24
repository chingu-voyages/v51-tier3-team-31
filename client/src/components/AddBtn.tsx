import React from "react";

export default function AddBtn() {
    return (
            <div className="fixed bottom-3">
                <div className="bg-gray-300 size-14 rounded-full border border-indigo-900 shadow-md shadow-gray-600 relative cursor-pointer">
                    <div className="bg-indigo-900 w-1 h-9 absolute top-2.5 left-[25px] rounded-md"></div>
                    <div className="bg-indigo-900 h-1 w-9 absolute left-2.5 top-[25px] rounded-md"></div>
                </div>
                <p className="text-gray-50">Add an expense group</p>
            </div>     
    )
}